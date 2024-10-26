import React from "react";
import ImageSlider from "../components/ImageSlider";

const ImageSliderExample: React.FC = () => {
  const images = [
    "https://via.placeholder.com/800x400?text=Slide+1",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
  ];

  const handleSlideChange = (index: number) => {
    console.log("Slide changed to:", index);
  };

  return (
    <div className="p-4">
      <ImageSlider
        images={images}
        onSlideChange={handleSlideChange}
        autoplay={true}
        autoplayInterval={3000}
        pauseOnHover={true}
        showIndicators={true}
        showArrows={true}
        theme="light"
        tooltip="Slide"
        borderWidth="2"
        animation="transition-transform duration-700 ease-in-out"
        fullscreen={false}
        showThumbnails={true}
        onFocus={() => console.log("Slider focused")}
        onBlur={() => console.log("Slider blurred")}
        onKeyDown={(e) => console.log("Key down on slider", e)}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="示例图片滑块"
      />
    </div>
  );
};

export default ImageSliderExample;