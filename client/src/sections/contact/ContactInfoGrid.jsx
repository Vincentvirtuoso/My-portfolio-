import React from "react";
import ContactCard from "../../components/ui/ContactCard";
import { LuMail, LuPhone, LuLinkedin, LuGithub, LuTwitter, LuMapPin } from "react-icons/lu";

const ContactInfoGrid = () => {
  const info = [
    {
      icon: LuMail,
      label: "Email",
      value: "vincentvirtuoso66@gmail.com",
      href: "mailto:vincentvirtuoso66@gmail.com",
    },
    {
      icon: LuPhone,
      label: "Phone",
      value: "+234 708 348 4603",
      href: "tel:+2347083484603",
    },
    {
      icon: LuTwitter,
      label: "Twitter",
      value: "@Vincent022__dev",
      href: "https://x.com/Vincent022__dev",
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
      value: "github.com/Vincentvirtuoso",
      href: "https://github.com/Vincentvirtuoso",
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