// src/components/RadioGroup.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { RadioGroup } from "./RadioGroup";
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

describe("RadioGroup", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2", disabled: true, tooltip: "Disabled option" },
    { label: "Option 3", value: "3" },
  ];

  test("renders RadioGroup with default props", () => {
    renderWithProviders(
      <RadioGroup options={options} selectedValue="1" onChange={() => {}} />
    );
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 3")).toBeInTheDocument();
  });

  test("renders RadioGroup with group label", () => {
    renderWithProviders(
      <RadioGroup
        options={options}
        selectedValue="1"
        onChange={() => {}}
        groupLabel="Test Group Label"
      />
    );
    expect(screen.getByText("Test Group Label")).toBeInTheDocument();
  });

  test("renders RadioGroup with custom color and size", () => {
    renderWithProviders(
      <RadioGroup
        options={options}
        selectedValue="1"
        onChange={() => {}}
        color="red"
        size={30}
      />
    );
    const radio = screen.getByLabelText("Option 1");
    expect(radio).toHaveStyle({ color: "red", width: "30px", height: "30px" });
  });

  test("handles onChange event", () => {
    const handleChange = jest.fn();
    renderWithProviders(
      <RadioGroup options={options} selectedValue="1" onChange={handleChange} />
    );
    const radio = screen.getByLabelText("Option 3");
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith("3");
  });

  test("renders disabled options", () => {
    renderWithProviders(
      <RadioGroup options={options} selectedValue="1" onChange={() => {}} />
    );
    const disabledRadio = screen.getByLabelText("Option 2");
    expect(disabledRadio).toBeDisabled();
  });

  test("displays error message", () => {
    renderWithProviders(
      <RadioGroup options={options} selectedValue="1" onChange={() => {}} error="Error message" />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("shows tooltips", () => {
    renderWithProviders(
      <RadioGroup options={options} selectedValue="1" onChange={() => {}} />
    );
    const disabledRadio = screen.getByLabelText("Option 2");
    fireEvent.mouseOver(disabledRadio);
    expect(screen.getByText("Disabled option")).toBeInTheDocument();
  });

  test("handles onFocus and onBlur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    renderWithProviders(
      <RadioGroup
        options={options}
        selectedValue="1"
        onChange={() => {}}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
    const radio = screen.getByLabelText("Option 1");
    fireEvent.focus(radio);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(radio);
    expect(handleBlur).toHaveBeenCalled();
  });
});