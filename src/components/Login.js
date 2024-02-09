import React, { useState } from 'react'
import { Header } from './Header'
export const Login = () => {

  const [isSignIn,setIsSignIn] = useState(true);
  const toggleSignInForm = ()=>{
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
       <Header/>

       <div className='absolute'>
       <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
 alt="logo"/>
 </div>
<form className='w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-85' >
  <h1 className='font-bold text-3xl py-4'>{isSignIn?"Sign In":"Sign Up"}</h1>
{
  !isSignIn && (<input type = "text" placeholder='Full Name' className='my-4 p-4 w-full bg-gray-800 rounded-lg'/>)
}
  
  <input type = "text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-800 rounded-lg'/>
  <input type = "password" placeholder='Password' className='my-4 p-4 w-full bg-gray-800 rounded-lg'/>
  <button className='my-6 p-4 bg-red-700 w-full rounded-lg'>{isSignIn?"Sign In":"Sign Up"}</button>
  <p className='p-4 cursor-pointer'onClick={toggleSignInForm}> {isSignIn?"New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}</p>
</form>
    </div>

  )
}
