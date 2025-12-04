import { motion } from 'framer-motion'

const SkillProgress = ({ skill, level, icon: Icon }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-brand text-xl" />}
        <span className="font-medium text-white">{skill}</span>
      </div>
      <span className="text-sm text-gray-400">{level}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-brand to-brand-dark rounded-full"
      />
    </div>
  </div>
);


export default SkillProgress