import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const StatCard = ({
  value,
  label,
  icon: Icon,
  unit,
  unitColor,
  size = "md",
  variant = "glass",
  className = "",
  direction = "vertical",
  align = "center",
  animateOnHover = true,
  iconPosition = "top",
  shadow = true,
  iconBg = false,
  rounded = "rounded-xl",
  bgColor,
  borderColor,
  contentAlign = "start",
  valueClassName,
}) => {
  const sizeClasses = {
    xs: {
      value: "text-md",
      label: "text-xs",
      icon: "text-md",
      padding: "p-2",
    },
    sm: {
      value: "text-lg",
      label: "text-xs",
      icon: "text-xl",
      padding: "p-3",
    },
    md: {
      value: "text-3xl",
      label: "text-sm",
      icon: "text-3xl",
      padding: "p-4",
    },
    lg: {
      value: "text-5xl",
      label: "text-base",
      icon: "text-4xl",
      padding: "p-6",
    },
  }[size];

  const variantClasses = {
    solid: "bg-brand text-white border-transparent",
    outline: "bg-transparent border border-brand/50 text-brand",
    glass: "bg-white/5 border border-gray-500/30 backdrop-blur-md text-white",
    gradient: "bg-gradient-to-br from-brand to-brand-dark text-white border-0",
  }[variant];

  const layoutClasses =
    direction === "horizontal"
      ? "flex-row items-center gap-4"
      : "flex-col items-center";

  const alignmentClasses = {
    center: "justify-center text-center",
    start: "justify-start text-left",
    end: "justify-end text-right",
  }[align];
  const contentAlignmentClasses = {
    center: "items-center",
    start: "items-start",
    end: "items-end",
  }[contentAlign];

  const hoverAnimation = animateOnHover
    ? { scale: 1.03, transition: { duration: 0.2 } }
    : {};

  const bg = bgColor || "";
  const border = borderColor || "";

  return (
    <motion.div
      whileHover={hoverAnimation}
      className={clsx(
        "flex transition-all duration-300 border-2",
        layoutClasses,
        alignmentClasses,
        sizeClasses.padding,
        variantClasses,
        shadow && "shadow-lg shadow-black/10",
        rounded,
        bg,
        border,
        className
      )}
    >
      {/* Icon on left (horizontal) */}
      {Icon && direction === "horizontal" && iconPosition === "left" && (
        <div
          className={clsx(
            sizeClasses.icon,
            iconBg ? "p-3 bg-brand/10 rounded-full" : "",
            "text-brand flex-shrink-0"
          )}
        >
          <Icon />
        </div>
      )}

      {/* Icon on top (vertical) */}
      {Icon && direction === "vertical" && iconPosition === "top" && (
        <div
          className={clsx(
            sizeClasses.icon,
            iconBg ? "p-3 bg-brand/10 rounded-full" : "",
            "text-brand mb-2"
          )}
        >
          <Icon />
        </div>
      )}

      <div className={clsx(contentAlignmentClasses, "flex flex-col")}>
        <h3
          className={clsx(
            sizeClasses.value,
            valueClassName,
            "font-bold text-brand leading-tight"
          )}
        >
          {value}
          {unit && (
            <span
              className={clsx(
                "text-sm align-top font-semibold ml-1",
                unitColor || "text-brand"
              )}
            >
              {unit}
            </span>
          )}
        </h3>
        <p
          className={clsx(sizeClasses.label, "text-gray-400 mt-1 font-medium")}
        >
          {label}
        </p>
      </div>

      {Icon && direction === "horizontal" && iconPosition === "right" && (
        <div
          className={clsx(
            sizeClasses.icon,
            iconBg ? "p-3 bg-brand/10 rounded-full" : "",
            "text-brand flex-shrink-0"
          )}
        >
          <Icon />
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
