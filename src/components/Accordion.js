// src/components/Accordion.js
import React, { useState, useEffect } from "react";

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
}) => {
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  return (
    <div className={`border-b last:border-b-0 ${customClass}`}>
      <div
        onClick={onToggle}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        tabIndex={0}
        className={`cursor-pointer p-4 flex justify-between items-center transition-all duration-500 ease-in-out transform-gpu ${
          isOpen
            ? "bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 shadow-2xl"
            : "bg-gray-900"
        } focus:outline-none focus:ring-2 focus:ring-purple-600 ${customTitleClass}`}
      >
        <h3 className="font-semibold text-white">{title}</h3>
        <span
          className={`transform transition-transform duration-500 ${
            isOpen ? "rotate-180 text-yellow-400" : "text-white"
          }`}
        >
          ▲
        </span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div
          className={`p-4 text-white bg-gray-800 border-t border-gray-700 ${customContentClass}`}
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
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={`space-y-2 ${customClass}`}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: index === openIndex,
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
