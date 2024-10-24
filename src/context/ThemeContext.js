import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({
  children,
  initialTheme = "light",
  onThemeChange,
}) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (onThemeChange) onThemeChange(newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    if (onThemeChange) onThemeChange(theme);
  }, [theme, onThemeChange]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`transition-colors duration-500 ease-in-out ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialTheme: PropTypes.oneOf(["light", "dark"]),
  onThemeChange: PropTypes.func,
};
