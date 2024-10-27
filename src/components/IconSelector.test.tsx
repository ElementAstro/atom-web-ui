// src/components/IconSelector.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IconSelector from "./IconSelector";
import { ThemeProvider } from "../context/ThemeContext";

describe("IconSelector Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSelectIcon = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<IconSelector />, "light");
    expect(screen.getByText("选择图标")).toBeInTheDocument();
  });

  test("renders with custom theme", () => {
    renderWithTheme(<IconSelector theme="dark" />, "light");
    expect(screen.getByText("选择图标").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("calls onSelectIcon when an icon is clicked", () => {
    renderWithTheme(<IconSelector onSelectIcon={mockOnSelectIcon} />, "light");
    fireEvent.click(screen.getByLabelText("AiFillAccountBook"));
    expect(mockOnSelectIcon).toHaveBeenCalledWith("AiFillAccountBook");
  });

  test("filters icons based on search term", () => {
    renderWithTheme(<IconSelector />, "light");
    fireEvent.change(screen.getByPlaceholderText("搜索图标..."), {
      target: { value: "account" },
    });
    expect(screen.getByLabelText("AiFillAccountBook")).toBeInTheDocument();
    expect(screen.queryByLabelText("AiFillAlert")).not.toBeInTheDocument();
  });

  test("sorts icons in ascending order", () => {
    renderWithTheme(<IconSelector />, "light");
    fireEvent.click(screen.getByTitle("排序"));
    const icons = screen.getAllByRole("img");
    expect(icons[0]).toHaveAttribute("aria-label", "AiFillAccountBook");
  });

  test("sorts icons in descending order", () => {
    renderWithTheme(<IconSelector />, "light");
    fireEvent.click(screen.getByTitle("排序"));
    fireEvent.click(screen.getByTitle("排序"));
    const icons = screen.getAllByRole("img");
    expect(icons[0]).toHaveAttribute("aria-label", "AiFillAlert");
  });

  test("copies icon ID to clipboard on click", () => {
    jest.spyOn(navigator.clipboard, "writeText");
    renderWithTheme(<IconSelector />, "light");
    fireEvent.click(screen.getByLabelText("AiFillAccountBook"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "AiFillAccountBook"
    );
  });

  test("renders with pagination", () => {
    renderWithTheme(<IconSelector itemsPerPage={1} />, "light");
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("changes page on pagination click", () => {
    renderWithTheme(<IconSelector itemsPerPage={1} />, "light");
    fireEvent.click(screen.getByText("2"));
    expect(screen.getByLabelText("AiFillAlert")).toBeInTheDocument();
  });

  test("renders with custom border", () => {
    renderWithTheme(<IconSelector border={true} />, "light");
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass(
      "border-gray-300"
    );
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<IconSelector tooltip="Custom Tooltip" />, "light");
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with custom size", () => {
    renderWithTheme(<IconSelector size="lg" />, "light");
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass("lg");
  });

  test("renders with custom color", () => {
    renderWithTheme(<IconSelector color="text-red-500" />, "light");
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass(
      "text-red-500"
    );
  });

  test("renders with custom hover color", () => {
    renderWithTheme(<IconSelector hoverColor="text-blue-500" />, "light");
    fireEvent.mouseOver(screen.getByLabelText("AiFillAccountBook"));
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass(
      "text-blue-500"
    );
  });

  test("renders with custom active color", () => {
    renderWithTheme(<IconSelector activeColor="text-green-500" />, "light");
    fireEvent.click(screen.getByLabelText("AiFillAccountBook"));
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass(
      "text-green-500"
    );
  });

  test("renders with custom disabled color", () => {
    renderWithTheme(<IconSelector disabled={true} />, "light");
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass(
      "text-gray-400"
    );
  });

  test("renders with custom hover animation", () => {
    renderWithTheme(<IconSelector hoverAnimation="hover:scale-150" />, "light");
    fireEvent.mouseOver(screen.getByLabelText("AiFillAccountBook"));
    expect(screen.getByLabelText("AiFillAccountBook")).toHaveClass(
      "hover:scale-150"
    );
  });
});