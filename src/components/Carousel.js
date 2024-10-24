// src/components/Carousel.js
import React, { useState, useEffect } from "react";

const Carousel = ({
  items,
  onSlideChange,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [current, setCurrent] = useState(0);

  // 自动轮播的效果
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval); // 每 autoPlayInterval 毫秒切换一次
      return () => clearInterval(interval);
    }
  }, [current, autoPlay, autoPlayInterval]);

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

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold px-4 py-2 rounded-full hover:shadow-neon transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        aria-label="Previous Slide"
      >
        Prev
      </button>
      <div
        className="h-64 bg-gray-800 flex justify-center items-center transition-transform duration-700 ease-in-out transform"
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
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold px-4 py-2 rounded-full hover:shadow-neon transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        aria-label="Next Slide"
      >
        Next
      </button>
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
    </div>
  );
};

export default Carousel;
