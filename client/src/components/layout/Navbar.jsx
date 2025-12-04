import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuCodeXml, LuMenu, LuExternalLink, LuSun, LuMoon } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import useToggleState from "../../hooks/useToggleState";

const links = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const NavbarDropdown = ({ onClose, theme }) => (
  <>
    {/* Background Overlay */}
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 sm:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />

    {/* Dropdown Menu */}
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -5, opacity: 0 }}
      className={`fixed right-4 top-18 w-44 rounded-xl backdrop-blur-xl p-2 shadow-lg border z-10 sm:hidden
        ${theme === 'dark' 
          ? 'bg-black/30 border-white/10' 
          : 'bg-white/20 border-gray-200/20'
        }`}
    >
      {links.map(({ label, to }) => (
        <NavLink
          key={label}
          to={to}
          className={`block px-4 py-2 text-sm rounded-lg transition
            ${theme === 'dark' 
              ? 'text-gray-200 hover:bg-white/10 hover:text-brand' 
              : 'text-gray-900 hover:bg-black/10 hover:text-gray-100'
            }`}
          onClick={onClose}
        >
          {label}
        </NavLink>
      ))}
    </motion.div>
  </>
);

const ThemeToggler = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-card transition-all duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 0 : 1,
            opacity: theme === "dark" ? 0 : 1,
          }}
          className="absolute inset-0"
        >
          <LuSun className="w-full h-full text-amber-500" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 0 : 1,
            opacity: theme === "light" ? 0 : 1,
          }}
          className="absolute inset-0"
        >
          <LuMoon className="w-full h-full text-brand" />
        </motion.div>
      </div>
    </button>
  );
};

const Navbar = () => {
  const { state: showMenu, toggle } = useToggleState(false);
  const { pathname } = useLocation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showMenu) toggle(false);
  }, [pathname]);


  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`
          sticky top-3 z-30 mx-2 px-4 py-2 rounded-2xl
          backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          flex items-center justify-between
          ${theme === 'dark' 
            ? 'bg-black/20 border-white/10' 
            : 'bg-white/10 border-gray-200/20'
          }
        `}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <LuCodeXml className={`text-2xl ${theme === 'dark' ? 'text-brand' : 'text-brand-dark'}`} />
          <span className={`font-semibold hidden sm:block ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Splendid.dev
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={`relative transition text-sm
                ${theme === 'dark' 
                  ? 'text-gray-300 hover:text-foregroud' 
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-[-3px] left-0 right-0 h-[2px] bg-brand rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ThemeToggler />

          <button
            className={`
              bg-gradient-to-r from-brand to-brand-dark 
              py-1.5 px-4 rounded-lg text-sm 
              flex items-center gap-2 shadow-lg
              hover:scale-105 transition
              ${theme === 'dark' 
                ? 'text-gray-100' 
                : 'text-white'
              }
            `}
          >
            Book a call <LuExternalLink className="text-xs" />
          </button>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <LuMenu
              className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}
              onClick={() => toggle()}
            />
          </div>
        </div>

      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {showMenu && <NavbarDropdown onClose={() => toggle(false)} theme={theme} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;