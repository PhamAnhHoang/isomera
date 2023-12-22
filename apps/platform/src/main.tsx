import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import Routes from './router/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './providers/authProvider'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
