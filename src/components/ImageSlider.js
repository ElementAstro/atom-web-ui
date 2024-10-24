// src/components/ImageSlider.js
import React, { useState, useEffect } from "react";

const ImageSlider = ({ images, onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      if (onSlideChange) onSlideChange((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex, onSlideChange]);

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

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 bg-gray-800 bg-opacity-50 rounded-full p-2 m-2 transition duration-300 transform hover:scale-110 hover:shadow-neon"
      >
        ◀
      </button>

      <div
        className="transition-transform duration-700 ease-in-out transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 bg-gray-800 bg-opacity-50 rounded-full p-2 m-2 transition duration-300 transform hover:scale-110 hover:shadow-neon"
      >
        ▶
      </button>

      <div className="absolute bottom-4 left-0 right-0 text-center text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageSlider;
