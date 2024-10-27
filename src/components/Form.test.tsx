// src/components/Form.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import { ThemeProvider } from "../context/ThemeContext";

describe("Form Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSubmitSuccess = jest.fn();
  const mockOnSubmitFailure = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Form />, "light");
    expect(screen.getByLabelText("登录表单")).toBeInTheDocument();
  });

  test("validates form and shows error messages", async () => {
    renderWithTheme(<Form />, "light");
    fireEvent.submit(screen.getByRole("button", { name: /提交/i }));
    expect(await screen.findByText("用户名不能为空")).toBeInTheDocument();
    expect(await screen.findByText("密码不能为空")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    renderWithTheme(
      <Form
        onSubmitSuccess={mockOnSubmitSuccess}
        onSubmitFailure={mockOnSubmitFailure}
      />,
      "light"
    );
    fireEvent.change(screen.getByLabelText("用户名"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("密码"), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /提交/i }));

    await waitFor(() => expect(mockOnSubmitSuccess).toHaveBeenCalled());
    expect(screen.getByText("提交成功！感谢您的反馈。")).toBeInTheDocument();
  });

  test("handles form submission failure", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject("API is down"));
    renderWithTheme(
      <Form
        onSubmitSuccess={mockOnSubmitSuccess}
        onSubmitFailure={mockOnSubmitFailure}
      />,
      "light"
    );
    fireEvent.change(screen.getByLabelText("用户名"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("密码"), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /提交/i }));

    await waitFor(() => expect(mockOnSubmitFailure).toHaveBeenCalled());
    expect(screen.getByText("提交失败，请重试。")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Form />, "dark");
    expect(screen.getByLabelText("登录表单")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("handles hover event", () => {
    renderWithTheme(<Form onHover={mockOnHover} />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("登录表单"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("handles focus event", () => {
    renderWithTheme(<Form onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByLabelText("登录表单"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("handles blur event", () => {
    renderWithTheme(<Form onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByLabelText("登录表单"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("handles key down event", () => {
    renderWithTheme(<Form onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByLabelText("登录表单"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("handles mouse enter event", () => {
    renderWithTheme(<Form onMouseEnter={mockOnMouseEnter} />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("登录表单"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  test("handles mouse leave event", () => {
    renderWithTheme(<Form onMouseLeave={mockOnMouseLeave} />, "light");
    fireEvent.mouseLeave(screen.getByLabelText("登录表单"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    renderWithTheme(<Form onAnimationEnd={mockOnAnimationEnd} />, "light");
    fireEvent.animationEnd(screen.getByLabelText("登录表单"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<Form tooltip="Custom Tooltip" />, "light");
    expect(screen.getByRole("button", { name: /提交/i })).toHaveAttribute(
      "title",
      "Custom Tooltip"
    );
  });

  test("renders with custom border width", () => {
    renderWithTheme(<Form borderWidth="4" />, "light");
    expect(screen.getByLabelText("登录表单")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(<Form animation="custom-animation" />, "light");
    expect(screen.getByLabelText("登录表单")).toHaveClass("custom-animation");
  });

  test("renders with custom icon", () => {
    renderWithTheme(<Form icon={<span>Icon</span>} />, "light");
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<Form ariaLabel="Custom Aria Label" />, "light");
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom colors", () => {
    renderWithTheme(
      <Form
        formBackgroundColor="bg-red-500"
        formTextColor="text-yellow-500"
        inputBackgroundColor="bg-green-500"
        inputTextColor="text-blue-500"
        buttonBackgroundColor="bg-purple-500"
        buttonTextColor="text-pink-500"
        responseMessageSuccessColor="text-teal-500"
        responseMessageFailureColor="text-orange-500"
      />,
      "light"
    );
    expect(screen.getByLabelText("登录表单")).toHaveClass(
      "bg-red-500 text-yellow-500"
    );
    expect(screen.getByLabelText("用户名")).toHaveClass(
      "bg-green-500 text-blue-500"
    );
    expect(screen.getByRole("button", { name: /提交/i })).toHaveClass(
      "bg-purple-500 text-pink-500"
    );
  });
});
