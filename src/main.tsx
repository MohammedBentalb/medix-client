import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from "./provides/AuthProvider.tsx"

const queryCient = new QueryClient();


createRoot(document.getElementById('root')!).render(  
  <StrictMode>
    <QueryClientProvider client={queryCient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
