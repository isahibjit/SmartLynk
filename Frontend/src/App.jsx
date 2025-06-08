import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpPage from './pages/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'
import Login from './pages/Login'
import UpdateProfilePicture from './pages/UpdateProfilePicture'

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <AppLayout />,
      children : [
        {
          path : "/signup",
          element : <SignUpPage />
        },
        {
          path : "/login",
          element : <Login />
        },
        {
          path : "/update-profile",
          element : <UpdateProfilePicture />
        }
      ]
    }
  ])

  return (
    <>
        <RouterProvider router={router}
        future={{v7_startTransition : true}}
        />
    
    </>
  )
}

export default App
