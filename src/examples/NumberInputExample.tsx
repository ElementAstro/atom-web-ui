import React, { useState } from "react";
import NumberInput from "../components/NumberInput";

const NumberInputExample: React.FC = () => {
  const [value, setValue] = useState<number>(10);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    console.log("Value changed:", newValue);
  };

  return (
    <div className="p-4">
      <NumberInput
        min={0}
        max={100}
        step={1}
        initialValue={value}
        onValueChange={handleValueChange}
        theme="ocean"
        tooltip="Adjust the value"
        borderWidth="2"
        animation="transition-transform duration-300 ease-in-out"
      />
      <p className="mt-4">Current Value: {value}</p>
    </div>
  );
};

export default NumberInputExample;