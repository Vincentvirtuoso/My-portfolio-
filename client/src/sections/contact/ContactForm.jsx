import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { LuCircleCheck, LuCircleX, LuLoader } from "react-icons/lu";

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    try {
      await emailjs.sendForm(
        "service_vhswrsr",
        "template_ikiu6sm",
        formRef.current,
        "4ubHRSCLLzUzwVW8l"
      );

      setStatus({
        state: "success",
        message: "Message sent successfully!",
      });
      formRef.current.reset();
      setTimeout(() => setStatus({ state: "idle", message: "" }), 3000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus({
        state: "error",
        message: "Failed to send message. Please try again later.",
      });
      setTimeout(() => setStatus({ state: "idle", message: "" }), 4000);
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={sendEmail}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative max-w-2xl mx-auto bg-white/5 border border-gray-600/40 p-6 rounded-xl space-y-4 overflow-hidden"
    >
      {/* --- Inputs --- */}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="user_name"
          required
          className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="user_email"
          required
          className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          name="message"
          rows="5"
          required
          className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand resize-none"
        />
      </div>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        disabled={status.state === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand/90 transition disabled:opacity-60"
      >
        {status.state === "loading" ? (
          <>
            <LuLoader className="animate-spin text-lg" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {/* --- Toast Notification --- */}
      <AnimatePresence>
        {status.state !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium shadow-lg ${
              status.state === "success"
                ? "bg-green-500/20 text-green-400 border border-green-500/40"
                : status.state === "error"
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 shrink-0">
              {status.state === "success" && <LuCircleCheck />}
              {status.state === "error" && <LuCircleX />}
              <span>{status.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default ContactForm;
