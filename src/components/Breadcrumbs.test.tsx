import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import Breadcrumbs from "./Breadcrumbs";
import "@testing-library/jest-dom/extend-expect";

const mockItems = [
  { label: "Home", link: "/" },
  { label: "Products", link: "/products" },
  { label: "Categories", link: "/products/categories" },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider initialTheme="light">{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe("Breadcrumbs Component", () => {
  describe("Basic Rendering", () => {
    test("renders all breadcrumb items", () => {
      renderWithProviders(<Breadcrumbs items={mockItems} />);
      mockItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    test("renders with custom separator", () => {
      renderWithProviders(<Breadcrumbs items={mockItems} separator=">" />);
      const separators = screen.getAllByText(">");
      expect(separators).toHaveLength(mockItems.length - 1);
    });

    test("truncates items when exceeding maxItems", () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({
        label: `Item ${i}`,
        link: `/item${i}`,
      }));
      renderWithProviders(<Breadcrumbs items={manyItems} maxItems={5} />);
      expect(screen.getByText("...")).toBeInTheDocument();
    });
  });

  describe("Interaction Tests", () => {
    test("calls onItemClick when clicking a link", () => {
      const onItemClick = jest.fn();
      renderWithProviders(
        <Breadcrumbs items={mockItems} onItemClick={onItemClick} />
      );

      fireEvent.click(screen.getByText("Products"));
      expect(onItemClick).toHaveBeenCalledWith(mockItems[1]);
    });

    test("handles keyboard navigation", () => {
      const onKeyDown = jest.fn();
      renderWithProviders(
        <Breadcrumbs items={mockItems} onKeyDown={onKeyDown} />
      );

      fireEvent.keyDown(screen.getByText("Products"), { key: "Enter" });
      expect(onKeyDown).toHaveBeenCalled();
    });

    test("handles mouse events", () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();

      renderWithProviders(
        <Breadcrumbs
          items={mockItems}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      );

      fireEvent.mouseEnter(screen.getByText("Products"));
      expect(onMouseEnter).toHaveBeenCalled();

      fireEvent.mouseLeave(screen.getByText("Products"));
      expect(onMouseLeave).toHaveBeenCalled();
    });
  });

  describe("Visual Features", () => {
    test("renders icon in correct position", () => {
      const icon = <span data-testid="test-icon">★</span>;
      renderWithProviders(
        <Breadcrumbs
          items={mockItems}
          icon={icon}
          showIcon={true}
          iconPosition="left"
        />
      );

      const icons = screen.getAllByTestId("test-icon");
      expect(icons[0]).toBeInTheDocument();
    });

    test("displays badge when enabled", () => {
      renderWithProviders(
        <Breadcrumbs items={mockItems} showBadge={true} badgeContent="new" />
      );

      expect(screen.getAllByText("new")).toHaveLength(mockItems.length);
    });

    test("shows progress bar when enabled", () => {
      renderWithProviders(
        <Breadcrumbs
          items={mockItems}
          showProgress={true}
          progressColor="bg-blue-500"
        />
      );

      expect(
        screen.getByRole("navigation").querySelector(".bg-blue-500")
      ).toBeInTheDocument();
    });
  });

  describe("Theme Tests", () => {
    test("applies correct theme classes", () => {
      renderWithProviders(<Breadcrumbs items={mockItems} variant="primary" />);
      const navigation = screen.getByRole("navigation");
      expect(navigation).toHaveClass("text-gray-400");
    });

    test("applies variant styles correctly", () => {
      renderWithProviders(<Breadcrumbs items={mockItems} variant="alert" />);
      const links = screen.getAllByRole("link");
      expect(links[0]).toHaveClass("text-red-500");
    });
  });

  describe("Animation Tests", () => {
    test("applies animation properties", async () => {
      renderWithProviders(
        <Breadcrumbs
          items={mockItems}
          animationType="fade"
          animationDuration={0.3}
          hoverAnimation={true}
        />
      );

      const listItems = screen.getAllByRole("listitem");
      expect(listItems[0]).toHaveStyle({
        opacity: "1",
      });
    });

    test("handles stagger animations", () => {
      renderWithProviders(
        <Breadcrumbs
          items={mockItems}
          staggerChildren={true}
          staggerDelay={0.1}
        />
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });
  });
});
