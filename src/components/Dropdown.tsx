// src/components/Dropdown.tsx
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface DropdownProps {
  options: string[];
  label?: string;
  onOptionSelect?: (option: string) => void;
  onDropdownToggle?: (isOpen: boolean) => void;
  multiSelect?: boolean;
  customClass?: string;
  customButtonClass?: string;
  customInputClass?: string;
  customOptionClass?: string;
  customSelectedClass?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  disabled?: boolean;
  onHover?: () => void;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  placeholder?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  clearIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  showDropdownIcon?: boolean;
  showClearIcon?: boolean;
  showSearchIcon?: boolean;
  maxHeight?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  onOptionSelect,
  onDropdownToggle,
  multiSelect = false,
  customClass = "",
  customButtonClass = "",
  customInputClass = "",
  customOptionClass = "",
  customSelectedClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  disabled = false,
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Dropdown",
  placeholder = "Select...",
  showSearch = true,
  searchPlaceholder = "Search...",
  clearable = false,
  clearIcon = <span>✕</span>,
  searchIcon = <span>🔍</span>,
  dropdownIcon = <span>▼</span>,
  showDropdownIcon = true,
  showClearIcon = true,
  showSearchIcon = true,
  maxHeight = "15rem",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | string[]>(
    multiSelect ? [] : options[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    if (onDropdownToggle) {
      onDropdownToggle(isOpen);
    }
  }, [isOpen, onDropdownToggle]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: string) => {
    if (multiSelect) {
      setSelected((prevSelected) =>
        Array.isArray(prevSelected) && prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option)
          : [...(Array.isArray(prevSelected) ? prevSelected : []), option]
      );
    } else {
      setSelected(option);
      setIsOpen(false);
    }
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSelection = () => {
    setSelected(multiSelect ? [] : "");
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  const currentThemeClass =
    themeClasses[
      (theme as keyof typeof themeClasses) ||
        (currentTheme as keyof typeof themeClasses)
    ];

  return (
    <div
      className={`relative ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{ textTransform }}
    >
      {label && (
        <label className={`block text-gray-200 mb-1 ${customClass}`}>
          {label}
        </label>
      )}
      <button
        onClick={toggleDropdown}
        className={`w-full p-2 border-${borderWidth} rounded ${currentThemeClass} focus:outline-none focus:ring focus:ring-purple-500 ${animation} ${customButtonClass}`}
        disabled={disabled}
        title={tooltip}
      >
        {multiSelect
          ? Array.isArray(selected) && selected.length > 0
            ? selected.join(", ")
            : placeholder
          : selected || placeholder}
        {showDropdownIcon && <span className="ml-2">{dropdownIcon}</span>}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${currentThemeClass} ${animation}`}
        >
          {showSearch && (
            <div className="relative">
              {showSearchIcon && (
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {searchIcon}
                </span>
              )}
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className={`w-full p-2 pl-10 border-${borderWidth} rounded-t ${currentThemeClass} focus:outline-none focus:ring focus:ring-purple-500 ${customInputClass}`}
                placeholder={searchPlaceholder}
              />
              {clearable && showClearIcon && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300"
                >
                  {clearIcon}
                </button>
              )}
            </div>
          )}
          <ul
            className={`max-h-${maxHeight} overflow-auto rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5`}
          >
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${customOptionClass} ${
                  Array.isArray(selected) && selected.includes(option)
                    ? customSelectedClass
                    : ""
                }`}
                onClick={() => selectOption(option)}
                onMouseEnter={onHover}
              >
                <span
                  className={`block truncate ${
                    Array.isArray(selected) && selected.includes(option)
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .p-2 {
            padding: 0.5rem;
          }
          .text-base {
            font-size: 1rem;
          }
          .leading-6 {
            line-height: 1.5rem;
          }
          .mt-2 {
            margin-top: 0.5rem;
          }
          .max-h-${maxHeight} {
            max-height: ${maxHeight};
          }
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
