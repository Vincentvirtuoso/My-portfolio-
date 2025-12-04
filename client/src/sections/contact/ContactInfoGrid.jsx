import React from "react";
import ContactCard from "../../components/ui/ContactCard";
import { LuMail, LuPhone, LuLinkedin, LuGithub, LuTwitter, LuMapPin } from "react-icons/lu";

const ContactInfoGrid = () => {
  const info = [
    {
      icon: LuMail,
      label: "Email",
      value: "felixvincent.dev@gmail.com",
      href: "mailto:felixvincent.dev@gmail.com",
    },
    {
      icon: LuPhone,
      label: "Phone",
      value: "+234 901 234 5678",
      href: "tel:+2349012345678",
    },
    {
      icon: LuTwitter,
      label: "Twitter",
      value: "@Splendid02",
      href: "https://x.com/Splendid02",
    },
    {
      icon: LuLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/felixvincent",
      href: "https://linkedin.com/in/felixvincent",
    },
    {
      icon: LuGithub,
      label: "GitHub",
      value: "github.com/felixvincent",
      href: "https://github.com/felixvincent",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mb-12">
      {info.map((item, i) => (
        <ContactCard key={i} {...item} />
      ))}
    </div>
  );
};

export default ContactInfoGrid;