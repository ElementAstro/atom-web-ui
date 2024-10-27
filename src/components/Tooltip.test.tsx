// src/components/Tooltip.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tooltip from "./Tooltip";
import { ThemeProvider } from "../context/ThemeContext";

describe("Tooltip Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnShow = jest.fn();
  const mockOnHide = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
      "light"
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Tooltip
        text="Custom Tooltip"
        position="bottom"
        trigger="click"
        delay={500}
        customClass="custom-tooltip"
        customTextClass="custom-text"
        theme="dark"
        tooltip="Custom Tooltip"
        borderWidth="4"
        animation="transition-opacity duration-500 ease-in-out"
        icon={<span>Icon</span>}
        fullscreen={true}
        size="large"
        onShow={mockOnShow}
        onHide={mockOnHide}
        onDoubleClick={mockOnDoubleClick}
        onKeyDown={mockOnKeyDown}
        ariaLabel="Custom Tooltip"
        backgroundColor="black"
        textColor="white"
        borderColor="red"
        maxWidth="300px"
      >
        <button>Click me</button>
      </Tooltip>,
      "dark"
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("shows tooltip on hover", async () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" onShow={mockOnShow} onHide={mockOnHide}>
        <button>Hover me</button>
      </Tooltip>,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Tooltip text")).toBeVisible());
    expect(mockOnShow).toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.queryByText("Tooltip text")).not.toBeVisible());
    expect(mockOnHide).toHaveBeenCalled();
  });

  test("shows tooltip on click", async () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" trigger="click" onShow={mockOnShow} onHide={mockOnHide}>
        <button>Click me</button>
      </Tooltip>,
      "light"
    );
    fireEvent.click(screen.getByText("Click me"));
    await waitFor(() => expect(screen.getByText("Tooltip text")).toBeVisible());
    expect(mockOnShow).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Click me"));
    await waitFor(() => expect(screen.queryByText("Tooltip text")).not.toBeVisible());
    expect(mockOnHide).toHaveBeenCalled();
  });

  test("handles double-click correctly", () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" onDoubleClick={mockOnDoubleClick}>
        <button>Double-click me</button>
      </Tooltip>,
      "light"
    );
    fireEvent.doubleClick(screen.getByText("Double-click me"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("handles key down correctly", () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" onKeyDown={mockOnKeyDown}>
        <button>Press a key</button>
      </Tooltip>,
      "light"
    );
    fireEvent.keyDown(screen.getByText("Press a key"), { key: "Enter", code: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("shows tooltip with delay", async () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" delay={500}>
        <button>Hover me</button>
      </Tooltip>,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Tooltip text")).toBeVisible(), { timeout: 600 });
  });

  test("adjusts tooltip position", async () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" position="top">
        <button style={{ position: "absolute", top: 0 }}>Hover me</button>
      </Tooltip>,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByText("Tooltip text")).toBeVisible());
    expect(screen.getByText("Tooltip text").parentElement).toHaveClass("bottom-full");
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(
      <Tooltip text="Tooltip text" theme="astronomy">
        <button>Hover me</button>
      </Tooltip>,
      "astronomy"
    );
    fireEvent.mouseEnter(screen.getByText("Hover me"));
    expect(screen.getByText("Tooltip text").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });

  test("applies custom styles correctly", () => {
    renderWithTheme(
      <Tooltip
        text="Tooltip text"
        backgroundColor="black"
        textColor="white"
        borderColor="red"
        maxWidth="300px"
      >
        <button>Hover me</button>
      </Tooltip>,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Hover me"));
    const tooltip = screen.getByText("Tooltip text");
    expect(tooltip).toHaveStyle("background-color: black");
    expect(tooltip).toHaveStyle("color: white");
    expect(tooltip).toHaveStyle("border-color: red");
    expect(tooltip).toHaveStyle("max-width: 300px");
  });
});