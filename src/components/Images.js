import React, { useState } from "react";

const Images = ({ images, onImageClick, onImageHover, customClass = "" }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (onImageClick) onImageClick(image);
  };

  return (
    <div className={`grid grid-cols-3 gap-4 ${customClass}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group"
          onClick={() => handleImageClick(image)}
          onMouseEnter={() => onImageHover && onImageHover(image)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto rounded-md shadow-md object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-neon"
          />
        </div>
      ))}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
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
