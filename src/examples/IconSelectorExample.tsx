import React from "react";
import IconSelector from "../components/IconSelector";

const IconSelectorExample: React.FC = () => {
  const handleIconSelect = (iconId: string) => {
    console.log("Selected icon:", iconId);
  };

  return (
    <div className="p-4">
      <IconSelector
        onSelectIcon={handleIconSelect}
        theme="light"
        tooltip="Select an icon"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        size="2em"
        color="blue"
        border={true}
        borderColor="border-blue-500"
        searchPlaceholder="搜索图标..."
        itemsPerPage={20}
      />
    </div>
  );
};

export default IconSelectorExample;
