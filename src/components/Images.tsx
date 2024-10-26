// src/components/Images.tsx
import {
  useState,
  useEffect,
  useRef,
  FC,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  AnimationEventHandler,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface Image {
  src: string;
  alt: string;
}

interface ImagesProps {
  images: Image[];
  onImageClick?: (image: Image) => void;
  onImageHover?: (image: Image) => void;
  customClass?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "ocean" | "sunset";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  fullscreen?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
  ariaLabel?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Images: FC<ImagesProps> = ({
  images,
  onImageClick,
  onImageHover,
  customClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  fullscreen = false,
  autoClose = false,
  autoCloseDuration = 5000,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "图片画廊",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedImage && autoClose) {
      timerRef.current = setTimeout(() => {
        setSelectedImage(null);
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [selectedImage, autoClose, autoCloseDuration]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    if (onImageClick) onImageClick(image);
  };

  const handleFullscreen = () => {
    if (fullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    }
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset";

  const themeClasses: Record<ThemeKeys, string> = {
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
      className={`grid grid-cols-3 gap-4 ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group"
          onClick={() => handleImageClick(image)}
          onMouseEnter={() => onImageHover && onImageHover(image)}
          title={tooltip}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-auto rounded-md shadow-md object-cover ${animation} ${hoverAnimation} group-hover:${hoverColor} group-active:${activeColor} ${
              disabled ? disabledColor : ""
            } border-${borderWidth} ${
              themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
            }`}
          />
        </div>
      ))}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleFullscreen}
        >
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-auto h-auto max-w-full max-h-full rounded-md shadow-lg"
            />
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .grid-cols-3 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default Images;
