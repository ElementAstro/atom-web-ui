import React, { useState } from "react";
import Input from "../components/Input";

const InputExample: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("Input value:", e.target.value);
  };

  return (
    <div className="p-4">
      <Input
        label="示例输入框"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="请输入内容"
        required={true}
        errorMessage={inputValue ? "" : "此字段是必填项"}
        customClass="my-custom-input-container"
        customLabelClass="my-custom-label"
        customInputClass="my-custom-input"
        customErrorClass="my-custom-error"
        icon={<span>🔍</span>}
        showPassword={false}
        maxLength={50}
        theme="light"
        tooltip="这是一个输入框"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="left"
        clearable={true}
        iconColor="text-gray-400"
        onDoubleClick={() => console.log("Input double-clicked")}
        onKeyDown={(e) => console.log("Key down on input", e)}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="示例输入框"
      />
    </div>
  );
};

export default InputExample;