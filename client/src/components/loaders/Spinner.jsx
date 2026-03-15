import React from "react";

const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-4 border-brand/20 border-t-brand rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;
