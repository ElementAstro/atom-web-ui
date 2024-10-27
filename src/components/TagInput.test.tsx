// src/components/TagInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TagInput from "./TagInput";
import { ThemeProvider } from "../context/ThemeContext";

describe("TagInput Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnTagAdd = jest.fn();
  const mockOnTagRemove = jest.fn();
  const mockOnMaxTagsReached = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<TagInput />, "light");
    expect(screen.getByPlaceholderText("添加标签")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <TagInput
        onTagAdd={mockOnTagAdd}
        onTagRemove={mockOnTagRemove}
        maxTags={5}
        onMaxTagsReached={mockOnMaxTagsReached}
        tagColors={{ background: "bg-red-500", text: "text-black" }}
        disabled={true}
        placeholder="Enter tags"
        theme="dark"
        tooltip="Tag Tooltip"
        borderWidth="4"
        animation="transition duration-500 transform hover:scale-110"
        icon={<span>Icon</span>}
        fullscreen={true}
        draggable={true}
        hoverColor="hover:bg-yellow-500"
        activeColor="active:bg-green-500"
        disabledColor="opacity-75 cursor-not-allowed"
        hoverAnimation="hover:scale-110"
        showLabels={false}
        labelColor="text-blue-200"
        labelActiveColor="text-green-200"
      />,
      "dark"
    );
    expect(screen.getByPlaceholderText("Enter tags")).toBeInTheDocument();
  });

  test("adds a tag when Enter key is pressed", () => {
    renderWithTheme(<TagInput onTagAdd={mockOnTagAdd} />, "light");
    const input = screen.getByPlaceholderText("添加标签");
    fireEvent.change(input, { target: { value: "New Tag" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnTagAdd).toHaveBeenCalledWith("New Tag");
    expect(screen.getByText("New Tag")).toBeInTheDocument();
  });

  test("removes a tag when delete button is clicked", () => {
    renderWithTheme(<TagInput onTagRemove={mockOnTagRemove} />, "light");
    const input = screen.getByPlaceholderText("添加标签");
    fireEvent.change(input, { target: { value: "Tag to Remove" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    const deleteButton = screen.getByText("Tag to Remove").nextSibling;
    if (deleteButton) {
      fireEvent.click(deleteButton);
    }
    expect(mockOnTagRemove).toHaveBeenCalledWith("Tag to Remove");
    expect(screen.queryByText("Tag to Remove")).not.toBeInTheDocument();
  });

  test("calls onMaxTagsReached when max tags are reached", () => {
    renderWithTheme(
      <TagInput
        onTagAdd={mockOnTagAdd}
        onMaxTagsReached={mockOnMaxTagsReached}
        maxTags={1}
      />,
      "light"
    );
    const input = screen.getByPlaceholderText("添加标签");
    fireEvent.change(input, { target: { value: "First Tag" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "Second Tag" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnMaxTagsReached).toHaveBeenCalled();
  });

  test("handles drag and drop functionality", () => {
    renderWithTheme(<TagInput draggable={true} />, "light");
    const input = screen.getByPlaceholderText("添加标签");
    fireEvent.change(input, { target: { value: "Tag 1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.change(input, { target: { value: "Tag 2" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    const tag1 = screen.getByText("Tag 1");
    const tag2 = screen.getByText("Tag 2");
    fireEvent.dragStart(tag1);
    fireEvent.dragEnter(tag2);
    fireEvent.drop(tag2);
    expect(screen.getByText("Tag 1")).toBeInTheDocument();
    expect(screen.getByText("Tag 2")).toBeInTheDocument();
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<TagInput theme="astronomy" />, "astronomy");
    expect(screen.getByPlaceholderText("添加标签").closest("div")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});
