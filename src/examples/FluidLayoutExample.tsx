import React from "react";
import FluidLayout from "../components/FluidLayout";

const FluidLayoutExample: React.FC = () => {
  const sidebarContent = (
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  );

  const mainContent = (
    <div>
      <p>This is the main content area.</p>
    </div>
  );

  const handleSidebarToggle = (isOpen: boolean) => {
    console.log("Sidebar is open:", isOpen);
  };

  return (
    <div className="p-4">
      <FluidLayout
        sidebarContent={sidebarContent}
        mainContent={mainContent}
        onSidebarToggle={handleSidebarToggle}
        customClass="my-custom-fluid-layout"
        theme="light"
        tooltip="Toggle Sidebar"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>📚</span>}
        autoClose={false}
        autoCloseDuration={5000}
        onFocus={() => console.log("Fluid layout focused")}
        onBlur={() => console.log("Fluid layout blurred")}
        onKeyDown={(e) => console.log("Key down on fluid layout", e)}
        onMouseEnter={() => console.log("Mouse entered fluid layout")}
        onMouseLeave={() => console.log("Mouse left fluid layout")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="示例流体布局"
      />
    </div>
  );
};

export default FluidLayoutExample;