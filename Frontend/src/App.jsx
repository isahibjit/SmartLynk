import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpPage from './pages/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './AppLayout'

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <AppLayout />,
      children : [
        {
          path : "/signup",
          element : <SignUpPage />
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
