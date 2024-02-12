import React, { useRef, useState } from 'react'
import { Header } from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { updateProfile } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BG_URL } from '../utils/constants'
export const Login = () => {

  const [isSignIn,setIsSignIn] = useState(true);

  const [ErrorMessage, setErrorMessage] = useState(null)


    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null);
    const dispatch = useDispatch();
  const handleButtonClick = ()=> {
    //validate form data.
  const message =   checkValidData(email.current.value,password.current.value)
  setErrorMessage(message)
//to get value of email and password, we can use statevariables and can track that data or we can use useRef() hook for that.

  if(message) return;

  if(!isSignIn){
   createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/91929770?v=4"
    }).then(() => {
      // Profile updated!
      // ...
      const {uid,email,displayName, photoURL} = auth.currentUser;//fetch from updated value 
      dispatch(addUser({uid:uid, email: email, displayName:displayName, photoURL:photoURL}))
  
   
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMessage(error.message)
    });
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +"-"+ errorMessage)
  });
  }
  else {
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +"-"+ errorMessage)
  });
  }

  }
  
  const toggleSignInForm = ()=>{
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
       <Header/>

       <div className='absolute'>
       <img src={BG_URL}
 alt="logo"/>
 </div>
 {//generally when clicking sign in or sign up button for submits automaticaly by default.to avoid that we use that onsubmit thing. onSubmit={(e)=>{e.preventDefault()}}   remember this for further usage.

}
<form onSubmit={(e)=>{e.preventDefault()}} className='w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-85 rounded-lg' >
  
  <h1 className='font-bold text-3xl py-4'>{isSignIn?"Sign In":"Sign Up"}</h1>
{
  !isSignIn && (<input ref = {name} type = "text" placeholder='Full Name' className='my-4 p-4 w-full bg-gray-800 rounded-lg'/>)
}
  
  <input ref = {email} type = "text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-800 rounded-lg'/>

  <input ref= {password} type = "password" placeholder='Password' className='my-4 p-4 w-full bg-gray-800 rounded-lg'/>

  <p className='text-red-500 font-bold text-lg py-2'>{ErrorMessage}</p>

  <button className='my-6 p-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignIn?"Sign In":"Sign Up"}</button>

  <p className='p-4 cursor-pointer'onClick={toggleSignInForm}> {isSignIn?"New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"}</p>
</form>
    </div>

  )
}
