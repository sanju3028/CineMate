import React, { useEffect } from 'react'
import { Login } from './Login'
import { Browse } from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

export const Body = () => {
  const dispatch = useDispatch()
//use to navigate 
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/browse",
      element: <Browse/>
    },
  ])


  // to update store we can create actions after then keyword(promise)  because if we create manually we need to create more number of times, while signin, signup, signout etc.. so to avoid that we use firebase feature(API), onAuthStateChanged , it generally comes into action when authentication stage changes(change in auth state). we want to call it once, so we use useEffect.
  useEffect(()=>{

      onAuthStateChanged(auth, (user) => {
         if (user) {
    
    const {uid,email,displayName, photoURL} = user;
    dispatch(addUser({uid:uid, email: email, displayName:displayName, photoURL:photoURL}))


    }      else {
    // User is signed out
    dispatch(removeUser())
   //we cannot use navigate() outside RouterProvider, like re-direction should be done only between children. here body is a parent-level component. so it won't work. one solution can be using window.location.href some kind of stuff(check it) or we can take our routing to app.js page and make it out of body component. or we can nagivate from some other place for the same thing. in login page, when successful login is happen, we use navigate there. 
  }
});  
  },[])
  return (
    <div>
       <RouterProvider router={appRouter}>


        </RouterProvider>



    </div>
  )
}
