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
import styled, { css } from "styled-components";
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
  tabWidth?: string;
  draggable?: boolean;
  closable?: boolean;
  addable?: boolean;
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onAnimationEnd?: (event: React.AnimationEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
  showProgress?: boolean;
  progressColor?: string;
  progressHeight?: string;
  rippleEffect?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
}

const TabsContainer = styled.div<{ fullscreen: boolean; theme: any }>`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  ${({ fullscreen }) =>
    fullscreen &&
    css`
      width: 100%;
      height: 100%;
    `}
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  overflow-x: auto;
  align-items: center;
`;

const TabButton = styled.button<{ isActive: boolean; rippleEffect: boolean }>`
  padding: 0.5rem 1rem;
  text-align: center;
  width: 100%;
  transition: all 0.3s;
  background: ${({ isActive, theme }) =>
    isActive
      ? `linear-gradient(to right, ${theme.activeColor})`
      : theme.backgroundColor};
  color: ${({ isActive, theme }) =>
    isActive ? theme.labelActiveColor : theme.labelColor};
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #3b82f6" : "none")};
  &:hover {
    background: ${({ theme }) => theme.hoverColor};
  }
  &:focus {
    outline: none;
  }
  ${({ rippleEffect }) =>
    rippleEffect &&
    css`
      position: relative;
      overflow: hidden;
      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background: rgba(255, 255, 255, 0.6);
      }
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `}
`;

const TabContent = styled.div`
  padding: 1rem;
  transition: all 0.5s;
  transform: scale(1);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
`;

const AddTabButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  transition: all 0.3s;
  &:hover {
    background: ${({ theme }) => theme.hoverColor};
  }
  &:focus {
    outline: none;
  }
`;

const Tabs: React.FC<TabsProps> = ({
  tabs,
  onTabChange,
  onTabClose,
  onTabAdd,
  tabHeight = "auto",
  tabWidth = "auto",
  draggable = true,
  closable = true,
  addable = true,
  tooltip = "",
  animation = "transition duration-300 transform hover:scale-105",
  icon = null,
  fullscreen = false,
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
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
  const theme = useTheme();

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
        style={{ height: tabHeight, width: tabWidth }}
        title={tooltip}
        onKeyDown={onKeyDown}
        onAnimationEnd={onAnimationEnd}
        aria-label={ariaLabel}
      >
        <TabButton
          isActive={activeTab === tab.label}
          rippleEffect={rippleEffect}
          onClick={(e) => {
            handleTabChange(tab.label);
            if (rippleEffect) createRipple(e);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {tab.label}
        </TabButton>
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

  return (
    <TabsContainer fullscreen={fullscreen} theme={theme}>
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
      <TabList>
        {tabList.map((tab, index) => (
          <Tab key={tab.label} tab={tab} index={index} />
        ))}
        {addable && (
          <AddTabButton onClick={handleTabAdd} title="添加新标签">
            <AiOutlinePlus size={24} />
          </AddTabButton>
        )}
        <AddTabButton onClick={handleDragReset} title="重置标签顺序">
          ↺
        </AddTabButton>
      </TabList>
      <TabContent>
        {tabList.map((tab) =>
          tab.label === activeTab ? (
            <div key={tab.label} className={animation}>
              {tab.content}
            </div>
          ) : null
        )}
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs;
