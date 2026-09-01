import { AnimatePresence, motion } from "framer-motion";
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
        transition-colors duration-200
        hover:bg-card
        hover:text-foreground
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand/40
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{
            opacity: 0,
            scale: 0.75,
            rotate: isDark ? -20 : 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            rotate: isDark ? 20 : -20,
          }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex"
        >
          {isDark ? (
            <LuMoon
              size={17}
              strokeWidth={1.8}
            />
          ) : (
            <LuSun
              size={17}
              strokeWidth={1.8}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggler;