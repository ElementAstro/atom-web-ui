// src/components/Form.js
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Form = ({
  onSubmitSuccess,
  onSubmitFailure,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "登录表单",
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "用户名不能为空";
    if (!password) newErrors.password = "密码不能为空";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setResponseMessage("");

    // 模拟异步提交
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟延迟
      console.log("Username:", username, "Password:", password);
      setResponseMessage("提交成功！感谢您的反馈。");
      resetForm();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      setResponseMessage("提交失败，请重试。");
      if (onSubmitFailure) onSubmitFailure();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setErrors({});
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        themeClasses[theme || currentTheme]
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-6 border-${borderWidth} rounded-lg shadow-xl bg-gray-800 ${animation} hover:scale-105 hover:shadow-neon`}
      >
        <h2 className="text-white text-2xl font-semibold mb-4">登录表单</h2>
        <Input
          label="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          error={errors.username}
        />
        <Input
          label="密码"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          error={errors.password}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-4 ${animation} hover:scale-105 ${
            isSubmitting
              ? "bg-gray-600 cursor-wait"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          title={tooltip}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12c0-4.418 1.791-8.365 4.688-11.264l5.688 5.688C9.472 6.112 7.314 9.836 8 12h-4z"
                />
              </svg>
              提交中...
            </div>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              提交
            </>
          )}
        </Button>
        {responseMessage && (
          <p
            className={`mt-4 text-sm transition duration-300 transform ${
              responseMessage.includes("成功")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
