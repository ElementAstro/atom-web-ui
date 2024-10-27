// src/components/Feedback.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Feedback from "./Feedback";
import { ThemeProvider } from "../context/ThemeContext";

describe("Feedback Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSubmitSuccess = jest.fn();
  const mockOnSubmitFailure = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Feedback />, "light");
    expect(screen.getByPlaceholderText("请输入反馈...")).toBeInTheDocument();
    expect(screen.getByText("提交反馈")).toBeInTheDocument();
  });

  test("handles input change", () => {
    renderWithTheme(<Feedback />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    expect(textarea).toHaveValue("Test feedback");
  });

  test("handles form submission success", async () => {
    renderWithTheme(
      <Feedback onSubmitSuccess={mockOnSubmitSuccess} />,
      "light"
    );
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    fireEvent.submit(screen.getByRole("button", { name: /提交反馈/i }));
    await waitFor(() =>
      expect(
        screen.getByText("反馈提交成功！感谢您的意见。")
      ).toBeInTheDocument()
    );
    expect(mockOnSubmitSuccess).toHaveBeenCalled();
  });

  test("handles form submission failure", async () => {
    renderWithTheme(
      <Feedback onSubmitFailure={mockOnSubmitFailure} />,
      "light"
    );
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    fireEvent.submit(screen.getByRole("button", { name: /提交反馈/i }));
    await waitFor(() =>
      expect(screen.getByText("提交反馈时出错，请重试。")).toBeInTheDocument()
    );
    expect(mockOnSubmitFailure).toHaveBeenCalled();
  });

  test("handles clear button click", () => {
    renderWithTheme(<Feedback />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(textarea).toHaveValue("");
  });

  test("handles focus and blur events", () => {
    renderWithTheme(
      <Feedback onFocus={mockOnFocus} onBlur={mockOnBlur} />,
      "light"
    );
    const container = screen.getByLabelText("反馈表单");
    fireEvent.focus(container);
    expect(mockOnFocus).toHaveBeenCalled();
    fireEvent.blur(container);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("handles key down event", () => {
    renderWithTheme(<Feedback onKeyDown={mockOnKeyDown} />, "light");
    const container = screen.getByLabelText("反馈表单");
    fireEvent.keyDown(container, { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("handles mouse enter and leave events", () => {
    renderWithTheme(
      <Feedback
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      "light"
    );
    const container = screen.getByLabelText("反馈表单");
    fireEvent.mouseEnter(container);
    expect(mockOnMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(container);
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    renderWithTheme(<Feedback onAnimationEnd={mockOnAnimationEnd} />, "light");
    const container = screen.getByLabelText("反馈表单");
    fireEvent.animationEnd(container);
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Feedback />, "dark");
    const container = screen.getByLabelText("反馈表单");
    expect(container).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom class", () => {
    renderWithTheme(<Feedback customClass="custom-class" />, "light");
    const container = screen.getByLabelText("反馈表单");
    expect(container).toHaveClass("custom-class");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<Feedback ariaLabel="Custom Aria Label" />, "light");
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<Feedback tooltip="Custom Tooltip" />, "light");
    expect(screen.getByRole("button", { name: /提交反馈/i })).toHaveAttribute(
      "title",
      "Custom Tooltip"
    );
  });

  test("renders with custom border width", () => {
    renderWithTheme(<Feedback borderWidth="4" />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    expect(textarea).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(<Feedback animation="custom-animation" />, "light");
    const container = screen.getByLabelText("反馈表单");
    expect(container).toHaveClass("custom-animation");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(<Feedback textTransform="uppercase" />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    expect(textarea).toHaveStyle({ textTransform: "uppercase" });
  });

  test("renders with custom shadow", () => {
    renderWithTheme(<Feedback shadow={false} />, "light");
    const container = screen.getByLabelText("反馈表单");
    expect(container).not.toHaveClass("shadow-lg");
  });

  test("renders with custom hover effect", () => {
    renderWithTheme(<Feedback hoverEffect={false} />, "light");
    const container = screen.getByLabelText("反馈表单");
    expect(container).not.toHaveClass("hover:scale-105");
  });

  test("renders with custom border style", () => {
    renderWithTheme(<Feedback borderStyle="dashed" />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    expect(textarea).toHaveClass("border-dashed");
  });

  test("renders with custom border color", () => {
    renderWithTheme(<Feedback borderColor="red-500" />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    expect(textarea).toHaveClass("border-red-500");
  });

  test("renders with custom icon color", () => {
    renderWithTheme(
      <Feedback icon={<span className="text-blue-600">Icon</span>} />,
      "light"
    );
    expect(screen.getByText("Icon")).toHaveClass("text-blue-600");
  });

  test("renders with custom clear button color", () => {
    renderWithTheme(<Feedback clearButtonColor="text-red-500" />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    expect(screen.getByRole("button", { name: /close/i })).toHaveClass(
      "text-red-500"
    );
  });

  test("renders with custom clear button position", () => {
    renderWithTheme(<Feedback clearButtonPosition="bottom-left" />, "light");
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    expect(screen.getByRole("button", { name: /close/i })).toHaveClass(
      "bottom-0 left-0"
    );
  });

  test("renders with custom button class", () => {
    renderWithTheme(
      <Feedback customButtonClass="custom-button-class" />,
      "light"
    );
    expect(screen.getByRole("button", { name: /提交反馈/i })).toHaveClass(
      "custom-button-class"
    );
  });

  test("renders with custom textarea class", () => {
    renderWithTheme(
      <Feedback customTextareaClass="custom-textarea-class" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请输入反馈...")).toHaveClass(
      "custom-textarea-class"
    );
  });

  test("renders with custom message class", async () => {
    renderWithTheme(
      <Feedback customMessageClass="custom-message-class" />,
      "light"
    );
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    fireEvent.submit(screen.getByRole("button", { name: /提交反馈/i }));
    await waitFor(() =>
      expect(screen.getByText("反馈提交成功！感谢您的意见。")).toHaveClass(
        "custom-message-class"
      )
    );
  });

  test("renders with custom container class", () => {
    renderWithTheme(
      <Feedback customContainerClass="custom-container-class" />,
      "light"
    );
    expect(screen.getByLabelText("反馈表单")).toHaveClass(
      "custom-container-class"
    );
  });

  test("handles ctrl+enter key press for form submission", async () => {
    renderWithTheme(
      <Feedback onSubmitSuccess={mockOnSubmitSuccess} />,
      "light"
    );
    const textarea = screen.getByPlaceholderText("请输入反馈...");
    fireEvent.change(textarea, { target: { value: "Test feedback" } });
    fireEvent.keyDown(screen.getByLabelText("反馈表单"), {
      key: "Enter",
      ctrlKey: true,
    });
    await waitFor(() =>
      expect(
        screen.getByText("反馈提交成功！感谢您的意见。")
      ).toBeInTheDocument()
    );
    expect(mockOnSubmitSuccess).toHaveBeenCalled();
  });
});
