import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-primary/10">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
