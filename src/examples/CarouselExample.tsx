import React from "react";
import Carousel from "../components/Carousel";

const CarouselExample: React.FC = () => {
  const items = [
    { content: <div>Slide 1</div>, thumbnail: "https://via.placeholder.com/150" },
    { content: <div>Slide 2</div>, thumbnail: "https://via.placeholder.com/150" },
    { content: <div>Slide 3</div>, thumbnail: "https://via.placeholder.com/150" },
  ];

  const handleSlideChange = (index: number) => {
    console.log(`Slide changed to: ${index}`);
  };

  return (
    <div className="p-4">
      <Carousel
        items={items}
        onSlideChange={handleSlideChange}
        autoPlay={true}
        autoPlayInterval={3000}
        pauseOnHover={true}
        showIndicators={true}
        showControls={true}
        theme="light"
        animation="transition-transform duration-700 ease-in-out"
        showThumbnails={true}
        keyboardNavigation={true}
        fullscreen={false}
        customClass="my-carousel"
        onFocus={() => console.log("Carousel focused")}
        onBlur={() => console.log("Carousel blurred")}
        onKeyDown={(e) => console.log("Key down on carousel", e)}
        onMouseEnter={() => console.log("Mouse entered carousel")}
        onMouseLeave={() => console.log("Mouse left carousel")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="Example Carousel"
      />
    </div>
  );
};

export default CarouselExample;