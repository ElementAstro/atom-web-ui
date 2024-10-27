// src/components/SkeletonScreen.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SkeletonScreen from "./SkeletonScreen";
import { ThemeProvider } from "../context/ThemeContext";

describe("SkeletonScreen Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnAnimationEnd = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnMaximize = jest.fn();
  const mockOnMinimize = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<SkeletonScreen />, "light");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <SkeletonScreen
        width="200px"
        height="50px"
        shape="circle"
        className="custom-skeleton"
        onHover={mockOnHover}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onKeyDown={mockOnKeyDown}
        onAnimationEnd={mockOnAnimationEnd}
        onDoubleClick={mockOnDoubleClick}
        draggable={true}
        maximizable={true}
        onMaximize={mockOnMaximize}
        onMinimize={mockOnMinimize}
        closable={true}
        autoHide={true}
        hideAfter={5000}
        showProgress={true}
        theme="dark"
        tooltip="Skeleton Tooltip"
        borderWidth="4"
        animation="animate-bounce"
        icon={<div>Icon</div>}
        fullscreen={true}
        iconColor="text-red-500"
        customClass="custom-class"
        customButtonClass="custom-button-class"
        customProgressClass="custom-progress-class"
        hoverColor="hover-color"
        activeColor="active-color"
        disabledColor="disabled-color"
        hoverAnimation="hover-animation"
      />,
      "dark"
    );
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("custom-skeleton");
    expect(skeleton).toHaveClass("custom-class");
    expect(skeleton).toHaveClass("animate-bounce");
    expect(skeleton).toHaveClass("border-4");
    expect(skeleton).toHaveClass("rounded-full");
    expect(skeleton).toHaveClass("bg-gray-900");
    expect(skeleton).toHaveClass("text-white");
    expect(skeleton).toHaveClass("border-gray-700");
  });

  test("calls onHover when hovered", () => {
    renderWithTheme(<SkeletonScreen onHover={mockOnHover} />, "light");
    fireEvent.mouseEnter(screen.getByRole("status"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("calls onFocus and onBlur when focused and blurred", () => {
    renderWithTheme(
      <SkeletonScreen onFocus={mockOnFocus} onBlur={mockOnBlur} />,
      "light"
    );
    const skeleton = screen.getByRole("status");
    fireEvent.focus(skeleton);
    expect(mockOnFocus).toHaveBeenCalled();
    fireEvent.blur(skeleton);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when key is pressed", () => {
    renderWithTheme(<SkeletonScreen onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByRole("status"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(
      <SkeletonScreen onAnimationEnd={mockOnAnimationEnd} />,
      "light"
    );
    fireEvent.animationEnd(screen.getByRole("status"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("calls onDoubleClick when double clicked", () => {
    renderWithTheme(
      <SkeletonScreen onDoubleClick={mockOnDoubleClick} />,
      "light"
    );
    fireEvent.doubleClick(screen.getByRole("status"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("handles drag and drop", () => {
    renderWithTheme(<SkeletonScreen draggable={true} />, "light");
    const skeleton = screen.getByRole("status");
    fireEvent.dragStart(skeleton, {
      clientX: 100,
      clientY: 100,
    });
    fireEvent.drop(skeleton, {
      clientX: 200,
      clientY: 200,
    });
    expect(skeleton.style.left).toBe("100px");
    expect(skeleton.style.top).toBe("100px");
  });

  test("handles maximize and minimize", () => {
    renderWithTheme(
      <SkeletonScreen
        maximizable={true}
        onMaximize={mockOnMaximize}
        onMinimize={mockOnMinimize}
      />,
      "light"
    );
    const maximizeButton = screen.getByTitle("Skeleton Tooltip");
    fireEvent.click(maximizeButton);
    expect(mockOnMaximize).toHaveBeenCalled();
    const minimizeButton = screen.getByTitle("Skeleton Tooltip");
    fireEvent.click(minimizeButton);
    expect(mockOnMinimize).toHaveBeenCalled();
  });

  test("handles close", () => {
    renderWithTheme(<SkeletonScreen closable={true} />, "light");
    const closeButton = screen.getByTitle("Skeleton Tooltip");
    fireEvent.click(closeButton);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  test("handles fullscreen", () => {
    renderWithTheme(<SkeletonScreen fullscreen={true} />, "light");
    const fullscreenButton = screen.getByTitle("Skeleton Tooltip");
    fireEvent.click(fullscreenButton);
    expect(document.fullscreenElement).toBe(document.documentElement);
  });

  test("handles auto-hide", () => {
    jest.useFakeTimers();
    renderWithTheme(<SkeletonScreen autoHide={true} hideAfter={1000} />, "light");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test("shows progress bar", () => {
    renderWithTheme(<SkeletonScreen showProgress={true} />, "light");
    expect(screen.getByRole("status").querySelector(".custom-progress-class")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<SkeletonScreen theme="astronomy" />, "astronomy");
    expect(screen.getByRole("status")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});