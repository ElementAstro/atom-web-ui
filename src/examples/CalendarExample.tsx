import React from "react";
import Calendar from "../components/Calendar";

const CalendarExample: React.FC = () => {
  const handleDateChange = (date: Date | null) => {
    console.log("Selected date:", date);
  };

  const handleTimeChange = (date: Date | null) => {
    console.log("Selected time:", date);
  };

  const handleCalendarToggle = (isOpen: boolean) => {
    console.log("Calendar is open:", isOpen);
  };

  return (
    <div className="p-4">
      <Calendar
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
        onCalendarToggle={handleCalendarToggle}
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        disabled={false}
        showTimeSelect={true}
        locale="en-US"
        clearable={true}
        theme="light"
        position="bottom-left"
        animation="transform transition-transform duration-300 ease-in-out"
        showWeekNumbers={true}
        onFocus={() => console.log("Calendar focused")}
        onBlur={() => console.log("Calendar blurred")}
        onKeyDown={(e) => console.log("Key down on calendar", e)}
        onMouseEnter={() => console.log("Mouse entered calendar")}
        onMouseLeave={() => console.log("Mouse left calendar")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="Calendar"
      />
    </div>
  );
};

export default CalendarExample;