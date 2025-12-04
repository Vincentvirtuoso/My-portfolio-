import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import projects from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import { 
  LuFilter, 
  LuX, 
  LuList, 
  LuSearch, 
  LuChevronDown,
  LuSparkles,
  LuTrendingUp,
  LuClock,
  LuPlay,
  LuCheck,
} from "react-icons/lu";
import { FiGrid } from "react-icons/fi";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      
      const matchesSearch = searchQuery === "" || 
        project.title?.toLowerCase?.().includes(searchQuery?.toLowerCase?.()) ||
        project.tech.some(t => t.name?.toLowerCase?.().includes(searchQuery?.toLowerCase?.()));
      
      return matchesSearch;
    });
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-12">
        <motion.div variants={itemVariants} className="mb-6">
          <SectionTitle
            title={
              <>
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">Projects</span>
              </>
            }
            />
            <p>
              Showcasing my work across web development, design, and innovation
            </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
          <motion.div variants={itemVariants} className="w-full">
            <div className="relative">
              <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search projects by name, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <LuX />
                </button>
              )}
            </div>
          </motion.div>
        <motion.div variants={itemVariants} className="sm:flex items-center justify-center gap-4 hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-xl transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-brand/20 text-brand border border-brand/30"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <FiGrid className="text-xl" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-xl transition-all duration-300 ${
              viewMode === "list"
                ? "bg-brand/20 text-brand border border-brand/30"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <LuList className="text-xl" />
          </button>
        </motion.div>
        </motion.div>

        {/* View Mode Toggle */}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12">
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }`}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard 
                    project={project} 
                    viewMode={viewMode}
                    query={searchQuery}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-center">
        <div className="bg-gradient-to-r from-brand/10 to-brand-dark/10 border border-brand/30 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in Collaborating?
          </h3>
          <p className="text-gray-300 mb-6">
            Have a project in mind or want to work together? I'm always open to discussing new opportunities and innovative ideas.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-brand/25 transition-all duration-300"
          >
            Start a Conversation
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;