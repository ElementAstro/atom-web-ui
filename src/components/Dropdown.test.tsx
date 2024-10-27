// src/components/Dropdown.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dropdown from "./Dropdown";
import { ThemeProvider } from "../context/ThemeContext";

describe("Dropdown Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnOptionSelect = jest.fn();
  const mockOnDropdownToggle = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  const options = ["Option 1", "Option 2", "Option 3"];

  test("renders with default props", () => {
    renderWithTheme(<Dropdown options={options} />, "light");
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  test("renders with custom label", () => {
    renderWithTheme(<Dropdown options={options} label="Custom Label" />, "light");
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  test("toggles dropdown on button click", () => {
    renderWithTheme(<Dropdown options={options} />, "light");
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("selects an option", () => {
    renderWithTheme(<Dropdown options={options} onOptionSelect={mockOnOptionSelect} />, "light");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 1"));
    expect(mockOnOptionSelect).toHaveBeenCalledWith("Option 1");
    expect(screen.getByRole("button")).toHaveTextContent("Option 1");
  });

  test("filters options based on search term", () => {
    renderWithTheme(<Dropdown options={options} showSearch />, "light");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "Option 2" } });
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  test("clears selection", () => {
    renderWithTheme(<Dropdown options={options} clearable />, "light");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("✕"));
    expect(screen.getByRole("button")).toHaveTextContent("Select...");
  });

  test("applies custom classes", () => {
    renderWithTheme(
      <Dropdown
        options={options}
        customClass="custom-class"
        customButtonClass="custom-button-class"
        customInputClass="custom-input-class"
        customOptionClass="custom-option-class"
        customSelectedClass="custom-selected-class"
      />,
      "light"
    );
    expect(screen.getByRole("button")).toHaveClass("custom-button-class");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByPlaceholderText("Search...")).toHaveClass("custom-input-class");
    expect(screen.getByText("Option 1")).toHaveClass("custom-option-class");
  });

  test("handles multiSelect", () => {
    renderWithTheme(<Dropdown options={options} multiSelect />, "light");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));
    expect(screen.getByRole("button")).toHaveTextContent("Option 1, Option 2");
  });

  test("handles onHover event", () => {
    renderWithTheme(<Dropdown options={options} onHover={mockOnHover} />, "light");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.mouseEnter(screen.getByText("Option 1"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("handles onFocus event", () => {
    renderWithTheme(<Dropdown options={options} onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByRole("button"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("handles onBlur event", () => {
    renderWithTheme(<Dropdown options={options} onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByRole("button"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("handles onKeyDown event", () => {
    renderWithTheme(<Dropdown options={options} onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("handles onMouseEnter event", () => {
    renderWithTheme(<Dropdown options={options} onMouseEnter={mockOnMouseEnter} />, "light");
    fireEvent.mouseEnter(screen.getByRole("button"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  test("handles onMouseLeave event", () => {
    renderWithTheme(<Dropdown options={options} onMouseLeave={mockOnMouseLeave} />, "light");
    fireEvent.mouseLeave(screen.getByRole("button"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("handles onAnimationEnd event", () => {
    renderWithTheme(<Dropdown options={options} onAnimationEnd={mockOnAnimationEnd} />, "light");
    fireEvent.animationEnd(screen.getByRole("button"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Dropdown options={options} />, "dark");
    expect(screen.getByRole("button")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<Dropdown options={options} ariaLabel="Custom Aria Label" />, "light");
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<Dropdown options={options} tooltip="Custom Tooltip" />, "light");
    expect(screen.getByRole("button")).toHaveAttribute("title", "Custom Tooltip");
  });

  test("renders with custom border width", () => {
    renderWithTheme(<Dropdown options={options} borderWidth="4" />, "light");
    expect(screen.getByRole("button")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(<Dropdown options={options} animation="custom-animation" />, "light");
    expect(screen.getByRole("button")).toHaveClass("custom-animation");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(<Dropdown options={options} textTransform="uppercase" />, "light");
    expect(screen.getByRole("button")).toHaveStyle({ textTransform: "uppercase" });
  });

  test("renders with custom shadow", () => {
    renderWithTheme(<Dropdown options={options} shadow={false} />, "light");
    expect(screen.getByRole("button")).not.toHaveClass("shadow-lg");
  });

  test("renders with custom hover effect", () => {
    renderWithTheme(<Dropdown options={options} hoverEffect={false} />, "light");
    expect(screen.getByRole("button")).not.toHaveClass("hover:shadow-xl");
  });

  test("renders with custom border style", () => {
    renderWithTheme(<Dropdown options={options} borderStyle="dashed" />, "light");
    expect(screen.getByRole("button")).toHaveClass("border-dashed");
  });

  test("renders with custom border color", () => {
    renderWithTheme(<Dropdown options={options} borderColor="red-500" />, "light");
    expect(screen.getByRole("button")).toHaveClass("border-red-500");
  });

  test("renders with custom icon color", () => {
    renderWithTheme(<Dropdown options={options} iconColor="text-blue-600" />, "light");
    expect(screen.getByRole("button")).toHaveClass("text-blue-600");
  });

  test("renders with custom width", () => {
    renderWithTheme(<Dropdown options={options} width="80" />, "light");
    expect(screen.getByRole("button")).toHaveClass("w-80");
  });

  test("handles disabled state", () => {
    renderWithTheme(<Dropdown options={options} disabled />, "light");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("renders with custom placeholder", () => {
    renderWithTheme(<Dropdown options={options} placeholder="Custom Placeholder" />, "light");
    expect(screen.getByRole("button")).toHaveTextContent("Custom Placeholder");
  });

  test("renders with custom search placeholder", () => {
    renderWithTheme(<Dropdown options={options} showSearch searchPlaceholder="Custom Search Placeholder" />, "light");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByPlaceholderText("Custom Search Placeholder")).toBeInTheDocument();
  });

  test("renders with custom clear icon", () => {
    renderWithTheme(<Dropdown options={options} clearable clearIcon={<span>Clear</span>} />, "light");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("renders with custom search icon", () => {
    renderWithTheme(<Dropdown options={options} showSearch searchIcon={<span>Search</span>} />, "light");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("renders with custom dropdown icon", () => {
    renderWithTheme(<Dropdown options={options} dropdownIcon={<span>Dropdown</span>} />, "light");
    expect(screen.getByText("Dropdown")).toBeInTheDocument();
  });

  test("renders with custom max height", () => {
    renderWithTheme(<Dropdown options={options} maxHeight="10rem" />, "light");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toHaveStyle({ maxHeight: "10rem" });
  });
});