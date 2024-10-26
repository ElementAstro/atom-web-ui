import React from "react";
import SkeletonScreen from "../components/SkeletonScreen";

const SkeletonScreenExample: React.FC = () => {
  return (
    <div className="p-4">
      <SkeletonScreen
        width="100%"
        height="200px"
        shape="rectangle"
        className="my-custom-skeleton"
        onHover={() => console.log("Hovered over skeleton screen")}
        onFocus={() => console.log("Skeleton screen focused")}
        onBlur={() => console.log("Skeleton screen blurred")}
        onKeyDown={(e) => console.log("Key down on skeleton screen", e)}
        onAnimationEnd={() => console.log("Animation ended")}
        onDoubleClick={() => console.log("Skeleton screen double-clicked")}
        draggable={true}
        maximizable={true}
        onMaximize={() => console.log("Skeleton screen maximized")}
        onMinimize={() => console.log("Skeleton screen minimized")}
        closable={true}
        autoHide={true}
        hideAfter={5000}
        showProgress={true}
        theme="ocean"
        tooltip="Skeleton Screen"
        borderWidth="2"
        animation="animate-pulse"
        icon={<span>🔄</span>}
        fullscreen={true}
        iconColor="text-gray-400"
        customClass="my-custom-skeleton"
        customButtonClass="my-custom-button"
        customProgressClass="my-custom-progress"
      />
    </div>
  );
};

export default SkeletonScreenExample;