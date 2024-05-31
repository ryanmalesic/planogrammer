import { Authenticator } from '@aws-amplify/ui-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Amplify } from 'aws-amplify'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import outputs from '../amplify_outputs.json'

import { routeTree } from './routeTree.gen'

import '@aws-amplify/ui-react/styles.css'
import './index.css'

Amplify.configure(outputs)

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Authenticator>
        {() => (
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        )}
      </Authenticator>
    </StrictMode>
  )
}
