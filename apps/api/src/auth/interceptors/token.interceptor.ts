import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import type { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from '../auth.service'
import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<
      Partial<UserEntity> & { access_token: string; refresh_token: string }
    >
  ): Observable<
    Partial<UserEntity> & { access_token: string; refresh_token: string }
  > {
    return next.handle().pipe(
      map(data => {
        const response = context.switchToHttp().getResponse<Response>()

        response.setHeader('Authorization', `Bearer ${data.access_token}`)
        response.cookie('token', data.access_token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        })

        return data
      })
    )
  }
}
