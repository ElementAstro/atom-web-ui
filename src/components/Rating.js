// src/components/Rating.js
import React, { useState } from "react";

const Rating = ({
  max = 5,
  onRate,
  onHover,
  onLeave,
  disabled = false,
  size = "medium",
  label,
  onFocus,
  onBlur,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = (rate) => {
    if (disabled) return;
    setRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate) => {
    if (disabled) return;
    setHoverRating(rate);
    if (onHover) {
      onHover(rate);
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(0);
    if (onLeave) {
      onLeave();
    }
  };

  const sizeClasses = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-5xl",
  };

  return (
    <div className="flex flex-col items-center">
      {label && <span className="mb-2 text-gray-200">{label}</span>}
      <div
        className="flex space-x-1"
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        role="radiogroup"
        aria-disabled={disabled}
      >
        {[...Array(max)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleRate(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer ${
              sizeClasses[size]
            } transition duration-300 transform ${
              index < (hoverRating || rating)
                ? "text-yellow-500 scale-110"
                : "text-gray-300"
            } hover:scale-125 hover:text-blue-500 hover:shadow-neon ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            role="radio"
            aria-checked={index < rating}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
