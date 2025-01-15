// src/components/Accordion.tsx
import React, { useState, useEffect, ReactNode, KeyboardEvent } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  motion,
  AnimatePresence,
  Variants,
  TargetAndTransition,
} from "framer-motion";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  customClass?: string;
  customTitleClass?: string;
  customContentClass?: string;
  icon?: string;
  disabled?: boolean;
  animation?: string;
  iconOpen?: string;
  iconClose?: string;
  iconPosition?: "left" | "right";
  // maxHeight?: string; // 如果未使用，可考虑移除
  titleBgColor?: string;
  titleTextColor?: string;
  contentBgColor?: string;
  contentTextColor?: string;
  borderColor?: string;
  borderWidth?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  tooltip?: string;
  // 新增动画相关props
  animationType?:
    | "fade"
    | "slide"
    | "scale"
    | "rotate"
    | "flip"
    | "bounce"
    | "zoom";
  animationDuration?: number;
  animationEasing?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
    restDelta?: number;
    restSpeed?: number;
  };
  enterAnimation?: Variants;
  exitAnimation?: Variants;
  whileHover?: TargetAndTransition | string;
  whileTap?: TargetAndTransition | string;
  whileFocus?: TargetAndTransition | string;
  onAnimationStart?: (type: "enter" | "exit") => void;
  onAnimationComplete?: (type: "enter" | "exit") => void;
  onAnimationCancel?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onTapStart?: () => void;
  onTapCancel?: () => void;
  onFocusStart?: () => void;
  onFocusEnd?: () => void;
}

type Theme =
  | "light"
  | "dark"
  | "astronomy"
  | "eyeCare"
  | "ocean"
  | "sunset"
  | "astronomyDarkRed";

