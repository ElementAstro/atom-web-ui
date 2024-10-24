// src/components/Tag.js
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Tag = ({
  children,
  onClick,
  removable,
  onRemove,
  disabled = false,
  size = "medium",
  onHover,
  onFocus,
  onBlur,
}) => {
  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-md px-4 py-2",
  };

  return (
    <span
      className={`inline-flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-full cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-neon ${
        sizeClasses[size]
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
    >
      {children}
      {removable && !disabled && (
        <button
          className="ml-2 text-white hover:text-red-400 transition duration-300"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the tag onClick
            onRemove();
          }}
          aria-label="Remove tag"
        >
          <AiOutlineClose />
        </button>
      )}
    </span>
  );
};

export default Tag;
