// src/components/Avatar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Avatar from "./Avatar";
import { ThemeProvider } from "../context/ThemeContext"; // 修复导入路径

describe("Avatar Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider customThemes={{ theme }}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(<Avatar src="test.jpg" alt="Test Avatar" />, "light");
    const imgElement = screen.getByAltText("Test Avatar");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "test.jpg");
  });

  test("renders with custom size", () => {
    renderWithTheme(
      <Avatar src="test.jpg" alt="Test Avatar" size={80} />,
      "light"
    );
    const imgElement = screen.getByAltText("Test Avatar");
    expect(imgElement).toHaveClass("w-80 h-80");
  });

  test("renders with fallbackSrc on error", () => {
    renderWithTheme(
      <Avatar src="invalid.jpg" alt="Test Avatar" fallbackSrc="fallback.jpg" />,
      "light"
    );
    const imgElement = screen.getByAltText("Test Avatar");
    fireEvent.error(imgElement);
    expect(imgElement).toHaveAttribute("src", "fallback.jpg");
  });

  test("calls onLoad and onError callbacks", () => {
    const onLoad = jest.fn();
    const onError = jest.fn();
    renderWithTheme(
      <Avatar
        src="test.jpg"
        alt="Test Avatar"
        onLoad={onLoad}
        onError={onError}
      />,
      "light"
    );
    const imgElement = screen.getByAltText("Test Avatar");
    fireEvent.load(imgElement);
    expect(onLoad).toHaveBeenCalled();
    fireEvent.error(imgElement);
    expect(onError).toHaveBeenCalled();
  });

  test("renders with custom border color and width", () => {
    renderWithTheme(
      <Avatar
        src="test.jpg"
        alt="Test Avatar"
        borderColor="red"
        borderWidth="4"
      />,
      "light"
    );
    const borderElement = screen.getByAltText("Test Avatar").nextElementSibling;
    expect(borderElement).toHaveClass("border-4 border-red");
  });

  test("renders with status indicator", () => {
    renderWithTheme(
      <Avatar src="test.jpg" alt="Test Avatar" showStatus statusColor="blue" />,
      "light"
    );
    const statusElement = screen.getByText("", { selector: "span" });
    expect(statusElement).toHaveClass("bg-blue-500");
  });

  test("renders with badge", () => {
    renderWithTheme(
      <Avatar src="test.jpg" alt="Test Avatar" showBadge badgeContent="99+" />,
      "light"
    );
    const badgeElement = screen.getByText("99+");
    expect(badgeElement).toBeInTheDocument();
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Avatar src="test.jpg" alt="Test Avatar" onClick={handleClick} />,
      "light"
    );
    const avatarElement = screen.getByAltText("Test Avatar").parentElement;
    fireEvent.click(avatarElement!);
    expect(handleClick).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Avatar src="test.jpg" alt="Test Avatar" />, "dark");
    const borderElement = screen.getByAltText("Test Avatar").nextElementSibling;
    expect(borderElement).toHaveClass("border-gray-700");
  });

  test("handles lazy loading", () => {
    const onShow = jest.fn();
    renderWithTheme(
      <Avatar src="test.jpg" alt="Test Avatar" lazyLoad onShow={onShow} />,
      "light"
    );
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(onShow).toHaveBeenCalled();
  });
});
