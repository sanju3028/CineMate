import React from 'react'
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';
export const Header = () => {
const navigate = useNavigate()
const user = useSelector((store) => store.user)
  const handleSignOut = ()=> {
    signOut(auth).then(() => {
      // Sign-out successful.
     
    }).catch((error) => {
      // An error happened.
      navigate("/error")

    });
  }
  const dispatch = useDispatch()
  useEffect(()=>{

   const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (user) {
  
  const {uid,email,displayName, photoURL} = user;
  dispatch(addUser({uid:uid, email: email, displayName:displayName, photoURL:photoURL}))

  navigate("/browse")
  }      else {
  // User is signed out
  dispatch(removeUser())
 //we cannot use navigate() outside RouterProvider, like re-direction should be done only between children. here body is a parent-level component. so it won't work. one solution can be using window.location.href some kind of stuff(check it) or we can take our routing to app.js page and make it out of body component. or we can nagivate from some other place for the same thing. in login page, when successful login is happen, we use navigate there. 
 navigate("/")
}
});  
//this will be called when component unmounts.
  return ()=> {
    unsubscribe()
  }
},[])
  return (
    
    <div className='absolute  w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>

    <img  className='w-44' alt="logo" src={LOGO}/>

   
  { user && <div className='flex p-2'>
    <img  className='w-12 h-12 ' src = {USER_AVATAR} alt = "user-icon"></img>
    <button onClick={handleSignOut} className='font-bold text-white p-4'>Sign Out</button>
   </div> } 
   </div> 
  )
}
