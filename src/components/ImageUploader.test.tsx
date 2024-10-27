// src/components/ImageUploader.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageUploader from "./ImageUploader";
import { ThemeProvider } from "../context/ThemeContext";

describe("ImageUploader Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnUpload = jest.fn();
  const mockOnImageLoad = jest.fn();
  const mockOnImageError = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<ImageUploader />, "light");
    expect(screen.getByLabelText("图片上传器")).toBeInTheDocument();
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<ImageUploader ariaLabel="Custom Aria Label" />, "light");
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom upload button text", () => {
    renderWithTheme(<ImageUploader uploadButtonText="Upload Image" />, "light");
    expect(screen.getByText("Upload Image")).toBeInTheDocument();
  });

  test("calls onUpload when an image is uploaded", () => {
    renderWithTheme(<ImageUploader onUpload={mockOnUpload} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    expect(mockOnUpload).toHaveBeenCalledWith(file);
  });

  test("displays error when file exceeds max size", () => {
    renderWithTheme(<ImageUploader maxFileSize={1} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    expect(screen.getByText(/部分文件超过最大大小限制/i)).toBeInTheDocument();
  });

  test("displays preview images", async () => {
    renderWithTheme(<ImageUploader preview={true} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    await waitFor(() => expect(screen.getByAltText("Selected 0")).toBeInTheDocument());
  });

  test("removes image from preview", async () => {
    renderWithTheme(<ImageUploader preview={true} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    await waitFor(() => expect(screen.getByAltText("Selected 0")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByAltText("Selected 0")).not.toBeInTheDocument();
  });

  test("calls onImageLoad when image loads", async () => {
    renderWithTheme(<ImageUploader onImageLoad={mockOnImageLoad} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    await waitFor(() => expect(mockOnImageLoad).toHaveBeenCalled());
  });

  test("calls onImageError when image fails to load", async () => {
    renderWithTheme(<ImageUploader onImageError={mockOnImageError} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    const img = screen.getByAltText("Selected 0");
    fireEvent.error(img);
    await waitFor(() => expect(mockOnImageError).toHaveBeenCalled());
  });

  test("applies theme classes", () => {
    renderWithTheme(<ImageUploader />, "dark");
    expect(screen.getByLabelText("图片上传器")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom class", () => {
    renderWithTheme(<ImageUploader customClass="custom-class" />, "light");
    expect(screen.getByLabelText("图片上传器")).toHaveClass("custom-class");
  });

  test("calls onFocus when focused", () => {
    renderWithTheme(<ImageUploader onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByLabelText("图片上传器"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when blurred", () => {
    renderWithTheme(<ImageUploader onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByLabelText("图片上传器"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(<ImageUploader onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByLabelText("图片上传器"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onMouseEnter when mouse enters", () => {
    renderWithTheme(<ImageUploader onMouseEnter={mockOnMouseEnter} />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("图片上传器"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  test("calls onMouseLeave when mouse leaves", () => {
    renderWithTheme(<ImageUploader onMouseLeave={mockOnMouseLeave} />, "light");
    fireEvent.mouseLeave(screen.getByLabelText("图片上传器"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(<ImageUploader onAnimationEnd={mockOnAnimationEnd} />, "light");
    fireEvent.animationEnd(screen.getByLabelText("图片上传器"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("auto closes after specified duration", () => {
    jest.useFakeTimers();
    renderWithTheme(<ImageUploader autoClose={true} autoCloseDuration={1000} />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    jest.advanceTimersByTime(1000);
    expect(screen.queryByAltText("Selected 0")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test("displays loading spinner when loading", () => {
    renderWithTheme(<ImageUploader />, "light");
    const input = screen.getByLabelText("图片上传器").querySelector("input");
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(input!, { target: { files: [file] } });
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});