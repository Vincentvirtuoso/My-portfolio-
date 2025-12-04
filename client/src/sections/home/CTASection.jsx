import React from "react";
import { useNavigate } from 'react-router-dom'
import { LuArrowRight } from "react-icons/lu";

const CTASection = () => {
  const naviagte = useNavigate()
  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold text-accent-foreground mb-4">
        Let's Build Something Great Together
      </h2>
      <p className="text-gray-400 mb-6">
        Have a project in mind? I'm available and ready to collaborate.
      </p>

      <button 
      onClick={()=>naviagte('/contact')}
      className="bg-brand text-white px-8 py-3 rounded-xl flex items-center gap-3 mx-auto hover:bg-brand-dark transition cursor-pointer">
        Contact Me <LuArrowRight />
      </button>
    </div>
  );
};

export default CTASection;
