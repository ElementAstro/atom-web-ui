// src/components/Sidebar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../context/ThemeContext";
import { AiOutlineHome } from "react-icons/ai";

describe("Sidebar Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnItemClick = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();

  const items = [
    { title: "Home", icon: "home" },
    { title: "User", icon: "user", subItems: [{ title: "Profile" }] },
    { title: "Settings", icon: "settings" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Sidebar items={items} />, "light");
    expect(screen.getByText("侧边栏")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Sidebar
        items={items}
        onItemClick={mockOnItemClick}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
        theme="dark"
        tooltip="Sidebar Tooltip"
        borderWidth="4"
        animation="transition-all duration-500 ease-in-out"
        icon={<AiOutlineHome />}
        fullscreen={true}
        autoClose={true}
        autoCloseDuration={3000}
        iconColor="text-red-400"
        customClass="custom-sidebar"
        customButtonClass="custom-button"
        customInputClass="custom-input"
        customItemClass="custom-item"
        customSubItemClass="custom-sub-item"
        hoverColor="hover-color"
        activeColor="active-color"
        disabledColor="disabled-color"
        hoverAnimation="hover-animation"
      />,
      "dark"
    );
    expect(screen.getByText("侧边栏")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("搜索...")).toBeInTheDocument();
  });

  test("toggles sidebar", () => {
    renderWithTheme(<Sidebar items={items} />, "light");
    const toggleButton = screen.getByLabelText("Toggle Sidebar");
    fireEvent.click(toggleButton);
    expect(mockOnClose).toHaveBeenCalled();
    fireEvent.click(toggleButton);
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("locks/unlocks sidebar", () => {
    renderWithTheme(<Sidebar items={items} />, "light");
    const lockButton = screen.getByLabelText("Lock/Unlock Sidebar");
    fireEvent.click(lockButton);
    expect(screen.getByLabelText("Lock/Unlock Sidebar")).toBeInTheDocument();
  });

  test("toggles fullscreen", () => {
    renderWithTheme(<Sidebar items={items} fullscreen={true} />, "light");
    const fullscreenButton = screen.getByLabelText("Toggle Fullscreen");
    fireEvent.click(fullscreenButton);
    expect(screen.getByLabelText("Toggle Fullscreen")).toBeInTheDocument();
  });

  test("searches items", () => {
    renderWithTheme(<Sidebar items={items} />, "light");
    const searchInput = screen.getByPlaceholderText("搜索...");
    fireEvent.change(searchInput, { target: { value: "User" } });
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  test("handles item click", () => {
    renderWithTheme(
      <Sidebar items={items} onItemClick={mockOnItemClick} />,
      "light"
    );
    fireEvent.click(screen.getByText("Home"));
    expect(mockOnItemClick).toHaveBeenCalledWith(items[0]);
  });

  test("expands/collapses sub-items", () => {
    renderWithTheme(<Sidebar items={items} />, "light");
    const expandButton = screen.getByText("▼");
    fireEvent.click(expandButton);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    fireEvent.click(expandButton);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  test("auto-closes sidebar", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <Sidebar items={items} autoClose={true} autoCloseDuration={3000} />,
      "light"
    );
    jest.advanceTimersByTime(3000);
    expect(mockOnClose).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
