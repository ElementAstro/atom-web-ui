import React, { useState, useRef } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const FluidLayout = ({
  sidebarContent,
  mainContent,
  onSidebarToggle,
  customClass = "",
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState("25%");
  const sidebarRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
    if (onSidebarToggle) onSidebarToggle(!isSidebarOpen);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    if (deltaX > 0 && !isSidebarOpen) {
      sidebarRef.current.style.transform = `translateX(${deltaX}px)`;
    } else if (deltaX < 0 && isSidebarOpen) {
      sidebarRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  };

  const handleTouchEnd = () => {
    const deltaX = currentX.current - startX.current;
    if (deltaX > 50 && !isSidebarOpen) {
      setSidebarOpen(true);
      if (onSidebarToggle) onSidebarToggle(true);
    } else if (deltaX < -50 && isSidebarOpen) {
      setSidebarOpen(false);
      if (onSidebarToggle) onSidebarToggle(false);
    }
    sidebarRef.current.style.transform = "";
  };

  const handleResizeStart = (e) => {
    startX.current = e.clientX;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResize = (e) => {
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(200, sidebarRef.current.offsetWidth + deltaX);
    setSidebarWidth(`${newWidth}px`);
    startX.current = e.clientX;
  };

  const handleResizeEnd = () => {
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  return (
    <div className={`flex flex-col md:flex-row md:min-h-screen ${customClass}`}>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-gray-800 p-4 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: sidebarWidth }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">Sidebar</h2>
          <button
            className="text-white md:hidden"
            onClick={handleSidebarToggle}
          >
            {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
        <div className="space-y-2">{sidebarContent}</div>
        <div
          className="absolute top-0 right-0 h-full w-2 cursor-col-resize"
          onMouseDown={handleResizeStart}
        ></div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-900 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-2xl">Main Content</h1>
          <button
            className="text-white md:hidden"
            onClick={handleSidebarToggle}
          >
            {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
        {mainContent}
      </main>
    </div>
  );
};

export default FluidLayout;
