import React from "react";
import { motion } from "framer-motion";

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Vigilo Attendance System",
      text: "A full attendance automation system with geolocation, cron jobs, user roles, and real-time sessions."
    },
    {
      title: "E-Commerce Platform",
      text: "MERN stack store with admin dashboard, payments, product management and cloud hosting."
    },
    {
      title: "Blockchain Voting App",
      text: "A decentralized voting system using Solidity, Web3.js, and secure smart contracts."
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-accent-foreground mb-8">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-xl bg-card border border-input 
            backdrop-blur-md hover:bg-white/10 transition"
          >
            <h3 className="text-accent-foreground font-semibold text-lg mb-3">
              {p.title}
            </h3>
            <p className="text-gray-400 text-sm">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
