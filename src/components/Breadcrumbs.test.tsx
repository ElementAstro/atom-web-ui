// src/components/Breadcrumbs.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { ThemeProvider } from "../context/ThemeContext";

describe("Breadcrumbs Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(
      <ThemeProvider initialTheme={theme}>
        <Router>{ui}</Router>
      </ThemeProvider>
    );
  };

  const items = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/category" },
    { label: "Product", link: "/product" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Breadcrumbs items={items} />, "light");
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  test("renders with custom separator", () => {
    renderWithTheme(<Breadcrumbs items={items} separator=">" />, "light");
    expect(screen.getAllByText(">")).toHaveLength(2);
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Breadcrumbs items={items} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });

  test("handles item click", () => {
    const onItemClick = jest.fn();
    renderWithTheme(
      <Breadcrumbs items={items} onItemClick={onItemClick} />,
      "light"
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onItemClick).toHaveBeenCalledWith(items[0]);
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <Breadcrumbs items={items} showTooltip tooltip="Tooltip text" />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Home"));
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("renders with icon", () => {
    renderWithTheme(
      <Breadcrumbs items={items} icon={<span>Icon</span>} />,
      "light"
    );
    expect(screen.getAllByText("Icon")).toHaveLength(3);
  });

  test("renders with badge", () => {
    renderWithTheme(
      <Breadcrumbs items={items} showBadge badgeContent="99+" />,
      "light"
    );
    expect(screen.getAllByText("99+")).toHaveLength(3);
  });

  test("applies theme classes", () => {
    renderWithTheme(<Breadcrumbs items={items} />, "dark");
    expect(screen.getByRole("navigation")).toHaveClass(
      "bg-gray-900 text-white"
    );
  });

  test("renders with progress bar", () => {
    renderWithTheme(<Breadcrumbs items={items} showProgress />, "light");
    expect(
      screen.getByRole("navigation").querySelector(".bg-blue-500")
    ).toBeInTheDocument();
  });

  test("handles keyboard interactions", () => {
    const onKeyDown = jest.fn();
    renderWithTheme(
      <Breadcrumbs items={items} onKeyDown={onKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByText("Home"), { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  test("handles mouse interactions", () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    renderWithTheme(
      <Breadcrumbs
        items={items}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Home"));
    expect(onMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByText("Home"));
    expect(onMouseLeave).toHaveBeenCalled();
  });

  test("handles focus and blur events", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    renderWithTheme(
      <Breadcrumbs items={items} onFocus={onFocus} onBlur={onBlur} />,
      "light"
    );
    fireEvent.focus(screen.getByText("Home"));
    expect(onFocus).toHaveBeenCalled();
    fireEvent.blur(screen.getByText("Home"));
    expect(onBlur).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    const onAnimationEnd = jest.fn();
    renderWithTheme(
      <Breadcrumbs items={items} onAnimationEnd={onAnimationEnd} />,
      "light"
    );
    fireEvent.animationEnd(screen.getByText("Home"));
    expect(onAnimationEnd).toHaveBeenCalled();
  });

  test("renders with limited items", () => {
    renderWithTheme(<Breadcrumbs items={items} maxItems={2} />, "light");
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
