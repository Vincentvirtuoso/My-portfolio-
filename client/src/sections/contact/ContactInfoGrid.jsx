import React from "react";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuLinkedin,
  LuGithub,
  LuTwitter,
} from "react-icons/lu";
import ContactCard from "../../components/ui/ContactCard";

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
      label: "twitter",
      value: "Lagos, Nigeria",
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
    <div className="flex gap-4 mb-6">
      {info.map((item, i) => (
        <ContactCard {...item} key={i} />
      ))}
    </div>
  );
};

export default ContactInfoGrid;
