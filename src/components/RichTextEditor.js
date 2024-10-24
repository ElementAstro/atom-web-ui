// src/components/RichTextEditor.js
import React, { useRef, useEffect } from "react";
import Button from "./Button";

const RichTextEditor = ({
  value,
  onChange,
  maxWidth = "100%",
  maxHeight = "300px",
}) => {
  const editorRef = useRef(null);

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

  useEffect(() => {
    // Set initial content
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="flex flex-col" style={{ maxWidth }}>
      <div className="flex mb-2 space-x-2 overflow-x-auto">
        <Button onClick={() => execCommand("bold")} title="Bold">
          B
        </Button>
        <Button onClick={() => execCommand("italic")} title="Italic">
          I
        </Button>
        <Button onClick={() => execCommand("underline")} title="Underline">
          U
        </Button>
        <Button onClick={() => execCommand("justifyLeft")} title="Align Left">
          L
        </Button>
        <Button
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
        >
          C
        </Button>
        <Button onClick={() => execCommand("justifyRight")} title="Align Right">
          R
        </Button>
        <Button
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
        >
          •
        </Button>
        <Button
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
        >
          1.
        </Button>
        <Button onClick={handleCopy} title="Copy">
          ⎘
        </Button>
        <Button onClick={handleSelectAll} title="Select All">
          ⌘A
        </Button>
      </div>
      <div
        ref={editorRef}
        className="border rounded p-2 bg-gray-800 text-gray-200 overflow-y-auto focus:outline-none"
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
