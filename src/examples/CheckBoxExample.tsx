import React, { useState } from "react";
import CheckBox from "../components/CheckBox";

const CheckBoxExample: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    console.log("Checkbox checked:", event.target.checked);
  };

  return (
    <div className="p-4">
      <CheckBox
        checked={isChecked}
        onChange={handleChange}
        label="Example Checkbox"
        disabled={false}
        size="medium"
        theme="light"
        tooltip="This is a checkbox"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        ariaLabel="Example Checkbox"
        indeterminate={false}
        customClass="my-custom-checkbox"
        customLabelClass="my-custom-label"
        customBoxClass="my-custom-box"
        customIconClass="my-custom-icon"
        onFocus={() => console.log("Checkbox focused")}
        onBlur={() => console.log("Checkbox blurred")}
        onToggle={(checked) => console.log("Checkbox toggled:", checked)}
        onKeyDown={(event) => console.log("Key down on checkbox", event)}
        onMouseEnter={() => console.log("Mouse entered checkbox")}
        onMouseLeave={() => console.log("Mouse left checkbox")}
        onAnimationEnd={() => console.log("Animation ended")}
      />
    </div>
  );
};

export default CheckBoxExample;