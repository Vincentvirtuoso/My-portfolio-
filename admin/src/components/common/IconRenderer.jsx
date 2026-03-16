import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as SiIcons from "react-icons/si";
import * as LuIcons from "react-icons/lu";

const IconRenderer = ({
  iconName,
  className,
  defaultIcon: DefaultIcon = null,
}) => {
  const IconComponent =
    FaIcons[iconName] ||
    FiIcons[iconName] ||
    SiIcons[iconName] ||
    LuIcons[iconName];
  return IconComponent ? (
    <IconComponent className={className} />
  ) : (
    DefaultIcon && <DefaultIcon className={className} />
  );
};

export default IconRenderer;
