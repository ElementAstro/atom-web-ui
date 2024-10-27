// src/components/NumberInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NumberInput from "./NumberInput";

describe("NumberInput Component", () => {
  const mockOnValueChange = jest.fn();

  test("renders with default props", () => {
    render(<NumberInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  test("increments value when + button is clicked", () => {
    render(<NumberInput onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByRole("textbox")).toHaveValue("1");
    expect(mockOnValueChange).toHaveBeenCalledWith(1);
  });

  test("decrements value when - button is clicked", () => {
    render(<NumberInput initialValue={1} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(mockOnValueChange).toHaveBeenCalledWith(0);
  });

  test("does not decrement below min value", () => {
    render(<NumberInput min={0} initialValue={0} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(mockOnValueChange).not.toHaveBeenCalled();
  });

  test("does not increment above max value", () => {
    render(<NumberInput max={10} initialValue={10} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByRole("textbox")).toHaveValue("10");
    expect(mockOnValueChange).not.toHaveBeenCalled();
  });

  test("changes value when input is changed", () => {
    render(<NumberInput onValueChange={mockOnValueChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "5" } });
    expect(screen.getByRole("textbox")).toHaveValue("5");
    expect(mockOnValueChange).toHaveBeenCalledWith(5);
  });

  test("clamps value within min and max on blur", () => {
    render(<NumberInput min={0} max={10} initialValue={5} onValueChange={mockOnValueChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "15" } });
    fireEvent.blur(screen.getByRole("textbox"));
    expect(screen.getByRole("textbox")).toHaveValue("10");
    expect(mockOnValueChange).toHaveBeenCalledWith(10);
  });

  test("increments value on ArrowUp key press", () => {
    render(<NumberInput onValueChange={mockOnValueChange} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "ArrowUp" });
    expect(screen.getByRole("textbox")).toHaveValue("1");
    expect(mockOnValueChange).toHaveBeenCalledWith(1);
  });

  test("decrements value on ArrowDown key press", () => {
    render(<NumberInput initialValue={1} onValueChange={mockOnValueChange} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "ArrowDown" });
    expect(screen.getByRole("textbox")).toHaveValue("0");
    expect(mockOnValueChange).toHaveBeenCalledWith(0);
  });

  test("applies theme classes", () => {
    render(<NumberInput theme="dark" />);
    expect(screen.getByRole("textbox").parentElement).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with disabled state", () => {
    render(<NumberInput disabled={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "+" })).toBeDisabled();
  });

  test("renders with readOnly state", () => {
    render(<NumberInput readOnly={true} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readOnly");
  });

  test("formats number with thousands separator", () => {
    render(<NumberInput formatThousands={true} initialValue={1000} />);
    expect(screen.getByRole("textbox")).toHaveValue("1,000");
  });

  test("renders with custom tooltip", () => {
    render(<NumberInput tooltip="Custom Tooltip" />);
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with custom border width", () => {
    render(<NumberInput borderWidth="2" />);
    expect(screen.getByRole("textbox")).toHaveStyle("border-width: 2px");
  });

  test("renders with custom hover and active colors", () => {
    render(<NumberInput hoverColor="hover:bg-blue-500" activeColor="active:bg-blue-700" />);
    expect(screen.getByRole("button", { name: "-" })).toHaveClass("hover:bg-blue-500 active:bg-blue-700");
    expect(screen.getByRole("button", { name: "+" })).toHaveClass("hover:bg-blue-500 active:bg-blue-700");
  });

  test("renders with custom hover animation", () => {
    render(<NumberInput hoverAnimation="hover:scale-110" />);
    expect(screen.getByRole("button", { name: "-" })).toHaveClass("hover:scale-110");
    expect(screen.getByRole("button", { name: "+" })).toHaveClass("hover:scale-110");
  });
});