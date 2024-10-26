// src/components/CodeBlock.tsx
import React, { useState, KeyboardEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

// 添加类型声明文件
declare module "react-copy-to-clipboard";

interface CodeBlockProps {
  code: string;
  onCopySuccess?: () => void;
  onCopyFailure?: () => void;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  language?: string;
  lineNumbers?: boolean;
  highlightLines?: number[];
  tooltip?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  customClass?: string;
  customButtonClass?: string;
  customCodeClass?: string;
  customLineNumberClass?: string;
  customHighlightClass?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  onCopySuccess,
  onCopyFailure,
  theme,
  language = "javascript",
  lineNumbers = false,
  highlightLines = [],
  tooltip = "Copy code",
  collapsible = false,
  defaultCollapsed = false,
  customClass = "",
  customButtonClass = "",
  customCodeClass = "",
  customLineNumberClass = "",
  customHighlightClass = "",
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Code block",
}) => {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleCopy = () => {
    setCopied(true);
    if (onCopySuccess) onCopySuccess();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCopyFailure = () => {
    if (onCopyFailure) onCopyFailure();
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white",
  };

  const renderLineNumbers = (code: string) => {
    return code.split("\n").map((_, index) => (
      <span
        key={index}
        className={`block text-right pr-4 ${
          highlightLines.includes(index + 1)
            ? `bg-yellow-200 ${customHighlightClass}`
            : ""
        } ${customLineNumberClass}`}
      >
        {index + 1}
      </span>
    ));
  };

  const renderCodeLines = (code: string) => {
    return code.split("\n").map((line, index) => (
      <span
        key={index}
        className={`block ${
          highlightLines.includes(index + 1)
            ? `bg-yellow-200 ${customHighlightClass}`
            : ""
        } ${customCodeClass}`}
      >
        {line}
      </span>
    ));
  };

  return (
    <div
      className={`relative ${
        themeClasses[theme || currentTheme]
      } ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <div className="absolute top-2 right-2 flex space-x-2">
        {collapsible && (
          <button
            onClick={handleToggleCollapse}
            className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Toggle collapse"
            title="Toggle collapse"
          >
            {collapsed ? (
              <AiOutlineDown className="transform transition duration-300" />
            ) : (
              <AiOutlineUp className="transform transition duration-300" />
            )}
          </button>
        )}
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button
            className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Copy code"
            title={tooltip}
          >
            <AiOutlineCopy className="transform hover:rotate-12 transition duration-300" />
          </button>
        </CopyToClipboard>
        {copied && (
          <span className="absolute text-green-400 mt-2 animate-pulse">
            已复制!
          </span>
        )}
      </div>
      {!collapsed && (
        <div className="flex">
          {lineNumbers && (
            <pre className="bg-gray-800 p-4 rounded-l-lg shadow-md overflow-x-auto transition-transform duration-300">
              <code className="text-gray-500">{renderLineNumbers(code)}</code>
            </pre>
          )}
          <pre className="bg-gray-900 p-4 rounded-r-lg shadow-md overflow-x-auto transition-transform duration-300 hover:scale-105 hover:shadow-neon">
            <code className="text-gray-300 whitespace-pre-wrap">
              {renderCodeLines(code)}
            </code>
          </pre>
        </div>
      )}
      {language && (
        <div className="absolute bottom-2 left-2 text-gray-500 text-sm">
          {language}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
