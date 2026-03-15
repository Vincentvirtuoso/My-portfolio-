import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSave,
  LuX,
  LuPlus,
  LuTrash2,
  LuGithub,
  LuGlobe,
  LuImage,
  LuLoader,
  LuChevronDown,
  LuChevronUp,
  LuTag,
  LuLayers,
  LuCode,
  LuDatabase,
  LuServer,
  LuCloud,
  LuPencil,
} from "react-icons/lu";
import { useProjects } from "../hooks/useProjects";
import { useImageUpload } from "../hooks/useImageUpload";

const DEFAULT_FORM_DATA = {
  title: "",
  tagline: "",
  category: "Web App",
  date: "",
  role: "",
  status: "In Progress",
  featured: false,
  image: "",
  gallery: [],
  tech: [{ name: "", icon: "code" }],
  collaborators: [],
  github: "",
  live: "",
  details: {
    longDescription: "",
    features: [""],
    architecture: {
      frontend: "",
      backend: "",
      database: "",
      hosting: "",
    },
    challenges: "",
    outcome: "",
    lessonsLearned: [""],
    tags: [""],
  },
};

const ProjectForm = ({
  isEditMode = false,
  initialData = null,
  projectId = null,
  redirectTo = "/projects",
}) => {
  const navigate = useNavigate();
  const {
    createProject,
    updateProject,
    loading: projectLoading,
  } = useProjects();
  const { uploadImage, uploading: imageUploading } = useImageUpload();

  const [activeSection, setActiveSection] = useState("basic");
  const [formData, setFormData] = useState(() => {
    if (isEditMode && initialData) {
      // Deep-merge initialData over defaults so all keys are always present
      return {
        ...DEFAULT_FORM_DATA,
        ...initialData,
        details: {
          ...DEFAULT_FORM_DATA.details,
          ...(initialData.details ?? {}),
          architecture: {
            ...DEFAULT_FORM_DATA.details.architecture,
            ...(initialData.details?.architecture ?? {}),
          },
        },
      };
    }
    return DEFAULT_FORM_DATA;
  });

  // If initialData changes after mount (e.g. async fetch), sync the form
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        ...DEFAULT_FORM_DATA,
        ...initialData,
        details: {
          ...DEFAULT_FORM_DATA.details,
          ...(initialData.details ?? {}),
          architecture: {
            ...DEFAULT_FORM_DATA.details.architecture,
            ...(initialData.details?.architecture ?? {}),
          },
        },
      });
    }
  }, [isEditMode, initialData]);

  const sections = [
    { id: "basic", label: "Basic Info", icon: LuLayers },
    { id: "media", label: "Media", icon: LuImage },
    { id: "tech", label: "Tech Stack", icon: LuCode },
    { id: "details", label: "Project Details", icon: LuDatabase },
    { id: "links", label: "Links", icon: LuGlobe },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const parts = name.split(".");
      if (parts.length === 3) {
        const [section, subsection, field] = parts;
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [subsection]: {
              ...prev[section][subsection],
              [field]: value,
            },
          },
        }));
      } else {
        const [parent, child] = parts;
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleArrayAdd = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ""],
      },
    }));
  };

  const handleArrayRemove = (section, field, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index),
      },
    }));
  };

  const handleArrayChange = (section, field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item, i) =>
          i === index ? value : item,
        ),
      },
    }));
  };

  const handleTechChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.map((tech, i) =>
        i === index ? { ...tech, [field]: value } : tech,
      ),
    }));
  };

  const addTech = () => {
    setFormData((prev) => ({
      ...prev,
      tech: [...prev.tech, { name: "", icon: "code" }],
    }));
  };

  const removeTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadImage(file);
    if (result.success) {
      if (type === "main") {
        setFormData((prev) => ({ ...prev, image: result.url }));
      } else if (type === "gallery") {
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, result.url],
        }));
      }
    }
  };

  const handleGalleryRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanData = {
      ...formData,
      tech: formData.tech.filter((t) => t.name.trim() !== ""),
      details: {
        ...formData.details,
        features: formData.details.features.filter((f) => f.trim() !== ""),
        lessonsLearned: formData.details.lessonsLearned.filter(
          (l) => l.trim() !== "",
        ),
        tags: formData.details.tags.filter((t) => t.trim() !== ""),
      },
    };

    const result = isEditMode
      ? await updateProject(projectId, cleanData)
      : await createProject(cleanData);

    if (result.success) {
      navigate(redirectTo);
    }
  };

  // ─── Derived UI values ─────────────────────────────────────────────────────

  const pageTitle = isEditMode ? "Edit Project" : "Create New Project";
  const pageSubtitle = isEditMode
    ? "Update your project details"
    : "Add a new project to your portfolio";
  const submitLabel = isEditMode ? "Save Changes" : "Create Project";
  const SubmitIcon = isEditMode ? LuPencil : LuSave;
  const isSubmitting = projectLoading || imageUploading;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {pageSubtitle}
          </p>
        </div>

        {/* Section Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {/* Basic Info Section */}
            {activeSection === "basic" && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="Web App">Web App</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Web3">Web3</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date (e.g., 2024-03) *
                    </label>
                    <input
                      type="month"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g., Full Stack Developer"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planning">Planning</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Feature this project
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Media Section */}
            {activeSection === "media" && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Media
                </h2>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Main Project Image *
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "main")}
                        className="hidden"
                        id="main-image"
                      />
                      <label
                        htmlFor="main-image"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                      >
                        <LuImage className="mr-2" size={18} />
                        {imageUploading
                          ? "Uploading..."
                          : isEditMode
                            ? "Replace Image"
                            : "Upload Image"}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gallery Images
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {formData.gallery.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleGalleryRemove(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <LuTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.gallery.length < 8 && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "gallery")}
                          className="hidden"
                          id="gallery-image"
                        />
                        <label
                          htmlFor="gallery-image"
                          className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
                        >
                          <LuPlus size={24} className="text-gray-400" />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tech Stack Section */}
            {activeSection === "tech" && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tech Stack
                  </h2>
                  <button
                    type="button"
                    onClick={addTech}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    <LuPlus size={16} />
                    <span>Add Technology</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.tech.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={tech.name}
                        onChange={(e) =>
                          handleTechChange(index, "name", e.target.value)
                        }
                        placeholder="Technology name"
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                      <select
                        value={tech.icon}
                        onChange={(e) =>
                          handleTechChange(index, "icon", e.target.value)
                        }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="react">React</option>
                        <option value="nodejs">Node.js</option>
                        <option value="express">Express</option>
                        <option value="mongodb">MongoDB</option>
                        <option value="python">Python</option>
                        <option value="solidity">Solidity</option>
                        <option value="code">Other</option>
                      </select>
                      {formData.tech.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTech(index)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <LuTrash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Details Section */}
            {activeSection === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Long Description *
                  </label>
                  <textarea
                    name="details.longDescription"
                    value={formData.details.longDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Key Features
                    </label>
                    <button
                      type="button"
                      onClick={() => handleArrayAdd("details", "features")}
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      + Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.details.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleArrayChange(
                              "details",
                              "features",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder="Feature description"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {formData.details.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleArrayRemove("details", "features", index)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <LuTrash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Frontend",
                      name: "details.architecture.frontend",
                      placeholder: "e.g., React + GSAP",
                    },
                    {
                      label: "Backend",
                      name: "details.architecture.backend",
                      placeholder: "e.g., Node.js + Express",
                    },
                    {
                      label: "Database",
                      name: "details.architecture.database",
                      placeholder: "e.g., MongoDB",
                    },
                    {
                      label: "Hosting",
                      name: "details.architecture.hosting",
                      placeholder: "e.g., Render",
                    },
                  ].map(({ label, name, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        name={name}
                        value={
                          name
                            .split(".")
                            .reduce((obj, key) => obj?.[key], formData) ?? ""
                        }
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  ))}
                </div>

                {/* Challenges */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Challenges Faced
                  </label>
                  <textarea
                    name="details.challenges"
                    value={formData.details.challenges}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Outcome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Outcome / Results
                  </label>
                  <textarea
                    name="details.outcome"
                    value={formData.details.outcome}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Lessons Learned */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lessons Learned
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayAdd("details", "lessonsLearned")
                      }
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      + Add Lesson
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.details.lessonsLearned.map((lesson, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={lesson}
                          onChange={(e) =>
                            handleArrayChange(
                              "details",
                              "lessonsLearned",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder="Lesson learned"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {formData.details.lessonsLearned.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleArrayRemove(
                                "details",
                                "lessonsLearned",
                                index,
                              )
                            }
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <LuTrash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tags
                    </label>
                    <button
                      type="button"
                      onClick={() => handleArrayAdd("details", "tags")}
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      + Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.details.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) =>
                            handleArrayChange(
                              "details",
                              "tags",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder="Tag"
                          className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        />
                        {formData.details.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleArrayRemove("details", "tags", index)
                            }
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <LuTrash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Links Section */}
            {activeSection === "links" && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Links
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center space-x-2">
                        <LuGithub />
                        <span>GitHub Repository</span>
                      </div>
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center space-x-2">
                        <LuGlobe />
                        <span>Live Demo URL</span>
                      </div>
                    </label>
                    <input
                      type="url"
                      name="live"
                      value={formData.live}
                      onChange={handleInputChange}
                      placeholder="https://your-project.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(redirectTo)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <LuLoader className="animate-spin" size={18} />
              ) : (
                <SubmitIcon size={18} />
              )}
              <span>{isSubmitting ? "Saving..." : submitLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
