import React from "react";
import SectionTitle from "../components/common/SectionTitle";
import { motion } from "framer-motion";
import ContactInfoGrid from "../sections/contact/ContactInfoGrid";
import ContactForm from "../sections/contact/ContactForm";
import { LuDownload } from "react-icons/lu";

const Contact = () => {
  return (
    <section>
      <motion.div
        className="text-center max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle
          title={
            <>
              Let's <span className="text-brand italic">Work</span> Together
            </>
          }
        />
        <p className="text-gray-400 text-lg">
          Got a project idea, collaboration, or just want to say hello? I'd love
          to hear from you. Drop a message below — I usually reply within 24
          hours.
        </p>
      </motion.div>
      <ContactInfoGrid />
      <button className="flex items-center px-4 py-2 bg-gray-500/10 border-2 border-gray-400/30 text-sm gap-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-500/30">
        <LuDownload className="text-xl w-5 h-5 shrink-0" /> Download Resume
      </button>

      <ContactForm />
    </section>
  );
};

export default Contact;