// 默认动画配置
const defaultAnimations: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  rotate: {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 90, opacity: 0 },
  },
  flip: {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
  },
  bounce: {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  },
  zoom: {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  },
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onToggle,
  onOpen,
  onClose,
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  customClass = "",
  customTitleClass = "",
  customContentClass = "",
  icon = "▲",
  disabled = false,
  animation = "transform transition-transform duration-500",
  iconOpen = "▼",
  iconClose = "▲",
  iconPosition = "right",
  // maxHeight = "max-h-screen", // 如果未使用，可考虑移除
  titleBgColor,
  titleTextColor,
  contentBgColor,
  contentTextColor,
  borderColor,
  borderWidth = "border-b",
  hoverBgColor,
  hoverTextColor,
  tooltip = "",
  // 新增props默认值
  animationType = "fade",
  animationDuration = 0.3,
  animationEasing = "easeInOut",
  springConfig = {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  },
  enterAnimation,
  exitAnimation,
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  whileFocus = { scale: 1.02 },
}) => {
  // 获取动画配置
  const animationConfig =
    enterAnimation && exitAnimation
      ? {
          initial:
            enterAnimation.initial || defaultAnimations[animationType].initial,
          animate:
            enterAnimation.animate || defaultAnimations[animationType].animate,
          exit: exitAnimation.exit || defaultAnimations[animationType].exit,
        }
      : defaultAnimations[animationType];
  const { theme } = useTheme() as { theme: Theme };

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  const themeClasses: Record<
    Theme,
    { container: string; title: string; content: string }
  > = {
    light: {
      container: "bg-gray-100 text-gray-900",
      title: "bg-gray-200",
      content: "bg-gray-100 border-gray-300",
    },
    dark: {
      container: "bg-gray-900 text-white",
      title: "bg-gray-800",
      content: "bg-gray-900 border-gray-700",
    },
    astronomy: {
      container:
        "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
      title: "bg-gradient-to-r from-purple-800 via-blue-800 to-black",
      content:
        "bg-gradient-to-r from-purple-900 via-blue-900 to-black border-gray-700",
    },
    eyeCare: {
      container: "bg-green-100 text-green-900",
      title: "bg-green-200",
      content: "bg-green-100 border-green-300",
    },
    ocean: {
      container: "bg-blue-100 text-blue-900",
      title: "bg-blue-200",
      content: "bg-blue-100 border-blue-300",
    },
    sunset: {
      container: "bg-orange-100 text-orange-900",
      title: "bg-orange-200",
      content: "bg-orange-100 border-orange-300",
    },
    astronomyDarkRed: {
      container: "bg-gradient-to-r from-red-900 via-black to-black text-white",
      title: "bg-gradient-to-r from-red-800 via-black to-black",
      content:
        "bg-gradient-to-r from-red-900 via-black to-black border-gray-700",
    },
  };

  return (
    <motion.div
      className={`border-b last:border-b-0 ${customClass} ${themeClasses[theme].container}`}
      whileHover={whileHover}
      whileTap={whileTap}
      whileFocus={whileFocus}
    >
      <motion.div
        onClick={(e) => {
          if (!disabled) {
            onToggle();
          }
        }}
        onMouseEnter={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (!disabled) {
            if (e.key === "Enter") onToggle();
            if (onKeyDown) onKeyDown(e);
          }
        }}
        tabIndex={0}
        className={`cursor-pointer p-4 flex justify-between items-center transition-all duration-500 ease-in-out transform-gpu ${
          isOpen
            ? "bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 shadow-2xl"
            : themeClasses[theme].title
        } focus:outline-none focus:ring-2 focus:ring-purple-600 ${customTitleClass} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${titleBgColor} ${titleTextColor} ${hoverBgColor} ${hoverTextColor}`}
        title={tooltip}
        whileHover={whileHover}
        whileTap={whileTap}
        whileFocus={whileFocus}
      >
        <h3 className="font-semibold">{title}</h3>
        <motion.span
          className={`${animation} ${
            isOpen ? "rotate-180 text-yellow-400" : "text-white"
          } ${iconPosition === "left" ? "order-first mr-2" : "ml-2"}`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", ...springConfig }}
        >
          {isOpen ? iconOpen : iconClose}
        </motion.span>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationConfig}
            transition={{
              duration: animationDuration,
              ease: animationEasing,
              type: "spring",
              ...springConfig,
            }}
          >
            <div
              className={`p-4 ${themeClasses[theme].content} ${customContentClass} ${contentBgColor} ${contentTextColor} ${borderColor} ${borderWidth}`}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface AccordionProps {
  children: ReactNode;
  onItemOpen?: (index: number) => void;
  onItemClose?: (index: number) => void;
  customClass?: string;
  customItemClass?: string;
  customTitleClass?: string;
  customContentClass?: string;
  multiOpen?: boolean;
  defaultOpenIndex?: number | null;
  allOpen?: boolean;
  allClose?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  onItemOpen,
  onItemClose,
  customClass = "",
  customItemClass = "",
  customTitleClass = "",
  customContentClass = "",
  multiOpen = false,
  defaultOpenIndex = null,
  allOpen = false,
  allClose = false,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(
    multiOpen ? [] : defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  useEffect(() => {
    if (allOpen) {
      setOpenIndices(React.Children.map(children, (_, index) => index) || []);
    } else if (allClose) {
      setOpenIndices([]);
    }
  }, [allOpen, allClose, children]);

  const toggleItem = (index: number) => {
    if (multiOpen) {
      setOpenIndices((prevIndices) =>
        prevIndices.includes(index)
          ? prevIndices.filter((i) => i !== index)
          : [...prevIndices, index]
      );
    } else {
      setOpenIndices((prevIndices) =>
        prevIndices.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`space-y-2 ${customClass}`}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement<any>, {
          isOpen: openIndices.includes(index),
          onToggle: () => toggleItem(index),
          onOpen: () => onItemOpen && onItemOpen(index),
          onClose: () => onItemClose && onItemClose(index),
          customClass: customItemClass,
          customTitleClass: customTitleClass,
          customContentClass: customContentClass,
        })
      )}
    </div>
  );
};

export { Accordion, AccordionItem };
