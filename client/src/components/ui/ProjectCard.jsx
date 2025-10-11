import React, { useState } from "react";
import { LuExternalLink, LuGithub, LuInfo } from "react-icons/lu";
import ProjectDetailsModal from "../modals/ProjectDetailsModal";

const ProjectCard = ({ project }) => {
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
  } = project;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group relative bg-gray-900/90 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700/40 flex flex-col cursor-pointer"
      >
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover duration-500 group-hover:scale-105 group-hover:opacity-60"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
            {live && (
              <a
                href={live}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand flex items-center gap-2"
              >
                <LuExternalLink size={22} /> Live
              </a>
            )}
            {github && (
              <a
                href={github}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand flex items-center gap-2"
              >
                <LuGithub size={22} /> Code
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-brand transition-colors duration-300">
            {title}
          </h3>
          {tagline && (
            <p className="text-sm text-gray-400 font-medium italic">
              {tagline}
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
          )}

          {tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tech.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium text-brand bg-brand/10 
                             rounded-full border border-brand/20 flex items-center gap-1"
                >
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
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <span
              className={`text-xs uppercase px-2 py-1 rounded-full ${
                status === "Completed"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {status}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="text-brand hover:text-brand/80 flex items-center gap-1 text-sm"
            >
              <LuInfo /> Details
            </button>
          </div>
        </div>
      </div>

      {open && (
        <ProjectDetailsModal project={project} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default ProjectCard;
