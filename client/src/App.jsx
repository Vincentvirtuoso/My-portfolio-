import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 lg:p-6">
        <Outlet />
      </div>
    </>
  );
};

export default App;
