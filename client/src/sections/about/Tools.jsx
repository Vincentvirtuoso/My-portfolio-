import React from "react";
import { FaTools } from "react-icons/fa";

const Tools = ({ tools }) => {
  
  const ToolChip = ({ icon: Icon, label }) => (
    <div className="flex items-center gap-3 bg-card px-4 py-3 rounded-xl border border-border hover:border-brand/50 transition-colors duration-300 group">
      <Icon className="text-brand text-xl group-hover:scale-110 transition-transform" />
      <span className="font-medium text-foreground">{label}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaTools className="text-brand" />
          Development Stack & Tools
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <ToolChip key={index} {...tool} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6">Development Philosophy</h3>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h4 className="text-lg font-semibold mb-3">Code Quality</h4>
            <p className="text-gray-400">
              Emphasizing clean, maintainable code with comprehensive testing, 
              following best practices and design patterns.
            </p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h4 className="text-lg font-semibold mb-3">Continuous Learning</h4>
            <p className="text-gray-400">
              Constantly updating skills through courses, documentation, 
              and hands-on experimentation with new technologies.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Tools;
