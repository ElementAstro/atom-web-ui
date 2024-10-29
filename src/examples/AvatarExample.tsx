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
      <Avatar
        src="https://via.placeholder.com/150"
        alt="Example Avatar 2"
        size={80}
        borderColor="red"
        showStatus={true}
        statusColor="yellow"
        shape="square"
        tooltip="This is another avatar"
        showBadge={true}
        badgeContent="New"
        badgeColor="blue"
        badgePosition="bottom-left"
        badgeSize="small"
        lazyLoad={true}
        intersectionThreshold={0.5}
        onClick={(e) => console.log("Avatar 2 clicked", e)}
        onLoad={() => console.log("Avatar 2 loaded")}
        onError={() => console.log("Avatar 2 failed to load")}
        onShow={() => console.log("Avatar 2 is visible")}
        onHide={() => console.log("Avatar 2 is hidden")}
      />
      <Avatar
        src="https://via.placeholder.com/150"
        alt="Example Avatar 3"
        size={120}
        borderColor="green"
        showStatus={true}
        statusColor="red"
        shape="circle"
        tooltip="This is yet another avatar"
        showBadge={true}
        badgeContent="Admin"
        badgeColor="purple"
        badgePosition="top-left"
        badgeSize="large"
        lazyLoad={true}
        intersectionThreshold={0.5}
        onClick={(e) => console.log("Avatar 3 clicked", e)}
        onLoad={() => console.log("Avatar 3 loaded")}
        onError={() => console.log("Avatar 3 failed to load")}
        onShow={() => console.log("Avatar 3 is visible")}
        onHide={() => console.log("Avatar 3 is hidden")}
      />
    </div>
  );
};

export default AvatarExample;
