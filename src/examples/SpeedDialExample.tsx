// SpeedDialExample.tsx
import React from "react";
import { SpeedDial, SpeedDialAction } from "../components/SpeedDial";
import { FaPlus, FaEdit, FaTrash, FaShare, FaInfo } from "react-icons/fa";

const SpeedDialExample = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      {/* 默认配置 */}
      <SpeedDial ariaLabel="SpeedDial example" icon={<FaPlus size={24} />}>
        <SpeedDialAction
          icon={<FaEdit size={20} />}
          tooltipTitle="Edit"
          onClick={() => alert("Edit clicked")}
        />
        <SpeedDialAction
          icon={<FaTrash size={20} />}
          tooltipTitle="Delete"
          onClick={() => alert("Delete clicked")}
        />
      </SpeedDial>

      {/* 向上展开，悬浮在其他图层之上 */}
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<FaPlus size={24} />}
        direction="up"
        floating
        fabSize={60}
        fabColor="#FF5722"
        fabHoverColor="#E64A19"
        iconRotateDeg={90}
        animationDuration="0.4s"
        easing="ease-in-out"
        onOpen={() => console.log("SpeedDial opened")}
        onClose={() => console.log("SpeedDial closed")}
      >
        <SpeedDialAction
          icon={<FaEdit size={20} />}
          tooltipTitle="Edit"
          onClick={() => alert("Edit clicked")}
        />
        <SpeedDialAction
          icon={<FaTrash size={20} />}
          tooltipTitle="Delete"
          onClick={() => alert("Delete clicked")}
        />
        <SpeedDialAction
          icon={<FaShare size={20} />}
          tooltipTitle="Share"
          onClick={() => alert("Share clicked")}
        />
        <SpeedDialAction
          icon={<FaInfo size={20} />}
          tooltipTitle="Info"
          onClick={() => alert("Info clicked")}
        />
      </SpeedDial>

      {/* 向下展开 */}
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<FaPlus size={24} />}
        direction="down"
        fabSize={50}
        fabColor="#4CAF50"
        fabHoverColor="#388E3C"
        iconRotateDeg={180}
        animationDuration="0.5s"
        easing="ease-out"
      >
        <SpeedDialAction
          icon={<FaEdit size={20} />}
          tooltipTitle="Edit"
          onClick={() => alert("Edit clicked")}
        />
        <SpeedDialAction
          icon={<FaTrash size={20} />}
          tooltipTitle="Delete"
          onClick={() => alert("Delete clicked")}
        />
        <SpeedDialAction
          icon={<FaShare size={20} />}
          tooltipTitle="Share"
          onClick={() => alert("Share clicked")}
        />
      </SpeedDial>

      {/* 向左展开 */}
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<FaPlus size={24} />}
        direction="left"
        fabSize={50}
        fabColor="#2196F3"
        fabHoverColor="#1976D2"
        iconRotateDeg={135}
        animationDuration="0.6s"
        easing="ease-in"
      >
        <SpeedDialAction
          icon={<FaEdit size={20} />}
          tooltipTitle="Edit"
          onClick={() => alert("Edit clicked")}
          tooltipPosition="right"
        />
        <SpeedDialAction
          icon={<FaTrash size={20} />}
          tooltipTitle="Delete"
          onClick={() => alert("Delete clicked")}
          tooltipPosition="right"
        />
        <SpeedDialAction
          icon={<FaShare size={20} />}
          tooltipTitle="Share"
          onClick={() => alert("Share clicked")}
          tooltipPosition="right"
        />
      </SpeedDial>

      {/* 向右展开 */}
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<FaPlus size={24} />}
        direction="right"
        fabSize={50}
        fabColor="#9C27B0"
        fabHoverColor="#7B1FA2"
        iconRotateDeg={225}
        animationDuration="0.7s"
        easing="ease-in-out"
      >
        <SpeedDialAction
          icon={<FaEdit size={20} />}
          tooltipTitle="Edit"
          onClick={() => alert("Edit clicked")}
          tooltipPosition="left"
        />
        <SpeedDialAction
          icon={<FaTrash size={20} />}
          tooltipTitle="Delete"
          onClick={() => alert("Delete clicked")}
          tooltipPosition="left"
        />
        <SpeedDialAction
          icon={<FaShare size={20} />}
          tooltipTitle="Share"
          onClick={() => alert("Share clicked")}
          tooltipPosition="left"
        />
      </SpeedDial>
    </div>
  );
};

export default SpeedDialExample;
