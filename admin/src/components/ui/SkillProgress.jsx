import React, { useState, useEffect } from "react";
import {
  LuPen as Pen,
  LuSave as Save,
  LuX as X,
  LuStar as Star,
  LuCode as Code,
  LuDatabase as Database,
  LuLayoutDashboard as Layout,
  LuTerminal as Terminal,
  LuGlobe as Globe,
  LuCpu as Cpu,
  LuPlus as Plus,
  LuTrash2 as Trash,
  LuStarHalf,
  LuStar,
} from "react-icons/lu";
import IconRenderer from "../common/IconRenderer";

const SkillProgress = ({
  skill,
  level,
  icon,
  categories = [],
  _id,
  id,
  onLevelChange,
  onSave,
  onDelete,
  isEditable = false,
  size = "md",
  showLevel = true,
  showIcon = true,
  useIcon = false,
  showStars = true,
  showCategories = true,
  className = "",
  availableCategories = [],
  heading = "Skill"
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    skill: skill || "",
    level: level || 0,
    icon: icon || "",
    categories: categories || [],
  });
  const [newCategory, setNewCategory] = useState("");
  const skillId = _id || id;

  // Update edit data when props change
  useEffect(() => {
    setEditData({
      skill: skill || "",
      level: level || 0,
      icon: icon || "",
      categories: categories || [],
    });
  }, [skill, level, icon, categories]);

  // Get icon component based on icon name or default based on category
  const getIconComponent = () => {
    const iconMap = {
      code: Code,
      database: Database,
      layout: Layout,
      terminal: Terminal,
      globe: Globe,
      cpu: Cpu,
    };

    if (editData.icon && iconMap[editData.icon.toLowerCase()]) {
      return iconMap[editData.icon.toLowerCase()];
    }

    // Default icon based on categories
    if (editData.categories.includes("Frontend")) return Layout;
    if (editData.categories.includes("Backend")) return Terminal;
    if (editData.categories.includes("Database")) return Database;
    if (editData.categories.includes("DevOps")) return Cpu;
    if (editData.categories.includes("Languages")) return Code;

    return Code; // Default icon
  };

  const IconComponent = getIconComponent();

  // Size configurations
  const sizeConfig = {
    xs: {
      container: "p-2",
      icon: "w-4 h-4",
      title: "text-xs",
      level: "text-[11px]",
      bar: "h-1",
      input: "text-xs",
      button: "p-0.5",
    },
    sm: {
      container: "p-3",
      icon: "w-6 h-6",
      title: "text-sm",
      level: "text-xs",
      bar: "h-1.5",
      input: "text-sm",
      button: "p-1",
    },
    md: {
      container: "p-4",
      icon: "w-8 h-8",
      title: "text-base",
      level: "text-sm",
      bar: "h-2",
      input: "text-base",
      button: "p-1.5",
    },
    lg: {
      container: "p-6",
      icon: "w-10 h-10",
      title: "text-lg",
      level: "text-base",
      bar: "h-3",
      input: "text-lg",
      button: "p-2",
    },
  };

  const currentSize = sizeConfig[size];

  const handleFieldChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLevelChange = (newLevel) => {
    const clampedLevel = Math.min(100, Math.max(0, Number(newLevel)));
    handleFieldChange("level", clampedLevel);
  };

  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      !editData.categories.includes(newCategory.trim())
    ) {
      handleFieldChange("categories", [
        ...editData.categories,
        newCategory.trim(),
      ]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    handleFieldChange(
      "categories",
      editData.categories.filter((cat) => cat !== categoryToRemove),
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...editData,
      });
    } else if (onLevelChange && skillId) {
      onLevelChange(skillId, editData.level);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      skill: skill || "",
      level: level || 0,
      icon: icon || "",
      categories: categories || [],
    });
    setNewCategory("");
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Render edit mode
  if (isEditing) {
    return (
      <div
        className={`
          bg-card 
          border-2 
          border-brand 
          rounded-xl 
          ${currentSize.container}
          shadow-lg
          ${className}
        `}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-foreground">
              Edit {heading}
            </h3>
            <div className="flex items-center gap-1">
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className={`${currentSize.button} text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors`}
                  aria-label="Delete skill"
                >
                  <Trash size={16} />
                </button>
              )}
              <button
                onClick={handleCancel}
                className={`${currentSize.button} text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors`}
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Skill Name Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              {heading} Name
            </label>
            <input
              type="text"
              value={editData.skill}
              onChange={(e) => handleFieldChange("skill", e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="Enter skill name"
              autoFocus
            />
          </div>

          {/* Icon Selection */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Icon
            </label>
            <input
              type="text"
              value={editData.icon || ""}
              onChange={(e) =>
                setEditData({ ...editData, icon: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="LuReact"
            />
          </div>

          {/* Level Control */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Proficiency Level: {editData.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={editData.level}
              onChange={(e) => handleLevelChange(e.target.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${editData.level}%, var(--muted) ${editData.level}%, var(--muted) 100%)`,
              }}
            />
          </div>

          {/* Categories Management */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Categories
            </label>

            {/* Existing Categories */}
            <div className="flex flex-wrap gap-1 mb-2">
              {editData.categories.map((category, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                >
                  {category}
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Category Input */}
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                className="flex-1 px-3 py-1 text-sm w-full bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Add category"
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {availableCategories
                  .filter((cat) => !editData.categories.includes(cat))
                  .map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
              </datalist>
              <button
                onClick={handleAddCategory}
                className="px-3 py-1 bg-brand text-primary-foreground rounded-lg hover:bg-brand-dark transition-colors text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full mt-4 px-4 py-2 bg-brand text-primary-foreground rounded-lg hover:bg-brand-dark transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  // Render view mode
  return (
    <div
      className={`
        bg-card 
        border 
        border-border 
        rounded-xl 
        ${currentSize.container}
        transition-all 
        duration-200
        hover:shadow-lg
        hover:border-brand/20
        group
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon Section */}
        {showIcon && (
          <div
            className={`shrink-0 
                bg-brand/10 
                rounded-lg 
                p-2 
                text-brand
                group-hover:bg-brand 
                group-hover:text-primary-foreground 
                transition-colors 
                duration-200
                `}
          >
            {useIcon ? (
              <IconRenderer iconName={icon} className={currentSize.icon} />
            ) : (
              <IconComponent className={currentSize.icon} strokeWidth={1.5} />
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3
              className={`
              font-heading 
              font-semibold 
              text-foreground 
              truncate
              ${currentSize.title}
            `}
            >
              {skill}
            </h3>

            {/* Edit Button */}
            {isEditable && (
              <button
                onClick={() => setIsEditing(true)}
                className={`${currentSize.button} text-muted-foreground hover:text-brand rounded-lg hover:bg-muted/50 transition-colors`}
                aria-label="Edit skill"
              >
                <Pen size={16} />
              </button>
            )}
          </div>

          {/* Categories */}
          {showCategories && categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {categories.map((category, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Level Display */}
          <div className="space-y-1">
            {showLevel && (
              <div className="flex items-center justify-between">
                <span className={`text-muted-foreground ${currentSize.level}`}>
                  Proficiency
                </span>
                <span
                  className={`font-medium text-foreground ${currentSize.level}`}
                >
                  {level}%
                </span>
              </div>
            )}

            <div className="relative">
              <div
                className={`w-full bg-muted rounded-full ${currentSize.bar}`}
              >
                <div
                  className="bg-brand rounded-full transition-all duration-300"
                  style={{ width: `${level}%`, height: "100%" }}
                />
              </div>

              {showStars && (
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const starValue = star * 20;

                    if (level >= starValue) {
                      return (
                        <LuStar
                          key={star}
                          size={12}
                          className="text-brand fill-brand transition-colors duration-200"
                        />
                      );
                    }

                    if (level >= starValue - 10) {
                      return (
                        <LuStarHalf
                          key={star}
                          size={12}
                          className="text-brand fill-brand transition-colors duration-200"
                        />
                      );
                    }

                    return (
                      <LuStar
                        key={star}
                        size={12}
                        className="text-muted transition-colors duration-200"
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgress;
