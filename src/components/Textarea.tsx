// src/components/Textarea.tsx
import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext"; // 导入主题上下文

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  customClass?: string;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  label?: string;
  error?: string;
  required?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const StyledTextarea = styled.textarea<{ customClass?: string }>`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
  ${(props) => props.customClass && props.customClass}
`;

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = "",
  customClass = "",
  rows = 4,
  cols = 50,
  disabled = false,
  maxLength,
  showCharCount = false,
  borderColor,
  backgroundColor,
  label,
  error,
  required = false,
  onFocus,
  onBlur,
}) => {
  const { theme } = useTheme() as { theme: keyof typeof themeClasses };

  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
    sunset:
      "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white",
    ocean: "bg-blue-500 text-white",
  };

  return (
    <div className={`relative ${themeClasses[theme]}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <StyledTextarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${customClass} ${
          borderColor ? `border-${borderColor}` : ""
        } ${backgroundColor ? `bg-${backgroundColor}` : ""}`}
        rows={rows}
        cols={cols}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showCharCount && maxLength && (
        <div className="absolute bottom-1 right-2 text-sm text-gray-500">
          {value.length}/{maxLength}
        </div>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default Textarea;
