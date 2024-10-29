// src/components/Radio.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Radio } from "./Radio";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui);
};

describe("Radio", () => {
  test("renders Radio with default props", () => {
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={() => {}} />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  test("renders Radio with custom color and size", () => {
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={() => {}} color="red" size={30} />);
    const radio = screen.getByLabelText("Test Label");
    expect(radio).toHaveClass("text-red-600");
    expect(radio).toHaveClass("h-30");
    expect(radio).toHaveClass("w-30");
  });

  test("handles onChange event", () => {
    const handleChange = jest.fn();
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={handleChange} />);
    const radio = screen.getByLabelText("Test Label");
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  test("is disabled", () => {
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={() => {}} disabled />);
    const radio = screen.getByLabelText("Test Label");
    expect(radio).toBeDisabled();
  });

  test("displays error state", () => {
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={() => {}} error />);
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("text-red-600");
  });

  test("shows tooltip", () => {
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={() => {}} tooltip="Tooltip text" />);
    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("title", "Tooltip text");
  });

  test("handles onFocus and onBlur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    renderWithProviders(<Radio label="Test Label" value="test" checked={false} onChange={() => {}} onFocus={handleFocus} onBlur={handleBlur} />);
    const radio = screen.getByLabelText("Test Label");
    fireEvent.focus(radio);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(radio);
    expect(handleBlur).toHaveBeenCalled();
  });
});