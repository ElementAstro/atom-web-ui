// src/components/ImageUploader.js
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LoadingSpinner from "./LoadingSpinner"; // 确保有 LoadingSpinner 组件

const ImageUploader = ({ onUpload, onImageLoad, onImageError }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true); // 开始加载
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      if (onUpload) {
        onUpload(file);
      }
      setLoading(false); // 结束加载
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border border-gray-500 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-neon">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center cursor-pointer"
      >
        <AiOutlineCloudUpload className="text-4xl text-blue-500 mb-2 animate-bounce" />
        <span className="text-gray-400">点击上传图片</span>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      {loading && <LoadingSpinner />}
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          onLoad={onImageLoad}
          onError={onImageError}
          className="mt-4 w-32 h-32 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:rotate-6"
        />
      )}
    </div>
  );
};

export default ImageUploader;