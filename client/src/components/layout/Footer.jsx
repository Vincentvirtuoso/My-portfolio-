import React from "react";
import { LuCopyright } from "react-icons/lu";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      href: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      href: "https://linkedin.com/in/yourusername",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      href: "https://twitter.com/yourhandle",
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      href: "mailto:youremail@example.com",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-black text-gray-400 border-t border-gray-800 py-10 px-5 flex flex-col items-center gap-6">
      <h3>Splend Dev</h3>
      {/* Divider */}
      <div className="w-24 h-[1px] bg-gray-700 my-4" />

      {/* Social Icons */}
      <motion.div
        className="flex gap-5"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {socials.map(({ name, icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-gray-400 hover:text-brand transition-colors duration-300 text-lg"
          >
            {icon}
          </a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 text-sm text-gray-500"
      >
        <LuCopyright className="text-base" />
        <span>
          {new Date().getFullYear()}{" "}
          <span className="text-brand font-semibold">Felix Vincent</span> — All
          Rights Reserved
        </span>
      </motion.div>

      {/* Subtle Glow Accent */}
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0" />
    </footer>
  );
};

export default Footer;
