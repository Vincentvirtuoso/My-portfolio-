import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import Overview from "../sections/about/Overview";
import Journey from "../sections/about/Journey";
import Skills from "../sections/about/Skills";
import Tools from "../sections/about/Tools";
import profile from "../assets/images/profiles/test-profile.webp";
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaCss3Alt, 
  FaDatabase,
  FaCode,
  FaServer,
  FaLayerGroup,
  FaRocket,
  FaUserTie,
  FaGraduationCap,
  FaAward,
  FaTools,
  FaChartLine,
  FaPalette,
  FaMobileAlt,
  FaMapPin,
  FaLightbulb,
  FaHandshake
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiFirebase,
  SiDocker,
  SiGit,
  SiFigma,
  SiJest,
  SiPostman,
  SiVercel,
  SiNetlify
} from "react-icons/si";
import StatCard from "../components/shared/StatCard";

// Tab Component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg shadow-brand/25"
        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
    }`}
  >
    {children}
  </button>
);

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Professional Stats
  const professionalStats = [
    {
      icon: FaCode,
      value: "3+",
      label: "Years Experience",
      description: "Building web applications"
    },
    {
      icon: FaLayerGroup,
      value: "10+",
      label: "Projects Completed",
      description: "Across various domains"
    },
    {
      icon: FaUserTie,
      value: "4+",
      label: "Team Projects",
      description: "Successful collaborations"
    },
    {
      icon: FaRocket,
      value: "100%",
      label: "Commitment",
      description: "To code quality & deadlines"
    }
  ];

  // Technical Skills
  const technicalSkills = [
    { skill: "React.js", level: 90, icon: FaReact },
    { skill: "JavaScript/ES6+", level: 95, icon: FaJs },
    { skill: "Node.js", level: 90, icon: FaNodeJs },
    { skill: "Next.js", level: 75, icon: SiNextdotjs },
    { skill: "TypeScript", level: 50, icon: SiTypescript },
    { skill: "MongoDB", level: 80, icon: SiMongodb },
    { skill: "Express.js", level: 87, icon: SiExpress },
    { skill: "CSS/Tailwind", level: 95, icon: FaCss3Alt }
  ];

  // Tools & Technologies
  const tools = [
    { icon: SiGit, label: "Git & GitHub" },
    { icon: SiFigma, label: "Figma" },
    { icon: SiPostman, label: "Postman" },
    { icon: SiVercel, label: "Vercel" },
    { icon: SiNetlify, label: "Netlify" },
    { icon: SiFirebase, label: "Firebase" },
  ];

  // Timeline Data
  const timelineData = [
    {
      year: "2021",
      title: "Started Web Development Journey",
      description: "Began with HTML, CSS, and JavaScript fundamentals. Built first responsive websites."
    },
    {
      year: "2022",
      title: "Full-Stack Development Focus",
      description: "Mastered React ecosystem, Node.js, and REST APIs. Completed multiple full-stack projects."
    },
    {
      year: "2023",
      title: "Advanced Development & Team Projects",
      description: "Led 6+ collaborative projects, implemented complex features, and optimized performance."
    },
    {
      year: "2024",
      title: "Professional Growth & Specialization",
      description: "Focus on scalable architecture, TypeScript, and advanced UI/UX patterns."
    }
  ];

  // Core Values
  const coreValues = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Always exploring new technologies and approaches"
    },
    {
      icon: FaChartLine,
      title: "Performance",
      description: "Optimized solutions for speed and efficiency"
    },
    {
      icon: FaPalette,
      title: "Design Excellence",
      description: "Beautiful, intuitive user experiences"
    },
    {
      icon: FaHandshake,
      title: "Collaboration",
      description: "Effective teamwork and communication"
    }
  ];

  return (
    <section className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto pt-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">Me</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Full-Stack Developer passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 sticky top-20 z-1">
          <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
            Overview
          </TabButton>
          <TabButton active={activeTab === "skills"} onClick={() => setActiveTab("skills")}>
            Skills
          </TabButton>
          <TabButton active={activeTab === "journey"} onClick={() => setActiveTab("journey")}>
            Journey
          </TabButton>
          <TabButton active={activeTab === "tools"} onClick={() => setActiveTab("tools")}>
            Tools
          </TabButton>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-transparent rounded-3xl p-8 border border-gray-800/50 backdrop-blur-sm"
            >
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-dark rounded-2xl blur-xl opacity-20" />
                <img
                  src={profile}
                  alt="Felix Vincent"
                  className="relative w-48 h-48 mx-auto rounded-2xl object-cover border-4 border-white/10 shadow-2xl"
                />
              </div>
              
              {/* Profile Info */}
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Felix Vincent</h2>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand/20 to-brand-dark/20 px-4 py-2 rounded-full mb-4">
                  <FaCode className="text-brand" />
                  <span className="font-semibold">Full-Stack Developer</span>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  I specialize in building modern web applications with React, Node.js, and cloud technologies. 
                  Passionate about clean code, intuitive design, and scalable architecture.
                </p>
                
                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaMapPin className="text-brand" />
                    <span>Based in Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMobileAlt className="text-brand" />
                    <span>Available for remote work</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {professionalStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <Overview coreValues={coreValues} />
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <Skills technicalSkills={technicalSkills} />
              )}

              {/* Journey Tab */}
              {activeTab === "journey" && (
                <Journey timelineData={timelineData} />
              )}

              {/* Tools Tab */}
              {activeTab === "tools" && (
                <Tools tools={tools} />
              )}
            </motion.div>

            {/* Call to Action */}
            <div className="text-center pt-8 border-t border-gray-800/50">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-brand-dark text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-brand/25 transition-all duration-300"
              >
                Let's Build Something Amazing
                <FaRocket className="ml-2" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;