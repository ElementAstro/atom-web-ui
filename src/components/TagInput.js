// src/components/TagInput.js
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagInput = ({ onTagAdd, onTagRemove }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
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
  };

  const handleDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    if (onTagRemove) onTagRemove(tags[index]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap border border-gray-500 rounded-lg p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white rounded-full px-3 py-1 mr-2 mb-2 transition duration-300 transform hover:scale-105 hover:shadow-neon"
          >
            {tag}
            <button
              onClick={() => handleDelete(index)}
              className="ml-1 text-red-300 hover:text-red-500 transition duration-300"
            >
              <AiOutlineClose />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="添加标签"
          className="border-none outline-none bg-transparent text-white placeholder-gray-400 transition duration-300 transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default TagInput;
