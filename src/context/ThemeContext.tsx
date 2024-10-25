// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
  setTheme: (newTheme: string) => void;
  resetTheme: () => void;
  addTheme: (themeName: string, themeClass: string) => void;
  removeTheme: (themeName: string) => void;
  previewTheme: (themeName: string) => string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
  onThemeChange?: (theme: string) => void;
  persist?: boolean;
  availableThemes?: string[];
  customThemes?: Record<string, string>;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
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
  const [theme, setTheme] = useState<string>(() => {
    if (persist) {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || initialTheme;
    }
    return initialTheme;
  });

  const [themes, setThemes] = useState<Record<string, string>>(() => {
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

  const handleSetTheme = (newTheme: string) => {
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

  const addTheme = (themeName: string, themeClass: string) => {
    setThemes((prevThemes) => ({
      ...prevThemes,
      [themeName]: themeClass,
    }));
    availableThemes.push(themeName);
  };

  const removeTheme = (themeName: string) => {
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

  const previewTheme = (themeName: string): string => {
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