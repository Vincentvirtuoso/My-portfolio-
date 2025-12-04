import React from "react";
import { motion } from "framer-motion";
import { LuCode, LuServer, LuGlobe } from "react-icons/lu";

const services = [
  {
    icon: LuCode,
    title: "Frontend Engineering",
    text: "Beautiful, fast, and responsive interfaces using React, Tailwind, and modern UI patterns."
  },
  {
    icon: LuServer,
    title: "Backend & APIs",
    text: "Secure, scalable backend systems using Node.js, Express, and MongoDB."
  },
  {
    icon: LuGlobe,
    title: "Web3 Development",
    text: "Smart contract development, decentralized apps, and blockchain integrations."
  }
];

const Services = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-100 mb-8">
        What I Do
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md 
            hover:bg-white/10 transition"
          >
            <Icon className="text-brand text-3xl mb-4" />
            <h3 className="text-gray-100 font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
