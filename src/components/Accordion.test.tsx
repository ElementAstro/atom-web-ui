import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Accordion, AccordionItem } from "./Accordion";
import { ThemeProvider } from "../context/ThemeContext";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider initialTheme="light">{ui}</ThemeProvider>);
};

describe("Accordion Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    test("renders accordion with single item", async () => {
      renderWithTheme(
        <Accordion>
          <AccordionItem title="Test Title" isOpen={false} onToggle={() => {}}>
            <p>Test Content</p>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      const content = screen.queryByText("Test Content");
      expect(content?.parentElement?.parentElement).toHaveStyle({
        height: "0px",
      });
    });

    test("renders multiple accordion items", () => {
      renderWithTheme(
        <Accordion>
          <AccordionItem title="Item 1" isOpen={false} onToggle={() => {}}>
            Content 1
          </AccordionItem>
          <AccordionItem title="Item 2" isOpen={false} onToggle={() => {}}>
            Content 2
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe("Interactions", () => {
    test("toggles content visibility on click", async () => {
      renderWithTheme(
        <Accordion>
          <AccordionItem title="Click Me" isOpen={false} onToggle={() => {}}>
            Hidden Content
          </AccordionItem>
        </Accordion>
      );

      const title = screen.getByText("Click Me");
      fireEvent.click(title);

      await waitFor(() => {
        const content = screen.getByText("Hidden Content");
        expect(content.parentElement).toBeVisible();
      });
    });

    test("handles keyboard interaction", async () => {
      renderWithTheme(
        <Accordion>
          <AccordionItem title="Press Enter" isOpen={false} onToggle={() => {}}>
            Content
          </AccordionItem>
        </Accordion>
      );

      const title = screen.getByText("Press Enter");
      fireEvent.keyDown(title, { key: "Enter" });

      await waitFor(() => {
        const content = screen.getByText("Content");
        expect(content.parentElement).toBeVisible();
      });
    });

    test("respects disabled state", async () => {
      renderWithTheme(
        <Accordion>
          <AccordionItem
            title="Disabled"
            isOpen={false}
            onToggle={() => {}}
            disabled
          >
            Content dilemma
          </AccordionItem>
        </Accordion>
      );

      const title = screen.getByText("Disabled");
      fireEvent.click(title);

      await waitFor(() => {
        const content = screen.getByText("Content");
        expect(content.parentElement?.parentElement).toHaveStyle({
          height: "0px",
        });
      });
    });
  });

  // Multi-open functionality
  describe("Multi-open Feature", () => {
    test("allows multiple items to be open when multiOpen is true", async () => {
      renderWithTheme(
        <Accordion multiOpen>
          <AccordionItem title="Item 1" isOpen={false} onToggle={() => {}}>
            Content 1
          </AccordionItem>
          <AccordionItem title="Item 2" isOpen={false} onToggle={() => {}}>
            Content 2
          </AccordionItem>
        </Accordion>
      );

      fireEvent.click(screen.getByText("Item 1"));
      fireEvent.click(screen.getByText("Item 2"));

      await waitFor(() => {
        expect(screen.getByText("Content 1").parentElement).toBeVisible();
        expect(screen.getByText("Content 2").parentElement).toBeVisible();
      });
    });
  });

  // Callback Tests
  describe("Callbacks", () => {
    test("calls onOpen and onClose callbacks", async () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      let isOpen = false;

      renderWithTheme(
        <Accordion>
          <AccordionItem
            title="Callback Test"
            isOpen={isOpen}
            onToggle={() => { isOpen = !isOpen; isOpen ? onOpen() : onClose(); }}
            onOpen={onOpen}
            onClose={onClose}
          >
            Content
          </AccordionItem>
        </Accordion>
      );

      const title = screen.getByText("Callback Test");
      fireEvent.click(title);

      await waitFor(() => {
        expect(onOpen).toHaveBeenCalled();
      });

      fireEvent.click(title);
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    test("calls hover and focus callbacks", async () => {
      const onHover = jest.fn();
      const onFocus = jest.fn();
      const onBlur = jest.fn();

      renderWithTheme(
        <Accordion>
          <AccordionItem
            title="Event Test"
            isOpen={false}
            onToggle={() => {}}
            onHover={onHover}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            Content
          </AccordionItem>
        </Accordion>
      );

      const title = screen.getByText("Event Test");

      fireEvent.mouseEnter(title);
      fireEvent.focus(title);
      fireEvent.blur(title);

      await waitFor(() => {
        expect(onHover).toHaveBeenCalled();
        expect(onFocus).toHaveBeenCalled();
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });

  // Theme Tests
  describe("Theme Support", () => {
    test("applies theme classes correctly", () => {
      renderWithTheme(
        <Accordion>
          <AccordionItem title="Themed Item" isOpen={false} onToggle={() => {}}>
            Content
          </AccordionItem>
        </Accordion>
      );

      const accordionItem = screen.getByText("Themed Item").closest("div");
      expect(accordionItem).toHaveClass("bg-gray-200");
    });
  });

  // Animation Tests
  describe("Animations", () => {
    test("applies different animation types", async () => {
      const { rerender } = renderWithTheme(
        <Accordion>
          <AccordionItem
            title="Animate"
            isOpen={false}
            onToggle={() => {}}
            animationType="fade"
          >
            Content
          </AccordionItem>
        </Accordion>
      );

      fireEvent.click(screen.getByText("Animate"));

      ["slide", "scale", "rotate", "flip", "bounce", "zoom"].forEach((type) => {
        rerender(
          <ThemeProvider initialTheme="light">
            <Accordion>
              <AccordionItem
                title="Animate"
                isOpen={false}
                onToggle={() => {}}
                animationType={type as any}
              >
                Content
              </AccordionItem>
            </Accordion>
          </ThemeProvider>
        );

        expect(screen.getByText("Content")).toBeInTheDocument();
      });
    });
  });
});
