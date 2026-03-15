import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as SiIcons from "react-icons/si";

const IconRenderer = ({ iconName, className }) => {
  const IconComponent =
    FaIcons[iconName] || FiIcons[iconName] || SiIcons[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

const SkillProgress = ({ skill, level, icon: Icon }) => {
  console.log(Icon);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <IconRenderer iconName={Icon} className="text-purple-500 text-xl" />
          )}
          <span className="font-medium text-foreground">{skill}</span>
        </div>
        <span className="text-sm text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
        />
      </div>
    </div>
  );
};

export default SkillProgress;
