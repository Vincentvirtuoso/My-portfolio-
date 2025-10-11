import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaCode,
  FaProjectDiagram,
  FaTrophy,
  FaBolt,
  FaCodepen,
  FaMobileAlt,
} from "react-icons/fa";
import {
  LuCode,
  LuCpu,
  LuGlobe,
  LuLayoutDashboard,
  LuServer,
} from "react-icons/lu";
import SectionTitle from "../components/common/SectionTitle";
import StatCard from "../components/shared/StatCard";
import profile from "../assets/images/profiles/test-profile.webp";
import { SiExpress, SiFlask, SiNextdotjs } from "react-icons/si";
import InfoSection from "../components/shared/InfoSection";
import ExperienceTools from "../sections/about/ExperienceTools";

const About = () => {
  const skills = [
    { icon: "javascript", label: "JavaScript" },
    { icon: "react", label: "React.js" },
    { icon: "nextjs", label: "Next.js" },
    { icon: "css3", label: "CSS" },
    { icon: "python", label: "Python" },
    { icon: SiFlask, label: "Flask" },
    { icon: "nodejs", label: "Node.js" },
    { icon: SiExpress, label: "Express.js" },
    { icon: "mongodb", label: "MongoDB" },
  ];

  const quickInfo = [
    {
      icon: FaCodepen,
      text: "Experienced in building scalable RESTful APIs",
    },
    {
      icon: LuLayoutDashboard,
      text: "Strong sense for modern UI/UX design patterns",
    },
    {
      icon: LuServer,
      text: "Full-stack experience with Node.js, Express, and MongoDB",
    },
    {
      icon: LuCpu,
      text: "Comfortable with system design and backend optimization",
    },
    { icon: LuGlobe, text: "Deploys efficiently with Vercel, Render & Docker" },
    { icon: FaMobileAlt, text: "Responsive designs" },
    { icon: LuCode, text: "Advocates for clean, modular code architecture" },
  ];

  const stats = [
    { value: "3", label: "Years of Experience", icon: FaCode, unit: "+" },
    { value: "26", label: "Total Projects", icon: FaProjectDiagram, unit: "+" },
    { value: "6", label: "Completed Team Projects", icon: FaTrophy, unit: "+" },
    { value: "100", label: "Code Quality Commitment", icon: FaBolt, unit: "%" },
  ];

  return (
    <section id="about" className="">
      <SectionTitle
        title={
          <>
            Who is <span className="text-brand italic">Felix Vincent?</span>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-5">
        {/* Profile & Summary */}
        <div className="">
          <div className="flex sm:flex-row flex-col gap-4">
            <img
              src={profile}
              alt="Felix Vincent"
              className="w-40 h-full shrink-0 rounded-xl object-cover border-4 border-brand-dark/50 shadow-lg"
            />

            <InfoSection
              title="Summary"
              list={
                <>
                  <p className=" leading-relaxed mb-3">
                    I'm a passionate full-stack developer with a focus on
                    building elegant, scalable, and performance-driven
                    applications. My workflow blends creative design thinking
                    with deep technical insight, allowing me to craft solutions
                    that are both intuitive and powerful.
                  </p>
                  <p className=" leading-relaxed">
                    Beyond coding, I enjoy exploring developer tooling, system
                    architecture, and improving user experiences through
                    innovative interfaces.
                  </p>
                </>
              }
            />
          </div>
          {/* Stats Section */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                {...stat}
                unitColor="text-red-300"
                contentAlign="center"
              />
            ))}
          </section>
        </div>

        {/* Skills & Quick Info */}
        <div className="flex flex-col gap-8">
          <InfoSection
            title="Skills & Topics"
            list={skills}
            listContainerClass="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3"
          />
          <InfoSection
            title="Quick Info"
            list={quickInfo}
            listContainerClass="space-y-3 mt-3"
          />
        </div>
      </div>
      <ExperienceTools />
    </section>
  );
};

export default About;
