import React, { useRef, useEffect, useState } from "react";
import {
  SiFigma,
  SiVite,
  SiNpm,
  SiGit,
  SiGithub,
  SiDocker,
  SiRender,
  SiVercel,
  SiWebstorm,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { motion, useAnimation } from "framer-motion";

const Tools = () => {
  const tools = [
    { icon: SiFigma, label: "Figma" },
    { icon: SiWebstorm, label: "Webstorm" },
    { icon: DiVisualstudio, label: "VS Code" },
    { icon: SiVite, label: "Vite" },
    { icon: SiNpm, label: "NPM" },
    { icon: SiGit, label: "Git" },
    { icon: SiGithub, label: "GitHub" },
    { icon: SiDocker, label: "Docker" },
    { icon: SiRender, label: "Render" },
    { icon: SiVercel, label: "Vercel" },
  ];

  const containerRef = useRef(null);
  const controls = useAnimation();
  const [width, setWidth] = useState(0);

  // Measure width dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const totalWidth = containerRef.current.scrollWidth / 2; // half (because duplicated)
    setWidth(totalWidth);

    const resizeObserver = new ResizeObserver(() => {
      const newWidth = containerRef.current.scrollWidth / 2;
      setWidth(newWidth);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Animate continuously
  useEffect(() => {
    if (width > 0) {
      const animateScroll = async () => {
        await controls.start({
          x: [-width, 0],
          transition: {
            duration: width / 40, // speed factor — adjust for slower/faster scroll
            ease: "linear",
            repeat: Infinity,
          },
        });
      };
      animateScroll();
    }
  }, [width, controls]);

  return (
    <div className="relative overflow-hidden w-full py-3 mt-8 rounded-sm">
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex gap-8 items-center whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {[...tools, ...tools].map((tool, index) => (
          <div
            key={index}
            className="flex gap-2 items-center text-md hover:scale-110 transition-transform duration-300 cursor-default"
          >
            <tool.icon className="text-brand-dark" />
            <span>{tool.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Gradient edge fades for premium look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/40 dark:from-[#0f0f0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/40 dark:from-[#0f0f0f] to-transparent" />
    </div>
  );
};

export default Tools;
