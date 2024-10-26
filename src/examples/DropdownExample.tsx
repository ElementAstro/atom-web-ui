import React from "react";
import Dropdown from "../components/Dropdown";

const DropdownExample: React.FC = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleOptionSelect = (option: string) => {
    console.log("Selected option:", option);
  };

  const handleDropdownToggle = (isOpen: boolean) => {
    console.log("Dropdown is open:", isOpen);
  };

  return (
    <div className="p-4">
      <Dropdown
        options={options}
        label="Select an option"
        onOptionSelect={handleOptionSelect}
        onDropdownToggle={handleDropdownToggle}
        multiSelect={false}
        customClass="my-custom-dropdown"
        customButtonClass="my-custom-button"
        customInputClass="my-custom-input"
        customOptionClass="my-custom-option"
        customSelectedClass="my-custom-selected"
        theme="light"
        tooltip="Choose an option"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        disabled={false}
        onHover={() => console.log("Option hovered")}
        onFocus={(event) => console.log("Dropdown focused", event)}
        onBlur={(event) => console.log("Dropdown blurred", event)}
        onKeyDown={(event) => console.log("Key down on dropdown", event)}
        onMouseEnter={(event) => console.log("Mouse entered dropdown", event)}
        onMouseLeave={(event) => console.log("Mouse left dropdown", event)}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="示例下拉菜单"
      />
    </div>
  );
};

export default DropdownExample;