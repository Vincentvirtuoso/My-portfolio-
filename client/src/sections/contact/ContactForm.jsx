import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { LuCircleCheck, LuCircleX, LuLoader, LuSend } from "react-icons/lu";

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    // Simple validation
    if (
      !formData.user_name.trim() ||
      !formData.user_email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        state: "error",
        message: "Please fill in all fields"
      });
      return;
    }

    try {
      await emailjs.sendForm(
        "service_vhswrsr",
        "template_ikiu6sm",
        formRef.current,
        "4ubHRSCLLzUzwVW8l"
      );

      setStatus({
        state: "success",
        message: "Message sent successfully! I'll get back to you soon."
      });

      setFormData({ user_name: "", user_email: "", message: "" });

      setTimeout(() => setStatus({ state: "idle", message: "" }), 4000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus({
        state: "error",
        message: "Failed to send message. Please try again later or email directly."
      });
      setTimeout(() => setStatus({ state: "idle", message: "" }), 4000);
    }
  };

  const formElement = [
    { label: 'Your Name', value: formData.user_name, name: 'user_name', type: 'text' },
    { label: 'Your Email Address', value: formData.user_email, name: 'user_email', type: 'email', placeholder: 'john@example.com' },
  ]

  const FormInput = ({ label='', value, name, type="text", required, placeholder='John Doe'}) => {
    return (
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          {label} {required && <span className='text-red-400'>*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e)=>handleChange(e)}
          // disabled={status.state === "loading"}
          required={required}
          className="w-full px-4 py-3 text-sm bg-secondary border border-input rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 text-foreground placeholder-gray-500 transition-all duration-300"
          placeholder={placeholder}
        />
      </div>
    )
  }

  return (
    <div className="relative flex-1">
      <motion.form
        ref={formRef}
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-card backdrop-blur-sm border border-gray-700/30 p-6 mb-6 rounded-2xl space-y-6 shadow-2xl shadow-black/20"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">Send a Message</h3>
          <p className="text-gray-400">Fill out the form below and I'll get back to you ASAP</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {formElement.map(form => 
            <FormInput key={form.name} required {...form} />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Your Message <span className='text-red-400'>*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={status.state === "loading"}
            rows="6"
            required
            className="w-full h-30 p-4 bg-secondary border border-input rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 text-foregroud placeholder-gray-500 resize-none transition-all duration-300"
            placeholder="Tell me about your project, timeline, and budget..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={status.state === "loading"}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand to-brand-dark text-white py-3 px-8 rounded-xl font-semibold hover:shadow-xl hover:shadow-brand/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          {status.state === "loading" ? (
            <>
              <LuLoader className="animate-spin text-xl" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <LuSend className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>

      </motion.form>

      {/* Toast Notification */}
      <AnimatePresence>
        {status.state !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring" }}
            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border ${
              status.state === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : status.state === "error"
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  status.state === "success"
                    ? "bg-green-500/20"
                    : status.state === "error"
                    ? "bg-red-500/20"
                    : "bg-yellow-500/20"
                }`}
              >
                {status.state === "success" && <LuCircleCheck className="text-xl" />}
                {status.state === "error" && <LuCircleX className="text-xl" />}
                {status.state === "loading" && <LuLoader className="animate-spin text-xl" />}
              </div>
              <div>
                <p className="font-medium">
                  {status.state === "loading"
                    ? "Sending your message..."
                    : status.message}
                </p>
                {status.state !== "loading" && (
                  <p className="text-sm opacity-75 mt-1">
                    {status.state === "success"
                      ? "You'll hear back within 24 hours"
                      : "Please try again"}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
