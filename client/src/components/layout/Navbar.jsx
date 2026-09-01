import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LuCodeXml,
  LuMenu,
  LuX,
  LuArrowUpRight,
  LuSun,
  LuMoon,
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import useToggleState from "../../hooks/useToggleState";
import { useTheme } from "./ThemeContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const NavbarDropdown = ({ onClose }) => (
  <>
    <motion.div
      className="fixed inset-0 bg-black/50 z-10 sm:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />

    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="fixed right-3 top-[4.25rem] w-48 rounded-xl border border-border bg-card shadow-xl z-10 sm:hidden overflow-hidden"
    >
      {links.map(({ label, to }, i) => (
        <NavLink
          key={label}
          to={to}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm transition-colors ${
              i !== links.length - 1 ? "border-b border-border/60" : ""
            } ${
              isActive
                ? "text-brand font-medium"
                : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.03]"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </motion.div>
  </>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative w-8 h-8 rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
    >
      <span className="relative w-4 h-4 block">
        <motion.span
          className="absolute inset-0"
          animate={{
            opacity: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? -90 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <LuSun className="w-full h-full" />
        </motion.span>
        <motion.span
          className="absolute inset-0"
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <LuMoon className="w-full h-full" />
        </motion.span>
      </span>
    </button>
  );
};

const Navbar = () => {
  const { state: showMenu, toggle } = useToggleState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (showMenu) toggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <LuCodeXml className="text-xl text-brand" strokeWidth={2} />
            <span className="font-semibold text-sm tracking-tight text-foreground">
              Splendid<span className="text-brand">.dev</span>
            </span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className="relative px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-3 right-3 -bottom-px h-[2px] bg-brand rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <NavLink
              to="/book-call"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-brand text-white py-2 px-4 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Book a call
              <LuArrowUpRight className="text-sm" strokeWidth={2} />
            </NavLink>

            <button
              className="sm:hidden w-8 h-8 flex items-center justify-center text-foreground/80"
              onClick={() => toggle()}
              aria-label="Toggle menu"
            >
              {showMenu ? (
                <LuX className="text-xl" />
              ) : (
                <LuMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showMenu && <NavbarDropdown onClose={() => toggle(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
