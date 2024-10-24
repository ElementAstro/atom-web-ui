import React from "react";

const SkeletonScreen = ({
  width = "100%",
  height = "20px",
  shape = "rectangle",
  className = "",
  onHover,
  onFocus,
  onBlur,
}) => {
  const shapeClasses = {
    rectangle: "rounded",
    circle: "rounded-full",
  };

  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 ${shapeClasses[shape]} ${className}`}
      style={{ width, height }}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      role="status"
      aria-label="Loading..."
    />
  );
};

export default SkeletonScreen;
