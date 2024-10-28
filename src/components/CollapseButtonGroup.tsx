// src/components/CollapseButtonGroup.tsx
import React, { useState, useRef, DragEvent } from "react";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";
import styled, { css, keyframes } from "styled-components";

interface Button {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
  loading?: boolean;
}

interface CollapseButtonGroupProps {
  mainLabel: string;
  buttons: Button[];
  onButtonClick: (value: string) => void;
  onToggle?: (isOpen: boolean) => void;
  onButtonHover?: (value: string) => void;
  onButtonFocus?: (value: string) => void;
  onButtonBlur?: (value: string) => void;
  direction?: "vertical" | "horizontal";
  disabled?: boolean;
  icon?: React.ReactNode;
  showLabels?: boolean;
  buttonSize?: number;
  buttonColor?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  iconPosition?: "left" | "right";
  draggable?: boolean;
  resizable?: boolean;
  ariaLabel?: string;
  customClass?: string;
  customButtonClass?: string;
  customIconClass?: string;
  customLabelClass?: string;
  customGroupClass?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const expand = keyframes`
  from {
    max-height: 0;
    max-width: 0;
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    max-height: 100vh;
    max-width: 100vw;
    opacity: 1;
    transform: scale(1);
  }
`;

const collapse = keyframes`
  from {
    max-height: 100vh;
    max-width: 100vw;
    opacity: 1;
    transform: scale(1);
  }
  to {
    max-height: 0;
    max-width: 0;
    opacity: 0;
    transform: scale(0.95);
  }
`;

const CollapseButtonGroupWrapper = styled.div<{
  isOpen: boolean;
  isVertical: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => (props.isVertical ? "column" : "row")};
  overflow: hidden;
  ${(props) =>
    props.isOpen
      ? css`
          animation: ${expand} 0.5s forwards;
        `
      : css`
          animation: ${collapse} 0.5s forwards;
        `}
`;

const ButtonWrapper = styled.button<{
  themeClass: string;
  buttonColor: string;
  buttonSize: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: 50%;
  color: white;
  ${(props) => props.themeClass}
  ${(props) => props.buttonColor}
  width: ${(props) => props.buttonSize}rem;
  height: ${(props) => props.buttonSize}rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  background-color: gray;
  cursor: se-resize;
`;

const CollapseButtonGroup: React.FC<CollapseButtonGroupProps> = ({
  mainLabel,
  buttons,
  onButtonClick,
  onToggle,
  onButtonHover,
  onButtonFocus,
  onButtonBlur,
  direction = "vertical",
  disabled = false,
  icon,
  showLabels = true,
  buttonSize = 3, // Default button size in rem
  buttonColor = "bg-gradient-to-r from-purple-500 to-red-500",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "left",
  draggable = false,
  resizable = false,
  ariaLabel = "Collapse button group",
  customClass = "",
  customButtonClass = "",
  customIconClass = "",
  customLabelClass = "",
  customGroupClass = "",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme();
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [groupSize, setGroupSize] = useState({ width: 200, height: 300 });

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (onToggle) onToggle(!isOpen);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && buttonGroupRef.current) {
      e.dataTransfer.setData("text/plain", buttonGroupRef.current.id);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && buttonGroupRef.current) {
      e.preventDefault();
      const droppedGroupId = e.dataTransfer.getData("text/plain");
      const droppedGroup = document.getElementById(droppedGroupId);
      if (droppedGroup && buttonGroupRef.current.parentNode) {
        buttonGroupRef.current.parentNode.insertBefore(
          droppedGroup,
          buttonGroupRef.current.nextSibling
        );
      }
    }
  };

  const handleResizeStart = () => {
    if (resizable) {
      setIsResizing(true);
      document.addEventListener("mousemove", handleResize as EventListener);
      document.addEventListener("mouseup", handleResizeEnd as EventListener);
    }
  };

  const handleResize = (e: globalThis.MouseEvent) => {
    if (isResizing && buttonGroupRef.current) {
      setGroupSize({
        width: e.clientX - buttonGroupRef.current.offsetLeft,
        height: e.clientY - buttonGroupRef.current.offsetTop,
      });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleResize as EventListener);
    document.removeEventListener("mouseup", handleResizeEnd as EventListener);
  };

  const isVertical = direction === "vertical";

  const themeClasses: Record<string, string> = {
    light: "text-gray-900 border-gray-300",
    dark: "text-white border-gray-700",
    astronomy: "text-white border-purple-500",
    eyeCare: "text-green-900 border-green-300",
    astronomyDarkRed: "text-white border-red-500",
  };

  const onMouseEnter = () => {};
  const onMouseLeave = () => {};
  const onFocus = () => {};
  const onBlur = () => {};
  const onKeyDown = () => {};
  const onAnimationEnd = () => {};

  return (
    <div
      ref={buttonGroupRef}
      className={`relative ${customGroupClass}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{
        width: groupSize.width,
        height: groupSize.height,
        textTransform,
        borderStyle,
        borderColor,
        borderWidth,
        backgroundColor: "transparent", // Transparent background
      }}
    >
      <ButtonWrapper
        onClick={toggleOpen}
        themeClass={themeClasses[theme || currentTheme]}
        buttonColor={buttonColor}
        buttonSize={buttonSize}
        title={tooltip || mainLabel}
        disabled={disabled}
        className={customButtonClass}
      >
        <span>
          {icon ? icon : isOpen ? <AiOutlineClose /> : <AiOutlineRight />}
        </span>
      </ButtonWrapper>
      <CollapseButtonGroupWrapper isOpen={isOpen} isVertical={isVertical}>
        {buttons.map((btn, index) => (
          <ButtonWrapper
            key={index}
            onClick={() => onButtonClick(btn.value)}
            onMouseEnter={() => onButtonHover && onButtonHover(btn.value)}
            onFocus={() => onButtonFocus && onButtonFocus(btn.value)}
            onBlur={() => onButtonBlur && onButtonBlur(btn.value)}
            themeClass={themeClasses[theme || currentTheme]}
            buttonColor="bg-gray-700 hover:bg-gray-600"
            buttonSize={buttonSize}
            title={btn.tooltip}
            disabled={btn.disabled}
            className={customButtonClass}
          >
            {iconPosition === "left" && btn.icon && (
              <span className={`mr-2 ${customIconClass}`}>{btn.icon}</span>
            )}
            {showLabels && (
              <span className={customLabelClass}>{btn.label}</span>
            )}
            {iconPosition === "right" && btn.icon && (
              <span className={`ml-2 ${customIconClass}`}>{btn.icon}</span>
            )}
            {btn.loading && (
              <svg
                className="animate-spin h-5 w-5 ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12c0-4.418 1.791-8.365 4.688-11.264l5.688 5.688C9.472 6.112 7.314 9.836 8 12h-4z"
                />
              </svg>
            )}
          </ButtonWrapper>
        ))}
      </CollapseButtonGroupWrapper>
      {resizable && <ResizeHandle onMouseDown={handleResizeStart} />}
    </div>
  );
};

export default CollapseButtonGroup;
