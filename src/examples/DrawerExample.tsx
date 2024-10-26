import React, { useState } from "react";
import Drawer from "../components/Drawer";

const DrawerExample: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleOpenDrawer}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Drawer
      </button>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        customClass="my-custom-drawer"
        closeButton={true}
        draggable={true}
        maximizable={true}
        direction="right"
        theme="light"
        tooltip="Close Drawer"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconColor="text-gray-400"
        fullscreen={true}
        autoClose={false}
        ariaLabel="示例抽屉"
        showProgress={true}
        progressColor="bg-blue-500"
        progressHeight="h-1"
        rippleEffect={true}
        rippleColor="rgba(255, 255, 255, 0.6)"
        rippleDuration={600}
        showTooltip={true}
        tooltipPosition="top"
        width="64"
        dockable={true}
      >
        <p>This is the content of the drawer.</p>
      </Drawer>
    </div>
  );
};

export default DrawerExample;