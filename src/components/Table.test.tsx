// src/components/Table.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "./Table";
import { ThemeProvider } from "../context/ThemeContext";
import { CSVLink } from "react-csv";

jest.mock("react-csv", () => ({
  CSVLink: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("Table Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSortChange = jest.fn();
  const mockOnSearchChange = jest.fn();
  const mockOnRowSelect = jest.fn();
  const mockOnRowDelete = jest.fn();
  const mockOnRowEdit = jest.fn();
  const mockOnRowsDelete = jest.fn();
  const mockOnRowsMove = jest.fn();
  const mockOnRowAdd = jest.fn();

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "age" },
    { Header: "Address", accessor: "address" },
  ];

  const data = [
    { name: "John Doe", age: 28, address: "123 Main St" },
    { name: "Jane Smith", age: 34, address: "456 Oak St" },
    { name: "Sam Johnson", age: 45, address: "789 Pine St" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Table data={data} columns={columns} />, "light");
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Table
        data={data}
        columns={columns}
        onSortChange={mockOnSortChange}
        onSearchChange={mockOnSearchChange}
        onRowSelect={mockOnRowSelect}
        onRowDelete={mockOnRowDelete}
        onRowEdit={mockOnRowEdit}
        onRowsDelete={mockOnRowsDelete}
        onRowsMove={mockOnRowsMove}
        onRowAdd={mockOnRowAdd}
        theme="dark"
        tooltip="Table Tooltip"
        borderWidth="4"
        icon={<span>Icon</span>}
        fullscreen={true}
      />,
      "dark"
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("calls onSortChange when column header is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onSortChange={mockOnSortChange} />,
      "light"
    );
    fireEvent.click(screen.getByText("Name"));
    expect(mockOnSortChange).toHaveBeenCalledWith({ key: "name", direction: "ascending" });
  });

  test("calls onSearchChange when search input is changed", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onSearchChange={mockOnSearchChange} />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("搜索..."), { target: { value: "Jane" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("Jane");
  });

  test("calls onRowSelect when row is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowSelect={mockOnRowSelect} />,
      "light"
    );
    fireEvent.click(screen.getByText("John Doe"));
    expect(mockOnRowSelect).toHaveBeenCalledWith(data[0]);
  });

  test("calls onRowDelete when delete button is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowDelete={mockOnRowDelete} />,
      "light"
    );
    fireEvent.click(screen.getAllByTitle("Table Tooltip")[1]);
    expect(mockOnRowDelete).toHaveBeenCalledWith(data[0]);
  });

  test("calls onRowEdit when edit button is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowEdit={mockOnRowEdit} />,
      "light"
    );
    fireEvent.click(screen.getAllByTitle("Table Tooltip")[0]);
    expect(mockOnRowEdit).toHaveBeenCalledWith(data[0]);
  });

  test("calls onRowAdd when add button is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowAdd={mockOnRowAdd} />,
      "light"
    );
    fireEvent.click(screen.getByText("+"));
    expect(mockOnRowAdd).toHaveBeenCalled();
  });

  test("calls onRowsDelete when delete selected rows button is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowsDelete={mockOnRowsDelete} />,
      "light"
    );
    fireEvent.click(screen.getByText("删除选中行"));
    expect(mockOnRowsDelete).toHaveBeenCalled();
  });

  test("calls onRowsMove when move up button is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowsMove={mockOnRowsMove} />,
      "light"
    );
    fireEvent.click(screen.getByText("上移"));
    expect(mockOnRowsMove).toHaveBeenCalledWith([], "up");
  });

  test("calls onRowsMove when move down button is clicked", () => {
    renderWithTheme(
      <Table data={data} columns={columns} onRowsMove={mockOnRowsMove} />,
      "light"
    );
    fireEvent.click(screen.getByText("下移"));
    expect(mockOnRowsMove).toHaveBeenCalledWith([], "down");
  });

  test("handles pagination correctly", () => {
    renderWithTheme(<Table data={data} columns={columns} />, "light");
    fireEvent.click(screen.getByText("下一页"));
    expect(screen.getByText("第 2 页，共 1 页")).toBeInTheDocument();
  });

  test("handles column toggle correctly", () => {
    renderWithTheme(<Table data={data} columns={columns} />, "light");
    fireEvent.click(screen.getByLabelText("Name"));
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  test("handles CSV export correctly", () => {
    renderWithTheme(<Table data={data} columns={columns} />, "light");
    fireEvent.click(screen.getByText("导出 CSV"));
    expect(CSVLink).toHaveBeenCalled();
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<Table data={data} columns={columns} theme="astronomy" />, "astronomy");
    expect(screen.getByText("John Doe").closest("div")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});