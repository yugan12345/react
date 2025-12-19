import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'



function App() {
  let [counter,setcounter]=useState(15);

  const addValue=()=>{
  if (counter<20) setcounter(counter+1);
  }

  const reduceValue=()=>{
  if(counter>0) setcounter(counter-1);
  }

  return (
    <>
    <h1>Chai + React</h1>
    <h2>Counter value is : <span>{counter}</span></h2>
    <button
    onClick={addValue}>Increment {counter}</button><br>
    </br>
    <button
    onClick={reduceValue}>Decrement {counter}</button>
    </>
  )
}

export default App
