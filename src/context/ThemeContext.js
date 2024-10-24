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
  availableThemes = [
    "light",
    "dark",
    "astronomy",
    "eyeCare",
    "sunset",
    "ocean",
    "forest",
    "astronomyDarkRed", // 新增的主题
  ],
  customThemes = {},
}) => {
  const [theme, setTheme] = useState(() => {
    if (persist) {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || initialTheme;
    }
    return initialTheme;
  });

  const [themes, setThemes] = useState(() => {
    const defaultThemes = {
      light: "bg-white text-gray-900",
      dark: "bg-gray-900 text-white",
      astronomy:
        "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
      eyeCare: "bg-green-100 text-green-900",
      sunset: "bg-gradient-to-r from-orange-500 to-pink-500 text-white",
      ocean: "bg-gradient-to-r from-blue-500 to-teal-500 text-white",
      forest: "bg-gradient-to-r from-green-500 to-green-900 text-white",
      astronomyDarkRed:
        "bg-gradient-to-r from-red-900 via-red-800 to-black text-white", // 新增的主题样式
    };
    return { ...defaultThemes, ...customThemes };
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

  const addTheme = (themeName, themeClass) => {
    setThemes((prevThemes) => ({
      ...prevThemes,
      [themeName]: themeClass,
    }));
    availableThemes.push(themeName);
  };

  const removeTheme = (themeName) => {
    setThemes((prevThemes) => {
      const newThemes = { ...prevThemes };
      delete newThemes[themeName];
      return newThemes;
    });
    const index = availableThemes.indexOf(themeName);
    if (index > -1) {
      availableThemes.splice(index, 1);
    }
  };

  const previewTheme = (themeName) => {
    if (themes[themeName]) {
      return themes[themeName];
    }
    return themes[initialTheme];
  };

  useEffect(() => {
    if (onThemeChange) onThemeChange(theme);
  }, [theme, onThemeChange]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: handleSetTheme,
        resetTheme,
        addTheme,
        removeTheme,
        previewTheme,
      }}
    >
      <div
        className={`transition-colors duration-500 ease-in-out ${themes[theme]}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialTheme: PropTypes.oneOf([
    "light",
    "dark",
    "astronomy",
    "eyeCare",
    "sunset",
    "ocean",
    "forest",
    "astronomyDarkRed", // 新增的主题
  ]),
  onThemeChange: PropTypes.func,
  persist: PropTypes.bool,
  availableThemes: PropTypes.arrayOf(PropTypes.string),
  customThemes: PropTypes.object,
};
