import React from "react";
import Feedback from "../components/Feedback";

const FeedbackExample: React.FC = () => {
  const handleSuccess = () => {
    console.log("Feedback submitted successfully!");
  };

  const handleFailure = () => {
    console.log("Failed to submit feedback.");
  };

  return (
    <div className="p-4">
      <Feedback
        onSubmitSuccess={handleSuccess}
        onSubmitFailure={handleFailure}
        theme="light"
        tooltip="Submit your feedback"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>✉️</span>}
        maxLength={500}
        onFocus={() => console.log("Feedback form focused")}
        onBlur={() => console.log("Feedback form blurred")}
        onKeyDown={(e) => console.log("Key down on feedback form", e)}
        onMouseEnter={() => console.log("Mouse entered feedback form")}
        onMouseLeave={() => console.log("Mouse left feedback form")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="反馈表单"
      />
    </div>
  );
};

export default FeedbackExample;