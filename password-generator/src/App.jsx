import { useState, useCallback,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  let [length, setLength] = useState(8)
  let [numberAllowed ,setNumberAllowed]=useState(false)
  let [charAllowed ,setCharAllowed]=useState(false)
  let [password,setPassword]=useState("")
  const passwordgen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+-=`~{}[]"
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*(str.length))
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{passwordgen() },[length,numberAllowed,charAllowed,passwordgen])
  
  return (
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 mt-5 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center"> Password generator </h1>
   
   <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white text-black"
          placeholder="password"
          readOnly
        />
  <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>setLength(e.target.value)}
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-2">
          <input 
          type="checkbox" 
          id="numberInput"
          onChange={()=> setNumberAllowed((prev)=>!prev)}
          />
          <label>Number</label>
      </div>
      <div className="flex items-center gap-x-2">
          <input 
          type="checkbox" 
          id="charInput"
          onChange={()=> setCharAllowed((prev)=>!prev)}
          />
          <label>Character</label>
      </div>

    </div>
  </div>

  )
}

export default App
