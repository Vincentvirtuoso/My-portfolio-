import React from "react";

const SectionTitle = ({ title, size = "4xl", color = "text-foreground" }) => {
  return (
    <h2
      className={`font-bold text-${size} ${
        size === "4xl" && "lg:text-6xl"
      } ${color}`}
    >
      {typeof title === "string" ? title : <>{title}</>}
    </h2>
  );
};

export default SectionTitle;
