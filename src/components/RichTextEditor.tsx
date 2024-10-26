// src/components/RichTextEditor.tsx
import React, { useRef, useEffect, useState, FC } from "react";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxWidth?: string;
  maxHeight?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  customClass?: string;
  customButtonClass?: string;
  customEditorClass?: string;
  customButtonIcons?: { [key: string]: React.ReactNode };
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  maxWidth = "100%",
  maxHeight = "300px",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  fullscreen = false,
  customClass = "",
  customButtonClass = "",
  customEditorClass = "",
  customButtonIcons = {},
  hoverColor = "",
  activeColor = "",
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme: currentTheme } = useTheme();

  const handleInput = () => {
    const html = editorRef.current?.innerHTML || "";
    onChange(html);
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorRef.current?.innerHTML || "");
  };

  const handleSelectAll = () => {
    const range = document.createRange();
    range.selectNodeContents(editorRef.current!);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
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
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <div
      className={`flex flex-col ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } ${customClass}`}
      style={{ maxWidth }}
    >
      <div className="flex mb-2 space-x-2 overflow-x-auto">
        <Button
          onClick={() => execCommand("bold")}
          title="Bold"
          customClass={customButtonClass}
        >
          {customButtonIcons.bold || icon || "B"}
        </Button>
        <Button
          onClick={() => execCommand("italic")}
          title="Italic"
          customClass={customButtonClass}
        >
          {customButtonIcons.italic || icon || "I"}
        </Button>
        <Button
          onClick={() => execCommand("underline")}
          title="Underline"
          customClass={customButtonClass}
        >
          {customButtonIcons.underline || icon || "U"}
        </Button>
        <Button
          onClick={() => execCommand("justifyLeft")}
          title="Align Left"
          customClass={customButtonClass}
        >
          {customButtonIcons.justifyLeft || icon || "L"}
        </Button>
        <Button
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
          customClass={customButtonClass}
        >
          {customButtonIcons.justifyCenter || icon || "C"}
        </Button>
        <Button
          onClick={() => execCommand("justifyRight")}
          title="Align Right"
          customClass={customButtonClass}
        >
          {customButtonIcons.justifyRight || icon || "R"}
        </Button>
        <Button
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
          customClass={customButtonClass}
        >
          {customButtonIcons.insertUnorderedList || icon || "•"}
        </Button>
        <Button
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
          customClass={customButtonClass}
        >
          {customButtonIcons.insertOrderedList || icon || "1."}
        </Button>
        <Button
          onClick={handleCopy}
          title="Copy"
          customClass={customButtonClass}
        >
          {customButtonIcons.copy || icon || "⎘"}
        </Button>
        <Button
          onClick={handleSelectAll}
          title="Select All"
          customClass={customButtonClass}
        >
          {customButtonIcons.selectAll || icon || "⌘A"}
        </Button>
        <Button
          onClick={handleInsertImage}
          title="Insert Image"
          customClass={customButtonClass}
        >
          {customButtonIcons.insertImage || icon || "🖼️"}
        </Button>
        <Button
          onClick={handleInsertLink}
          title="Insert Link"
          customClass={customButtonClass}
        >
          {customButtonIcons.insertLink || icon || "🔗"}
        </Button>
        <Button
          onClick={handleUndo}
          title="Undo"
          customClass={customButtonClass}
        >
          {customButtonIcons.undo || icon || "↶"}
        </Button>
        <Button
          onClick={handleRedo}
          title="Redo"
          customClass={customButtonClass}
        >
          {customButtonIcons.redo || icon || "↷"}
        </Button>
        <Button
          onClick={handleFullscreenToggle}
          title="Fullscreen"
          customClass={customButtonClass}
        >
          {isFullscreen
            ? customButtonIcons.fullscreenExit || "🗗"
            : customButtonIcons.fullscreen || "🗖"}
        </Button>
      </div>
      <div
        ref={editorRef}
        className={`border-${borderWidth} rounded p-2 bg-gray-800 text-gray-200 overflow-y-auto focus:outline-none ${
          fullscreen ? "w-full h-full" : ""
        } ${customEditorClass}`}
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
