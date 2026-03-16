import React from "react";
import { FaTools, FaServer, FaPalette } from "react-icons/fa";
import SkillProgress from "../../components/common/SkillProgress";
import { motion } from "framer-motion";
import IconRenderer from "../../components/common/IconRenderer";

const Skills = ({ technicalSkills, specializations }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaTools className="text-brand" />
          Technical Proficiency
        </h3>
        <div className="space-y-6">
          {technicalSkills.map((skill, index) => (
            <SkillProgress key={index} {...skill} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6">Specializations</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {specializations?.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-card border border-border backdrop-blur-md 
                hover:bg-white/10 transition rounded-2xl"
            >
              <IconRenderer
                iconName={spec.icon}
                className="text-brand text-3xl mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">
                Backend Development
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>• RESTful API Design</li>
                <li>• Database Architecture</li>
                <li>• Authentication & Security</li>
                <li>• Performance Optimization</li>
              </ul>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-card border border-border backdrop-blur-md 
            hover:bg-white/10 transition rounded-2xl"
          >
            <FaPalette className="text-brand text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Frontend Development</h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Modern React Patterns</li>
              <li>• Responsive Design</li>
              <li>• State Management</li>
              <li>• UI/UX Implementation</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
