// src/components/Grid.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Grid from "./Grid";
import { ThemeProvider } from "../context/ThemeContext";

describe("Grid Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockFetchData = jest.fn().mockResolvedValue([
    { title: "Item 1", description: "Description 1" },
    { title: "Item 2", description: "Description 2" },
  ]);

  const mockOnItemHover = jest.fn();
  const mockOnItemClick = jest.fn();

  test("renders loading component when isLoading is true", () => {
    renderWithTheme(<Grid isLoading={true} />, "light");
    expect(screen.getByText("加载中...")).toBeInTheDocument();
  });

  test("renders empty component when there are no items", async () => {
    mockFetchData.mockResolvedValueOnce([]);
    renderWithTheme(<Grid fetchData={mockFetchData} />, "light");
    expect(await screen.findByText("没有可用的项")).toBeInTheDocument();
  });

  test("renders items when fetchData is provided", async () => {
    renderWithTheme(<Grid fetchData={mockFetchData} />, "light");
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(await screen.findByText("Item 2")).toBeInTheDocument();
  });

  test("handles search input", async () => {
    renderWithTheme(<Grid fetchData={mockFetchData} />, "light");
    fireEvent.change(await screen.findByPlaceholderText("搜索..."), {
      target: { value: "Item 1" },
    });
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
  });

  test("handles item hover", async () => {
    renderWithTheme(
      <Grid fetchData={mockFetchData} onItemHover={mockOnItemHover} />,
      "light"
    );
    fireEvent.mouseEnter(await screen.findByText("Item 1"));
    expect(mockOnItemHover).toHaveBeenCalledWith({
      title: "Item 1",
      description: "Description 1",
    });
  });

  test("handles item click", async () => {
    renderWithTheme(
      <Grid fetchData={mockFetchData} onItemClick={mockOnItemClick} />,
      "light"
    );
    fireEvent.click(await screen.findByText("Item 1"));
    expect(mockOnItemClick).toHaveBeenCalledWith({
      title: "Item 1",
      description: "Description 1",
    });
  });

  test("renders with custom columns and gap", async () => {
    renderWithTheme(
      <Grid
        fetchData={mockFetchData}
        columns={{ base: 2, sm: 2, md: 2, lg: 2 }}
        gap={8}
      />,
      "light"
    );
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toHaveClass("grid-cols-2 gap-8");
  });

  test("applies theme classes", async () => {
    renderWithTheme(<Grid fetchData={mockFetchData} />, "dark");
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Grid item")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("handles pagination", async () => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      title: `Item ${i + 1}`,
      description: `Description ${i + 1}`,
    }));
    mockFetchData.mockResolvedValueOnce(items);
    renderWithTheme(
      <Grid fetchData={mockFetchData} itemsPerPage={5} />,
      "light"
    );

    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 5")).toBeInTheDocument();
    expect(screen.queryByText("Item 6")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("2"));
    expect(await screen.findByText("Item 6")).toBeInTheDocument();
    expect(screen.getByText("Item 10")).toBeInTheDocument();
  });

  test("renders with custom styles", async () => {
    renderWithTheme(
      <Grid
        fetchData={mockFetchData}
        gridBackgroundColor="bg-red-500"
        gridTextColor="text-yellow-500"
        itemBackgroundColor="bg-blue-500"
        itemTextColor="text-green-500"
      />,
      "light"
    );
    expect(await screen.findByText("Item 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Grid item")).toHaveClass(
      "bg-blue-500 text-green-500"
    );
  });

  test("renders with custom search input styles", async () => {
    renderWithTheme(
      <Grid
        fetchData={mockFetchData}
        searchInputBackgroundColor="bg-red-500"
        searchInputTextColor="text-yellow-500"
      />,
      "light"
    );
    const searchInput = await screen.findByPlaceholderText("搜索...");
    expect(searchInput).toHaveClass("bg-red-500 text-yellow-500");
  });

  test("renders with custom pagination button styles", async () => {
    renderWithTheme(
      <Grid
        fetchData={mockFetchData}
        paginationButtonBackgroundColor="bg-red-500"
        paginationButtonTextColor="text-yellow-500"
      />,
      "light"
    );
    const paginationButton = await screen.findByText("1");
    expect(paginationButton).toHaveClass("bg-red-500 text-yellow-500");
  });
});
