import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Tabs = ({ tabs, onTabChange, onTabClose, tabHeight = "auto" }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const [tabList, setTabList] = useState(tabs);

  const handleTabChange = (label) => {
    setActiveTab(label);
    if (onTabChange) {
      onTabChange(label);
    }
  };

  const handleTabClose = (label, event) => {
    event.stopPropagation();
    const newTabs = tabList.filter((tab) => tab.label !== label);
    setTabList(newTabs);
    if (label === activeTab && newTabs.length > 0) {
      setActiveTab(newTabs[0].label);
    }
    if (onTabClose) {
      onTabClose(label);
    }
  };

  const moveTab = (dragIndex, hoverIndex) => {
    const newTabs = [...tabList];
    const [draggedTab] = newTabs.splice(dragIndex, 1);
    newTabs.splice(hoverIndex, 0, draggedTab);
    setTabList(newTabs);
  };

  const Tab = ({ tab, index }) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
      accept: "tab",
      hover(item) {
        if (item.index !== index) {
          moveTab(item.index, index);
          item.index = index;
        }
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "tab",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drag(drop(ref));

    return (
      <div
        ref={ref}
        className={`relative ${
          isDragging ? "opacity-50" : "opacity-100"
        } flex-1`}
        style={{ height: tabHeight }}
      >
        <button
          className={`py-2 px-4 text-white transition duration-300 transform w-full text-center
            ${
              activeTab === tab.label
                ? "border-b-2 border-blue-500 scale-105 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon"
                : "hover:bg-gray-600"
            }
            focus:outline-none`}
          onClick={() => handleTabChange(tab.label)}
        >
          {tab.label}
        </button>
        <button
          className="absolute top-0 right-0 mt-1 mr-1 text-gray-400 hover:text-red-500 transition duration-300"
          onClick={(event) => handleTabClose(tab.label, event)}
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg">
      <div className="flex flex-wrap border-b border-gray-700 overflow-x-auto">
        {tabList.map((tab, index) => (
          <Tab key={tab.label} tab={tab} index={index} />
        ))}
      </div>
      <div className="p-4" style={{ height: tabHeight }}>
        {tabList.map((tab) =>
          tab.label === activeTab ? (
            <div
              key={tab.label}
              className="transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-neon"
            >
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
