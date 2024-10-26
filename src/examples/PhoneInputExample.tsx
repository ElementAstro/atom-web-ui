import React, { useState } from "react";
import PhoneInput from "../components/PhoneInput";

const PhoneInputExample: React.FC = () => {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    console.log("Phone number changed:", value);
  };

  return (
    <div className="p-4">
      <PhoneInput
        value={phone}
        onChange={handlePhoneChange}
        label="Phone Number"
        disabled={false}
        customClass="my-custom-phone-input"
        customLabelClass="my-custom-label"
        customInputClass="my-custom-input"
        defaultValue=""
        international={true}
        theme="light"
        tooltip="Enter your phone number"
        borderWidth="2"
        iconPosition="right"
        clearable={true}
        size="medium"
        onDoubleClick={() => console.log("Phone input double-clicked")}
        onKeyDown={(e) => console.log("Key down on phone input", e)}
        ariaLabel="Phone number input"
      />
    </div>
  );
};

export default PhoneInputExample;