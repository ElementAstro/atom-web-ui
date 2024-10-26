// src/components/Slides.tsx
import React, { useState, useEffect, FC, ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

interface SlidesProps {
  slides: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  onSlideChange?: (index: number) => void;
  maxWidth?: string;
  maxHeight?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: ReactNode;
  fullscreen?: boolean;
  showThumbnails?: boolean;
  showProgress?: boolean;
  customClass?: string;
  customButtonClass?: string;
  customSlideClass?: string;
  customThumbnailClass?: string;
  prevButtonIcon?: ReactNode;
  nextButtonIcon?: ReactNode;
  prevButtonTooltip?: string;
  nextButtonTooltip?: string;
  prevButtonDisabled?: boolean;
  nextButtonDisabled?: boolean;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
  showIndicators?: boolean;
  indicatorColor?: string;
  indicatorActiveColor?: string;
}

const Slides: FC<SlidesProps> = ({
  slides,
  autoPlay = false,
  interval = 3000,
  onSlideChange,
  maxWidth = "100%",
  maxHeight = "100%",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition-transform duration-700 ease-in-out",
  icon = null,
  fullscreen = false,
  showThumbnails = false,
  showProgress = false,
  customClass = "",
  customButtonClass = "",
  customSlideClass = "",
  customThumbnailClass = "",
  prevButtonIcon = "◀",
  nextButtonIcon = "▶",
  prevButtonTooltip = "Previous Slide",
  nextButtonTooltip = "Next Slide",
  prevButtonDisabled = false,
  nextButtonDisabled = false,
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
  showIndicators = true,
  indicatorColor = "bg-gray-500",
  indicatorActiveColor = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme: currentTheme } = useTheme();

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
      }
    }
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <div
      className={`relative group overflow-hidden ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } ${customClass}`}
      style={{ maxWidth, maxHeight }}
      onClick={handleFullscreen}
    >
      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 z-10 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-full transition transform hover:scale-110 hover:shadow-neon focus:outline-none border-${borderWidth} ${customButtonClass}`}
        aria-label="Previous Slide"
        title={prevButtonTooltip}
        disabled={prevButtonDisabled}
      >
        {prevButtonIcon}
      </button>

      <div className="relative w-full h-full">
        <div
          className={`flex ${animation}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 transition-opacity duration-700 ${customSlideClass}`}
              style={{
                opacity: currentIndex === index ? 1 : 0,
                visibility: currentIndex === index ? "visible" : "hidden",
              }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 z-10 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-full transition transform hover:scale-110 hover:shadow-neon focus:outline-none border-${borderWidth} ${customButtonClass}`}
        aria-label="Next Slide"
        title={nextButtonTooltip}
        disabled={nextButtonDisabled}
      >
        {nextButtonIcon}
      </button>

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`block w-3 h-3 rounded-full cursor-pointer transition duration-300 transform hover:scale-125 ${
                currentIndex === index ? indicatorActiveColor : indicatorColor
              }`}
              onClick={() => {
                setCurrentIndex(index);
                if (onSlideChange) onSlideChange(index);
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showThumbnails && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={(slide as React.ReactElement).props.src}
              alt={`Thumbnail ${index + 1}`}
              className={`w-12 h-12 object-cover rounded cursor-pointer transition duration-300 transform hover:scale-125 ${
                currentIndex === index ? "border-2 border-purple-500" : ""
              } ${customThumbnailClass}`}
              onClick={() => {
                setCurrentIndex(index);
                if (onSlideChange) onSlideChange(index);
              }}
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showProgress && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Slides;
