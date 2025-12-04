import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import ContactInfoGrid from "../sections/contact/ContactInfoGrid";
import ContactForm from "../sections/contact/ContactForm";
import { LuDownload, LuArrowRight } from "react-icons/lu";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <SectionTitle
              title={
                <>
                  Let's Build Something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">
                    Amazing
                  </span>{" "}
                  Together
                </>
              }
              subtitle="Have a project in mind? Let's discuss how we can bring your ideas to life"
            />
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Got a project idea, collaboration opportunity, or just want to say hello? 
            I'd love to hear from you. I'm currently available for freelance projects 
            and full-time opportunities.
          </motion.p>

          {/* Download Resume Button */}
          <motion.div variants={itemVariants}>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand/10 to-brand-dark/10 hover:from-brand/20 hover:to-brand-dark/20 border border-brand/30 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-brand/20 transition-all duration-300 group"
            >
              <LuDownload className="text-xl" />
              Download Resume
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-gray-500 text-sm mt-2">PDF • 2.4 MB</p>
          </motion.div>
        </motion.div>

        {/* Contact Info Grid */}
        <div className='flex flex-col md:flex-row gap-6'>
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              Get in Touch
            </h3>
            <ContactInfoGrid />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex-1'
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
        {/* FAQ/Additional Info */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-gray-400"
        >
          <p className="text-sm">
            <span className="text-brand font-semibold">Response Time:</span>{" "}
            Usually within 24 hours
          </p>
          <p className="text-sm mt-1">
            <span className="text-brand font-semibold">Availability:</span>{" "}
            Open to full-time positions and freelance projects
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;