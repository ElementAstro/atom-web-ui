import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Images = ({
  images,
  onImageClick,
  onImageHover,
  customClass = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (onImageClick) onImageClick(image);
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
    <div className={`grid grid-cols-3 gap-4 ${customClass}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group"
          onClick={() => handleImageClick(image)}
          onMouseEnter={() => onImageHover && onImageHover(image)}
          title={tooltip}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-auto rounded-md shadow-md object-cover ${animation} group-hover:scale-105 group-hover:shadow-neon border-${borderWidth} ${
              themeClasses[theme || currentTheme]
            }`}
          />
        </div>
      ))}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleFullscreen}
        >
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-auto h-auto max-w-full max-h-full rounded-md shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
