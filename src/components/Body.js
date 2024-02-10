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
  
  return (
    <div>
       <RouterProvider router={appRouter}>


        </RouterProvider>



    </div>
  )
}
