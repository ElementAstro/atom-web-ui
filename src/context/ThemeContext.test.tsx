// src/context/ThemeContext.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider, useTheme } from "./ThemeContext";

describe("ThemeContext", () => {
  const TestComponent = () => {
    const {
      theme,
      toggleTheme,
      setTheme,
      resetTheme,
      addTheme,
      removeTheme,
      previewTheme,
    } = useTheme();

    return (
      <div>
        <div data-testid="current-theme">{theme}</div>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
        <button onClick={resetTheme}>Reset Theme</button>
        <button onClick={() => addTheme("newTheme", "bg-new-theme")}>
          Add Theme
        </button>
        <button onClick={() => removeTheme("newTheme")}>Remove Theme</button>
        <div data-testid="preview-theme">{previewTheme("newTheme")}</div>
      </div>
    );
  };

  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(<TestComponent />, "light");
    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  test("renders with custom props", () => {
    renderWithTheme(<TestComponent />, "dark");
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  test("toggles theme", () => {
    renderWithTheme(<TestComponent />, "light");
    fireEvent.click(screen.getByText("Toggle Theme"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  test("sets theme", () => {
    renderWithTheme(<TestComponent />, "light");
    fireEvent.click(screen.getByText("Set Dark Theme"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  test("resets theme", () => {
    renderWithTheme(<TestComponent />, "dark");
    fireEvent.click(screen.getByText("Reset Theme"));
    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  test("adds a new theme", () => {
    renderWithTheme(<TestComponent />, "light");
    fireEvent.click(screen.getByText("Add Theme"));
    expect(screen.getByTestId("preview-theme")).toHaveTextContent("bg-new-theme");
  });

  test("removes a theme", () => {
    renderWithTheme(<TestComponent />, "light");
    fireEvent.click(screen.getByText("Add Theme"));
    fireEvent.click(screen.getByText("Remove Theme"));
    expect(screen.getByTestId("preview-theme")).toHaveTextContent("bg-white text-gray-900");
  });

  test("previews a theme", () => {
    renderWithTheme(<TestComponent />, "light");
    fireEvent.click(screen.getByText("Add Theme"));
    expect(screen.getByTestId("preview-theme")).toHaveTextContent("bg-new-theme");
  });

  test("persists theme in localStorage", () => {
    renderWithTheme(<TestComponent />, "light");
    fireEvent.click(screen.getByText("Toggle Theme"));
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("applies theme classes to provider", () => {
    renderWithTheme(<TestComponent />, "astronomy");
    expect(screen.getByTestId("current-theme").closest("div")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white"
    );
  });
});