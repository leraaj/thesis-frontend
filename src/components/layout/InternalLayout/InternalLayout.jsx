import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const InternalLayout = ({ routes }) => {
  return (
    <div>
      <Navbar routes={routes} />
      <div className="container-fluid d-flex flex-row">
        <Outlet />
      </div>
    </div>
  );
};

export default InternalLayout;
