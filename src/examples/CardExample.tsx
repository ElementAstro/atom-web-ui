import React, { useState } from "react";
import Card from "../components/Card";

const CardExample: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    console.log("Card closed");
  };

  return (
    <div className="p-4">
      <Card
        title="Example Card"
        isCollapsed={isCollapsed}
        isMaximized={isMaximized}
        draggable={true}
        onToggleCollapse={handleToggleCollapse}
        onMaximize={handleMaximize}
        onClose={handleClose}
        customClass="my-custom-card"
        customHeaderClass="my-custom-header"
        customContentClass="my-custom-content"
        tooltip="This is a card"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>📦</span>}
      >
        <p>This is the content of the card.</p>
      </Card>
    </div>
  );
};

export default CardExample;