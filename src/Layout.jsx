import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div className="flex">
      <NavBar />
      <div className="pl-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
