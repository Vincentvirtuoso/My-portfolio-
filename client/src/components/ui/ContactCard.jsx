import React from "react";
import { motion } from "framer-motion";

const ContactCard = ({ icon: Icon, label, value, href }) => (
  <motion.a
    href={href}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-border rounded-2xl hover:border-brand hover:bg-gradient-to-br hover:from-brand/10 hover:to-transparent transition-all duration-300 group flex-1 min-w-0"
  >
    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand/10 to-brand-dark/10 group-hover:from-brand/30 group-hover:to-brand-dark/30">
      <Icon className="text-2xl text-brand group-hover:scale-110 transition-transform" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-muted-foreground font-medium truncate">{value}</p>
    </div>
  </motion.a>
);

export default ContactCard;