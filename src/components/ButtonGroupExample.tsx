import React from "react";
import ButtonGroup from "../components/ButtonGroup";

const ButtonGroupExample: React.FC = () => {
  const buttons = [
    { label: "Button 1", value: "btn1" },
    { label: "Button 2", value: "btn2", disabled: true },
    { label: "Button 3", value: "btn3" },
  ];

  const handleButtonClick = (value: string) => {
    console.log(`Button clicked: ${value}`);
  };

  return (
    <div className="p-4">
      <ButtonGroup
        buttons={buttons}
        orientation="horizontal"
        onButtonClick={handleButtonClick}
        size="medium"
        disabled={false}
        variant="primary"
        className="my-button-group"
        tooltip="Click a button"
        iconPosition="left"
        animation="transform transition-transform duration-200 ease-in-out"
        onFocus={() => console.log("Button focused")}
        onBlur={() => console.log("Button blurred")}
        onMouseEnter={() => console.log("Mouse entered button")}
        onMouseLeave={() => console.log("Mouse left button")}
        onKeyDown={(event) => console.log("Key down on button", event)}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="Button group"
      />
    </div>
  );
};

export default ButtonGroupExample;