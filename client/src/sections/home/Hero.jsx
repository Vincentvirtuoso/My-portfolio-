import React from "react";
import profile from "../../assets/images/profiles/test-profile.webp";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";
import { FaCircle } from "react-icons/fa";
import SectionTitle from "../../components/common/SectionTitle";

const Hero = () => {
  const profileDetails = [
    { icon: LuMapPin, label: "Lagos, Nigeria" },
    {
      icon: FaCircle,
      label: "Available for new projects",
      iconClass: "text-[10px] text-emerald-500",
    },
    {
      icon: LuMail,
      label: "felixvincent.dev@gmail.com",
    },
    {
      icon: LuPhone,
      label: "+234 708 348 4603",
    },
  ];

  return (
    <header className="flex items-center gap-10 sm:justify-between sm:flex-row flex-col relative overflow-hidden">
      <div className="absolute -right-21 top-2 rotate-35 bg-red-600 w-60 flex gap-1 items-center justify-center py-1">
        <FaCircle className="text-[6px] text-emerald-600" />
        Available
      </div>
      <div className="flex flex-1 flex-col">
        <SectionTitle
          title={
            <>
              Hi, I'm <span className="text-brand">Felix Vincent</span> Full
              Stack Developer
            </>
          }
        />
        <p className="text-gray-300 mb-5 mt-2 text-sm">
          Splendid Developer | Frontend Developer | Backend Developer | Web
          Developer
        </p>
        <div className="space-y-1">
          {profileDetails.map((item) => (
            <p className="flex gap-2 text-gray-300 text-sm items-center">
              <item.icon className={`${item.iconClass}`} />
              {item.label}
            </p>
          ))}
        </div>
      </div>
      <div className="lg:w-60 lg:h-60 w-40 h-40 border-4 border-brand rounded-full">
        <img
          src={profile}
          alt="profile_img"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </header>
  );
};

export default Hero;
