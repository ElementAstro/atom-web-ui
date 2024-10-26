import React from "react";
import ValidatedForm from "../components/ValidatedForm";

const ValidatedFormExample: React.FC = () => {
  const handleSuccess = (data: any) => {
    console.log("Form submitted successfully:", data);
  };

  const handleFailure = (error: any) => {
    console.log("Form submission failed:", error);
  };

  return (
    <div className="p-4">
      <ValidatedForm
        onSubmitSuccess={handleSuccess}
        onSubmitFailure={handleFailure}
        theme="ocean"
        tooltip="Submit the form"
        borderWidth="2"
        animation="transition-transform duration-300 ease-in-out"
        icon={<span>🚀</span>}
        fullscreen={false}
        draggable={true}
      />
    </div>
  );
};

export default ValidatedFormExample;