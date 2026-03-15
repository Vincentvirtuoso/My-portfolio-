import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Overview from "../sections/about/Overview";
import Journey from "../sections/about/Journey";
import Skills from "../sections/about/Skills";
import Tools from "../sections/about/Tools";
import StatCard from "../components/shared/StatCard";
import ErrorAlert from "../components/shared/ErrorAlert";
import { useAbout } from "../hooks/useAbout";
import profile from "/images/profile.png";
import {
  FaCode,
  FaLayerGroup,
  FaUserTie,
  FaRocket,
  FaMapPin,
  FaMobileAlt,
  FaReact,
  FaNodeJs,
  FaJs,
  FaCss3Alt,
  FaDatabase,
  FaServer,
  FaPalette,
  FaChartLine,
  FaHandshake,
  FaLightbulb,
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
  SiNetlify,
} from "react-icons/si";
import Spinner from "../components/loaders/Spinner";

// Tab Component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-5 py-1.5 rounded-full font-semibold transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg shadow-brand/25"
        : "bg-white/5 text-gray-400 hover:text-muted-foreground hover:bg-white/10"
    }`}
  >
    {children}
  </button>
);

const About = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { about, loading, error, fetchAbout } = useAbout();

  if (loading || !about) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <ErrorAlert message={error} onRetry={fetchAbout} />
      </section>
    );
  }

  // Map backend stats to frontend format
  const professionalStats = [
    {
      icon: FaCode,
      value: `${about.stats?.yearsExperience || 3}+`,
      label: "Years Experience",
      description: "Building web applications",
    },
    {
      icon: FaLayerGroup,
      value: `${about.stats?.projectsCompleted || 10}+`,
      label: "Projects Completed",
      description: "Across various domains",
    },
    {
      icon: FaUserTie,
      value: `${about.stats?.teamProjects || 4}+`,
      label: "Team Projects",
      description: "Successful collaborations",
    },
    {
      icon: FaRocket,
      value: `${about.stats?.commitment || 100}%`,
      label: "Commitment",
      description: "To code quality & deadlines",
    },
  ];

  // Map backend skills to component format
  const technicalSkills =
    about.technicalSkills?.map((skill) => ({
      skill: skill.skill,
      level: skill.level,
      icon: getIconComponent(skill.icon),
    })) || [];

  // Map backend tools to component format
  const tools =
    about.tools?.map((tool) => ({
      icon: getIconComponent(tool.icon),
      label: tool.title,
    })) || [];

  // Map backend timeline to component format
  const timelineData =
    about.timeline?.map((item) => ({
      year: item.year,
      title: item.title,
      description: item.description,
      company: item.company,
      type: item.type,
    })) || [];

  const LinkBtn = motion(Link);

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
              Me
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {about.currentFocus ||
              "Full-Stack Developer passionate about creating exceptional digital experiences"}
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 sticky top-20 z-10 backdrop-blur-sm py-4">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </TabButton>
          <TabButton
            active={activeTab === "skills"}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </TabButton>
          <TabButton
            active={activeTab === "journey"}
            onClick={() => setActiveTab("journey")}
          >
            Journey
          </TabButton>
          <TabButton
            active={activeTab === "tools"}
            onClick={() => setActiveTab("tools")}
          >
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
              className="bg-gradient-to-br from-card to-transparent rounded-3xl p-8 border border-border backdrop-blur-sm"
            >
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-dark rounded-3xl blur-xl opacity-20" />
                <img
                  src={about.avatar || profile}
                  alt={about.name || "Felix Vincent"}
                  className="relative w-48 h-48 mx-auto rounded-2xl object-cover border-4 border-brand shadow-2xl"
                />
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                  {about.name || "Felix Vincent"}
                </h2>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand/20 to-brand-dark/20 px-4 py-2 rounded-full mb-4 border border-brand text-sm">
                  <FaCode className="text-brand text-xl" />
                  <span className="font-semibold">
                    {about.role || "Full-Stack Developer"}
                  </span>
                </div>

                {/* Bio */}
                {about.bio && about.bio.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {about.bio.map((paragraph, index) => (
                      <p key={index} className="text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Quick Info */}
                <div className="space-y-3">
                  {about.location && (
                    <div className="flex items-center gap-3">
                      <FaMapPin className="text-brand" />
                      <span>Based in {about.location}</span>
                    </div>
                  )}
                  {about.availability && (
                    <div className="flex items-center gap-3">
                      <FaMobileAlt className="text-brand" />
                      <span>{about.availability}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {professionalStats.map((stat, index) => (
                <StatCard key={index} size="md" {...stat} />
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
                <Overview
                  coreValues={about.coreValues || []}
                  developmentPhilosophy={about.developmentPhilosophy || []}
                />
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <Skills
                  technicalSkills={technicalSkills}
                  specializations={about.specializations || []}
                />
              )}

              {/* Journey Tab */}
              {activeTab === "journey" && (
                <Journey timelineData={timelineData} />
              )}

              {/* Tools Tab */}
              {activeTab === "tools" && <Tools tools={tools} />}
            </motion.div>

            {/* Call to Action */}
            <div className="text-center pt-8 border-t border-border">
              <LinkBtn
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                to="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-brand-dark text-white px-8 py-3 rounded-full font-semibold text-md hover:shadow-2xl hover:shadow-brand/25 transition-all duration-300"
              >
                Build Something Amazing
                <FaRocket className="ml-2" />
              </LinkBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to map icon strings to components
const getIconComponent = (iconName) => {
  const iconMap = {
    FaReact: FaReact,
    FaNodeJs: FaNodeJs,
    FaJs: FaJs,
    FaCss3Alt: FaCss3Alt,
    FaDatabase: FaDatabase,
    FaCode: FaCode,
    FaServer: FaServer,
    FaRocket: FaRocket,
    SiNextdotjs: SiNextdotjs,
    SiMongodb: SiMongodb,
    SiExpress: SiExpress,
    SiTypescript: SiTypescript,
    SiTailwindcss: SiTailwindcss,
    SiRedux: SiRedux,
    SiFirebase: SiFirebase,
    SiDocker: SiDocker,
    SiGit: SiGit,
    SiFigma: SiFigma,
    SiJest: SiJest,
    SiPostman: SiPostman,
    SiVercel: SiVercel,
    SiNetlify: SiNetlify,
    FaPalette: FaPalette,
    FaChartLine: FaChartLine,
    FaHandshake: FaHandshake,
    FaLightbulb: FaLightbulb,
  };

  return iconMap[iconName] || FaCode;
};

export default About;
