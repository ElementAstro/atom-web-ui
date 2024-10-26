// src/components/Icon.tsx
import {
  FC,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  AnimationEventHandler,
} from "react";
import { IconContext, IconType } from "react-icons";
import { useTheme } from "../context/ThemeContext";

interface IconProps {
  icon?: IconType;
  name?: string;
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
  borderColor?: string;
  customClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
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
  border = false,
  borderColor = "",
  customClass = "",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-125 hover:rotate-12 hover:shadow-neon",
}) => {
  const { theme: currentTheme } = useTheme();

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
      className={`inline-block ${animation} ${hoverAnimation} ${
        border ? `border-${borderWidth} ${borderColor}` : ""
      } ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]} ${
        disabled ? disabledColor : ""
      } ${customClass}`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      onMouseLeave={disabled ? undefined : onMouseLeave}
      onFocus={disabled ? undefined : onFocus}
      onBlur={disabled ? undefined : onBlur}
      onKeyDown={disabled ? undefined : onKeyDown}
      onDoubleClick={disabled ? undefined : onDoubleClick}
      onAnimationEnd={onAnimationEnd}
      title={name || tooltip}
      aria-label={name || ariaLabel}
      tabIndex={0}
      style={{
        color: disabled ? undefined : color,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <IconContext.Provider value={{ size, color: disabled ? undefined : color }}>
        {IconComponent ? <IconComponent /> : name}
      </IconContext.Provider>
    </div>
  );
};

export default Icon;