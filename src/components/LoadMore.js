// src/components/LoadMore.js
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner"; // 确保已创建并导入.LoadingSpinner组件

const LoadMore = ({ onClick, loading, onHover, onFocus, onBlur }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:bg-gradient-to-l hover:scale-105 hover:shadow-neon ${
          loading ? "cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoadingSpinner size="6" color="white" speed="fast" />{" "}
            {/* 显示加载指示器 */}
            <span className="ml-2 animate-pulse">加载中...</span>
          </>
        ) : (
          <span>加载更多</span>
        )}
      </button>
    </div>
  );
};

export default LoadMore;
