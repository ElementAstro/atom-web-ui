import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Slides = ({
  slides,
  autoPlay = false,
  interval = 3000,
  onSlideChange,
  maxWidth = "100%",
  maxHeight = "100%",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-transform duration-700 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  showThumbnails = false, // 新增属性
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    if (onSlideChange) onSlideChange(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prevIndex);
    if (onSlideChange) onSlideChange(prevIndex);
  };

  useEffect(() => {
    if (autoPlay) {
      const slideInterval = setInterval(nextSlide, interval);
      return () => clearInterval(slideInterval);
    }
  }, [autoPlay, interval, currentIndex]);

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
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`relative group ${themeClasses[theme || currentTheme]}`}
      style={{ maxWidth, maxHeight }}
      onClick={handleFullscreen}
    >
      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 z-10 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-full transition transform hover:scale-110 hover:shadow-neon focus:outline-none border-${borderWidth}`}
        aria-label="Previous Slide"
        title={tooltip}
      >
        {icon || "◀"}
      </button>

      <div
        className={`h-64 flex ${animation}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 transition-opacity duration-700"
            style={{
              opacity: currentIndex === index ? 1 : 0,
              visibility: currentIndex === index ? "visible" : "hidden",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 z-10 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-full transition transform hover:scale-110 hover:shadow-neon focus:outline-none border-${borderWidth}`}
        aria-label="Next Slide"
        title={tooltip}
      >
        {icon || "▶"}
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full cursor-pointer transition duration-300 transform hover:scale-125 ${
              currentIndex === index
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                : "bg-gray-500"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              if (onSlideChange) onSlideChange(index);
            }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {showThumbnails && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.props.src}
              alt={`Thumbnail ${index + 1}`}
              className={`w-12 h-12 object-cover rounded cursor-pointer transition duration-300 transform hover:scale-125 ${
                currentIndex === index ? "border-2 border-purple-500" : ""
              }`}
              onClick={() => {
                setCurrentIndex(index);
                if (onSlideChange) onSlideChange(index);
              }}
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slides;
