import React from "react";
import CollapseButtonGroup from "../components/CollapseButtonGroup";
import { AiOutlineHome, AiOutlineSetting, AiOutlineInfoCircle } from "react-icons/ai";

const CollapseButtonGroupExample: React.FC = () => {
  const buttons = [
    { label: "Home", value: "home", icon: <AiOutlineHome /> },
    { label: "Settings", value: "settings", icon: <AiOutlineSetting /> },
    { label: "Info", value: "info", icon: <AiOutlineInfoCircle /> },
  ];

  const handleButtonClick = (value: string) => {
    console.log(`Button clicked: ${value}`);
  };

  return (
    <div className="p-4">
      <CollapseButtonGroup
        mainLabel="Menu"
        buttons={buttons}
        onButtonClick={handleButtonClick}
        direction="vertical"
        buttonSize={12}
        buttonColor="bg-gradient-to-r from-purple-500 to-red-500"
        theme="light"
        tooltip="Main Menu"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="left"
        draggable={true}
        resizable={true}
        ariaLabel="Example collapse button group"
      />
    </div>
  );
};

export default CollapseButtonGroupExample;