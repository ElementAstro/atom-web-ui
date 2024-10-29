// src/components/Textarea.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Textarea from "./Textarea";
import { ThemeProvider } from "../context/ThemeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>{ui}</DndProvider>
    </ThemeProvider>
  );
};

describe("Textarea", () => {
  test("renders Textarea with default props", () => {
    renderWithProviders(<Textarea value="" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders Textarea with label", () => {
    renderWithProviders(<Textarea value="" onChange={() => {}} label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders Textarea with custom class, border color, and background color", () => {
    renderWithProviders(
      <Textarea
        value=""
        onChange={() => {}}
        customClass="custom-class"
        borderColor="red"
        backgroundColor="blue"
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
    expect(textarea).toHaveClass("border-red");
    expect(textarea).toHaveClass("bg-blue");
  });

  test("handles onChange event", () => {
    const handleChange = jest.fn();
    renderWithProviders(<Textarea value="" onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("shows character count when showCharCount is true", () => {
    renderWithProviders(
      <Textarea value="Test" onChange={() => {}} maxLength={10} showCharCount />
    );
    expect(screen.getByText("4/10")).toBeInTheDocument();
  });

  test("displays error message", () => {
    renderWithProviders(<Textarea value="" onChange={() => {}} error="Error message" />);
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("handles onFocus and onBlur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    renderWithProviders(
      <Textarea value="" onChange={() => {}} onFocus={handleFocus} onBlur={handleBlur} />
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalled();
  });
});