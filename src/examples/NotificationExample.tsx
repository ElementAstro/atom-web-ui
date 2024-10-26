import React, { useState } from "react";
import Notification from "../components/Notification";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const NotificationExample: React.FC = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleShowNotification = () => {
    setIsNotificationVisible(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationVisible(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleShowNotification}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Notification
      </button>
      {isNotificationVisible && (
        <Notification
          message="This is a success notification!"
          type="success"
          onClose={handleCloseNotification}
          duration={5000}
          position="top-right"
          icon={<AiOutlineCheckCircle />}
          closable={true}
          autoClose={true}
          pauseOnHover={true}
          theme="light"
          tooltip="This is a notification"
          borderWidth="2"
          animation="transform transition-transform duration-500 ease-in-out"
          fullscreen={false}
          customClass="my-custom-notification"
          customIconClass="my-custom-icon"
          customButtonClass="my-custom-button"
        />
      )}
    </div>
  );
};

export default NotificationExample;