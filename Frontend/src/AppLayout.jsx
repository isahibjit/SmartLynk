import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const {theme} = useSelector((state)=>state.theme)
  return (
    <div  data-theme={theme}>
      <Navbar />
      
        <Outlet />
      
    </div>
  );
};

export default AppLayout;
