import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LuExternalLink, 
  LuGithub, 
  LuInfo, 
  LuStar,
  LuEye,
  LuCode
} from "react-icons/lu";
import ProjectDetailsModal from "../modals/ProjectDetailsModal";
import useBodyScrollLock from '../../hooks/useBodyScrollLock';

const ProjectCard = ({ project, viewMode = "grid" }) => {
  const {
    title,
    tagline,
    description,
    image,
    tech = [],
    github,
    live,
    details,
    role,
    status,
    featured,
    category
  } = project;

  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  const TechStack = () => {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.slice(0, 4).map((t, i) => (
          <span
            key={i}
            className="px-3 py-1.5 text-xs font-medium bg-white/5 text-gray-300 rounded-lg border border-gray-700/50 flex items-center gap-1.5">
            {t.icon && (
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}/${t.icon}-original.svg`}
                alt={t.name}
                className="w-4 h-4"
              />
            )}
            {t.name}
          </span>
        ))}
        {tech.length > 4 && (
          <span className="px-3 py-1.5 text-xs bg-white/5 text-gray-400 rounded-lg">
            +{tech.length - 4}
          </span>
        )}
      </div>
    )
  }

  // Grid View
  if (viewMode === "grid") {
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 flex flex-col cursor-pointer h-full"
        >
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-foregroud px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                <LuStar className="text-xs" />
                Featured
              </div>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-brand text-foregroud px-3 py-1 rounded-full text-xs font-semibold">
                {category}
              </div>
            </div>
          )}

          {/* Image */}
          <div className="relative w-full h-56 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {live && (<motion.a
                href={live}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black p-3 rounded-full hover:bg-brand hover:text-foregroud transition-colors duration-300"
              >
                <LuExternalLink size={20} />
              </motion.a>)}
              {github && (<motion.a
                href={github}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-800 hover:text-foregroud transition-colors duration-300"
              >
                <LuGithub size={20} />
              </motion.a>)}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-foregroud group-hover:text-brand transition-colors duration-300 mb-1">
                {title}
              </h3>
              {tagline && (
                <p className="text-sm text-brand font-medium">{tagline}</p>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
              {description}
            </p>

            {/* Tech Stack */}
            {tech.length > 0 && (
              <TechStack />
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                status === "Completed"
                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                  : status === "In Progress"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
              }`}>
                {status}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-foregroud transition-colors"
              >
                <LuEye size={16} />
                View Details
              </button>
            </div>
          </div>
        </motion.div>

        {open && (
          <div className='fixed inset-0 z-50'>
            <ProjectDetailsModal project={project} onClose={() => setOpen(false)} />
          </div>
        )}
      </>
    );
  }

  // List View
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => setOpen(true)}
        className="group bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 cursor-pointer hover:border-brand/30 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Image */}
          <div className="md:w-48 md:h-32 h-40 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-foregroud group-hover:text-brand transition-colors">
                    {title}
                  </h3>
                  {featured && (
                    <LuStar className="text-yellow-500" />
                  )}
                </div>
                {tagline && (
                  <p className="text-sm text-brand font-medium mb-2">{tagline}</p>
                )}
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full self-start ${
                status === "Completed"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}>
                {status}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap gap-3">
              <TechStack />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="ml-auto flex items-center gap-2 text-sm text-gray-400 hover:text-foregroud transition-colors"
              >
                <LuInfo size={16} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {open && (
        <div className='fixed inset-0 z-50'>
          <ProjectDetailsModal project={project} onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ProjectCard;