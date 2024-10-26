import React from "react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import Icon from "../components/Icon";

const IconExample: React.FC = () => {
  const handleClick = () => {
    console.log("Icon clicked");
  };

  const handleMouseEnter = () => {
    console.log("Mouse entered icon");
  };

  const handleMouseLeave = () => {
    console.log("Mouse left icon");
  };

  return (
    <div className="p-4">
      <Icon
        icon={AiFillHome}
        name="Home"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        theme="ocean"
        tooltip="Go to home"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        size="2em"
        color="blue"
        ariaLabel="Home icon"
        border={true}
        borderColor="border-blue-500"
        customClass="my-custom-icon"
      />
      <Icon
        icon={AiFillSetting}
        name="Settings"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        theme="forest"
        tooltip="Open settings"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        size="2em"
        color="green"
        ariaLabel="Settings icon"
        border={true}
        borderColor="border-green-500"
        customClass="my-custom-icon"
      />
    </div>
  );
};

export default IconExample;
