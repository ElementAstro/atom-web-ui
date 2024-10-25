// src/components/Calendar.js
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Calendar = ({
  onDateChange,
  onTimeChange,
  onCalendarToggle,
  minDate,
  maxDate,
  disabled = false,
  showTimeSelect = true,
  locale = "en-US",
  clearable = false,
  theme,
  position = "bottom-left",
  animation = "transform transition-transform duration-300 ease-in-out",
  showWeekNumbers = false,
  highlightToday = false,
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Calendar",
  rangeSelect = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

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

  const handleClear = () => {
    setSelectedDate(null);
    if (onDateChange) onDateChange(null);
    if (onTimeChange) onTimeChange(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handleDateChange({
        target: {
          value: new Date(selectedDate.setDate(selectedDate.getDate() - 1))
            .toISOString()
            .slice(0, 10),
        },
      });
    } else if (e.key === "ArrowRight") {
      handleDateChange({
        target: {
          value: new Date(selectedDate.setDate(selectedDate.getDate() + 1))
            .toISOString()
            .slice(0, 10),
        },
      });
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const renderWeekNumbers = () => {
    const startOfYear = new Date(selectedDate.getFullYear(), 0, 1);
    const startOfWeek = new Date(
      startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
    );
    const weeks = [];
    for (let i = 0; i < 52; i++) {
      const weekStart = new Date(
        startOfWeek.setDate(startOfWeek.getDate() + 7 * i)
      );
      weeks.push(
        <div key={i} className="calendar__week-number">
          {weekStart.toLocaleDateString(locale, { week: "numeric" })}
        </div>
      );
    }
    return weeks;
  };

  return (
    <div className="calendar relative inline-block">
      <button
        onClick={handleToggleCalendar}
        className="calendar__button border border-gray-300 rounded-lg p-2 transition duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {selectedDate ? selectedDate.toLocaleDateString(locale) : "Select Date"}
      </button>

      {isCalendarOpen && (
        <div
          className={`calendar__dropdown absolute ${
            positionClasses[position]
          } ${
            themeClasses[theme || currentTheme]
          } border rounded-lg mt-1 shadow-lg z-10 p-4 ${animation}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="calendar__header flex justify-between items-center mb-2">
            <button
              onClick={() => handleYearChange(-1)}
              className="calendar__year-button text-gray-400 hover:text-gray-200 transition duration-200"
            >
              ❮
            </button>
            <span className="calendar__year font-semibold">
              {selectedDate ? selectedDate.getFullYear() : ""}
            </span>
            <button
              onClick={() => handleYearChange(1)}
              className="calendar__year-button text-gray-400 hover:text-gray-200 transition duration-200"
            >
              ❯
            </button>
          </div>

          <input
            type="date"
            value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
            onChange={handleDateChange}
            className="calendar__date-input border rounded-lg p-2 mb-2 w-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            min={minDate ? minDate.toISOString().slice(0, 10) : ""}
            max={maxDate ? maxDate.toISOString().slice(0, 10) : ""}
            disabled={disabled}
          />

          {selectedDate && (
            <>
              <p className="calendar__selected-date text-lg font-semibold">
                选择的日期: {selectedDate.toLocaleDateString(locale)}
              </p>
              {showTimeSelect && (
                <>
                  <p className="calendar__selected-time text-md text-gray-400">
                    选择的时间:{" "}
                    {selectedDate.toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <select
                    className="calendar__time-select border rounded-lg p-2 w-full mb-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={handleTimeChange}
                    disabled={disabled}
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
                  </select>
                </>
              )}
            </>
          )}

          {showWeekNumbers && (
            <div className="calendar__week-numbers flex flex-col">
              {renderWeekNumbers()}
            </div>
          )}

          {clearable && (
            <button
              onClick={handleClear}
              className="calendar__clear-button mt-2 bg-red-500 text-white p-2 rounded-lg transition duration-300 hover:bg-red-700"
            >
              清除
            </button>
          )}
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .calendar__dropdown {
            width: 90vw;
            left: 50%;
            transform: translateX(-50%);
          }
          .calendar__date-input,
          .calendar__time-select {
            font-size: 0.875rem;
            padding: 0.5rem;
          }
          .calendar__selected-date,
          .calendar__selected-time {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;
