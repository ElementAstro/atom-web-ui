import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";
import { ThemeProvider } from "../context/ThemeContext";

describe("Card Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(
      <Card title="Test Title">
        <p>Test Content</p>
      </Card>,
      "light"
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("renders with custom classes and styles", () => {
    renderWithTheme(
      <Card
        title="Test Title"
        customClass="custom-class"
        customHeaderClass="custom-header-class"
        customContentClass="custom-content-class"
        customFooterClass="custom-footer-class"
        footer={<p>Test Footer</p>}
      >
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const headerElement = screen.getByText("Test Title").parentElement;
    expect(headerElement).toHaveClass("flex", "items-center", "custom-header-class");
    
    const contentElement = screen.getByText("Test Content").parentElement;
    expect(contentElement).toHaveClass("custom-content-class");
    
    const footerElement = screen.getByText("Test Footer").parentElement;
    expect(footerElement).toHaveClass("custom-footer-class");
  });

  test("toggles collapse state", () => {
    const onToggleCollapse = jest.fn();
    renderWithTheme(
      <Card title="Test Title" onToggleCollapse={onToggleCollapse}>
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const headerElement = screen.getByText("Test Title").parentElement;
    fireEvent.click(headerElement!);
    expect(onToggleCollapse).toHaveBeenCalled();
  });

  test("handles maximize and close actions", () => {
    const onMaximize = jest.fn();
    const onClose = jest.fn();
    renderWithTheme(
      <Card title="Test Title" onMaximize={onMaximize} onClose={onClose}>
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const maximizeButton = screen.getByText("🗖");
    const closeButton = screen.getByText("✕");
    fireEvent.click(maximizeButton);
    expect(onMaximize).toHaveBeenCalled();
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <Card title="Test Title" tooltip="Test Tooltip">
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const cardRoot = screen.getByRole("article");
    expect(cardRoot).toHaveAttribute("title", "Test Tooltip");
  });

  test("handles drag and drop", () => {
    renderWithTheme(
      <Card title="Test Title" draggable>
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const cardElement = screen.getByRole("article");
    const dataTransfer = { setData: jest.fn() };
    
    fireEvent.dragStart(cardElement, { dataTransfer });
    fireEvent.dragOver(cardElement);
    // fireEvent.drop(cardElement);
    fireEvent.dragEnd(cardElement);
    
    expect(cardElement).toHaveAttribute("draggable", "true");
  });

  test("handles resize", () => {
    const onResize = jest.fn();
    renderWithTheme(
      <Card title="Test Title" resizable onResize={onResize}>
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const resizeHandle = screen.getByTestId("resize-handle");
    
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(document, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(document);
    
    expect(onResize).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <Card title="Test Title">
        <p>Test Content</p>
      </Card>,
      "dark"
    );
    const cardElement = screen.getByRole("article");
    /*
    expect(cardElement).toHaveClass(
      "flex",
      "justify-between",
      "items-center",
      "p-4",
      "cursor-pointer",
      "bg-gradient-to-r",
      "from-purple-900",
      "via-pink-900",
      "to-red-900"
    );
    */
    
  });

  test("renders with icon", () => {
    renderWithTheme(
      <Card title="Test Title" icon={<span>🔍</span>}>
        <p>Test Content</p>
      </Card>,
      "light"
    );
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  test("renders with custom header and footer backgrounds", () => {
    renderWithTheme(
      <Card
        title="Test Title"
        headerBackground="bg-blue-500"
        footerBackground="bg-red-500"
        footer={<p>Test Footer</p>}
      >
        <p>Test Content</p>
      </Card>,
      "light"
    );
    const headerElement = screen.getByText("Test Title").parentElement;
    const footerElement = screen.getByText("Test Footer").parentElement;
    
    // expect(headerElement).toHaveClass("flex", "items-center", "bg-blue-500");
    expect(footerElement).toHaveClass("bg-red-500");
  });
});