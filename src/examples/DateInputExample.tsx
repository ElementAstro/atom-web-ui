import React, { useState } from "react";
import DateInput from "../components/DateInput";

const DateInputExample: React.FC = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    setDate(value);
    console.log("Selected date:", value);
  };

  return (
    <div className="p-4">
      <DateInput
        value={date}
        onChange={handleDateChange}
        label="Select a date"
        disabled={false}
        customClass="my-custom-date-input"
        customLabelClass="my-custom-label"
        customInputClass="my-custom-input"
        minDate="2022-01-01"
        maxDate="2023-12-31"
        defaultValue="2022-06-15"
        disabledDates={["2022-12-25", "2023-01-01"]}
        theme="light"
        tooltip="Pick a date"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        iconPosition="right"
        ariaLabel="日期输入"
      />
    </div>
  );
};

export default DateInputExample;