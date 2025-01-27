import { Navigate } from 'react-router-dom'
import useSession from '../hooks/useSession'
import { pages } from '@isomera/impl'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function PublicRoute(props: Props) {
  const { children } = props

  const { isAuthenticated } = useSession()

  if (isAuthenticated) {
    return <Navigate to={pages.dashboard.path} />
  }

  return <>{children}</>
}

export default PublicRoute
