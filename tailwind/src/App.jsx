import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './card'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="bg-green-400 text-black p-2 rounded-xl">Tailwind Test</h1>
    <Card username="Yugan Jain"/>
    <Card username="balli kala"/>
    </>
  )
}

export default App
