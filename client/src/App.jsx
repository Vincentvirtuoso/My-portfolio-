import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="py-8 px-6 lg:p-6 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
