// src/components/ImageSlider.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const ImageSlider = ({
  images,
  onSlideChange,
  autoplay = true,
  autoplayInterval = 3000,
  pauseOnHover = true,
  showIndicators = true,
  showArrows = true,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-transform duration-700 ease-in-out", // 新增属性
  fullscreen = false, // 新增属性
  showThumbnails = false, // 新增属性
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (autoplay && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        if (onSlideChange) onSlideChange((currentIndex + 1) % images.length);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [
    images.length,
    currentIndex,
    onSlideChange,
    autoplay,
    autoplayInterval,
    isPaused,
  ]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    if (onSlideChange) onSlideChange((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    if (onSlideChange)
      onSlideChange((currentIndex - 1 + images.length) % images.length);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
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
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`image-slider relative overflow-hidden ${
        themeClasses[theme || currentTheme]
      } rounded-lg shadow-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleFullscreen}
    >
      {showArrows && (
        <button
          onClick={prevSlide}
          className="image-slider__button absolute left-0 z-10 bg-gray-800 bg-opacity-50 rounded-full p-2 m-2 transition duration-300 transform hover:scale-110 hover:shadow-neon"
          title={tooltip}
        >
          ◀
        </button>
      )}

      <div
        className={`image-slider__slides ${animation} transform`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`image-slider__image w-full h-64 object-cover rounded-lg shadow-md border-${borderWidth}`}
          />
        ))}
      </div>

      {showArrows && (
        <button
          onClick={nextSlide}
          className="image-slider__button absolute right-0 z-10 bg-gray-800 bg-opacity-50 rounded-full p-2 m-2 transition duration-300 transform hover:scale-110 hover:shadow-neon"
          title={tooltip}
        >
          ▶
        </button>
      )}

      {showIndicators && (
        <div className="image-slider__indicator absolute bottom-4 left-0 right-0 text-center text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {showThumbnails && (
        <div className="image-slider__thumbnails flex justify-center mt-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`cursor-pointer mx-1 w-12 h-12 rounded ${
                currentIndex === index ? "border-2 border-purple-500" : ""
              } transition duration-300 transform hover:scale-125`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .image-slider {
            height: auto;
          }
          .image-slider__image {
            height: 48vw; /* 48% of viewport width */
          }
          .image-slider__button {
            p-1;
            m-1;
          }
          .image-slider__indicator {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
