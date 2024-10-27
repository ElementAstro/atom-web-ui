// src/components/Images.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Images from "./Images";
import { ThemeProvider } from "../context/ThemeContext";

describe("Images Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnImageClick = jest.fn();
  const mockOnImageHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  const images = [
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.jpg", alt: "Image 2" },
    { src: "image3.jpg", alt: "Image 3" },
  ];

  test("renders images", () => {
    renderWithTheme(<Images images={images} />, "light");
    images.forEach((image) => {
      expect(screen.getByAltText(image.alt)).toBeInTheDocument();
    });
  });

  test("calls onImageClick when an image is clicked", () => {
    renderWithTheme(
      <Images images={images} onImageClick={mockOnImageClick} />,
      "light"
    );
    fireEvent.click(screen.getByAltText("Image 1"));
    expect(mockOnImageClick).toHaveBeenCalledWith(images[0]);
  });

  test("calls onImageHover when an image is hovered", () => {
    renderWithTheme(
      <Images images={images} onImageHover={mockOnImageHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByAltText("Image 1"));
    expect(mockOnImageHover).toHaveBeenCalledWith(images[0]);
  });

  test("applies custom class", () => {
    renderWithTheme(
      <Images images={images} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByLabelText("图片画廊")).toHaveClass("custom-class");
  });

  test("applies theme classes", () => {
    renderWithTheme(<Images images={images} />, "dark");
    expect(screen.getByAltText("Image 1")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("applies tooltip", () => {
    renderWithTheme(
      <Images images={images} tooltip="Custom Tooltip" />,
      "light"
    );
    expect(screen.getByAltText("Image 1")).toHaveAttribute(
      "title",
      "Custom Tooltip"
    );
  });

  test("applies aria label", () => {
    renderWithTheme(
      <Images images={images} ariaLabel="Custom Aria Label" />,
      "light"
    );
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("applies border width", () => {
    renderWithTheme(<Images images={images} borderWidth="4" />, "light");
    expect(screen.getByAltText("Image 1")).toHaveClass("border-4");
  });

  test("applies animation", () => {
    renderWithTheme(
      <Images images={images} animation="custom-animation" />,
      "light"
    );
    expect(screen.getByAltText("Image 1")).toHaveClass("custom-animation");
  });

  test("handles fullscreen", () => {
    renderWithTheme(<Images images={images} fullscreen={true} />, "light");
    fireEvent.click(screen.getByAltText("Image 1"));
    fireEvent.click(screen.getByAltText("Image 1"));
    expect(document.fullscreenElement).toBeTruthy();
  });

  test("auto closes after specified duration", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <Images images={images} autoClose={true} autoCloseDuration={1000} />,
      "light"
    );
    fireEvent.click(screen.getByAltText("Image 1"));
    jest.advanceTimersByTime(1000);
    expect(screen.queryByAltText("Image 1")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test("calls onFocus when focused", () => {
    renderWithTheme(<Images images={images} onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByLabelText("图片画廊"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when blurred", () => {
    renderWithTheme(<Images images={images} onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByLabelText("图片画廊"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <Images images={images} onKeyDown={mockOnKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("图片画廊"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onMouseEnter when mouse enters", () => {
    renderWithTheme(
      <Images images={images} onMouseEnter={mockOnMouseEnter} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByLabelText("图片画廊"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  test("calls onMouseLeave when mouse leaves", () => {
    renderWithTheme(
      <Images images={images} onMouseLeave={mockOnMouseLeave} />,
      "light"
    );
    fireEvent.mouseLeave(screen.getByLabelText("图片画廊"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(
      <Images images={images} onAnimationEnd={mockOnAnimationEnd} />,
      "light"
    );
    fireEvent.animationEnd(screen.getByLabelText("图片画廊"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("applies hover color", () => {
    renderWithTheme(
      <Images images={images} hoverColor="hover:bg-red-500" />,
      "light"
    );
    expect(screen.getByAltText("Image 1")).toHaveClass("hover:bg-red-500");
  });

  test("applies active color", () => {
    renderWithTheme(
      <Images images={images} activeColor="active:bg-blue-500" />,
      "light"
    );
    expect(screen.getByAltText("Image 1")).toHaveClass("active:bg-blue-500");
  });

  test("applies disabled color", () => {
    renderWithTheme(<Images images={images} disabled={true} />, "light");
    expect(screen.getByAltText("Image 1")).toHaveClass("text-gray-400");
  });

  test("applies hover animation", () => {
    renderWithTheme(
      <Images images={images} hoverAnimation="hover:scale-110" />,
      "light"
    );
    expect(screen.getByAltText("Image 1")).toHaveClass("hover:scale-110");
  });
});
