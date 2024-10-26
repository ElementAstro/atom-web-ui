import React from "react";
import Divider from "../components/Divider";
import { AiOutlineStar } from "react-icons/ai";

const DividerExample: React.FC = () => {
  const handleHover = () => {
    console.log("Divider hovered");
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Divider clicked", event);
  };

  return (
    <div className="p-4">
      <Divider
        title="Example Divider"
        onHover={handleHover}
        onClick={handleClick}
        draggable={true}
        customClass="my-custom-divider"
        customTitleClass="my-custom-title"
        customLineClass="my-custom-line"
        theme="ocean"
        tooltip="This is a divider"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<AiOutlineStar />}
        ariaLabel="示例分隔符"
      />
    </div>
  );
};

export default DividerExample;