// src/components/Tabs.js
import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { AiOutlinePlus, AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

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
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition duration-300 transform hover:scale-105",
  icon = null,
  fullscreen = false,
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  ariaLabel = "标签页",
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const [tabList, setTabList] = useState(tabs);
  const { theme: currentTheme } = useTheme();
  const windowRefs = useRef({}); // 保存打开的窗口引用

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

  const handleDragOut = (tab, index) => {
    const newWindow = window.open(
      "",
      "_blank",
      "width=600,height=400,location=no,menubar=no"
    );
    if (newWindow) {
      windowRefs.current[tab.label] = newWindow;
      // 将 tab 渲染到新窗口中
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head><title>${tab.label}</title></head>
        <body>
          <div id="content">${tab.content}</div>
        </body>
        </html>
      `);
      newWindow.document.close();

      // 监听新窗口关闭
      const timer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(timer);
          setTabList((prevTabs) => [...prevTabs, tab]);
        }
      }, 500);

      // 从原窗口中移除拖出的 Tab
      handleTabClose(tab.label, { stopPropagation: () => {} });
    }
  };

  const handleDragReset = () => {
    setTabList(tabs);
  };

  const Tab = ({ tab, index }) => {
    const ref = useRef(null);
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
        onDoubleClick={() => handleDragOut(tab, index)} // 双击将标签拖出
        onKeyDown={onKeyDown}
        onAnimationEnd={onAnimationEnd}
        aria-label={ariaLabel}
      >
        <button
          className={`py-2 px-4 text-white transition duration-300 transform w-full text-center ${animation} ${
            activeTab === tab.label
              ? "border-b-2 border-blue-500 scale-105 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon"
              : "hover:bg-gray-600"
          } focus:outline-none`}
          onClick={() => handleTabChange(tab.label)}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {tab.label}
        </button>
        <div className="absolute top-0 right-0 mt-1 mr-1 flex space-x-1">
          {closable && (
            <button
              className="text-gray-400 hover:text-red-500 transition duration-300"
              onClick={(event) => handleTabClose(tab.label, event)}
            >
              <AiOutlineClose />
            </button>
          )}
          <button
            className="text-gray-400 hover:text-blue-500 transition duration-300"
            onClick={() => handleDragOut(tab, index)}
          >
            <AiOutlineExpand />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg ${
        fullscreen ? "w-full h-full" : ""
      }`}
    >
      <div className="flex flex-wrap border-b border-gray-700 overflow-x-auto items-center">
        {tabList.map((tab, index) => (
          <Tab key={tab.label} tab={tab} index={index} />
        ))}
        {addable && (
          <button
            className="py-2 px-4 text-white bg-gray-700 hover:bg-gray-600 transition duration-300 transform w-12 h-12 flex items-center justify-center focus:outline-none"
            onClick={handleTabAdd}
            title="添加新标签"
          >
            <AiOutlinePlus size={24} />
          </button>
        )}
        <button
          className="py-2 px-4 text-white bg-gray-700 hover:bg-gray-600 transition duration-300 transform w-12 h-12 flex items-center justify-center focus:outline-none"
          onClick={handleDragReset}
          title="重置标签顺序"
        >
          ↺
        </button>
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
