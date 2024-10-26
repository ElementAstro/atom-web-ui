import React from "react";
import CollapsibleSidebar from "../components/CollapsibleSidebar";

const CollapsibleSidebarExample: React.FC = () => {
  const items = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
  ];

  return (
    <div className="p-4">
      <CollapsibleSidebar
        items={items}
        theme="light"
        tooltip="Toggle Sidebar"
        borderWidth="2"
        animation="transition-all duration-300 ease-in-out"
        icon={<span>📚</span>}
        fullscreen={false}
        onFocus={() => console.log("Sidebar focused")}
        onBlur={() => console.log("Sidebar blurred")}
        onKeyDown={(e) => console.log("Key down on sidebar", e)}
        onMouseEnter={() => console.log("Mouse entered sidebar")}
        onMouseLeave={() => console.log("Mouse left sidebar")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="Example collapsible sidebar"
        draggable={true}
        resizable={true}
      />
    </div>
  );
};

export default CollapsibleSidebarExample;