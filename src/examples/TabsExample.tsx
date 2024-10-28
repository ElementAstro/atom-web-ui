import React from "react";
import Tabs from "../components/Tabs";

const TabsExample: React.FC = () => {
  const tabs = [
    { label: "Tab 1", content: <div>Content of Tab 1</div> },
    { label: "Tab 2", content: <div>Content of Tab 2</div> },
    { label: "Tab 3", content: <div>Content of Tab 3</div> },
  ];

  const handleTabChange = (label: string) => {
    console.log("Tab changed to:", label);
  };

  const handleTabClose = (label: string) => {
    console.log("Tab closed:", label);
  };

  const handleTabAdd = (newTab: { label: string; content: React.ReactNode }) => {
    console.log("New tab added:", newTab);
  };

  return (
    <div className="p-4">
      <Tabs
        tabs={tabs}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onTabAdd={handleTabAdd}
        tabHeight="auto"
        draggable={true}
        closable={true}
        addable={true}
        tooltip="Click to interact"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={null}
        fullscreen={false}
        showProgress={true}
        progressColor="bg-blue-500"
        progressHeight="h-1"
        rippleEffect={true}
        rippleColor="rgba(255, 255, 255, 0.6)"
        rippleDuration={600}
      />
    </div>
  );
};

export default TabsExample;