import React, { useState, useEffect } from "react";
import {
  LuPlus as Plus,
  LuPen as Edit2,
  LuTrash2 as Trash2,
  LuLoader,
  LuSave,
  LuX,
  LuCircleAlert,
  LuWrench,
  LuCode,
  LuPalette,
  LuGlobe,
  LuServer,
} from "react-icons/lu";
import { FaHtml5 } from "react-icons/fa";
import { useAbout } from "../hooks/useAbout";
import SkillProgress from "../components/ui/SkillProgress";
import Spinner from "../components/loaders/Spinner";
import IconRenderer from "../components/common/IconRenderer";
import EmptyState from "../components/common/EmptyState";

const Skills = () => {
  const {
    about,
    loading,
    error,
    addArrayItem,
    updateArrayItem,
    deleteArrayItem,
  } = useAbout();

  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [tools, setTools] = useState([]);
  const [developmentPhilosophy, setDevelopmentPhilosophy] = useState([]);

  const [activeTab, setActiveTab] = useState("skills");
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [currentSkillString, setCurrentSkillString] = useState("");

  // Update local state when about data loads
  useEffect(() => {
    if (about) {
      setSkills(about.technicalSkills || []);
      setSpecializations(about.specializations || []);
      setTools(about.tools || []);
      setDevelopmentPhilosophy(about.developmentPhilosophy || []);

      // Transform services from specializations or create default
      // const defaultServices = [
      //   {
      //     id: 1,
      //     title: "Full-Stack Development",
      //     description:
      //       "End-to-end web application development using modern technologies",
      //     price: "Starting at $5000",
      //   },
      //   {
      //     id: 2,
      //     title: "Smart Contract Development",
      //     description: "Secure and efficient smart contracts for DeFi and NFTs",
      //     price: "Starting at $8000",
      //   },
      //   {
      //     id: 3,
      //     title: "Web3 Integration",
      //     description: "Connect your dApp to blockchain networks",
      //     price: "Starting at $3000",
      //   },
      //   {
      //     id: 4,
      //     title: "Technical Consulting",
      //     description: "Expert advice on architecture and technology stack",
      //     price: "$150/hour",
      //   },
      // ];
      setServices(about.services || []);
    }
  }, [about]);

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Web3",
    "Languages",
    "Database",
  ];

  const [inputValue, setInputValue] = useState(
    formData.items?.join(", ") || "",
  );

  useEffect(() => {
    setInputValue(formData.items?.join(", ") || "");
  }, [formData.items]);

  const handleBlur = () => {
    const itemsArray = inputValue
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");

    setFormData({ ...formData, items: itemsArray });
  };

  const tabs = [
    { id: "skills", label: "Technical Skills", icon: LuCode },
    { id: "specializations", label: "Specializations", icon: LuGlobe },
    { id: "tools", label: "Tools & Technologies", icon: LuWrench },
    { id: "philosophy", label: "Development Philosophy", icon: LuPalette },
    { id: "services", label: "Services", icon: LuServer },
  ];

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === "All") return true;

    return skill.categories?.includes(activeCategory);
  });

  const handleLevelChange = async (id, newLevel) => {
    const index = skills.findIndex((s) => s._id === id || s.id === id);
    if (index === -1) return;

    const updatedSkill = {
      ...skills[index],
      level: Math.min(100, Math.max(0, newLevel)),
    };

    setSkills((prev) =>
      prev.map((s) => (s._id === id || s.id === id ? updatedSkill : s)),
    );

    // Update in backend
    await updateArrayItem("technicalSkills", index, updatedSkill);
  };

  const handleAddItem = (type) => {
    setModalType(type);
    setFormData(getDefaultFormData(type));
    setShowAddModal(true);
  };

  const getDefaultFormData = (type) => {
    switch (type) {
      case "skill":
        return { name: "", level: 50, icon: "code" };
      case "specialization":
        return { category: "", icon: "🚀", title: "", items: [""] };
      case "tool":
        return { icon: "🔧", label: "" };
      case "philosophy":
        return { title: "", description: "" };
      case "service":
        return { title: "", description: "", price: "" };
      default:
        return {};
    }
  };

  const handleSaveItem = async () => {
    setSaving(true);
    try {
      switch (modalType) {
        case "skill":
          await addArrayItem("technicalSkills", formData);
          break;
        case "specialization":
          await addArrayItem("specializations", formData);
          break;
        case "tool":
          await addArrayItem("tools", formData);
          break;
        case "philosophy":
          await addArrayItem("developmentPhilosophy", formData);
          break;
        case "service":
          await addArrayItem("services", formData);
          setServices((prev) => [...prev, { ...formData, id: Date.now() }]);
          break;
      }
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditItem = (type, item, index) => {
    setModalType(type);
    setFormData(item);
    setEditingItem({ index, item });
    setShowAddModal(true);
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;

    setSaving(true);
    try {
      switch (modalType) {
        case "skill":
          await updateArrayItem("technicalSkills", editingItem.index, formData);
          break;
        case "specialization":
          await updateArrayItem("specializations", editingItem.index, formData);
          break;
        case "tool":
          await updateArrayItem("tools", editingItem.index, formData);
          break;
        case "philosophy":
          await updateArrayItem(
            "developmentPhilosophy",
            editingItem.index,
            formData,
          );
          break;
        case "service":
          await updateArrayItem("services", editingItem.index, formData);
          setServices((prev) =>
            prev.map((s, i) =>
              i === editingItem.index ? { ...formData, id: s.id } : s,
            ),
          );
          break;
      }
      setShowAddModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update item:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (type, index) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      switch (type) {
        case "skill":
          await deleteArrayItem("technicalSkills", index);
          break;
        case "specialization":
          await deleteArrayItem("specializations", index);
          break;
        case "tool":
          await deleteArrayItem("tools", index);
          break;
        case "philosophy":
          await deleteArrayItem("developmentPhilosophy", index);
          break;
        case "service":
          setServices((prev) => prev.filter((_, i) => i !== index));
          break;
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-150px)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">
          <LuCircleAlert className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Skills & Expertise
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your technical skills, specializations, and services
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Technical Skills Tab */}
      {activeTab === "skills" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Technical Skills
            </h2>
            <button
              onClick={() => handleAddItem("skill")}
              className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              <Plus size={16} />
              <span>Add Skill</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, index) => (
                <SkillProgress
                  key={index}
                  {...skill}
                  isEditable
                  size="sm"
                  onLevelChange={handleLevelChange}
                  onSave={async (data) => {
                    await updateArrayItem("technicalSkills", index, data);
                  }}
                  onDelete={async () => {
                    await deleteArrayItem("technicalSkills", index);
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No skills found. Click "Add Skill" to get started.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Specializations Tab */}
      {activeTab === "specializations" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Specializations
            </h2>
            <button
              onClick={() => handleAddItem("specialization")}
              className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              <Plus size={16} />
              <span>Add Specialization</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <IconRenderer
                      iconName={spec.icon}
                      className="text-2xl shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {spec.title}
                      </h3>
                      <span className="text-xs text-purple-600 dark:text-purple-400">
                        {spec.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() =>
                        handleEditItem("specialization", spec, index)
                      }
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("specialization", index)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <ul className="flex gap-2 flex-wrap">
                  {spec.items?.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === "tools" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Tools & Technologies
            </h2>
            <button
              onClick={() => handleAddItem("tool")}
              className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              <Plus size={16} />
              <span>Add Tool</span>
            </button>
          </div>

          {tools?.length === 0 ? (
            <EmptyState
              icon={LuWrench}
              title="No tools found"
              description="Get started by adding your first tool"
              action={
                <button
                  onClick={() => handleAddItem("tool")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-primary-foreground rounded-lg hover:bg-brand-dark transition-colors text-sm"
                >
                  <Plus size={16} />
                  Add Your First Tool
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <SkillProgress
                  key={index}
                  isEditable
                  {...tool}
                  size="sm"
                  skill={tool.title}
                  useIcon
                  showStars={false}
                  onSave={async (data) => {
                    await updateArrayItem("tools", index, data);
                  }}
                  onDelete={async () => {
                    await deleteArrayItem("tools", index);
                  }}
                  heading="Tool"
                  showCategories={false}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Development Philosophy Tab */}
      {activeTab === "philosophy" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Development Philosophy
            </h2>
            <button
              onClick={() => handleAddItem("philosophy")}
              className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              <Plus size={16} />
              <span>Add Principle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developmentPhilosophy.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditItem("philosophy", item, index)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("philosophy", index)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Services Offered
            </h2>
            <button
              onClick={() => handleAddItem("service")}
              className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              <Plus size={16} />
              <span>Add Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {service.title}
                  </h3>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditItem("service", service, index)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("service", index)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {service.description}
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {editingItem ? "Edit" : "Add"}{" "}
                {modalType === "skill"
                  ? "Skill"
                  : modalType === "specialization"
                    ? "Specialization"
                    : modalType === "tool"
                      ? "Tool"
                      : modalType === "philosophy"
                        ? "Principle"
                        : "Service"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <LuX size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Dynamic form based on modalType */}
              {modalType === "skill" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      value={formData.skill || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, skill: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., React"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Proficiency Level (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.level || 50}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Frontend, Web3"
                      value={currentSkillString}
                      onChange={(e) => setCurrentSkillString(e.target.value)}
                      onBlur={() => {
                        const categoryArray = currentSkillString
                          .split(",")
                          .map((cat) => cat.trim())
                          .filter((cat) => cat !== "");

                        setFormData({ ...formData, categories: categoryArray });
                      }}
                      className="bg-card border-border text-foreground p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Icon (emoji or name)
                    </label>
                    <input
                      type="text"
                      value={formData.icon || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="⚛️ or react"
                    />
                  </div>
                </>
              )}

              {modalType === "specialization" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Frontend"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., UI Component Libraries"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={formData.icon || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="🚀"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Items (comma separated)
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="React, Vue, Angular"
                    />
                  </div>
                </>
              )}

              {modalType === "tool" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tool Name
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., VS Code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={formData.icon || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="🔧"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Level ({formData.level ?? 0}/100)
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.level ?? 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: Number(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${formData.level}%, var(--muted) ${formData.level}%, var(--muted) 100%)`,
                      }}
                    />
                  </div>
                </>
              )}

              {modalType === "philosophy" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Clean Code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Write code that's readable, maintainable, and scalable"
                    />
                  </div>
                </>
              )}

              {modalType === "service" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Full-Stack Development"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Describe your service..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Starting at $5000"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={editingItem ? handleUpdateItem : handleSaveItem}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <LuLoader className="animate-spin" size={16} />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <LuSave size={16} />
                    <span>{editingItem ? "Update" : "Save"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
