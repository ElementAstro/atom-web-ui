// src/components/Card.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Card from "./Card";
import { ThemeProvider } from "../context/ThemeContext";
import { Mail } from "lucide-react";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Card Component", () => {
  describe("Basic Rendering", () => {
    test("renders with required props", () => {
      renderWithTheme(
        <Card title="Test Card">
          <p>Test Content</p>
        </Card>
      );
      expect(screen.getByText("Test Card")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    test("renders with footer", () => {
      renderWithTheme(
        <Card title="Test Card" footer={<div>Footer Content</div>}>
          <p>Content</p>
        </Card>
      );
      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });

    test("renders with custom icon", () => {
      renderWithTheme(
        <Card title="Test Card" icon={<Mail data-testid="mail-icon" />}>
          <p>Content</p>
        </Card>
      );
      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
    });
  });

  describe("Collapse Functionality", () => {
    test("toggles collapse state on button click", async () => {
      const onToggleCollapse = jest.fn();
      renderWithTheme(
        <Card title="Test Card" onToggleCollapse={onToggleCollapse}>
          <p>Content</p>
        </Card>
      );

      const toggleButton = screen.getByLabelText("Toggle Collapse");
      await userEvent.click(toggleButton);
      expect(onToggleCollapse).toHaveBeenCalled();
    });

    test("renders in collapsed state", () => {
      renderWithTheme(
        <Card title="Test Card" isCollapsed={true}>
          <p>Content</p>
        </Card>
      );
      expect(screen.queryByText("Content")).not.toBeVisible();
    });
  });

  describe("Maximize Functionality", () => {
    test("toggles maximize state on button click", async () => {
      const onMaximize = jest.fn();
      renderWithTheme(
        <Card title="Test Card" onMaximize={onMaximize}>
          <p>Content</p>
        </Card>
      );

      const maximizeButton = screen.getByLabelText("Maximize");
      await userEvent.click(maximizeButton);
      expect(onMaximize).toHaveBeenCalled();
    });
  });

  describe("Close Functionality", () => {
    test("calls onClose when close button is clicked", async () => {
      const onClose = jest.fn();
      renderWithTheme(
        <Card title="Test Card" onClose={onClose}>
          <p>Content</p>
        </Card>
      );

      const closeButton = screen.getByLabelText("Close");
      await userEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("Drag Functionality", () => {
    test("enables drag functionality when draggable is true", () => {
      renderWithTheme(
        <Card title="Test Card" draggable={true}>
          <p>Content</p>
        </Card>
      );

      const card = screen.getByRole("article");
      expect(card).toHaveAttribute("draggable", "true");
    });
  });

  describe("Resize Functionality", () => {
    test("renders resize handle when resizable is true", () => {
      renderWithTheme(
        <Card title="Test Card" resizable={true}>
          <p>Content</p>
        </Card>
      );

      expect(screen.getByTestId("resize-handle")).toBeInTheDocument();
    });

    test("calls onResize when resizing", async () => {
      const onResize = jest.fn();
      renderWithTheme(
        <Card title="Test Card" resizable={true} onResize={onResize}>
          <p>Content</p>
        </Card>
      );

      const resizeHandle = screen.getByTestId("resize-handle");
      fireEvent.mouseDown(resizeHandle);
      fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(document);

      expect(onResize).toHaveBeenCalled();
    });
  });

  describe("Theme and Styling", () => {
    test("applies custom theme", () => {
      renderWithTheme(
        <Card title="Test Card" theme="dark">
          <p>Content</p>
        </Card>
      );

      const card = screen.getByRole("article");
      expect(card).toHaveClass("bg-gray-900");
    });

    test("applies custom classes", () => {
      renderWithTheme(
        <Card
          title="Test Card"
          customClass="test-class"
          customHeaderClass="header-class"
          customContentClass="content-class"
        >
          <p>Content</p>
        </Card>
      );

      expect(screen.getByRole("article")).toHaveClass("test-class");
    });
  });

  describe("Accessibility", () => {
    test("supports keyboard navigation", async () => {
      const onToggleCollapse = jest.fn();
      renderWithTheme(
        <Card title="Test Card" onToggleCollapse={onToggleCollapse}>
          <p>Content</p>
        </Card>
      );

      const header = screen.getByText("Test Card").parentElement;
      header?.focus();
      fireEvent.keyDown(header!, { key: "Enter" });
      expect(onToggleCollapse).toHaveBeenCalled();
    });

    test("has correct ARIA attributes", () => {
      renderWithTheme(
        <Card title="Test Card" tooltip="Card tooltip">
          <p>Content</p>
        </Card>
      );

      expect(screen.getByRole("article")).toHaveAttribute(
        "title",
        "Card tooltip"
      );
    });
  });
});
