import React, { useState } from "react";
import Offcanvas from "../components/Offcanvas";
import { AiOutlineInfoCircle } from "react-icons/ai";

const OffcanvasExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Offcanvas
      </button>
      <Offcanvas
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={() => console.log("Offcanvas opened")}
        onCloseComplete={() => console.log("Offcanvas closed")}
        customClass="my-custom-offcanvas"
        closeButton={true}
        draggable={true}
        maximizable={true}
        direction="right"
        theme="light"
        tooltip="Close Offcanvas"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<AiOutlineInfoCircle />}
        fullscreen={false}
        autoClose={false}
        autoCloseDuration={5000}
        iconColor="text-gray-400"
        onFocus={() => console.log("Offcanvas focused")}
        onBlur={() => console.log("Offcanvas blurred")}
        onKeyDown={(e) => console.log("Key down on offcanvas", e)}
        onAnimationEnd={() => console.log("Animation ended")}
        onDoubleClick={() => console.log("Offcanvas double-clicked")}
        ariaLabel="示例 Offcanvas"
        showProgress={true}
        progressColor="bg-blue-500"
        progressHeight="h-1"
        rippleEffect={true}
        rippleColor="rgba(255, 255, 255, 0.6)"
        rippleDuration={600}
        showTooltip={true}
        tooltipPosition="top"
        width="64"
        additionalButtons={[
          {
            onClick: () => console.log("Additional button clicked"),
            icon: <AiOutlineInfoCircle />,
            tooltip: "Additional Button",
          },
        ]}
        customCloseButtonClass="my-custom-close-button"
        customMaximizeButtonClass="my-custom-maximize-button"
        customFullscreenButtonClass="my-custom-fullscreen-button"
        customAdditionalButtonClass="my-custom-additional-button"
      >
        <p>This is the content of the offcanvas.</p>
      </Offcanvas>
    </div>
  );
};

export default OffcanvasExample;