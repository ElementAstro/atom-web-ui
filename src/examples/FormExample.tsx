import React from "react";
import Form from "../components/Form";

const FormExample: React.FC = () => {
  const handleSuccess = () => {
    console.log("Form submitted successfully!");
  };

  const handleFailure = () => {
    console.log("Form submission failed.");
  };

  return (
    <div className="p-4">
      <Form
        onSubmitSuccess={handleSuccess}
        onSubmitFailure={handleFailure}
        theme="light"
        tooltip="Fill out the form"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>✉️</span>}
        onHover={() => console.log("Form hovered")}
        onFocus={() => console.log("Form focused")}
        onBlur={() => console.log("Form blurred")}
        onKeyDown={(e) => console.log("Key down on form", e)}
        onMouseEnter={() => console.log("Mouse entered form")}
        onMouseLeave={() => console.log("Mouse left form")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="示例表单"
      />
    </div>
  );
};

export default FormExample;