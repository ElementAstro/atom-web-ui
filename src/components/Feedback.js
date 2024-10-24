// src/components/Feedback.js
import React, { useState, useEffect, useRef } from "react";

const Feedback = ({ onSubmitSuccess, onSubmitFailure }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const containerRef = useRef(null);

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

  return (
    <div
      ref={containerRef}
      className="p-4 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-neon max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
    >
      <h2 className="text-xl font-bold text-white mb-2">反馈表单</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="请输入反馈..."
          className="border border-gray-400 rounded-lg p-2 w-full h-32 transition duration-300 focus:outline-none focus:ring focus:ring-blue-500 bg-gray-900 text-white resize-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-2 p-2 rounded text-white transition duration-300 transform hover:scale-105
            ${
              isSubmitting
                ? "bg-gray-600 cursor-wait"
                : "bg-blue-500 hover:bg-blue-700"
            }
            `}
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
            "提交反馈"
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