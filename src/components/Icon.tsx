// src/components/Icon.tsx
import {
  FC,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  AnimationEventHandler,
} from "react";
import { IconContext, IconType } from "react-icons";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface IconProps {
  icon?: IconType;
  name?: string; // 新增 name 属性
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onDoubleClick?: MouseEventHandler<HTMLDivElement>;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "sunset" | "ocean" | "forest" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  size?: string;
  color?: string;
  ariaLabel?: string;
  border?: boolean;
  borderColor?: string; // 新增 borderColor 属性
  customClass?: string; // 新增 customClass 属性
}

const Icon: FC<IconProps> = ({
  icon: IconComponent,
  name,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
  onDoubleClick,
  onAnimationEnd,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  size = "lg",
  color = "",
  ariaLabel = "图标",
  border = false, // 解构 border 属性
  borderColor = "", // 解构 borderColor 属性
  customClass = "", // 解构 customClass 属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  type ThemeKeys = "light" | "dark" | "astronomy" | "eyeCare" | "sunset" | "ocean" | "forest" | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "text-gray-900 border-gray-300",
    dark: "text-white border-gray-700",
    astronomy: "text-white border-purple-500",
    eyeCare: "text-green-900 border-green-300",
    sunset: "text-white border-pink-500",
    ocean: "text-white border-teal-500",
    forest: "text-white border-green-900",
    astronomyDarkRed: "text-white border-red-800",
  };

  return (
    <div
      className={`inline-block ${animation} hover:scale-125 hover:rotate-12 hover:shadow-neon ${
        border ? `border-${borderWidth} ${borderColor}` : ""
      } ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]} ${customClass}`} // 使用 customClass 属性
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onDoubleClick={onDoubleClick}
      onAnimationEnd={onAnimationEnd}
      title={name || tooltip} // 使用 name 或 tooltip 作为 title
      aria-label={name || ariaLabel} // 使用 name 或 ariaLabel 作为 aria-label
      tabIndex={0}
    >
      <IconContext.Provider value={{ size, color }}>
        {IconComponent ? <IconComponent /> : name}
      </IconContext.Provider>
    </div>
  );
};

export default Icon;