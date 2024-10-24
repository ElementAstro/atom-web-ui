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
  persist = false,
  availableThemes = ["light", "dark", "astronomy", "eyeCare"],
}) => {
  const [theme, setTheme] = useState(() => {
    if (persist) {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || initialTheme;
    }
    return initialTheme;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const currentIndex = availableThemes.indexOf(prevTheme);
      const newIndex = (currentIndex + 1) % availableThemes.length;
      const newTheme = availableThemes[newIndex];
      if (onThemeChange) onThemeChange(newTheme);
      if (persist) localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handleSetTheme = (newTheme) => {
    if (availableThemes.includes(newTheme)) {
      setTheme(newTheme);
      if (onThemeChange) onThemeChange(newTheme);
      if (persist) localStorage.setItem("theme", newTheme);
    }
  };

  const resetTheme = () => {
    setTheme(initialTheme);
    if (onThemeChange) onThemeChange(initialTheme);
    if (persist) localStorage.removeItem("theme");
  };

  useEffect(() => {
    if (onThemeChange) onThemeChange(theme);
  }, [theme, onThemeChange]);

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme: handleSetTheme, resetTheme }}
    >
      <div
        className={`transition-colors duration-500 ease-in-out ${themeClasses[theme]}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialTheme: PropTypes.oneOf(["light", "dark", "astronomy", "eyeCare"]),
  onThemeChange: PropTypes.func,
  persist: PropTypes.bool,
  availableThemes: PropTypes.arrayOf(PropTypes.string),
};
