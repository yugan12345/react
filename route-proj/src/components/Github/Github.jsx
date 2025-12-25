import React, { useEffect,useState } from 'react';

export default  function Github() {
    const [data,setData]=useState(0);

    useEffect(()=>{
        fetch('https://api.github.com/users/hiteshchoudhary')
        .then(response => response.json())
        .then(out=>{
            console.log(out);
            setData(out);
        })
    },[]);
    return ( <>
        <div className='text-3xl text-center m-4 bg-gray-600 text-white p-4'>Github Followers: {data.followers}</div>
        <img className='mx-auto'src={data.avatar_url} alt="" />
    </> );
}
