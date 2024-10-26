// src/components/ImageUploader.tsx
import React, { useState, useRef, useEffect, ChangeEvent, FC } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import LoadingSpinner from "./LoadingSpinner"; // 确保有 LoadingSpinner 组件
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface ImageUploaderProps {
  onUpload?: (file: File) => void;
  onImageLoad?: () => void;
  onImageError?: () => void;
  multiple?: boolean;
  maxFileSize?: number;
  preview?: boolean;
  theme?: "light" | "dark" | "astronomy" | "eyeCare";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  maxImages?: number;
  iconColor?: string;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
  ariaLabel?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  onUpload,
  onImageLoad,
  onImageError,
  multiple = false,
  maxFileSize = 5 * 1024 * 1024, // 默认最大文件大小为5MB
  preview = true,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = <AiOutlineCloudUpload />, // 新增属性
  maxImages = 10, // 新增属性
  iconColor = "text-gray-400", // 新增属性
  autoClose = false, // 新增属性
  autoCloseDuration = 5000, // 新增属性
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "图片上传器",
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedImages.length > 0 && autoClose) {
      timerRef.current = setTimeout(() => {
        setSelectedImages([]);
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [selectedImages, autoClose, autoCloseDuration]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file.size <= maxFileSize);

    if (validFiles.length !== files.length) {
      setError(`部分文件超过最大大小限制 ${maxFileSize / 1024 / 1024}MB`);
      return;
    }

    if (selectedImages.length + validFiles.length > maxImages) {
      setError(`最多只能上传 ${maxImages} 张图片`);
      return;
    }

    setLoading(true); // 开始加载
    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    if (onUpload) {
      validFiles.forEach((file) => onUpload(file));
    }
    setLoading(false); // 结束加载
  };

  const removeImage = (imageUrl: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );
  };

  type ThemeKeys = "light" | "dark" | "astronomy" | "eyeCare";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`image-uploader flex flex-col items-center p-4 border-${borderWidth} rounded-lg ${animation} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-neon`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <label
        htmlFor="file-upload"
        className="image-uploader__label flex flex-col items-center cursor-pointer"
        title={tooltip}
      >
        {icon && <span className={iconColor}>{icon}</span>}
        <span className="image-uploader__text text-gray-400">点击上传图片</span>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-uploader__input hidden"
          multiple={multiple}
        />
      </label>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="image-uploader__error text-red-500 mt-2">{error}</div>
      )}
      {preview && selectedImages.length > 0 && (
        <div className="image-uploader__preview mt-4 grid grid-cols-2 gap-4">
          {selectedImages.map((imageUrl, index) => (
            <div
              key={index}
              className="image-uploader__image-container relative"
            >
              <img
                src={imageUrl}
                alt={`Selected ${index}`}
                onLoad={onImageLoad}
                onError={onImageError}
                className="image-uploader__image w-32 h-32 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:rotate-6"
              />
              <button
                onClick={() => removeImage(imageUrl)}
                className="image-uploader__remove-button absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 transition duration-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .image-uploader {
            padding: 1rem;
          }
          .image-uploader__icon {
            font-size: 2rem;
          }
          .image-uploader__image {
            width: 8rem;
            height: 8rem;
          }
          .image-uploader__preview {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;
