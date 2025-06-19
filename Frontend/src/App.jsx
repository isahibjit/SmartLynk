import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUp";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "./pages/Login";
import UpdateProfilePicture from "./pages/UpdateProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authSlice";
import HomePage from "./pages/HomePage";
import { connectSocket } from "./redux/socketActions";

function App() {
  const dispatch = useDispatch();
  const { authUser, isSigningUp, isLoggingIn, isCheckingAuth, onlineUsers } =
    useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  useEffect(() => {
    if(authUser){
      dispatch(connectSocket());
    }
  }, [authUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: authUser ? <HomePage /> : <Navigate to="/login" />,
        },
        {
          path: "/signup",
          element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !authUser ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/update-profile",
          element: authUser ? (
            <UpdateProfilePicture />
          ) : (
            <Navigate to="/login" />
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
