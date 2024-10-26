import React from "react";
import Alert from "../components/Alert";

const AlertExample: React.FC = () => {
  const handleAlertClose = () => {
    console.log("Alert closed");
  };

  return (
    <div className="p-4">
      <Alert
        message="This is an info alert"
        severity="info"
        onClose={handleAlertClose}
        autoClose={true}
        autoCloseDuration={3000}
        title="Info"
        showIcon={true}
        infoIcon={<span>ℹ️</span>}
      />
      <Alert
        message="This is an error alert"
        severity="error"
        onClose={handleAlertClose}
        autoClose={true}
        autoCloseDuration={3000}
        title="Error"
        showIcon={true}
        errorIcon={<span>⚠️</span>}
      />
    </div>
  );
};

export default AlertExample;
