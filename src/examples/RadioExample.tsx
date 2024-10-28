// RadioExample.tsx
import React, { useState } from "react";
import { Radio } from "../components/Radio";

const RadioExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("option1");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Radio Button Example</h1>
      <div className="space-y-4">
        <Radio
          label="Option 1"
          value="option1"
          checked={selectedValue === "option1"}
          onChange={handleChange}
          color="blue"
          size={10}
        />
        <Radio
          label="Option 2"
          value="option2"
          checked={selectedValue === "option2"}
          onChange={handleChange}
          color="green"
          size={10}
        />
        <Radio
          label="Option 3 (Disabled)"
          value="option3"
          checked={selectedValue === "option3"}
          onChange={handleChange}
          disabled={true}
          color="red"
          size={10}
        />
        <Radio
          label="Option 4 (Error)"
          value="option4"
          checked={selectedValue === "option4"}
          onChange={handleChange}
          color="purple"
          size={10}
          error={true}
        />
      </div>
    </div>
  );
};

export default RadioExample;
