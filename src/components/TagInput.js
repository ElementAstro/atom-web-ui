// src/components/TagInput.js
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const TagInput = ({
  onTagAdd,
  onTagRemove,
  maxTags = 10,
  onMaxTagsReached,
  tagColors = { background: "bg-blue-500", text: "text-white" },
  disabled = false,
  placeholder = "添加标签",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition duration-300 transform hover:scale-105", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  draggable = false, // 新增属性
}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue && tags.length < maxTags) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue("");
      if (onTagAdd) onTagAdd(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && tags.length) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      if (onTagRemove) onTagRemove(tags[tags.length - 1]);
    }
    if (tags.length >= maxTags && onMaxTagsReached) {
      onMaxTagsReached();
    }
  };

  const handleDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    if (onTagRemove) onTagRemove(tags[index]);
  };

  const handleDragStart = (e, index) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", index);
    }
  };

  const handleDrop = (e, index) => {
    if (draggable) {
      const draggedIndex = e.dataTransfer.getData("text/plain");
      const newTags = [...tags];
      const [draggedTag] = newTags.splice(draggedIndex, 1);
      newTags.splice(index, 0, draggedTag);
      setTags(newTags);
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`flex flex-col ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      <div
        className={`flex flex-wrap border-${borderWidth} rounded-lg p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`${tagColors.background} ${tagColors.text} rounded-full px-3 py-1 mr-2 mb-2 ${animation}`}
            draggable={draggable}
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            title={tooltip}
          >
            {icon && <span className="mr-2">{icon}</span>}
            {tag}
            {!disabled && (
              <button
                onClick={() => handleDelete(index)}
                className="ml-1 text-red-300 hover:text-red-500 transition duration-300"
              >
                <AiOutlineClose />
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="border-none outline-none bg-transparent text-white placeholder-gray-400 transition duration-300 transform hover:scale-105"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TagInput;
