import React, { useState, useEffect } from "react";

const Slides = ({
  slides,
  autoPlay = false,
  interval = 3000,
  onSlideChange,
  maxWidth = "100%",
  maxHeight = "100%",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="relative group" style={{ maxWidth, maxHeight }}>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-full transition transform hover:scale-110 hover:shadow-neon focus:outline-none"
        aria-label="Previous Slide"
      >
        ◀
      </button>

      <div
        className="h-64 flex transition-transform duration-700 ease-in-out"
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
        className="absolute right-4 top-1/2 z-10 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-full transition transform hover:scale-110 hover:shadow-neon focus:outline-none"
        aria-label="Next Slide"
      >
        ▶
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
    </div>
  );
};

export default Slides;
