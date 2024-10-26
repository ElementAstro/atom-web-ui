import React from "react";
import Avatar from "../components/Avatar";

const AvatarExample: React.FC = () => {
  return (
    <div className="p-4">
      <Avatar
        src="https://via.placeholder.com/150"
        alt="Example Avatar"
        size={100}
        borderColor="blue"
        showStatus={true}
        statusColor="green"
        shape="circle"
        tooltip="This is an avatar"
        showBadge={true}
        badgeContent="99+"
        badgeColor="red"
        badgePosition="top-right"
        badgeSize="medium"
        lazyLoad={true}
        intersectionThreshold={0.5}
        onClick={(e) => console.log("Avatar clicked", e)}
        onLoad={() => console.log("Avatar loaded")}
        onError={() => console.log("Avatar failed to load")}
        onShow={() => console.log("Avatar is visible")}
        onHide={() => console.log("Avatar is hidden")}
      />
    </div>
  );
};

export default AvatarExample;