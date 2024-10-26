import React from "react";
import TagInput from "../components/TagInput";

const TagInputExample: React.FC = () => {
  const handleTagAdd = (tag: string) => {
    console.log("Tag added:", tag);
  };

  const handleTagRemove = (tag: string) => {
    console.log("Tag removed:", tag);
  };

  const handleMaxTagsReached = () => {
    console.log("Max tags reached");
  };

  return (
    <div className="p-4">
      <TagInput
        onTagAdd={handleTagAdd}
        onTagRemove={handleTagRemove}
        maxTags={5}
        onMaxTagsReached={handleMaxTagsReached}
        tagColors={{ background: "bg-blue-500", text: "text-white" }}
        disabled={false}
        placeholder="添加标签"
        theme="ocean"
        tooltip="输入标签并按回车"
        borderWidth="2"
        animation="transition duration-300 transform hover:scale-105"
        icon={<span>🏷️</span>}
        fullscreen={false}
        draggable={true}
      />
    </div>
  );
};

export default TagInputExample;