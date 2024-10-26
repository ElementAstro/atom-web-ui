import React from "react";
import Images from "../components/Images";

const ImagesExample: React.FC = () => {
  const images = [
    { src: "https://via.placeholder.com/150", alt: "Image 1" },
    { src: "https://via.placeholder.com/150", alt: "Image 2" },
    { src: "https://via.placeholder.com/150", alt: "Image 3" },
    { src: "https://via.placeholder.com/150", alt: "Image 4" },
    { src: "https://via.placeholder.com/150", alt: "Image 5" },
    { src: "https://via.placeholder.com/150", alt: "Image 6" },
  ];

  const handleImageClick = (image: { src: string; alt: string }) => {
    console.log("Image clicked:", image);
  };

  const handleImageHover = (image: { src: string; alt: string }) => {
    console.log("Image hovered:", image);
  };

  return (
    <div className="p-4">
      <Images
        images={images}
        onImageClick={handleImageClick}
        onImageHover={handleImageHover}
        customClass="my-custom-images"
        theme="light"
        tooltip="Click to enlarge"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        fullscreen={true}
        autoClose={true}
        autoCloseDuration={5000}
        onFocus={() => console.log("Images focused")}
        onBlur={() => console.log("Images blurred")}
        onKeyDown={(e) => console.log("Key down on images", e)}
        onMouseEnter={() => console.log("Mouse entered images")}
        onMouseLeave={() => console.log("Mouse left images")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="示例图片画廊"
      />
    </div>
  );
};

export default ImagesExample;