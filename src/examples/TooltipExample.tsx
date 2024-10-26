import React from "react";
import Tooltip from "../components/Tooltip";

const TooltipExample: React.FC = () => {
  return (
    <div className="p-4">
      <Tooltip
        text="这是一个提示信息"
        position="top"
        trigger="hover"
        delay={300}
        customClass="my-custom-tooltip"
        customTextClass="my-custom-text"
        theme="ocean"
        tooltip="Hover over me"
        borderWidth="2"
        animation="transition-opacity duration-300 ease-in-out"
        icon={<span>ℹ️</span>}
        fullscreen={false}
        size="medium"
        onDoubleClick={() => console.log("Tooltip double-clicked")}
        onKeyDown={(e) => console.log("Key down on tooltip", e)}
        ariaLabel="示例提示"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Hover over me
        </button>
      </Tooltip>
    </div>
  );
};

export default TooltipExample;