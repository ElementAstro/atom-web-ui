// src/components/Feedback.js
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Feedback = ({
  onSubmitSuccess,
  onSubmitFailure,
  theme, 
  tooltip = "", 
  borderWidth = "2", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  icon = <AiOutlineSend />, 
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const containerRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟与外部接口交互
    try {
      // 这里可以替换为真实的 API 调用逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟延迟
      console.log("User Feedback:", message);
      setResponseMessage("反馈提交成功！感谢您的意见。");
      setMessage("");
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      setResponseMessage("提交反馈时出错，请重试。");
      if (onSubmitFailure) onSubmitFailure();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const maxWidth = Math.max(
        ...Array.from(
          containerRef.current.querySelectorAll("textarea, button")
        ).map((el) => el.scrollWidth)
      );
      containerRef.current.style.width = `${maxWidth + 20}px`; // 根据内容调整宽度
    }
  }, [message, isSubmitting, responseMessage]);

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      ref={containerRef}
      className={`p-4 rounded-lg shadow-lg ${animation} hover:scale-105 hover:shadow-neon max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${
        themeClasses[theme || currentTheme]
      }`}
    >
      <h2 className="text-xl font-bold mb-2">反馈表单</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="请输入反馈..."
          className={`border-${borderWidth} rounded-lg p-2 w-full h-32 transition duration-300 focus:outline-none focus:ring focus:ring-blue-500 resize-none ${
            themeClasses[theme || currentTheme]
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-2 p-2 rounded flex items-center justify-center transition duration-300 transform hover:scale-105 ${
            isSubmitting
              ? "bg-gray-600 cursor-wait"
              : "bg-blue-500 hover:bg-blue-700"
          } ${themeClasses[theme || currentTheme]}`}
          title={tooltip}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
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
              提交反馈
            </>
          )}
        </button>
      </form>
      {responseMessage && (
        <p
          className={`text-sm transition duration-300 transform ${
            responseMessage.includes("成功") ? "text-green-400" : "text-red-400"
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default Feedback;
