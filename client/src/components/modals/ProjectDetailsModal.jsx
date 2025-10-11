import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuX,
  LuExternalLink,
  LuGithub,
  LuCode,
  LuDatabase,
  LuServer,
  LuCloudUpload,
} from "react-icons/lu";
import {} from "react-icons/si";
import {} from "react-icons/di";
import StatCard from "../shared/StatCard";
import GallerySlider from "../ui/GallerySlider";
import IconText from "../shared/IconText";

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;
  const { title, details, tech, gallery, role, collaborators, live, github } =
    project;

  const getIcon = (label) => {
    switch (label) {
      case "frontend":
        return LuCode;
      case "backend":
        return LuServer;
      case "hosting":
        return LuCloudUpload;
      case "database":
        return LuDatabase;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 dark:bg-gray-800 max-w-4xl w-full rounded-2xl max-h-[90vh] overflow-hidden pb-2 shadow-lg"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b bg-gray-800 border-gray-700 p-5 sticky top-0">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LuX size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(90vh-150px)]">
            {gallery && gallery.length > 0 && (
              <GallerySlider gallery={gallery} />
            )}

            {details?.longDescription && (
              <p className="text-gray-300 leading-relaxed">
                {details.longDescription}
              </p>
            )}

            {details?.features && details.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-brand mb-2">
                  Features
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  {details.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {details?.architecture && (
              <div>
                <h3 className="text-lg font-semibold text-brand mb-1">
                  Architecture
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-300">
                  {Object.entries(details.architecture).map(([key, label]) => (
                    <StatCard
                      value={key}
                      label={label}
                      size="xs"
                      icon={getIcon(key)}
                      iconPosition="left"
                      direction="horizontal"
                      className="h-ful capitalize"
                      align="start"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {tech?.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-brand/10 text-brand border border-brand/20 rounded-full flex items-center gap-1"
                >
                  <IconText
                    label={t.name}
                    icon={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}/${t.icon}-original.svg`}
                  />
                </span>
              ))}
            </div>

            {role && (
              <p className="text-gray-400 text-sm">
                <strong className="text-white">Role:</strong> {role}
              </p>
            )}

            {collaborators?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-brand mb-2">
                  Collaborators
                </h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  {collaborators.map((c, i) => (
                    <li key={i}>
                      {c.name} – <span className="italic">{c.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details?.lessonsLearned && details.lessonsLearned.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-brand mb-2">
                  Lessons Learned
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  {details.lessonsLearned.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            )}

            {details?.outcome && (
              <p className="text-gray-300 italic mt-3">
                <strong className="text-brand">Outcome:</strong>{" "}
                {details.outcome}
              </p>
            )}
          </div>
          <div className="flex gap-3 sticky bottom-0 p-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/70 transition justify-center flex-1"
              >
                <LuExternalLink /> Live Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center flex items-center gap-2 border border-gray-600 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300/10 transition flex-1"
              >
                <LuGithub /> Source Code
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
