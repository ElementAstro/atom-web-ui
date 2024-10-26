import React from "react";
import Slides from "../components/Slides";

const SlidesExample: React.FC = () => {
  const slides = [
    <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" />,
    <img src="https://via.placeholder.com/800x400?text=Slide+2" alt="Slide 2" />,
    <img src="https://via.placeholder.com/800x400?text=Slide+3" alt="Slide 3" />,
  ];

  const handleSlideChange = (index: number) => {
    console.log("Slide changed to:", index);
  };

  return (
    <div className="p-4">
      <Slides
        slides={slides}
        autoPlay={true}
        interval={3000}
        onSlideChange={handleSlideChange}
        maxWidth="800px"
        maxHeight="400px"
        theme="ocean"
        tooltip="Slide"
        borderWidth="2"
        animation="transition-transform duration-700 ease-in-out"
        icon={null}
        fullscreen={false}
        showThumbnails={true}
        customClass="my-custom-slides"
        customButtonClass="my-custom-button"
        customSlideClass="my-custom-slide"
        customThumbnailClass="my-custom-thumbnail"
      />
    </div>
  );
};

export default SlidesExample;