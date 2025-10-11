import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuCodeXml, LuExternalLink, LuMenu, LuRocket } from "react-icons/lu";
import ThemeToggler from "../common/ThemeToggler";
import { motion, AnimatePresence } from "framer-motion";
import useToggleState from "../../hooks/useToggleState";

const links = [
  // { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];
const NavbarDropdown = ({ onClose }) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/55 -z-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -5, opacity: 0 }}
        className="absolute flex flex-col bg-gray-100 top-[140%] w-40 rounded-lg p-1 z-2 gap-1"
      >
        <NavLink
          to="/"
          className="py-2.5 text-gray-600 px-4 text-gray-300 hover:bg-gray-300 duration-400 transition-all navs-dropdown text-sm"
        >
          Home
        </NavLink>
        {links.map(({ label, to }) => (
          <NavLink
            to={to}
            className="py-2.5 text-gray-600 px-4 text-gray-300 hover:bg-gray-300 duration-400 transition-all text-sm navs-dropdown"
            key={label}
          >
            {label}
          </NavLink>
        ))}
      </motion.div>
    </>
  );
};

const Navbar = () => {
  // const [showMenu, setShowMenu] = useState(false);
  const { state: showMenu, toggle } = useToggleState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (showMenu) {
      toggle(false);
    }
  }, [pathname]);

  return (
    <div className="flex justify-between items-center p-1.5 bg-slate-700 border-2 border-gray-100/10 rounded-[10px] mb-4 lg:mb-7 sticky top-2 mx-2 z-20">
      <div className="hidden sm:flex items-center gap-1">
        <NavLink to="/">
          <LuCodeXml className="text-2xl text-brand mx-4" />
        </NavLink>
        {links.map(({ label, to }) => (
          <NavLink
            to={to}
            className="py-1.5 px-6 text-gray-300 border-b-2 border-transparent hover:text-white duration-400 transition-all navs text-sm"
            key={label}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div className="block sm:hidden relative">
        <LuMenu
          className="text-lg cursor-pointer hover:text-white"
          onClick={() => toggle()}
        />
        <AnimatePresence>
          {showMenu && <NavbarDropdown onClose={() => toggle(false)} />}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggler />
        <button className="bg-brand text-sm text-gray-100 py-1.5 px-3.5 rounded-lg flex gap-3 items-center whitespace-nowrap">
          Book a call <LuExternalLink />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
