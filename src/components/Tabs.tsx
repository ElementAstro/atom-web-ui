// src/components/Tabs.tsx
import React, {
  useState,
  useRef,
  KeyboardEvent,
  FocusEvent,
  MouseEvent,
} from "react";
import { useDrag, useDrop } from "react-dnd";
import { AiOutlinePlus, AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange?: (label: string) => void;
  onTabClose?: (label: string) => void;
  onTabAdd?: (newTab: Tab) => void;
  onTabRename?: (label: string, newLabel: string) => void;
  tabHeight?: string;
  draggable?: boolean;
  closable?: boolean;
  addable?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onAnimationEnd?: (event: React.AnimationEvent<HTMLDivElement>) => void;
  onDoubleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
  showProgress?: boolean;
  progressColor?: string;
  progressHeight?: string;
  rippleEffect?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  onTabChange,
  onTabClose,
  onTabAdd,
  tabHeight = "auto",
  draggable = true,
  closable = true,
  addable = true,
  theme,
  tooltip = "",
  animation = "transition duration-300 transform hover:scale-105",
  icon = null,
  fullscreen = false,
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  ariaLabel = "标签页",
  showProgress = false,
  progressColor = "bg-blue-500",
  progressHeight = "h-1",
  rippleEffect = true,
  rippleColor = "rgba(255, 255, 255, 0.6)",
  rippleDuration = 600,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const [tabList, setTabList] = useState(tabs);
  const windowRefs = useRef<{ [key: string]: Window | null }>({});

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    if (onTabChange) {
      onTabChange(label);
    }
  };

  const handleTabClose = (
    label: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
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

  const moveTab = (dragIndex: number, hoverIndex: number) => {
    const newTabs = [...tabList];
    const [draggedTab] = newTabs.splice(dragIndex, 1);
    newTabs.splice(hoverIndex, 0, draggedTab);
    setTabList(newTabs);
  };

  const handleDragOut = (tab: Tab) => {
    const newWindow = window.open(
      "",
      "_blank",
      "width=600,height=400,location=no,menubar=no"
    );
    if (newWindow) {
      windowRefs.current[tab.label] = newWindow;
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

      const timer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(timer);
          setTabList((prevTabs) => [...prevTabs, tab]);
        }
      }, 500);

      handleTabClose(tab.label, {
        stopPropagation: () => {},
      } as MouseEvent<HTMLButtonElement>);
    }
  };

  const handleDragReset = () => {
    setTabList(tabs);
  };

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.style.background = rippleColor;
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, rippleDuration);
  };

  const Tab: React.FC<{ tab: Tab; index: number }> = ({ tab, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
      accept: "tab",
      hover(item: { index: number }) {
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
        onDoubleClick={() => handleDragOut(tab)}
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
          onClick={(e) => {
            handleTabChange(tab.label);
            if (rippleEffect) createRipple(e);
          }}
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
            onClick={() => handleDragOut(tab)}
          >
            <AiOutlineExpand />
          </button>
        </div>
      </div>
    );
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[(theme as ThemeKeys) || "light"]}`}
    >
      {showProgress && (
        <div className={`absolute top-0 left-0 w-full ${progressHeight}`}>
          <div
            className={`${progressColor} h-full`}
            style={{
              width: `${
                ((tabList.findIndex((tab) => tab.label === activeTab) + 1) *
                  100) /
                tabList.length
              }%`,
            }}
          ></div>
        </div>
      )}
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
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple ${rippleDuration}ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Tabs;
