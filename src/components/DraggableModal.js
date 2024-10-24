// src/components/DraggableModal.js
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContext'; // 确保已创建并导入 ThemeContext

const DraggableModal = ({
  isOpen,
  onClose,
  children,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-transform duration-300 ease-in-out", // 新增属性
  icon = <AiOutlineClose />, // 新增属性
  fullscreen = false, // 新增属性
  resizable = false, // 新增属性
  header = "Modal Title", // 新增属性
}) => {
  const modalRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [size, setSize] = useState({ width: 'auto', height: 'auto' });
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (isOpen) {
      setPosition({ top: '50%', left: '50%' });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleMouseDown = (e) => {
    setOffset({ x: e.clientX - modalRef.current.getBoundingClientRect().left, y: e.clientY - modalRef.current.getBoundingClientRect().top });
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newTop = e.clientY - offset.y;
      const newLeft = e.clientX - offset.x;
      const modalRect = modalRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Ensure the modal doesn't go out of the viewport
      const clampedTop = Math.max(0, Math.min(newTop, viewportHeight - modalRect.height));
      const clampedLeft = Math.max(0, Math.min(newLeft, viewportWidth - modalRect.width));

      setPosition({
        top: `${clampedTop}px`,
        left: `${clampedLeft}px`,
      });
    }
  };

  const handleResize = (e, direction) => {
    if (resizable) {
      const modalRect = modalRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newWidth = modalRect.width;
      let newHeight = modalRect.height;

      if (direction === 'right') {
        newWidth = Math.min(viewportWidth - modalRect.left, e.clientX - modalRect.left);
      } else if (direction === 'bottom') {
        newHeight = Math.min(viewportHeight - modalRect.top, e.clientY - modalRect.top);
      } else if (direction === 'bottom-right') {
        newWidth = Math.min(viewportWidth - modalRect.left, e.clientX - modalRect.left);
        newHeight = Math.min(viewportHeight - modalRect.top, e.clientY - modalRect.top);
      }

      setSize({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy: "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center transition-opacity duration-300 ${fullscreen ? "w-full h-full" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div
        ref={modalRef}
        className={`rounded shadow-lg p-4 ${animation} ${themeClasses[theme || currentTheme]} border-${borderWidth}`}
        style={{ position: 'absolute', top: position.top, left: position.left, cursor: 'move', transform: isOpen ? 'scale(1)' : 'scale(0.9)', width: size.width, height: size.height }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{header}</h2>
          <button onClick={onClose} className="text-red-600" title={tooltip}>
            {icon}
          </button>
        </div>
        {children}
        {resizable && (
          <>
            <div
              className="absolute right-0 bottom-0 w-4 h-4 bg-transparent cursor-se-resize"
              onMouseDown={(e) => handleResize(e, 'bottom-right')}
            />
            <div
              className="absolute right-0 top-0 w-4 h-full bg-transparent cursor-e-resize"
              onMouseDown={(e) => handleResize(e, 'right')}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-4 bg-transparent cursor-s-resize"
              onMouseDown={(e) => handleResize(e, 'bottom')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DraggableModal;