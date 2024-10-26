import React, { useState } from "react";
import RichTextEditor from "../components/RichTextEditor";

const RichTextEditorExample: React.FC = () => {
  const [content, setContent] = useState("<p>这是一个示例文本。</p>");

  const handleChange = (value: string) => {
    setContent(value);
    console.log("Content changed:", value);
  };

  return (
    <div className="p-4">
      <RichTextEditor
        value={content}
        onChange={handleChange}
        maxWidth="600px"
        maxHeight="400px"
        theme="light"
        tooltip="Rich Text Editor"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={null}
        fullscreen={false}
        customClass="my-custom-rich-text-editor"
        customButtonClass="my-custom-button"
        customEditorClass="my-custom-editor"
      />
    </div>
  );
};

export default RichTextEditorExample;