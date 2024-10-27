// src/components/Select.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Select from "./Select";
import { ThemeProvider } from "../context/ThemeContext";

describe("Select Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnChange = jest.fn();

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  test("renders with default props", () => {
    renderWithTheme(
      <Select options={options} value="" onChange={mockOnChange} />,
      "light"
    );
    expect(screen.getByText("")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Select
        options={options}
        value="option1"
        onChange={mockOnChange}
        placeholder="Select an option"
        customStyles="custom-select"
        clearable={true}
        loading={false}
        theme="dark"
        hoverColor="hover:bg-gray-200"
        activeColor="active:bg-gray-300"
        disabledColor="text-gray-400"
        hoverAnimation="hover:scale-105"
      />,
      "dark"
    );
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 1").parentElement).toHaveClass(
      "custom-select"
    );
  });

  test("calls onChange when an option is selected", () => {
    renderWithTheme(
      <Select options={options} value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByText(""));
    fireEvent.click(screen.getByText("Option 1"));
    expect(mockOnChange).toHaveBeenCalledWith("option1");
  });

  test("clears selection when clear button is clicked", () => {
    renderWithTheme(
      <Select
        options={options}
        value="option1"
        onChange={mockOnChange}
        clearable={true}
      />,
      "light"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("filters options based on search term", () => {
    renderWithTheme(
      <Select
        options={options}
        value=""
        onChange={mockOnChange}
        searchable={true}
      />,
      "light"
    );
    fireEvent.click(screen.getByText(""));
    fireEvent.change(screen.getByPlaceholderText("搜索..."), {
      target: { value: "Option 2" },
    });
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  test("handles multiple selections", () => {
    renderWithTheme(
      <Select
        options={options}
        value={[]}
        onChange={mockOnChange}
        multiple={true}
      />,
      "light"
    );
    fireEvent.click(screen.getByText(""));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));
    expect(mockOnChange).toHaveBeenCalledWith(["option1", "option2"]);
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <Select
        options={options}
        value=""
        onChange={mockOnChange}
        theme="astronomy"
      />,
      "astronomy"
    );
    expect(screen.getByText("").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});
