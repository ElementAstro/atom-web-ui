// RadioGroupExample.tsx
import React, { useState } from "react";
import { RadioGroup } from "../components/RadioGroup";

const RadioGroupExample: React.FC = () => {
  const [selectedValue1, setSelectedValue1] = useState<string>("option1");
  const [selectedValue2, setSelectedValue2] = useState<string>("optionA");

  const handleChange1 = (value: string) => {
    setSelectedValue1(value);
  };

  const handleChange2 = (value: string) => {
    setSelectedValue2(value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Radio Group Example</h1>
      <div className="space-y-8">
        <RadioGroup
          groupLabel="Group 1"
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3 (Disabled)", value: "option3", disabled: true },
          ]}
          selectedValue={selectedValue1}
          onChange={handleChange1}
          color="blue"
          size={10}
          error={selectedValue1 === "option2" ? "Option 2 is not allowed" : ""}
        />
        <RadioGroup
          groupLabel="Group 2"
          options={[
            { label: "Option A", value: "optionA" },
            { label: "Option B", value: "optionB" },
            { label: "Option C", value: "optionC" },
          ]}
          selectedValue={selectedValue2}
          onChange={handleChange2}
          color="green"
          size={10}
        />
      </div>
    </div>
  );
};

export default RadioGroupExample;
