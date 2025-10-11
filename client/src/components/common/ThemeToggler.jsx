import React, { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const ThemeToggler = () => {
  const [mode, setMode] = useState("dark");
  return (
    <div
      className="flex items-center gap-1"
      onClick={() => setMode((p) => (p === "dark" ? "light" : "dark"))}
    >
      <LuSun
        className={`${
          mode === "light" ? "scale-108 text-white duration-300" : ""
        }`}
      />
      <div className="relative h-6 w-10 p-1 bg-brand-light/15 border border-gray-100/30 rounded-full shrink-0">
        <div
          className={`${
            mode === "dark" ? "translate-x-[90%]" : "translate-x-0"
          } h-full w-4 bg-brand rounded-full duration-400`}
        />
      </div>
      <LuMoon
        className={`${
          mode === "dark" ? "scale-108 text-white duration-300" : ""
        }`}
      />
    </div>
  );
};

export default ThemeToggler;
