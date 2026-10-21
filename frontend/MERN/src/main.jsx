import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
