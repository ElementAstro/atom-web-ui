import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonGroup from "./ButtonGroup";
import { Mail } from "lucide-react";
import Button from "./Button";

describe("ButtonGroup", () => {
  test("renders with default props", () => {
    render(
      <ButtonGroup>
        <Button>Test</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("applies correct display name", () => {
    expect(ButtonGroup.displayName).toBe("ButtonGroup");
  });

  test("renders with horizontal direction by default", () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass("flex-row");
  });

  test("renders with vertical direction", () => {
    const { container } = render(
      <ButtonGroup direction="vertical">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass("flex-col");
  });

  test("applies correct spacing classes", () => {
    const { container } = render(
      <ButtonGroup spacing="lg">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass("gap-6");
  });

  test("applies wrap class when wrap is true", () => {
    const { container } = render(
      <ButtonGroup wrap>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass("flex-wrap");
  });

  test("applies correct theme classes", () => {
    const { container } = render(
      <ButtonGroup theme="dark">
        <Button>Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass("bg-gray-800");
  });

  test("renders with icon", () => {
    render(
      <ButtonGroup
        icon={{
          component: Mail,
          position: "right",
          size: 24,
          color: "red",
        }}
      >
        <Button>Button 1</Button>
      </ButtonGroup>
    );
    const icon = screen.getByTestId("mail");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("width", "24");
  });

  test("applies icon animation classes", () => {
    render(
      <ButtonGroup
        icon={{
          component: Mail,
          animation: "spin",
        }}
      >
        <Button>Button 1</Button>
      </ButtonGroup>
    );
    const icon = screen.getByTestId("mail");
    expect(icon).toHaveClass("animate-spin");
  });

  test("applies custom className", () => {
    const { container } = render(
      <ButtonGroup className="custom-class">
        <Button>Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  test("handles different animation variants", () => {
    const { container } = render(
      <ButtonGroup animation="scale">
        <Button>Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveAttribute("data-motion", "visible");
  });

  test("renders children with correct spacing when icon is positioned", () => {
    render(
      <ButtonGroup
        icon={{
          component: Mail,
          position: "left",
        }}
      >
        <Button>Button 1</Button>
      </ButtonGroup>
    );
    const button = screen.getByText("Button 1");
    expect(button).toHaveClass("ml-2");
  });

  test("handles non-button children", () => {
    render(
      <ButtonGroup>
        <div>Not a button</div>
      </ButtonGroup>
    );
    expect(screen.getByText("Not a button")).toBeInTheDocument();
  });
});
