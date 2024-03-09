import { useState } from 'react';
import './App.css';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [length,setLength]=useState("14");
  const [number,setNumber]=useState(false);
  const [charAllow,setCharAllow]=useState(false);
  const [password,setPassword]=useState("");

  //useref hook
  const passwordref=useRef(null);
  //we use usecallback for optimisation that it store data in cache memory
  //it is optional
  const copypassword=useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,99)//here we can fix how many char we have to select from starting
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(number)
    {
      str+="0123456789";
    }
    if(charAllow)
    {
      str+="@!~%$^&*():<>?/|{}";
    }
    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,number,charAllow,setPassword])
  //in above setpassword likhna compulsory nhi h 
  //y hm memoize mans cache memory m store kerne k liye use ker sakte h result ko
  //useEffect array and above array have no relation both have different function

  useEffect(()=>{
    passwordGenerator()
  },[length,number,charAllow,passwordGenerator])
//yha hmne y element liye h keoki unme kuch vi change hoga to reload ho jaega page

 
  return (
    <div>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-2 py-8 pt-2 my-8 text-orange-500 bg-red-600'>
    <div className="text-2xl text-center text-white m-2">
     Password Generator
    </div>
      <div className='flex shadow rounded-lg overflow-hidden mb-7 '>
      <input 
      type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordref}

      />
      <button onClick={copypassword} className='bg-blue-700 text-white outline-none px-3 py-1 shrink-0'>Copy</button>

      </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
       <input
       type="range"
       min={1}
       max={99}
       value={length}
       className='cursor-pointer'
       onChange={(e)=>{setLength(e.target.value)}}
       />
       <label className='text-green-500'>Length={length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
       <input
       type='checkbox'
       defaultChecked={number}
       onChange={()=>
        setNumber((prev)=>!prev)
       }
       />
       <label className='text-green-500'>Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
       <input
      type='checkbox'
      defaultChecked={charAllow}
      onChange={()=>
        setCharAllow((prev)=>!prev)
      }
       />
       <label className='text-green-500'>Character</label>
      </div>
    </div>
    </div>
    </div>
    
  );
}

export default App;
