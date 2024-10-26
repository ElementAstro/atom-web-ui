import React, { useState } from "react";
import Switch from "../components/Switch";

const SwitchExample: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    console.log("Switch toggled:", e.target.checked);
  };

  return (
    <div className="p-4">
      <Switch
        checked={isChecked}
        onChange={handleChange}
        label="示例开关"
        size="medium"
        color="blue"
        tooltip="点击切换"
        theme="light"
        borderWidth="2"
        animation="transition-all duration-300 ease-in-out"
        ariaLabel="示例开关"
      />
    </div>
  );
};

export default SwitchExample;