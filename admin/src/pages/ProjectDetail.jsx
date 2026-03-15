import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuGithub,
  LuGlobe,
  LuCalendar,
  LuUser,
  LuTag,
  LuStar,
  LuEye,
  LuClock,
  LuCircleCheck,
  LuCircleX,
  LuLoader,
  LuLink,
  LuCode,
  LuDatabase,
  LuServer,
  LuCloud,
  LuSmartphone,
  LuCpu,
  LuPenTool,
  LuLayoutDashboard,
  LuPen,
  LuTrash2,
} from "react-icons/lu";
import { useProjects } from "../hooks/useProjects";

const ProjectDetail = ({ setSelectedProject }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getProjectById,
    deleteProject,
    loading: projectLoading,
  } = useProjects();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    setError(null);

    const result = await getProjectById(id);

    if (result.success && result.project) {
      setProject(result.project);
      setSelectedImage(result.project.image);
    } else {
      setError(result.error || "Failed to load project");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const result = await deleteProject(id);
    setDeleteLoading(false);

    if (result.success) {
      navigate("/projects");
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <LuCircleCheck className="text-green-500" size={20} />;
      case "in progress":
        return <LuClock className="text-yellow-500" size={20} />;
      case "planning":
        return <LuEye className="text-blue-500" size={20} />;
      default:
        return <LuCircleX className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "in progress":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "planning":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "web app":
        return <LuGlobe className="text-purple-500" />;
      case "mobile app":
        return <LuSmartphone className="text-green-500" />;
      case "web3":
        return <LuCpu className="text-blue-500" />;
      case "ai/ml":
        return <LuCode className="text-red-500" />;
      case "ui/ux":
        return <LuPenTool className="text-pink-500" />;
      default:
        return <LuLayoutDashboard className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <LuLoader
              className="animate-spin text-purple-600 mx-auto mb-4"
              size={48}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <LuCircleX className="text-red-600 dark:text-red-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error ||
              "The project you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          {/* Navigation */}
          <div className="absolute top-6 left-4 sm:left-6 lg:left-8 flex items-center space-x-4">
            <button
              onClick={() => navigate("/projects")}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <LuArrowLeft size={20} />
            </button>
            <span className="text-white/60 text-sm">Back to Projects</span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-4 sm:right-6 lg:right-8 flex items-center space-x-3">
            <button
              onClick={() => {
                navigate("/project/edit");
                setSelectedProject(project);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <LuPen size={18} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-200 hover:bg-red-500/30 transition-colors"
            >
              <LuTrash2 size={18} />
              <span>Delete</span>
            </button>
          </div>

          {/* Project Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getStatusColor(project.status)}`}
              >
                {getStatusIcon(project.status)}
                <span>{project.status}</span>
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold flex items-center space-x-1">
                  <LuStar size={14} />
                  <span>Featured</span>
                </span>
              )}
              <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold flex items-center space-x-1">
                {getCategoryIcon(project.category)}
                <span>{project.category}</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-xl text-white/90 mb-6">{project.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <LuCalendar size={18} />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LuUser size={18} />
                <span>{project.role}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.details?.longDescription}
              </p>
            </motion.section>

            {/* Key Features */}
            {project.details?.features?.length > 0 && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.details.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <LuCircleCheck
                        className="text-green-500 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Challenges & Solutions */}
            {(project.details?.challenges || project.details?.outcome) && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Challenges & Solutions
                </h2>
                {project.details?.challenges && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Challenges Faced
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {project.details.challenges}
                    </p>
                  </div>
                )}
                {project.details?.outcome && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Outcome
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {project.details.outcome}
                    </p>
                  </div>
                )}
              </motion.section>
            )}

            {/* Lessons Learned */}
            {project.details?.lessonsLearned?.length > 0 && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lessons Learned
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {project.details.lessonsLearned.map((lesson, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {lesson}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Gallery */}
            {project.gallery?.length > 0 && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="relative group overflow-hidden rounded-lg aspect-video"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <LuEye className="text-white" size={24} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tech Stack
              </h3>
              <div className="space-y-3">
                {project.tech?.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {tech.name}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                      {tech.icon}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Architecture */}
            {project.details?.architecture &&
              Object.values(project.details.architecture).some((v) => v) && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Architecture
                  </h3>
                  <div className="space-y-3">
                    {project.details.architecture.frontend && (
                      <div className="flex items-center space-x-3">
                        <LuCode className="text-purple-500" size={18} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Frontend: {project.details.architecture.frontend}
                        </span>
                      </div>
                    )}
                    {project.details.architecture.backend && (
                      <div className="flex items-center space-x-3">
                        <LuServer className="text-green-500" size={18} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Backend: {project.details.architecture.backend}
                        </span>
                      </div>
                    )}
                    {project.details.architecture.database && (
                      <div className="flex items-center space-x-3">
                        <LuDatabase className="text-blue-500" size={18} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Database: {project.details.architecture.database}
                        </span>
                      </div>
                    )}
                    {project.details.architecture.hosting && (
                      <div className="flex items-center space-x-3">
                        <LuCloud className="text-orange-500" size={18} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Hosting: {project.details.architecture.hosting}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

            {/* Links */}
            {(project.github || project.live) && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Links
                </h3>
                <div className="space-y-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <LuGithub
                          size={20}
                          className="text-gray-700 dark:text-gray-300"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          GitHub
                        </span>
                      </div>
                      <LuLink
                        size={16}
                        className="text-gray-400 group-hover:text-purple-500"
                      />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <LuGlobe
                          size={20}
                          className="text-gray-700 dark:text-gray-300"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Live Demo
                        </span>
                      </div>
                      <LuLink
                        size={16}
                        className="text-gray-400 group-hover:text-purple-500"
                      />
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tags */}
            {project.details?.tags?.length > 0 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.details.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && selectedImage !== project.image && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(project.image)}
        >
          <button
            onClick={() => setSelectedImage(project.image)}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <LuCircleX size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuTrash2 className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
              Delete Project
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
              Are you sure you want to delete "{project.title}"? This action
              cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {deleteLoading ? (
                  <>
                    <LuLoader className="animate-spin" size={16} />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <LuTrash2 size={16} />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
