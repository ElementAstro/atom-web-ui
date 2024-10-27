// src/components/RichTextEditor.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RichTextEditor from "./RichTextEditor";
import { ThemeProvider } from "../context/ThemeContext";

describe("RichTextEditor Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnChange = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    expect(screen.getByLabelText("Rich Text Editor")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <RichTextEditor
        value="Test content"
        onChange={mockOnChange}
        maxWidth="500px"
        maxHeight="400px"
        theme="dark"
        tooltip="Editor Tooltip"
        borderWidth="4"
        fullscreen={true}
        customClass="custom-editor"
        customButtonClass="custom-button"
        customEditorClass="custom-editor-area"
      />,
      "dark"
    );
    const editor = screen.getByLabelText("Rich Text Editor");
    expect(editor).toHaveStyle({ maxWidth: "500px", maxHeight: "400px" });
    expect(editor).toHaveClass("custom-editor-area");
  });

  test("calls onChange when content is edited", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    const editor = screen.getByLabelText("Rich Text Editor");
    fireEvent.input(editor, { target: { innerHTML: "New content" } });
    expect(mockOnChange).toHaveBeenCalledWith("New content");
  });

  test("executes bold command", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Bold"));
    // Add assertions to check if the bold command was executed
  });

  test("executes italic command", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Italic"));
    // Add assertions to check if the italic command was executed
  });

  test("executes underline command", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Underline"));
    // Add assertions to check if the underline command was executed
  });

  test("handles copy functionality", () => {
    renderWithTheme(
      <RichTextEditor value="Copy this text" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Copy"));
    // Add assertions to check if the copy command was executed
  });

  test("handles select all functionality", () => {
    renderWithTheme(
      <RichTextEditor value="Select all this text" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Select All"));
    // Add assertions to check if the select all command was executed
  });

  test("handles insert image functionality", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    window.prompt = jest.fn().mockReturnValue("http://example.com/image.jpg");
    fireEvent.click(screen.getByTitle("Insert Image"));
    // Add assertions to check if the insert image command was executed
  });

  test("handles insert link functionality", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    window.prompt = jest.fn().mockReturnValue("http://example.com");
    fireEvent.click(screen.getByTitle("Insert Link"));
    // Add assertions to check if the insert link command was executed
  });

  test("handles undo functionality", () => {
    renderWithTheme(
      <RichTextEditor value="Undo this text" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Undo"));
    // Add assertions to check if the undo command was executed
  });

  test("handles redo functionality", () => {
    renderWithTheme(
      <RichTextEditor value="Redo this text" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByTitle("Redo"));
    // Add assertions to check if the redo command was executed
  });

  test("toggles fullscreen mode", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} />,
      "light"
    );
    const fullscreenButton = screen.getByTitle("Fullscreen");
    fireEvent.click(fullscreenButton);
    expect(screen.getByLabelText("Rich Text Editor").parentElement).toHaveClass(
      "w-full h-full"
    );
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={mockOnChange} theme="astronomy" />,
      "astronomy"
    );
    expect(screen.getByLabelText("Rich Text Editor").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});
