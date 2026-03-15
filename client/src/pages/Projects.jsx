import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import ProjectCard from "../components/ui/ProjectCard";
import { useProjects } from "../hooks/useProjects";
import { LuX, LuList, LuSearch } from "react-icons/lu";
import { FiGrid } from "react-icons/fi";

const Projects = () => {
  const { projects, loading, error, getProjects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    getProjects();
  }, []);

  // 2. Memoized filtering
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      const title = project.title?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      const techMatch = project.tech?.some((t) =>
        t.name?.toLowerCase().includes(query),
      );

      return title.includes(query) || techMatch;
    });
  }, [searchQuery, projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.div variants={itemVariants}>
          <SectionTitle
            title={
              <>
                Featured <span className="text-brand">Projects</span>
              </>
            }
          />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A collection of my digital craftsmanship, ranging from full-stack
            applications to creative design systems.
          </p>
        </motion.div>

        {/* Search & Toggle Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col md:flex-row items-center gap-4 bg-white/5 p-2 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl"
        >
          <div className="relative w-full">
            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by name or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <LuX />
              </button>
            )}
          </div>

          <div className="hidden md:flex gap-2 pr-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-2xl transition-all ${viewMode === "grid" ? "bg-brand text-white shadow-lg shadow-brand/20" : "hover:bg-white/10 text-gray-400"}`}
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-2xl transition-all ${viewMode === "list" ? "bg-brand text-white shadow-lg shadow-brand/20" : "hover:bg-white/10 text-gray-400"}`}
            >
              <LuList size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[400px] bg-white/5 rounded-3xl animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 border border-red-500/20 rounded-3xl bg-red-500/5">
            <p className="text-red-400">Error: {error}</p>
            <button
              onClick={getProjects}
              className="mt-4 text-brand hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <LuSearch size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-medium">No projects found</h3>
                <p className="text-gray-500">Try a different search term.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  >
                    <ProjectCard project={project} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Footer CTA */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand/10 blur-[100px] pointer-events-none" />
          <h3 className="text-3xl font-bold mb-4">
            Let's build something epic
          </h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            I'm currently available for freelance work and full-time
            opportunities.
          </p>
          <a
            href="/contact"
            className="px-10 py-4 bg-brand hover:bg-brand-light text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 inline-block"
          >
            Get In Touch
          </a>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
