// src/components/ImageUploader.tsx
import React, { useState, useRef, useEffect, ChangeEvent, FC } from "react";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../context/ThemeContext";

interface ImageUploaderProps {
  onUpload?: (file: File) => void;
  onImageLoad?: () => void;
  onImageError?: () => void;
  multiple?: boolean;
  maxFileSize?: number;
  preview?: boolean;
  theme?: "light" | "dark" | "astronomy" | "eyeCare";
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
  uploadButtonText?: string;
  uploadButtonClass?: string;
  previewImageClass?: string;
  errorClass?: string;
  loadingAnimation?: string;
  loadingDuration?: string;
  removeButtonIcon?: React.ReactNode;
  removeButtonColor?: string;
  removeButtonClass?: string;
  uploadButtonTooltip?: string;
  previewImageTooltip?: string;
  uploadButtonAnimation?: string;
  previewImageAnimation?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  customClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  onUpload,
  onImageLoad,
  onImageError,
  multiple = false,
  maxFileSize = 5 * 1024 * 1024,
  preview = true,
  theme,
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = <AiOutlineCloudUpload />,
  maxImages = 10,
  iconColor = "text-gray-400",
  autoClose = false,
  autoCloseDuration = 5000,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "图片上传器",
  uploadButtonText = "点击上传图片",
  uploadButtonClass = "",
  previewImageClass = "",
  errorClass = "",
  loadingAnimation = "animate-spin",
  loadingDuration = "duration-300",
  removeButtonIcon = <AiOutlineClose />,
  removeButtonColor = "bg-red-500",
  removeButtonClass = "",
  uploadButtonTooltip = "",
  previewImageTooltip = "",
  uploadButtonAnimation = "hover:scale-105",
  previewImageAnimation = "hover:scale-105 hover:rotate-6",
  backgroundColor,
  textColor,
  borderColor,
  customClass = "",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme: currentTheme } = useTheme();
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

    setLoading(true);
    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    if (onUpload) {
      validFiles.forEach((file) => onUpload(file));
    }
    setLoading(false);
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
      } shadow-lg transition-transform duration-300 ${uploadButtonAnimation} ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
        borderColor: borderColor || undefined,
      }}
    >
      <label
        htmlFor="file-upload"
        className={`image-uploader__label flex flex-col items-center cursor-pointer ${uploadButtonClass}`}
        title={uploadButtonTooltip}
      >
        {icon && <span className={iconColor}>{icon}</span>}
        <span className="image-uploader__text text-gray-400">
          {uploadButtonText}
        </span>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-uploader__input hidden"
          multiple={multiple}
        />
      </label>
      {loading && (
        <LoadingSpinner
          customClass={`${loadingAnimation} ${loadingDuration}`}
        />
      )}
      {error && (
        <div
          className={`image-uploader__error text-red-500 mt-2 ${errorClass}`}
        >
          {error}
        </div>
      )}
      {preview && selectedImages.length > 0 && (
        <div className="image-uploader__preview mt-4 grid grid-cols-2 gap-4">
          {selectedImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`image-uploader__image-container relative ${previewImageClass}`}
              title={previewImageTooltip}
            >
              <img
                src={imageUrl}
                alt={`Selected ${index}`}
                onLoad={onImageLoad}
                onError={onImageError}
                className={`image-uploader__image w-32 h-32 object-cover rounded-lg shadow-lg transition-transform duration-300 ${previewImageAnimation}`}
              />
              <button
                onClick={() => removeImage(imageUrl)}
                className={`image-uploader__remove-button absolute top-0 right-0 ${removeButtonColor} text-white p-1 rounded-full hover:bg-red-700 transition duration-300 ${removeButtonClass}`}
              >
                {removeButtonIcon}
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
