// src/components/Rating.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Rating from "./Rating";
import { ThemeProvider } from "../context/ThemeContext";

describe("Rating Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnRate = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnLeave = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Rating />, "light");
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  test("calls onRate when a star is clicked", () => {
    renderWithTheme(<Rating onRate={mockOnRate} />, "light");
    fireEvent.click(screen.getAllByRole("radio")[2]);
    expect(mockOnRate).toHaveBeenCalledWith(3);
  });

  test("calls onHover when a star is hovered", () => {
    renderWithTheme(<Rating onHover={mockOnHover} />, "light");
    fireEvent.mouseEnter(screen.getAllByRole("radio")[2]);
    expect(mockOnHover).toHaveBeenCalledWith(3);
  });

  test("calls onLeave when mouse leaves a star", () => {
    renderWithTheme(<Rating onLeave={mockOnLeave} />, "light");
    fireEvent.mouseLeave(screen.getAllByRole("radio")[2]);
    expect(mockOnLeave).toHaveBeenCalled();
  });

  test("calls onFocus and onBlur event handlers", () => {
    renderWithTheme(
      <Rating onFocus={mockOnFocus} onBlur={mockOnBlur} />,
      "light"
    );
    const ratingGroup = screen.getByRole("radiogroup");
    fireEvent.focus(ratingGroup);
    fireEvent.blur(ratingGroup);
    expect(mockOnFocus).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("renders with custom label", () => {
    renderWithTheme(<Rating label="Rate this" />, "light");
    expect(screen.getByText("Rate this")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<Rating tooltip="Rate this" />, "light");
    expect(screen.getAllByRole("radio")[0]).toHaveAttribute(
      "title",
      "Rate this"
    );
  });

  test("renders with custom class", () => {
    renderWithTheme(<Rating customClass="custom-class" />, "light");
    expect(screen.getByRole("radiogroup").parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("renders with clearable functionality", () => {
    renderWithTheme(<Rating clearable={true} onRate={mockOnRate} />, "light");
    fireEvent.click(screen.getAllByRole("radio")[2]);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnRate).toHaveBeenCalledWith(0);
  });

  test("renders with half star functionality", () => {
    renderWithTheme(<Rating allowHalf={true} />, "light");
    expect(screen.getAllByRole("radio")).toHaveLength(10);
  });

  test("applies theme classes", () => {
    renderWithTheme(<Rating />, "dark");
    expect(screen.getByRole("radiogroup").parentElement).toHaveClass(
      "bg-gray-900 text-white"
    );
  });

  test("renders with different sizes", () => {
    renderWithTheme(<Rating size="large" />, "light");
    expect(screen.getAllByRole("radio")[0]).toHaveClass("text-5xl w-16 h-16");
  });

  test("renders with border", () => {
    renderWithTheme(<Rating border={true} />, "light");
    expect(screen.getAllByRole("radio")[0]).toHaveClass(
      "border border-gray-300 border-2"
    );
  });

  test("renders with fullscreen functionality", () => {
    renderWithTheme(<Rating fullscreen={true} />, "light");
    expect(screen.getByRole("radiogroup").parentElement).toHaveClass(
      "w-full h-full"
    );
  });

  test("renders with custom border color", () => {
    renderWithTheme(
      <Rating border={true} borderColor="border-red-500" />,
      "light"
    );
    expect(screen.getAllByRole("radio")[0]).toHaveClass(
      "border border-red-500 border-2"
    );
  });

  test("renders with custom hover color", () => {
    renderWithTheme(<Rating hoverColor="hover:text-blue-500" />, "light");
    fireEvent.mouseEnter(screen.getAllByRole("radio")[0]);
    expect(screen.getAllByRole("radio")[0]).toHaveClass("hover:text-blue-500");
  });

  test("renders with custom active color", () => {
    renderWithTheme(<Rating activeColor="text-green-500" />, "light");
    fireEvent.click(screen.getAllByRole("radio")[0]);
    expect(screen.getAllByRole("radio")[0]).toHaveClass("text-green-500");
  });

  test("renders with custom disabled color", () => {
    renderWithTheme(
      <Rating disabled={true} disabledColor="text-gray-500" />,
      "light"
    );
    expect(screen.getAllByRole("radio")[0]).toHaveClass("text-gray-500");
  });

  test("renders with custom hover animation", () => {
    renderWithTheme(<Rating hoverAnimation="hover:rotate-45" />, "light");
    fireEvent.mouseEnter(screen.getAllByRole("radio")[0]);
    expect(screen.getAllByRole("radio")[0]).toHaveClass("hover:rotate-45");
  });

  test("renders with custom icon", () => {
    renderWithTheme(<Rating icon="⭐" />, "light");
    expect(screen.getAllByRole("radio")[0]).toHaveTextContent("⭐");
  });

  test("renders with custom border width", () => {
    renderWithTheme(<Rating border={true} borderWidth="4" />, "light");
    expect(screen.getAllByRole("radio")[0]).toHaveClass(
      "border border-gray-300 border-4"
    );
  });

  test("renders with custom animation", () => {
    renderWithTheme(
      <Rating animation="transition duration-500 ease-in-out" />,
      "light"
    );
    expect(screen.getAllByRole("radio")[0]).toHaveClass(
      "transition duration-500 ease-in-out"
    );
  });

  test("renders with custom button class", () => {
    renderWithTheme(
      <Rating clearable={true} customButtonClass="custom-button-class" />,
      "light"
    );
    expect(screen.getByRole("button")).toHaveClass("custom-button-class");
  });

  test("renders with custom label class", () => {
    renderWithTheme(
      <Rating label="Rate this" customLabelClass="custom-label-class" />,
      "light"
    );
    expect(screen.getByText("Rate this")).toHaveClass("custom-label-class");
  });

  test("renders with custom icon class", () => {
    renderWithTheme(<Rating customIconClass="custom-icon-class" />, "light");
    expect(screen.getAllByRole("radio")[0]).toHaveClass("custom-icon-class");
  });
});
