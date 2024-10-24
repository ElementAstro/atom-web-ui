// src/components/Tabs.js
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Tabs = ({
  tabs,
  onTabChange,
  onTabClose,
  onTabAdd,
  onTabRename,
  tabHeight = "auto",
  draggable = true,
  closable = true,
  addable = true,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition duration-300 transform hover:scale-105", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const [tabList, setTabList] = useState(tabs);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

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

  const handleTabAdd = () => {
    const newTab = { label: `新标签 ${tabList.length + 1}`, content: "新内容" };
    setTabList([...tabList, newTab]);
    if (onTabAdd) {
      onTabAdd(newTab);
    }
  };

  const handleTabRename = (label, newLabel) => {
    const newTabs = tabList.map((tab) =>
      tab.label === label ? { ...tab, label: newLabel } : tab
    );
    setTabList(newTabs);
    if (onTabRename) {
      onTabRename(label, newLabel);
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
    if (draggable) {
      drag(drop(ref));
    }

    return (
      <div
        ref={ref}
        className={`relative ${
          isDragging ? "opacity-50" : "opacity-100"
        } flex-1`}
        style={{ height: tabHeight }}
        title={tooltip}
      >
        <button
          className={`py-2 px-4 text-white transition duration-300 transform w-full text-center ${animation} ${
            activeTab === tab.label
              ? "border-b-2 border-blue-500 scale-105 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon"
              : "hover:bg-gray-600"
          } focus:outline-none`}
          onClick={() => handleTabChange(tab.label)}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {tab.label}
        </button>
        {closable && (
          <button
            className="absolute top-0 right-0 mt-1 mr-1 text-gray-400 hover:text-red-500 transition duration-300"
            onClick={(event) => handleTabClose(tab.label, event)}
          >
            ✕
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg ${
        fullscreen ? "w-full h-full" : ""
      }`}
    >
      <div className="flex flex-wrap border-b border-gray-700 overflow-x-auto">
        {tabList.map((tab, index) => (
          <Tab key={tab.label} tab={tab} index={index} />
        ))}
        {addable && (
          <button
            className="py-2 px-4 text-white bg-gray-700 hover:bg-gray-600 transition duration-300 transform w-full text-center focus:outline-none"
            onClick={handleTabAdd}
          >
            + 添加新标签
          </button>
        )}
      </div>
      <div className="p-4" style={{ height: tabHeight }}>
        {tabList.map((tab) =>
          tab.label === activeTab ? (
            <div
              key={tab.label}
              className={`transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-neon ${animation}`}
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
