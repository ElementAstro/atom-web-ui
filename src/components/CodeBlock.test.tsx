// src/components/CodeBlock.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CodeBlock from "./CodeBlock";
import { ThemeProvider } from "../context/ThemeContext";

describe("CodeBlock Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockCode = `const hello = "world";`;

  test("renders with default props", () => {
    renderWithTheme(<CodeBlock code={mockCode} />, "light");
    const codeElement = screen.getByText(mockCode);
    expect(codeElement).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <CodeBlock code={mockCode} customClass="custom-class" />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    expect(codeBlock).toHaveClass("custom-class");
  });

  test("handles copy button click", () => {
    jest.useFakeTimers();
    renderWithTheme(<CodeBlock code={mockCode} />, "light");
    const copyButton = screen.getByLabelText("Copy code");
    fireEvent.click(copyButton);
    expect(screen.getByText("已复制!")).toBeInTheDocument();
    jest.runAllTimers();
    expect(screen.queryByText("已复制!")).not.toBeInTheDocument();
  });

  test("handles collapse button click", () => {
    renderWithTheme(<CodeBlock code={mockCode} collapsible />, "light");
    const collapseButton = screen.getByLabelText("Toggle collapse");
    fireEvent.click(collapseButton);
    expect(screen.queryByText(mockCode)).not.toBeInTheDocument();
    fireEvent.click(collapseButton);
    expect(screen.getByText(mockCode)).toBeInTheDocument();
  });

  test("handles full screen button click", () => {
    renderWithTheme(<CodeBlock code={mockCode} />, "light");
    const fullScreenButton = screen.getByLabelText("Toggle full screen");
    fireEvent.click(fullScreenButton);
    const codeBlock = screen.getByLabelText("Code block");
    expect(codeBlock).toHaveClass("fixed inset-0 z-50");
    fireEvent.click(fullScreenButton);
    expect(codeBlock).not.toHaveClass("fixed inset-0 z-50");
  });

  test("handles edit button click", () => {
    renderWithTheme(<CodeBlock code={mockCode} />, "light");
    const editButton = screen.getByLabelText("Toggle edit");
    fireEvent.click(editButton);
    const editor = screen.getByRole("textbox");
    expect(editor).toBeInTheDocument();
    fireEvent.change(editor, { target: { value: "new code" } });
    expect(editor).toHaveValue("new code");
    const saveButton = screen.getByLabelText("Save edit");
    fireEvent.click(saveButton);
    expect(screen.getByText("new code")).toBeInTheDocument();
  });

  test("renders with line numbers", () => {
    renderWithTheme(<CodeBlock code={mockCode} lineNumbers />, "light");
    const lineNumber = screen.getByText("1");
    expect(lineNumber).toBeInTheDocument();
  });

  test("renders with highlight lines", () => {
    renderWithTheme(
      <CodeBlock code={mockCode} highlightLines={[1]} />,
      "light"
    );
    const highlightedLine = screen.getByText(mockCode);
    expect(highlightedLine).toHaveClass("bg-yellow-200");
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <CodeBlock code={mockCode} showTooltip tooltip="Tooltip text" />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    fireEvent.mouseEnter(codeBlock);
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("handles ripple effect", () => {
    renderWithTheme(<CodeBlock code={mockCode} rippleEffect />, "light");
    const codeBlock = screen.getByLabelText("Code block");
    fireEvent.mouseDown(codeBlock);
    expect(codeBlock.querySelector(".ripple")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<CodeBlock code={mockCode} theme="dark" />, "dark");
    const codeBlock = screen.getByLabelText("Code block");
    expect(codeBlock).toHaveClass("bg-gray-900 text-white");
  });

  test("handles focus and blur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    renderWithTheme(
      <CodeBlock code={mockCode} onFocus={handleFocus} onBlur={handleBlur} />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    fireEvent.focus(codeBlock);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(codeBlock);
    expect(handleBlur).toHaveBeenCalled();
  });

  test("handles keyboard interactions", () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(
      <CodeBlock code={mockCode} onKeyDown={handleKeyDown} />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    fireEvent.keyDown(codeBlock, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test("handles mouse enter and leave events", () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    renderWithTheme(
      <CodeBlock
        code={mockCode}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    fireEvent.mouseEnter(codeBlock);
    expect(handleMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(codeBlock);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    const handleAnimationEnd = jest.fn();
    renderWithTheme(
      <CodeBlock code={mockCode} onAnimationEnd={handleAnimationEnd} />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    fireEvent.animationEnd(codeBlock);
    expect(handleAnimationEnd).toHaveBeenCalled();
  });

  test("renders with custom border color and style", () => {
    renderWithTheme(
      <CodeBlock code={mockCode} borderColor="red-500" borderStyle="dashed" />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    expect(codeBlock).toHaveStyle("border-color: red-500");
    expect(codeBlock).toHaveStyle("border-style: dashed");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(
      <CodeBlock code={mockCode} textTransform="uppercase" />,
      "light"
    );
    const codeBlock = screen.getByLabelText("Code block");
    expect(codeBlock).toHaveStyle("text-transform: uppercase");
  });
});
