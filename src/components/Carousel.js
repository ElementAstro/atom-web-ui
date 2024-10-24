// src/components/Carousel.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Carousel = ({
  items,
  onSlideChange,
  autoPlay = true,
  autoPlayInterval = 3000,
  pauseOnHover = true,
  showIndicators = true,
  showControls = true,
  loop = true,
  theme, 
  animation = "transition-transform duration-700 ease-in-out", 
  showThumbnails = false, 
  keyboardNavigation = true, 
  fullscreen = false, 
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  // 自动轮播的效果
  useEffect(() => {
    if (autoPlay && !isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval); // 每 autoPlayInterval 毫秒切换一次
      return () => clearInterval(interval);
    }
  }, [current, autoPlay, autoPlayInterval, isPaused]);

  useEffect(() => {
    if (keyboardNavigation) {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
          nextSlide();
        } else if (e.key === "ArrowLeft") {
          prevSlide();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [keyboardNavigation]);

  const nextSlide = () => {
    setCurrent((prevIndex) => {
      const newIndex = (prevIndex + 1) % items.length;
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrent((prevIndex) => {
      const newIndex = (prevIndex - 1 + items.length) % items.length;
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleFullscreen = () => {
    if (fullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
  };

  return (
    <div
      className={`relative overflow-hidden ${
        themeClasses[theme || currentTheme]
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleFullscreen}
    >
      {showControls && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold px-4 py-2 rounded-full hover:shadow-neon transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Previous Slide"
        >
          Prev
        </button>
      )}
      <div
        className={`h-64 bg-gray-800 flex justify-center items-center ${animation}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex justify-center items-center text-white text-2xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 transform transition-transform duration-700"
            style={{ opacity: current === index ? 1 : 0.5 }}
          >
            {item}
          </div>
        ))}
      </div>
      {showControls && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold px-4 py-2 rounded-full hover:shadow-neon transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Next Slide"
        >
          Next
        </button>
      )}
      {showIndicators && (
        <div className="flex justify-center mt-4">
          {items.map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer mx-1 w-3 h-3 rounded-full ${
                current === index
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                  : "bg-gray-400"
              } transition duration-300 transform hover:scale-125`}
              onClick={() => {
                setCurrent(index);
                if (onSlideChange) onSlideChange(index);
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      {showThumbnails && (
        <div className="flex justify-center mt-4">
          {items.map((item, index) => (
            <img
              key={index}
              src={item.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className={`cursor-pointer mx-1 w-12 h-12 rounded ${
                current === index ? "border-2 border-purple-500" : ""
              } transition duration-300 transform hover:scale-125`}
              onClick={() => {
                setCurrent(index);
                if (onSlideChange) onSlideChange(index);
              }}
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .h-64 {
            height: 16rem;
          }
          .absolute {
            position: absolute;
          }
          .left-4 {
            left: 1rem;
          }
          .right-4 {
            right: 1rem;
          }
          .top-1/2 {
            top: 50%;
          }
          .transform {
            transform: translateY(-50%);
          }
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .rounded-full {
            border-radius: 9999px;
          }
          .hover\\:shadow-neon:hover {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }
          .transition {
            transition: all 0.3s ease;
          }
          .duration-300 {
            transition-duration: 300ms;
          }
          .shadow-lg {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          .focus\\:outline-none:focus {
            outline: none;
          }
          .focus\\:ring-2:focus {
            box-shadow: 0 0 0 2px rgba(128, 90, 213, 0.5);
          }
          .focus\\:ring-purple-600:focus {
            box-shadow: 0 0 0 2px rgba(128, 90, 213, 0.5);
          }
          .bg-gradient-to-r {
            background-image: linear-gradient(
              to right,
              var(--tw-gradient-stops)
            );
          }
          .from-purple-500 {
            --tw-gradient-from: #9f7aea;
            --tw-gradient-stops: var(--tw-gradient-from),
              var(--tw-gradient-to, rgba(159, 122, 234, 0));
          }
          .via-pink-500 {
            --tw-gradient-stops: var(--tw-gradient-from), #ed64a6,
              var(--tw-gradient-to, rgba(237, 100, 166, 0));
          }
          .to-red-500 {
            --tw-gradient-to: #f56565;
          }
          .text-white {
            color: #fff;
          }
          .font-bold {
            font-weight: 700;
          }
          .hover\\:scale-125:hover {
            transform: scale(1.25);
          }
          .transition-transform {
            transition-property: transform;
          }
          .duration-700 {
            transition-duration: 700ms;
          }
          .ease-in-out {
            transition-timing-function: ease-in-out;
          }
          .transform {
            transform: translateX(0);
          }
          .flex-shrink-0 {
            flex-shrink: 0;
          }
          .w-full {
            width: 100%;
          }
          .h-full {
            height: 100%;
          }
          .justify-center {
            justify-content: center;
          }
          .items-center {
            align-items: center;
          }
          .text-2xl {
            font-size: 1.5rem;
          }
          .bg-gradient-to-r {
            background-image: linear-gradient(
              to right,
              var(--tw-gradient-stops)
            );
          }
          .from-gray-700 {
            --tw-gradient-from: #4a5568;
            --tw-gradient-stops: var(--tw-gradient-from),
              var(--tw-gradient-to, rgba(74, 85, 104, 0));
          }
          .via-gray-800 {
            --tw-gradient-stops: var(--tw-gradient-from), #2d3748,
              var(--tw-gradient-to, rgba(45, 55, 72, 0));
          }
          .to-gray-900 {
            --tw-gradient-to: #1a202c;
          }
          .opacity-50 {
            opacity: 0.5;
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .mx-1 {
            margin-left: 0.25rem;
            margin-right: 0.25rem;
          }
          .w-3 {
            width: 0.75rem;
          }
          .h-3 {
            height: 0.75rem;
          }
          .rounded-full {
            border-radius: 9999px;
          }
          .bg-gray-400 {
            background-color: #cbd5e0;
          }
          .transition {
            transition: all 0.3s ease;
          }
          .duration-300 {
            transition-duration: 300ms;
          }
          .transform {
            transform: scale(1);
          }
          .hover\\:scale-125:hover {
            transform: scale(1.25);
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
