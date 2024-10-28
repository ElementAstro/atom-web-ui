import React from "react";
import { Radio } from "./Radio";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  color?: string;
  size?: number;
  groupLabel?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  error,
  color = "blue",
  size = 20,
  groupLabel,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      {groupLabel && <h3 className="text-lg font-semibold">{groupLabel}</h3>}
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
          disabled={option.disabled}
          color={color}
          size={size}
        />
      ))}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
