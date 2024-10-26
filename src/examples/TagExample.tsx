import React from "react";
import Tag from "../components/Tag";
import { AiOutlineTag } from "react-icons/ai";

const TagExample: React.FC = () => {
  const handleTagClick = () => {
    console.log("Tag clicked");
  };

  const handleTagRemove = () => {
    console.log("Tag removed");
  };

  return (
    <div className="p-4">
      <Tag
        onClick={handleTagClick}
        removable={true}
        onRemove={handleTagRemove}
        size="medium"
        color="bg-gradient-to-r from-green-400 to-blue-500"
        icon={<AiOutlineTag />}
        tooltip="This is a tag"
        border="border-solid border-gray-300"
        rounded="rounded-lg"
        theme="light"
        borderWidth="2"
        animation="transition duration-300 transform hover:scale-105"
        fullscreen={false}
        draggable={true}
      >
        Example Tag
      </Tag>
    </div>
  );
};

export default TagExample;