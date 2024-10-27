// src/components/Slides.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Slides from "./Slides";
import { ThemeProvider } from "../context/ThemeContext";

describe("Slides Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSlideChange = jest.fn();

  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  test("renders with default props", () => {
    renderWithTheme(<Slides slides={slides} />, "light");
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Slides
        slides={slides}
        autoPlay={true}
        interval={2000}
        onSlideChange={mockOnSlideChange}
        maxWidth="500px"
        maxHeight="300px"
        theme="dark"
        tooltip="Slide Tooltip"
        borderWidth="4"
        animation="transition-opacity duration-500 ease-in-out"
        icon={<span>Icon</span>}
        fullscreen={true}
        showThumbnails={true}
        showProgress={true}
        customClass="custom-slides"
        customButtonClass="custom-button"
        customSlideClass="custom-slide"
        customThumbnailClass="custom-thumbnail"
        prevButtonIcon="Prev"
        nextButtonIcon="Next"
        prevButtonTooltip="Previous"
        nextButtonTooltip="Next"
        prevButtonDisabled={false}
        nextButtonDisabled={false}
        hoverColor="hover-color"
        activeColor="active-color"
        disabledColor="disabled-color"
        hoverAnimation="hover-animation"
        showIndicators={true}
        indicatorColor="indicator-color"
        indicatorActiveColor="indicator-active-color"
      />,
      "dark"
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Prev")).toBeInTheDocument();
  });

  test("calls onSlideChange when next and previous buttons are clicked", () => {
    renderWithTheme(
      <Slides slides={slides} onSlideChange={mockOnSlideChange} />,
      "light"
    );
    fireEvent.click(screen.getByLabelText("Next Slide"));
    expect(mockOnSlideChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText("Previous Slide"));
    expect(mockOnSlideChange).toHaveBeenCalledWith(0);
  });

  test("auto-plays slides", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <Slides slides={slides} autoPlay={true} interval={1000} />,
      "light"
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
    jest.useRealTimers();
  });

  test("handles fullscreen functionality", () => {
    renderWithTheme(<Slides slides={slides} fullscreen={true} />, "light");
    fireEvent.click(screen.getByText("Slide 1"));
    expect(document.fullscreenElement).toBe(document.documentElement);
  });

  test("handles indicator click functionality", () => {
    renderWithTheme(
      <Slides slides={slides} onSlideChange={mockOnSlideChange} />,
      "light"
    );
    fireEvent.click(screen.getByLabelText("Slide 2"));
    expect(mockOnSlideChange).toHaveBeenCalledWith(1);
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  test("handles thumbnail click functionality", () => {
    renderWithTheme(
      <Slides slides={slides} showThumbnails={true} onSlideChange={mockOnSlideChange} />,
      "light"
    );
    fireEvent.click(screen.getByLabelText("Thumbnail 2"));
    expect(mockOnSlideChange).toHaveBeenCalledWith(1);
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  test("displays progress bar correctly", () => {
    renderWithTheme(<Slides slides={slides} showProgress={true} />, "light");
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 33.3333%");
  });

  test("applies theme classes", () => {
    renderWithTheme(<Slides slides={slides} theme="astronomy" />, "astronomy");
    expect(screen.getByText("Slide 1").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});