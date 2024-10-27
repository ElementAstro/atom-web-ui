// src/components/ValidatedForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ValidatedForm from "./ValidatedForm";
import { ThemeProvider } from "../context/ThemeContext";

describe("ValidatedForm Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSubmitSuccess = jest.fn();
  const mockOnSubmitFailure = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<ValidatedForm />, "light");
    expect(screen.getByText("表单标题")).toBeInTheDocument();
    expect(screen.getByText("表单描述")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入用户名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入密码")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <ValidatedForm
        formTitle="Custom Title"
        formDescription="Custom Description"
        submitButtonText="Custom Submit"
        resetButtonText="Custom Reset"
        addButtonText="Custom Add"
        deleteButtonText="Custom Delete"
        placeholderUsername="Custom Username"
        placeholderPassword="Custom Password"
        theme="dark"
      />,
      "dark"
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Custom Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Custom Password")).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    renderWithTheme(
      <ValidatedForm onSubmitSuccess={mockOnSubmitSuccess} />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("请输入用户名"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("请输入密码"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("提交"));

    await waitFor(() => {
      expect(mockOnSubmitSuccess).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
        fields: [],
      });
    });
  });

  test("fails to submit the form with errors", async () => {
    renderWithTheme(
      <ValidatedForm onSubmitFailure={mockOnSubmitFailure} />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("请输入用户名"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("请输入密码"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("提交"));

    await waitFor(() => {
      expect(screen.getByText("用户名是必填的")).toBeInTheDocument();
      expect(screen.getByText("密码至少为6个字符")).toBeInTheDocument();
    });
  });

  test("resets the form", () => {
    renderWithTheme(<ValidatedForm />, "light");
    fireEvent.change(screen.getByPlaceholderText("请输入用户名"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("请输入密码"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("重置"));

    expect(screen.getByPlaceholderText("请输入用户名")).toHaveValue("");
    expect(screen.getByPlaceholderText("请输入密码")).toHaveValue("");
  });

  test("adds and removes dynamic fields", () => {
    renderWithTheme(<ValidatedForm />, "light");
    fireEvent.click(screen.getByText("添加字段"));
    expect(screen.getByLabelText("字段 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("删除"));
    expect(screen.queryByLabelText("字段 1")).not.toBeInTheDocument();
  });

  test("handles drag and drop functionality", () => {
    renderWithTheme(<ValidatedForm draggable={true} />, "light");
    const form = screen.getByRole("form");

    fireEvent.dragStart(form, {
      clientX: 100,
      clientY: 100,
    });
    fireEvent.drop(form, {
      clientX: 200,
      clientY: 200,
    });

    expect(form).toHaveStyle({
      left: "100px",
      top: "100px",
    });
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<ValidatedForm theme="astronomy" />, "astronomy");
    expect(screen.getByRole("form")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});
