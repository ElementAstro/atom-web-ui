// src/components/CardMedia.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardMedia from "./CardMedia";

describe("CardMedia Component", () => {
  const mockOnActionClick = jest.fn();
  const mockOnResize = jest.fn();

  const defaultProps = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    description: "Test Description",
    imageSrc: "/static/images/test.jpeg",
    rating: 4,
    active: true,
    onActionClick: mockOnActionClick,
    progress: 50,
    badgeLabel: "Test Badge",
    customClass: "custom-class",
    customHeaderClass: "custom-header-class",
    customContentClass: "custom-content-class",
    customFooterClass: "custom-footer-class",
    footer: <div>Test Footer</div>,
    resizable: true,
    onResize: mockOnResize,
    actions: <button>Test Action</button>,
    backgroundColor: "lightblue",
  };

  test("renders with default props", () => {
    render(<CardMedia />);
    expect(screen.getByText("Default Title")).toBeInTheDocument();
    expect(screen.getByText("Default Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Default description")).toBeInTheDocument();
    expect(screen.getByAltText("Default Title")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    render(<CardMedia {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
    expect(screen.getByText("Test Action")).toBeInTheDocument();
    expect(screen.getByText("4 stars")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });

  test("calls onActionClick when action button is clicked", () => {
    render(<CardMedia {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /action/i }));
    expect(mockOnActionClick).toHaveBeenCalled();
  });

  test("handles resize correctly", () => {
    render(<CardMedia {...defaultProps} />);
    const resizeHandle = screen.getByRole("button", { name: /resize/i });
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 });
    expect(mockOnResize).toHaveBeenCalledWith(100, 100);
  });

  test("applies custom classes correctly", () => {
    render(<CardMedia {...defaultProps} />);
    expect(screen.getByText("Test Title").closest("div")).toHaveClass(
      "custom-class"
    );
    expect(screen.getByText("Test Subtitle").closest("div")).toHaveClass(
      "custom-header-class"
    );
    expect(screen.getByText("Test Description").closest("div")).toHaveClass(
      "custom-content-class"
    );
    expect(screen.getByText("Test Footer").closest("div")).toHaveClass(
      "custom-footer-class"
    );
  });

  test("applies background color correctly", () => {
    render(<CardMedia {...defaultProps} />);
    expect(screen.getByText("Test Title").closest("div")).toHaveStyle(
      "background-color: lightblue"
    );
  });

  test("renders progress bar with correct width", () => {
    render(<CardMedia {...defaultProps} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  test("renders image with correct src and alt attributes", () => {
    render(<CardMedia {...defaultProps} />);
    const image = screen.getByAltText("Test Title");
    expect(image).toHaveAttribute("src", "/static/images/test.jpeg");
  });
});
