import React, { useState } from "react";
import TimeInput from "../components/TimeInput";

const TimeInputExample: React.FC = () => {
  const [time, setTime] = useState("");

  const handleTimeChange = (value: string) => {
    setTime(value);
    console.log("Selected time:", value);
  };

  return (
    <div className="p-4">
      <TimeInput
        value={time}
        onChange={handleTimeChange}
        label="选择时间"
        minTime="08:00"
        maxTime="18:00"
        theme="ocean"
        tooltip="清除时间"
        borderWidth="2"
        customClass="my-custom-time-input"
        customLabelClass="my-custom-label"
        customInputClass="my-custom-input"
        fullscreen={false}
      />
    </div>
  );
};

export default TimeInputExample;