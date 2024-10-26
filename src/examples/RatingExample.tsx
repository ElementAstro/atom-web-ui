import React, { useState } from "react";
import Rating from "../components/Rating";

const RatingExample: React.FC = () => {
  const [rating, setRating] = useState(0);

  const handleRate = (rate: number) => {
    setRating(rate);
    console.log("Rated:", rate);
  };

  const handleHover = (rate: number) => {
    console.log("Hovered over:", rate);
  };

  const handleLeave = () => {
    console.log("Mouse left rating");
  };

  return (
    <div className="p-4">
      <Rating
        max={5}
        onRate={handleRate}
        onHover={handleHover}
        onLeave={handleLeave}
        disabled={false}
        size="medium"
        label="Rate this product"
        allowHalf={true}
        clearable={true}
        theme="light"
        tooltip="Rate from 1 to 5 stars"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon="★"
        fullscreen={false}
        border={true}
        borderColor="border-gray-300"
        customClass="my-custom-rating"
        customLabelClass="my-custom-label"
        customIconClass="my-custom-icon"
        customButtonClass="my-custom-button"
      />
      <p className="mt-4">Current Rating: {rating}</p>
    </div>
  );
};

export default RatingExample;