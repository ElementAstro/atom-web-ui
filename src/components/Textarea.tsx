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
}) => {
  const { theme } = useTheme() as { theme: keyof typeof themeClasses }; // 使用主题上下文

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
      />
      {showCharCount && maxLength && (
        <div className="absolute bottom-1 right-2 text-sm text-gray-500">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default Textarea;
