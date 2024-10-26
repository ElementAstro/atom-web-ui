import React from "react";
import Masonry from "../components/Masonry";

const MasonryExample: React.FC = () => {
  const items = [
    <div key="1" className="bg-red-200 p-4">Item 1</div>,
    <div key="2" className="bg-green-200 p-4">Item 2</div>,
    <div key="3" className="bg-blue-200 p-4">Item 3</div>,
    <div key="4" className="bg-yellow-200 p-4">Item 4</div>,
    <div key="5" className="bg-purple-200 p-4">Item 5</div>,
    <div key="6" className="bg-pink-200 p-4">Item 6</div>,
  ];

  return (
    <div className="p-4">
      <Masonry
        items={items}
        columns={3}
        gap={4}
        bgColor="gray-100"
        textColor="black"
        customClass="my-custom-masonry"
        customItemClass="my-custom-masonry-item"
        renderItem={(item) => <div className="rounded shadow">{item}</div>}
      />
    </div>
  );
};

export default MasonryExample;