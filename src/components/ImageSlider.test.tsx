// src/components/ImageSlider.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageSlider from "./ImageSlider";
import { ThemeProvider } from "../context/ThemeContext";

describe("ImageSlider Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const mockOnSlideChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders with images", () => {
    renderWithTheme(<ImageSlider images={images} />, "light");
    expect(screen.getByAltText("Slide 1")).toBeInTheDocument();
  });

  test("autoplays slides", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <ImageSlider images={images} autoplayInterval={1000} />,
      "light"
    );
    jest.advanceTimersByTime(1000);
    expect(screen.getByAltText("Slide 2")).toBeInTheDocument();
    jest.useRealTimers();
  });

  test("pauses on hover", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <ImageSlider images={images} pauseOnHover={true} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByLabelText("图片滑块"));
    jest.advanceTimersByTime(3000);
    expect(screen.getByAltText("Slide 1")).toBeInTheDocument();
    jest.useRealTimers();
  });

  test("calls onSlideChange when slide changes", () => {
    renderWithTheme(
      <ImageSlider images={images} onSlideChange={mockOnSlideChange} />,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /▶/i }));
    expect(mockOnSlideChange).toHaveBeenCalledWith(1);
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <ImageSlider images={images} tooltip="Custom Tooltip" />,
      "light"
    );
    expect(screen.getByRole("button", { name: /▶/i })).toHaveAttribute(
      "title",
      "Custom Tooltip"
    );
  });

  test("renders with custom aria label", () => {
    renderWithTheme(
      <ImageSlider images={images} ariaLabel="Custom Aria Label" />,
      "light"
    );
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom border width", () => {
    renderWithTheme(<ImageSlider images={images} borderWidth="4" />, "light");
    expect(screen.getByAltText("Slide 1")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(
      <ImageSlider images={images} animation="custom-animation" />,
      "light"
    );
    expect(screen.getByAltText("Slide 1")).toHaveClass("custom-animation");
  });

  test("renders with fullscreen functionality", () => {
    renderWithTheme(<ImageSlider images={images} fullscreen={true} />, "light");
    fireEvent.click(screen.getByLabelText("图片滑块"));
    expect(document.fullscreenElement).toBeTruthy();
  });

  test("calls onFocus when slider is focused", () => {
    renderWithTheme(
      <ImageSlider images={images} onFocus={mockOnFocus} />,
      "light"
    );
    fireEvent.focus(screen.getByLabelText("图片滑块"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when slider is blurred", () => {
    renderWithTheme(
      <ImageSlider images={images} onBlur={mockOnBlur} />,
      "light"
    );
    fireEvent.blur(screen.getByLabelText("图片滑块"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <ImageSlider images={images} onKeyDown={mockOnKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("图片滑块"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(
      <ImageSlider images={images} onAnimationEnd={mockOnAnimationEnd} />,
      "light"
    );
    fireEvent.animationEnd(screen.getByLabelText("图片滑块"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<ImageSlider images={images} />, "dark");
    expect(screen.getByLabelText("图片滑块")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with custom hover color", () => {
    renderWithTheme(
      <ImageSlider images={images} hoverColor="hover:bg-red-500" />,
      "light"
    );
    expect(screen.getByLabelText("图片滑块")).toHaveClass("hover:bg-red-500");
  });

  test("renders with custom active color", () => {
    renderWithTheme(
      <ImageSlider images={images} activeColor="active:bg-blue-500" />,
      "light"
    );
    expect(screen.getByLabelText("图片滑块")).toHaveClass("active:bg-blue-500");
  });

  test("renders with custom disabled color", () => {
    renderWithTheme(
      <ImageSlider
        images={images}
        disabled={true}
        disabledColor="text-gray-400"
      />,
      "light"
    );
    expect(screen.getByLabelText("图片滑块")).toHaveClass("text-gray-400");
  });

  test("renders with custom hover animation", () => {
    renderWithTheme(
      <ImageSlider images={images} hoverAnimation="hover:scale-105" />,
      "light"
    );
    expect(screen.getByLabelText("图片滑块")).toHaveClass("hover:scale-105");
  });

  test("renders thumbnails when showThumbnails is true", () => {
    renderWithTheme(
      <ImageSlider images={images} showThumbnails={true} />,
      "light"
    );
    expect(screen.getByAltText("Thumbnail 1")).toBeInTheDocument();
  });

  test("changes slide when thumbnail is clicked", () => {
    renderWithTheme(
      <ImageSlider images={images} showThumbnails={true} />,
      "light"
    );
    fireEvent.click(screen.getByAltText("Thumbnail 2"));
    expect(screen.getByAltText("Slide 2")).toBeInTheDocument();
  });
});
