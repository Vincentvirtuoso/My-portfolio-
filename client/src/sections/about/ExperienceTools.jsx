import React from "react";
import { FaReact, FaNodeJs, FaJs, FaPython, FaFigma } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiVite,
  SiNextdotjs,
} from "react-icons/si";
import IconText from "../../components/shared/IconText";

const ExperienceTools = () => {
  const experiences = [
    { icon: "react", label: "React", years: "2.5 years" },
    { icon: "nextjs", label: "Next", years: "1.5 years" },
    { icon: FaNodeJs, label: "Node.js", years: "2 years" },
    { icon: "javascript", label: "JavaScript (ES6+)", years: "4 years" },
    { icon: "html5", label: "HTML5", years: "3.5 years" },
    { icon: SiCss3, label: "CSS3", years: "3 years" },
    { icon: "python", label: "Python", years: "2 years" },
    { icon: "mongodb", label: "MongoDB", years: "1.5 years" },
    { icon: "vite", label: "Vite", years: "1 year" },
    { icon: "figma", label: "Figma (UI Design)", years: "2 years" },
  ];

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-semibold mb-5 text-brand-dark">
        Tools & Years of Experience
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white/5 cursor-default p-3 border-2 border-gray-500/50 rounded-md transition-shadow duration-300"
          >
            <IconText
              icon={
                typeof exp.icon === "string"
                  ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${exp.icon}/${exp.icon}-original.svg`
                  : exp.icon
              }
              label={exp.label}
              size="lg"
              subLabel={exp.years}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTools;
