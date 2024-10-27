// src/components/SearchBox.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBox from "./SearchBox";
import { ThemeProvider } from "../context/ThemeContext";

describe("SearchBox Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSearch = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<SearchBox onSearch={mockOnSearch} />, "light");
    expect(screen.getByPlaceholderText("")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <SearchBox
        placeholder="Search..."
        onSearch={mockOnSearch}
        customClass="custom-searchbox"
        customInputClass="custom-input"
        customIconClass="custom-icon"
        theme="dark"
        tooltip="Search Tooltip"
        borderWidth="4"
        iconPosition="right"
        clearable={true}
        voiceInput={true}
        autoComplete={true}
        size="large"
        onDoubleClick={mockOnDoubleClick}
        onKeyDown={mockOnKeyDown}
        ariaLabel="Search Box"
        hoverColor="hover-color"
        activeColor="active-color"
        disabledColor="disabled-color"
        hoverAnimation="hover-animation"
      />,
      "dark"
    );
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveClass("custom-input");
    expect(screen.getByLabelText("Search Box")).toBeInTheDocument();
  });

  test("calls onSearch when input changes", () => {
    renderWithTheme(<SearchBox onSearch={mockOnSearch} />, "light");
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  test("calls onFocus when input is focused", () => {
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} onFocus={mockOnFocus} />,
      "light"
    );
    const input = screen.getByPlaceholderText("");
    fireEvent.focus(input);
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when input is blurred", () => {
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} onBlur={mockOnBlur} />,
      "light"
    );
    const input = screen.getByPlaceholderText("");
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("clears input when clear button is clicked", () => {
    renderWithTheme(<SearchBox onSearch={mockOnSearch} />, "light");
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button"));
    expect(input).toHaveValue("");
    expect(mockOnSearch).toHaveBeenCalledWith("");
  });

  test("handles voice input", () => {
    const mockSpeechRecognition = jest.fn().mockImplementation(() => {
      return {
        start: jest.fn(),
        onresult: jest.fn(),
      };
    });
    // @ts-ignore
    window.SpeechRecognition = mockSpeechRecognition;
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} voiceInput={true} />,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /audio/i }));
    expect(mockSpeechRecognition).toHaveBeenCalled();
  });

  test("selects suggestion", () => {
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} suggestions={["suggestion1"]} />,
      "light"
    );
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "sug" } });
    fireEvent.click(screen.getByText("suggestion1"));
    expect(input).toHaveValue("suggestion1");
    expect(mockOnSearch).toHaveBeenCalledWith("suggestion1");
  });

  test("handles double click", () => {
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} onDoubleClick={mockOnDoubleClick} />,
      "light"
    );
    fireEvent.doubleClick(screen.getByLabelText("搜索框"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("handles key down", () => {
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} onKeyDown={mockOnKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("搜索框"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <SearchBox onSearch={mockOnSearch} theme="astronomy" />,
      "astronomy"
    );
    expect(screen.getByLabelText("搜索框").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});
