import React from "react";
import CardMedia from "../components/CardMedia";

function CardMediaExample() {
  const handleActionClick = () => {
    alert("Action button clicked!");
  };

  const handleResize = (width: number, height: number) => {
    console.log(`Resized to width: ${width}, height: ${height}`);
  };

  return (
    <div className="CardMediaExample">
      <CardMedia
        title="Beautiful Landscape"
        subtitle="Nature at its best"
        description="This is a beautiful landscape showcasing the beauty of nature."
        imageSrc="https://example.com/landscape.jpg"
        rating={4.5}
        active={true}
        onActionClick={handleActionClick}
        progress={75}
        badgeLabel="New"
        customClass="my-custom-class"
        customHeaderClass="my-custom-header-class"
        customContentClass="my-custom-content-class"
        customFooterClass="my-custom-footer-class"
        footer={<div>Footer Content</div>}
        resizable={true}
        onResize={handleResize}
        actions={
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Custom Action
          </button>
        }
        backgroundColor="#f0f0f0"
      />
    </div>
  );
}

export default CardMediaExample;
