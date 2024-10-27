// src/components/Tabs.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tabs from "./Tabs";
import { ThemeProvider } from "../context/ThemeContext";

describe("Tabs Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnTabChange = jest.fn();
  const mockOnTabClose = jest.fn();
  const mockOnTabAdd = jest.fn();
  const mockOnTabRename = jest.fn();

  const tabs = [
    { label: "Tab 1", content: <div>Content 1</div> },
    { label: "Tab 2", content: <div>Content 2</div> },
    { label: "Tab 3", content: <div>Content 3</div> },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Tabs tabs={tabs} />, "light");
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Tabs
        tabs={tabs}
        onTabChange={mockOnTabChange}
        onTabClose={mockOnTabClose}
        onTabAdd={mockOnTabAdd}
        onTabRename={mockOnTabRename}
        tabHeight="50px"
        tabWidth="150px"
        draggable={false}
        closable={false}
        addable={false}
        theme="dark"
        tooltip="Tab Tooltip"
        animation="transition duration-500 transform hover:scale-110"
        icon={<span>Icon</span>}
        fullscreen={true}
        ariaLabel="Custom Tabs"
        showProgress={true}
        progressColor="bg-red-500"
        progressHeight="h-2"
        rippleEffect={false}
        backgroundColor="black"
        textColor="white"
        borderColor="red"
        hoverColor="gray"
        activeColor="blue"
        disabledColor="gray"
        hoverAnimation="hover:scale-110"
        showLabels={false}
        labelColor="yellow"
        labelActiveColor="green"
      />,
      "dark"
    );
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("calls onTabChange when a tab is clicked", () => {
    renderWithTheme(<Tabs tabs={tabs} onTabChange={mockOnTabChange} />, "light");
    fireEvent.click(screen.getByText("Tab 2"));
    expect(mockOnTabChange).toHaveBeenCalledWith("Tab 2");
  });

  test("calls onTabClose when close button is clicked", () => {
    renderWithTheme(<Tabs tabs={tabs} onTabClose={mockOnTabClose} />, "light");
    fireEvent.click(screen.getAllByTitle("Tab Tooltip")[0]);
    expect(mockOnTabClose).toHaveBeenCalledWith("Tab 1");
  });

  test("calls onTabAdd when add button is clicked", () => {
    renderWithTheme(<Tabs tabs={tabs} onTabAdd={mockOnTabAdd} />, "light");
    fireEvent.click(screen.getByTitle("添加新标签"));
    expect(mockOnTabAdd).toHaveBeenCalled();
  });

  test("handles tab drag and drop correctly", () => {
    renderWithTheme(<Tabs tabs={tabs} />, "light");
    const tab1 = screen.getByText("Tab 1");
    const tab2 = screen.getByText("Tab 2");
    fireEvent.dragStart(tab1);
    fireEvent.dragEnter(tab2);
    fireEvent.drop(tab2);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  test("handles tab drag out correctly", () => {
    renderWithTheme(<Tabs tabs={tabs} />, "light");
    const tab1 = screen.getByText("Tab 1");
    fireEvent.doubleClick(tab1);
    expect(screen.queryByText("Tab 1")).not.toBeInTheDocument();
  });

  test("creates ripple effect on tab click", () => {
    renderWithTheme(<Tabs tabs={tabs} rippleEffect={true} />, "light");
    const tab1 = screen.getByText("Tab 1");
    fireEvent.click(tab1);
    expect(tab1.querySelector(".ripple")).toBeInTheDocument();
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<Tabs tabs={tabs} theme="astronomy" />, "astronomy");
    expect(screen.getByText("Tab 1").closest("div")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});