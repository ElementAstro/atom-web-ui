// src/components/RichTextEditor.js
import React, { useRef, useEffect, useState } from "react";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const RichTextEditor = ({
  value,
  onChange,
  maxWidth = "100%",
  maxHeight = "300px",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const editorRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleInput = () => {
    const html = editorRef.current.innerHTML;
    onChange(html);
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleCopy = () => {
    document.execCommand("copy");
  };

  const handleSelectAll = () => {
    document.execCommand("selectAll");
  };

  const handleInsertImage = () => {
    const url = prompt("Enter the image URL");
    if (url) {
      execCommand("insertImage", url);
    }
  };

  const handleInsertLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const handleUndo = () => {
    document.execCommand("undo");
  };

  const handleRedo = () => {
    document.execCommand("redo");
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    // Set initial content
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

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
      style={{ maxWidth }}
    >
      <div className="flex mb-2 space-x-2 overflow-x-auto">
        <Button
          onClick={() => execCommand("bold")}
          title="Bold"
          className={animation}
        >
          {icon || "B"}
        </Button>
        <Button
          onClick={() => execCommand("italic")}
          title="Italic"
          className={animation}
        >
          {icon || "I"}
        </Button>
        <Button
          onClick={() => execCommand("underline")}
          title="Underline"
          className={animation}
        >
          {icon || "U"}
        </Button>
        <Button
          onClick={() => execCommand("justifyLeft")}
          title="Align Left"
          className={animation}
        >
          {icon || "L"}
        </Button>
        <Button
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
          className={animation}
        >
          {icon || "C"}
        </Button>
        <Button
          onClick={() => execCommand("justifyRight")}
          title="Align Right"
          className={animation}
        >
          {icon || "R"}
        </Button>
        <Button
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
          className={animation}
        >
          {icon || "•"}
        </Button>
        <Button
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
          className={animation}
        >
          {icon || "1."}
        </Button>
        <Button onClick={handleCopy} title="Copy" className={animation}>
          {icon || "⎘"}
        </Button>
        <Button
          onClick={handleSelectAll}
          title="Select All"
          className={animation}
        >
          {icon || "⌘A"}
        </Button>
        <Button
          onClick={handleInsertImage}
          title="Insert Image"
          className={animation}
        >
          {icon || "🖼️"}
        </Button>
        <Button
          onClick={handleInsertLink}
          title="Insert Link"
          className={animation}
        >
          {icon || "🔗"}
        </Button>
        <Button onClick={handleUndo} title="Undo" className={animation}>
          {icon || "↶"}
        </Button>
        <Button onClick={handleRedo} title="Redo" className={animation}>
          {icon || "↷"}
        </Button>
        <Button
          onClick={handleFullscreenToggle}
          title="Fullscreen"
          className={animation}
        >
          {isFullscreen ? "🗗" : "🗖"}
        </Button>
      </div>
      <div
        ref={editorRef}
        className={`border-${borderWidth} rounded p-2 bg-gray-800 text-gray-200 overflow-y-auto focus:outline-none ${
          fullscreen ? "w-full h-full" : ""
        }`}
        contentEditable
        onInput={handleInput}
        style={{
          maxHeight,
          minHeight: "150px",
        }}
        aria-label="Rich Text Editor"
      />
    </div>
  );
};

export default RichTextEditor;
