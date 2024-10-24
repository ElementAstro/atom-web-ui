// src/components/Avatar.js
import React, { useState, useEffect } from "react";

const Avatar = ({
  src,
  alt,
  size = "40",
  isLoading = false,
  onLoad,
  onError,
}) => {
  const [isError, setIsError] = useState(false);

  // 设置默认头像的 URL
  const defaultAvatar = "https://via.placeholder.com/150"; // Fallback 头像 URL

  const handleError = () => {
    setIsError(true); // 若图片加载失败，则显示默认头像
    if (onError) onError();
  };

  useEffect(() => {
    if (!isError && onLoad) {
      onLoad();
    }
  }, [isError, onLoad]);

  return (
    <div className={`relative w-${size} h-${size} group`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>{" "}
          {/* Loading Spinner */}
        </div>
      )}
      <img
        src={isError ? defaultAvatar : src}
        alt={alt}
        onError={handleError}
        className={`rounded-full w-${size} h-${size} object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-neon`}
      />
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-neon transition-all duration-300 ease-in-out"></div>
    </div>
  );
};

export default Avatar;
