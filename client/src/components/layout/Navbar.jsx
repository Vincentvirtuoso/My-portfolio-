import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LuCodeXml,
  LuMenu,
  LuExternalLink,
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import useToggleState from "../../hooks/useToggleState";
import ThemeToggler from "./ThemeToggler";

const links = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const NavbarDropdown = ({ onClose }) => (
  <>
    {/* Backdrop */}
    <motion.button
      type="button"
      aria-label="Close menu"
      className="
        fixed inset-0 z-40
        bg-background/60
        backdrop-blur-sm
        sm:hidden
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />

    {/* Dropdown */}
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
      className="
        fixed right-3 top-[4.5rem] z-50
        w-52
        rounded-xl
        border border-border
        bg-background/95
        p-1.5
        shadow-xl
        backdrop-blur-xl
        sm:hidden
      "
    >
      {links.map(({ label, to }) => (
        <NavLink
          key={label}
          to={to}
          onClick={onClose}
          className={({ isActive }) => `
            flex items-center
            rounded-lg
            px-3.5 py-2.5
            text-sm
            transition-colors
            ${
              isActive
                ? "bg-brand/10 text-brand"
                : "text-muted-foreground hover:bg-card hover:text-foreground"
            }
          `}
        >
          {label}
        </NavLink>
      ))}

      <div className="my-1.5 h-px bg-border" />

      <NavLink
        to="/book-call"
        onClick={onClose}
        className="
          flex items-center justify-between
          rounded-lg
          px-3.5 py-2.5
          text-sm
          text-brand
          transition-colors
          hover:bg-brand/10
        "
      >
        Book a call
        <LuExternalLink size={14} />
      </NavLink>
    </motion.div>
  </>
);

const Navbar = () => {
  const { state: showMenu, toggle } = useToggleState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (showMenu) {
      toggle(false);
    }
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          sticky top-3 z-30
          mx-3
          flex items-center justify-between
          rounded-xl
          border border-border/70
          bg-background/80
          px-3 py-2
          shadow-sm
          backdrop-blur-xl
          sm:mx-5 sm:px-4
        "
      >
        {/* Brand */}
        <NavLink
          to="/"
          className="
            group flex items-center gap-2
            rounded-lg
            px-1.5 py-1
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand/40
          "
        >
          <LuCodeXml
            size={21}
            strokeWidth={1.8}
            className="
              text-brand
              transition-transform duration-300
              group-hover:-rotate-6
            "
          />

          <span className="
            hidden
            text-sm
            font-semibold
            tracking-tight
            text-foreground
            sm:block
          ">
            Splendid.dev
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 sm:flex">
          {links.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="
                relative
                py-2
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              {({ isActive }) => (
                <>
                  {label}

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="
                        absolute
                        -bottom-0.5
                        left-0 right-0
                        h-px
                        bg-brand
                      "
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggler />

          <NavLink
            to="/book-call"
            className="
              ml-1
              hidden items-center gap-1.5
              rounded-lg
              bg-brand
              px-3.5 py-2
              text-xs font-medium
              text-brand-foreground
              shadow-sm
              transition-all duration-200
              hover:bg-brand-hover
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand/40
              sm:flex
            "
          >
            Book a call
            <LuExternalLink size={13} />
          </NavLink>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label={showMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={showMenu}
            onClick={() => toggle()}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              text-muted-foreground
              transition-colors
              hover:bg-card
              hover:text-foreground
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand/40
              sm:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={showMenu ? "close" : "menu"}
                initial={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.8,
                }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <LuMenu size={20} strokeWidth={1.8} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showMenu && (
          <NavbarDropdown
            onClose={() => toggle(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;