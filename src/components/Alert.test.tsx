// src/components/Alert.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Alert from "./Alert";

describe("Alert Component", () => {
  test("renders with default props", () => {
    render(<Alert message="Test Message" severity="info" onClose={() => {}} />);
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  test("renders with custom classes", () => {
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={() => {}}
        customClass="custom-alert"
        customMessageClass="custom-message"
        customButtonClass="custom-button"
      />
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "custom-alert"
    );
    expect(screen.getByText("Test Message")).toHaveClass("custom-message");
    expect(screen.getByRole("button")).toHaveClass("custom-button");
  });

  test("auto closes after duration", () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={onClose}
        autoClose
        autoCloseDuration={3000}
      />
    );
    jest.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("pauses auto close on hover", () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={onClose}
        autoClose
        autoCloseDuration={3000}
        pauseOnHover
      />
    );
    fireEvent.mouseEnter(screen.getByText("Test Message"));
    jest.advanceTimersByTime(3000);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByText("Test Message"));
    jest.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("calls onOpen and onClose callbacks", () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={onClose}
        onOpen={onOpen}
      />
    );
    expect(onOpen).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });

  test("renders with icon", () => {
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={() => {}}
        icon={<span>Icon</span>}
      />
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with title", () => {
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={() => {}}
        title="Test Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("handles keyboard interactions", () => {
    const onClose = jest.fn();
    render(<Alert message="Test Message" severity="info" onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onClose).toHaveBeenCalled();
  });

  test("renders with progress bar", () => {
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={() => {}}
        showProgress
      />
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={() => {}}
        theme="dark"
      />
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "bg-gray-900"
    );
  });

  test("applies position classes", () => {
    render(
      <Alert
        message="Test Message"
        severity="info"
        onClose={() => {}}
        position="bottom-left"
      />
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "bottom-0 left-0"
    );
  });
});
