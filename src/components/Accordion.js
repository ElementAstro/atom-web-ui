// src/components/Accordion.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  onOpen,
  onClose,
  customClass = "",
  customTitleClass = "",
  customContentClass = "",
  icon = "▲",
  disabled = false,
  animation = "transform transition-transform duration-500",
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  const themeClasses = {
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
  };

  return (
    <div
      className={`border-b last:border-b-0 ${customClass} ${themeClasses[theme].container}`}
    >
      <div
        onClick={!disabled ? onToggle : undefined}
        onKeyDown={(e) => !disabled && e.key === "Enter" && onToggle()}
        tabIndex={0}
        className={`cursor-pointer p-4 flex justify-between items-center transition-all duration-500 ease-in-out transform-gpu ${
          isOpen
            ? "bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 shadow-2xl"
            : themeClasses[theme].title
        } focus:outline-none focus:ring-2 focus:ring-purple-600 ${customTitleClass} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <h3 className="font-semibold">{title}</h3>
        <span
          className={`${animation} ${
            isOpen ? "rotate-180 text-yellow-400" : "text-white"
          }`}
        >
          {icon}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div
          className={`p-4 ${themeClasses[theme].content} ${customContentClass}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  children,
  onItemOpen,
  onItemClose,
  customClass = "",
  customItemClass = "",
  customTitleClass = "",
  customContentClass = "",
  multiOpen = false,
  defaultOpenIndex = null,
}) => {
  const [openIndices, setOpenIndices] = useState(
    multiOpen ? [] : defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const toggleItem = (index) => {
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
        React.cloneElement(child, {
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
