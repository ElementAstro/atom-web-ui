import React, { useState } from "react";
import Tabs from "../components/Tabs";
import Button from "../components/Button";

interface Tab {
  label: string;
  content: React.ReactNode;
}

const TabsExample: React.FC = () => {
  const initialTabs: Tab[] = [
    { label: "Tab 1", content: <div>Content of Tab 1</div> },
    { label: "Tab 2", content: <div>Content of Tab 2</div> },
    {
      label: "Tab 3",
      content: (
        <div>
          Content of Tab 3
          <div className="p-4">
            <button className="p-2 bg-blue-500 text-white">Click me</button>
          </div>
          <Button onClick={() => console.log("Button clicked")}>
            Click me
          </Button>
        </div>
      ),
    },
    { label: "Tab 4", content: <div>Content of Tab 4</div> },
    { label: "Tab 5", content: <div>Content of Tab 5</div> },
  ];

  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleTabChange = (label: string) => {
    console.log("Tab changed to:", label);
  };

  const handleTabClose = (label: string) => {
    console.log("Tab closed:", label);
    setTabs(tabs.filter((tab) => tab.label !== label));
  };

  const handleTabAdd = (newTab: Tab) => {
    console.log("New tab added:", newTab);
    setTabs([...tabs, newTab]);
  };

  const handleTabRename = (label: string, newLabel: string) => {
    console.log(`Tab ${label} renamed to ${newLabel}`);
    setTabs(
      tabs.map((tab) =>
        tab.label === label ? { ...tab, label: newLabel } : tab
      )
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleFullscreen}
        className="mb-4 p-2 bg-blue-500 text-white"
      >
        Toggle Fullscreen
      </button>
      <Tabs
        tabs={tabs}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onTabAdd={handleTabAdd}
        onTabRename={handleTabRename}
        tabHeight="auto"
        draggable={true}
        closable={true}
        addable={true}
        tooltip="Click to interact"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={null}
        fullscreen={isFullscreen}
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
