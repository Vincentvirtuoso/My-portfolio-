import React from "react";
import { motion } from "framer-motion";

const ContactCard = ({ icon: Icon, href }) => (
  <motion.a
    href={href}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-4 border border-gray-600/50 rounded-lg hover:border-brand hover:bg-brand/5 transition-all duration-300 group"
  >
    <div className="group-hover:text-brand text-xl p-3 rounded-full">
      <Icon />
    </div>
  </motion.a>
);

export default ContactCard;
