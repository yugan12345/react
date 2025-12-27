import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeBtn from './components/thmBtn'
import Card from './components/Card'
import { ThemeProvider } from './context/Theme'
function App() {
  const [themeMode, setTheme] = useState("light")
  const darkTheme=()=>{
    setTheme('dark')
  }
  const lightTheme=()=>{
    setTheme('light')
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove('light','dark')
    document.querySelector('html').classList.add(themeMode)
  },[themeMode]);
  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>    
          </div>

          <div className="w-full max-w-sm mx-auto">
              <Card/>       
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
