import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 lg:p-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
