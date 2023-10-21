import React from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'

const App: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </>
  )
}

export default App
