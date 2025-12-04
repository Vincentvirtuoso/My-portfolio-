import React from "react";
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import profile from "../../assets/images/profiles/test-profile.webp";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";
import { FaCircle } from "react-icons/fa";

const Hero = () => {
  const naviagte = useNavigate()
  return (
    <header className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col flex-1"
      >
        <h1 className="text-4xl lg:text-5xl font-bold leading-snug">
          Hi, I'm{" "}
          <span className="text-brand">
            Felix Vincent
          </span>
          <br />
          Full-Stack Developer & Web3 Engineer
        </h1>

        <p className="mt-4 text-secondary-foreground max-w-lg leading-relaxed">
          I build scalable, high-performance digital products—from frontend
          experiences to backend systems and Web3 integrations.
        </p>

        <div className="mt-6 text-sm space-y-2">
          <p className="flex items-center gap-2 text-secondary-foreground">
            <LuMapPin /> Lagos, Nigeria
          </p>
          <p className="flex items-center gap-2 text-secondary-foreground">
            <FaCircle className="text-[7px] text-emerald-500" />
            Available for new projects
          </p>
          <p className="flex items-center gap-2 text-secondary-foreground">
            <LuMail /> vincentvirtuoso66@gmail.com
          </p>
          <p className="flex items-center gap-2 text-secondary-foreground">
            <LuPhone /> +234 708 348 4603
          </p>
        </div>

        <div className="mt-7 flex gap-4">
          <button className="bg-brand text-gray-100 px-6 py-2 rounded-xl hover:bg-brand-dark transition">
            Hire Me
          </button>
          <button 
          className="border border-input px-6 py-2 rounded-xl hover:bg-gray-700 hover:text-white transition"
          onClick={()=>naviagte('/projects')}>
            View Projects
          </button>
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-full border-4 border-brand w-48 h-48 lg:w-64 lg:h-64 overflow-hidden shadow-2xl"
      >
        <img
          src={profile}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </header>
  );
};

export default Hero;
