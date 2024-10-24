// src/components/Calendar.js
import React, { useState } from "react";

const Calendar = ({ onDateChange, onTimeChange, onCalendarToggle }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    if (onDateChange) onDateChange(newDate);
  };

  const handleToggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
    if (onCalendarToggle) onCalendarToggle(!isCalendarOpen);
  };

  const handleYearChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setSelectedDate(newDate);
    if (onDateChange) onDateChange(newDate);
  };

  const handleTimeChange = (e) => {
    const [hour, minute] = e.target.value.split(":");
    const newDate = new Date(selectedDate);
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    setSelectedDate(newDate);
    if (onTimeChange) onTimeChange(newDate);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggleCalendar}
        className="border border-gray-300 rounded-lg p-2 transition duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        {selectedDate.toDateString()}
      </button>

      {isCalendarOpen && (
        <div className="absolute bg-gray-900 border border-gray-700 rounded-lg mt-1 shadow-lg z-10 p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => handleYearChange(-1)}
              className="text-gray-400 hover:text-gray-200 transition duration-200"
            >
              ❮
            </button>
            <span className="font-semibold text-white">
              {selectedDate.getFullYear()}
            </span>
            <button
              onClick={() => handleYearChange(1)}
              className="text-gray-400 hover:text-gray-200 transition duration-200"
            >
              ❯
            </button>
          </div>

          <input
            type="date"
            value={selectedDate.toISOString().slice(0, 10)} // 格式化日期为YYYY-MM-DD
            onChange={handleDateChange}
            className="border rounded-lg p-2 mb-2 w-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-800 text-white"
          />

          <p className="text-lg font-semibold text-white">
            选择的日期: {selectedDate.toDateString()}
          </p>
          <p className="text-md text-gray-400">
            选择的时间:{" "}
            {selectedDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* 时间选择 */}
          <select
            className="border rounded-lg p-2 w-full mb-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-800 text-white"
            onChange={handleTimeChange}
          >
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="22:00">10:00 PM</option>
            <option value="23:00">11:00 PM</option>
            {/* 可根据需要添加更多时间选项 */}
          </select>
        </div>
      )}
    </div>
  );
};

export default Calendar;
