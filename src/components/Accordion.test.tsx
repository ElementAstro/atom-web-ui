// src/components/Accordion.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Accordion, AccordionItem } from "./Accordion";

describe("AccordionItem", () => {
  test("renders with default props", () => {
    render(
      <AccordionItem title="Test Title" isOpen={false} onToggle={() => {}}>
        Test Content
      </AccordionItem>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeVisible();
  });

  test("toggles open/close state", () => {
    const { rerender } = render(
      <AccordionItem title="Test Title" isOpen={false} onToggle={() => {}}>
        Test Content
      </AccordionItem>
    );
    expect(screen.queryByText("Test Content")).not.toBeVisible();

    rerender(
      <AccordionItem title="Test Title" isOpen={true} onToggle={() => {}}>
        Test Content
      </AccordionItem>
    );
    expect(screen.getByText("Test Content")).toBeVisible();
  });

  test("applies custom classes and styles", () => {
    render(
      <AccordionItem
        title="Test Title"
        isOpen={false}
        onToggle={() => {}}
        customClass="custom-class"
        customTitleClass="custom-title-class"
        customContentClass="custom-content-class"
      >
        Test Content
      </AccordionItem>
    );
    expect(screen.getByText("Test Title").parentElement).toHaveClass(
      "custom-class"
    );
    expect(screen.getByText("Test Title")).toHaveClass("custom-title-class");
    expect(screen.queryByText("Test Content")).toHaveClass(
      "custom-content-class"
    );
  });

  test("handles keyboard interactions", () => {
    const onToggle = jest.fn();
    render(
      <AccordionItem title="Test Title" isOpen={false} onToggle={onToggle}>
        Test Content
      </AccordionItem>
    );
    const titleElement = screen.getByText("Test Title");
    fireEvent.keyDown(titleElement, { key: "Enter" });
    expect(onToggle).toHaveBeenCalled();
  });
});

describe("Accordion", () => {
  test("renders multiple AccordionItem components", () => {
    render(
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

  test("opens and closes items", () => {
    render(
      <Accordion>
        <AccordionItem title="Item 1" isOpen={false} onToggle={() => {}}>
          Content 1
        </AccordionItem>
        <AccordionItem title="Item 2" isOpen={false} onToggle={() => {}}>
          Content 2
        </AccordionItem>
      </Accordion>
    );
    fireEvent.click(screen.getByText("Item 1"));
    expect(screen.getByText("Content 1")).toBeVisible();
    fireEvent.click(screen.getByText("Item 1"));
    expect(screen.queryByText("Content 1")).not.toBeVisible();
  });

  test("handles multiOpen functionality", () => {
    render(
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
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  test("handles allOpen and allClose props", () => {
    const { rerender } = render(
      <Accordion allOpen>
        <AccordionItem title="Item 1" isOpen={false} onToggle={() => {}}>
          Content 1
        </AccordionItem>
        <AccordionItem title="Item 2" isOpen={false} onToggle={() => {}}>
          Content 2
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();

    rerender(
      <Accordion allClose>
        <AccordionItem title="Item 1" isOpen={false} onToggle={() => {}}>
          Content 1
        </AccordionItem>
        <AccordionItem title="Item 2" isOpen={false} onToggle={() => {}}>
          Content 2
        </AccordionItem>
      </Accordion>
    );
    expect(screen.queryByText("Content 1")).not.toBeVisible();
    expect(screen.queryByText("Content 2")).not.toBeVisible();
  });
});
