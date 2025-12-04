import { motion } from 'framer-motion';

const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  size = "md", // sm, md, lg
  color = "text-brand",
  bgGradient = "from-white/5 to-transparent",
  className = "",
  onClick,
  ...rest
}) => {
  // Adjust padding and text size based on size prop
  const sizeClasses = {
    sm: "p-4 text-sm",
    md: "p-6 text-base",
    lg: "p-8 text-lg",
  };

  const valueSize = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const labelSize = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const descSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      onClick={onClick}
      className={`bg-gradient-to-br ${bgGradient} ${sizeClasses[size]} rounded-2xl border border-gray-800/50 backdrop-blur-sm cursor-pointer ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-4 mb-4">
        {Icon && <Icon className={`${color} ${valueSize[size]}`} />}
        <div className={`font-bold text-white ${valueSize[size]}`}>{value}</div>
      </div>
      <h4 className={`font-semibold text-white mb-2 ${labelSize[size]}`}>{label}</h4>
      {description && <p className={`text-gray-400 ${descSize[size]}`}>{description}</p>}
    </motion.div>
  );
};


export default StatCard;
