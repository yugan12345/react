import React,{useState,useContext} from 'react';

import UserContext from '../context/UserContext';

export default function Login() {
    const [username,setUsername]=useState('')
    const [pass,setPass]=useState('')
    const {setUser}=useContext(UserContext)
    const handleSubmit=(e)=>{
        e.preventDefault()
        setUser({username,pass})
    }
    return ( <>
        <h2>Login</h2>
        <input id='user' value={username} onChange={(e)=>{
            setUsername(e.target.value)
        }} type="text" placeholder='Username'/>
        <br></br>
        <input id='pass'  value={pass} onChange={(e)=>{
            setPass(e.target.value)
        }} type="text" placeholder='Password'/>
        <br></br>
        <button onClick={handleSubmit}> Submit </button>
    </> );
}