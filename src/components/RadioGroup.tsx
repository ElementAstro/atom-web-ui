import React from "react";
import { Radio } from "./Radio";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  tooltip?: string;
}

interface RadioGroupProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  color?: string;
  size?: number;
  groupLabel?: string;
  name?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  error,
  color = "blue",
  size = 20,
  groupLabel,
  name,
  onFocus,
  onBlur,
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
          tooltip={option.tooltip}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ))}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
