import React from "react";
import { LuCopyright } from "react-icons/lu";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      href: "https://github.com/Vincentvirtuoso",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      href: "https://linkedin.com/in/Felixvincent",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      href: "https://twitter.com/Splenddev",
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      href: "mailto:vincentvirtuoso66@gmail.com",
    },
  ];

  return (
    <footer className="relative bg-black/90 backdrop-blur-xl border-t border-white/10 py-10 px-6 flex flex-col items-center text-center">
      {/* Brand */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold tracking-wide text-gray-200"
      >
        Splend Dev
      </motion.h3>

      {/* Accent underline */}
      <div className="mt-1 w-20 h-[2px] bg-gradient-to-r from-brand/0 via-brand to-brand/0 rounded-full" />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 max-w-lg mt-4 text-[15px]"
      >
        Crafting visually appealing, functional, and high-performance digital
        experiences for the modern web.
      </motion.p>

      {/* Socials */}
      <motion.div
        className="flex gap-4 mt-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
        }}
      >
        {socials.map(({ name, icon, href }) => (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand/20 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-md border border-white/10 hover:-translate-y-1 hover:scale-110"
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 text-sm text-gray-500 mt-10"
      >
        <LuCopyright className="text-base" />
        <span>
          {new Date().getFullYear()}{" "}
          <span className="text-brand font-medium">Felix Vincent</span> — All
          Rights Reserved
        </span>
      </motion.div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0" />
    </footer>
  );
};

export default Footer;
