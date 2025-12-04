import React from "react";
import clsx from "clsx";

const IconText = ({
  icon: Icon,
  label,
  iconColor = "text-brand",
  textColor = "text-gray-200",
  iconBg,
  iconPosition = "left",
  direction = "horizontal",
  size = "md",
  variant = "default",
  gap = 2,
  imageClass,
  as: Component = "div",
  onClick,
  disabled = false,
  hoverEffect = false,
  rounded = "md",
  className = "",
  subLabel = "",
}) => {
  const isImage = typeof Icon === "string";

  // Size variants
  const sizeClasses = {
    sm: {
      subLabel: "text-xs",
      text: "text-sm",
      icon: "text-sm w-4 h-4",
      gap: "gap-1.5",
    },
    md: {
      subLabel: "text-sm",
      text: "text-md",
      icon: "text-md w-6 h-6",
      gap: "gap-2",
    },
    lg: {
      subLabel: "text-sm",
      text: "text-lg",
      icon: "text-xl w-10 h-10",
      gap: "gap-3",
    },
  };

  // Variant styles
  const variantClasses = {
    default: "",
    subtle: "opacity-80 hover:opacity-100",
    solid: "bg-brand text-foregroud hover:bg-brand-dark",
    outline: "border border-brand/50 hover:border-brand text-brand",
  };

  const directionClass =
    direction === "vertical"
      ? "flex-col items-center"
      : "flex-row items-center";

  const iconWrapperClass = clsx(
    isImage ? "" : `${iconColor}`,
    iconBg && `bg-${iconBg}`,
    rounded && `rounded-${rounded}`,
    "flex items-center justify-center",
    sizeClasses[size].icon
  );

  return (
    <Component
      onClick={!disabled ? onClick : undefined}
      className={clsx(
        "flex",
        directionClass,
        sizeClasses[size].gap,
        textColor,
        variantClasses[variant],
        hoverEffect && "transition-all duration-200 hover:scale-105",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {iconPosition === "left" && Icon && (
        <div className={iconWrapperClass}>
          {isImage ? (
            <img
              src={Icon}
              alt={label}
              className={clsx(imageClass, "object-contain")}
            />
          ) : (
            <Icon className={iconWrapperClass} />
          )}
        </div>
      )}
      <div className="flex flex-col">
        <span className={clsx(sizeClasses[size].text, "font-medium")}>
          {label}
        </span>
        <span
          className={clsx(
            sizeClasses[size].subLabel,
            "font-normal text-gray-400"
          )}
        >
          {subLabel}
        </span>
      </div>

      {iconPosition === "right" && Icon && (
        <div className={iconWrapperClass}>
          {isImage ? (
            <img
              src={Icon}
              alt={label}
              className={clsx(imageClass, "object-contain")}
            />
          ) : (
            <Icon className={iconWrapperClass} />
          )}
        </div>
      )}
    </Component>
  );
};

export default IconText;
