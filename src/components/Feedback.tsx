// src/components/Feedback.tsx
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
} from "react";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface FeedbackProps {
  onSubmitSuccess?: () => void;
  onSubmitFailure?: () => void;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  showClearButton?: boolean;
  clearButtonIcon?: React.ReactNode;
  clearButtonColor?: string;
  clearButtonPosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  customClass?: string;
  customButtonClass?: string;
  customTextareaClass?: string;
  customMessageClass?: string;
  customContainerClass?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const Feedback: React.FC<FeedbackProps> = ({
  onSubmitSuccess,
  onSubmitFailure,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = <AiOutlineSend />,
  maxLength = 500,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "反馈表单",
  showClearButton = true,
  clearButtonIcon = <AiOutlineClose />,
  clearButtonColor = "text-gray-400",
  clearButtonPosition = "top-right",
  customClass = "",
  customButtonClass = "",
  customTextareaClass = "",
  customMessageClass = "",
  customContainerClass = "",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      containerRef.current.style.width = `${maxWidth + 20}px`;
    }
  }, [message, isSubmitting, responseMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handleClear = () => {
    setMessage("");
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  const currentThemeClass =
    themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)];

  const clearButtonPositionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <div
      ref={containerRef}
      className={`p-4 rounded-lg shadow-lg ${animation} hover:scale-105 hover:shadow-neon max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${currentThemeClass} ${customContainerClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{ textTransform }}
    >
      <h2 className="text-xl font-bold mb-2">反馈表单</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            placeholder="请输入反馈..."
            maxLength={maxLength}
            className={`border-${borderWidth} rounded-lg p-2 w-full h-32 transition duration-300 focus:outline-none focus:ring focus:ring-blue-500 resize-none ${currentThemeClass} ${customTextareaClass}`}
          />
          {showClearButton && message && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute ${clearButtonPositionClasses[clearButtonPosition]} ${clearButtonColor} hover:text-red-500 transition duration-300`}
            >
              {clearButtonIcon}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {message.length}/{maxLength}
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`p-2 rounded flex items-center justify-center transition duration-300 transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-600 cursor-wait"
                : "bg-blue-500 hover:bg-blue-700"
            } ${currentThemeClass} ${customButtonClass}`}
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
        </div>
      </form>
      {responseMessage && (
        <p
          className={`text-sm transition duration-300 transform ${
            responseMessage.includes("成功") ? "text-green-400" : "text-red-400"
          } ${customMessageClass}`}
        >
          {responseMessage}
        </p>
      )}
      <style>{`
        @media (max-width: 768px) {
          .p-4 {
            padding: 1rem;
          }
          .text-xl {
            font-size: 1.25rem;
          }
          .mb-2 {
            margin-bottom: 0.5rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .h-32 {
            height: 8rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .mt-2 {
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Feedback;
