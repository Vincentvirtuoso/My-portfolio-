import { motion, AnimatePresence } from "framer-motion";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "./ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="
        flex h-9 w-9 items-center justify-center
        rounded-full
        text-muted-foreground
        transition-colors
        hover:bg-card
        hover:text-foreground
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? (
            <LuMoon size={17} />
          ) : (
            <LuSun size={17} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};