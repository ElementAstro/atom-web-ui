// src/components/CodeBlock.tsx
import React, { useState, useEffect, KeyboardEvent, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  AiOutlineCopy,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineExpand,
  AiOutlineShrink,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineUndo,
  AiOutlineRedo,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

interface CodeBlockProps {
  code: string;
  onCopySuccess?: () => void;
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
  showCopyButton?: boolean;
  showCollapseButton?: boolean;
  showFullScreenButton?: boolean;
  showEditButton?: boolean;
  showUndoRedoButtons?: boolean;
  showLanguageLabel?: boolean;
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  rippleEffect?: boolean;
  shadow?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code: initialCode,
  onCopySuccess,
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
  showCopyButton = true,
  showCollapseButton = true,
  showFullScreenButton = true,
  showEditButton = true,
  showUndoRedoButtons = true,
  showLanguageLabel = true,
  showTooltip = false,
  tooltipPosition = "top",
  rippleEffect = false,
  shadow = false,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { theme: currentTheme } = useTheme();
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  const handleCopy = () => {
    setCopied(true);
    if (onCopySuccess) onCopySuccess();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  };

  const highlight = (code: string) => {
    return Prism.highlight(code, Prism.languages[language], language);
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

  const tooltipClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  const handleRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!rippleEffect) return;

    const ripple = document.createElement("span");
    const diameter = Math.max(
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight
    );
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      event.clientX - event.currentTarget.offsetLeft - radius
    }px`;
    ripple.style.top = `${
      event.clientY - event.currentTarget.offsetTop - radius
    }px`;
    ripple.classList.add("ripple");

    const rippleContainer =
      event.currentTarget.querySelector(".ripple-container");
    rippleContainer?.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div
      className={`relative ${isFullScreen ? "fixed inset-0 z-50" : ""} ${
        themeClasses[theme || currentTheme]
      } ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{ textTransform }}
    >
      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        {showCollapseButton && collapsible && (
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
        {showCopyButton && (
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button
              className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
              aria-label="Copy code"
              title={tooltip}
            >
              <AiOutlineCopy className="transform hover:rotate-12 transition duration-300" />
            </button>
          </CopyToClipboard>
        )}
        {showFullScreenButton && (
          <button
            onClick={handleToggleFullScreen}
            className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Toggle full screen"
            title="Toggle full screen"
          >
            {isFullScreen ? (
              <AiOutlineShrink className="transform transition duration-300" />
            ) : (
              <AiOutlineExpand className="transform transition duration-300" />
            )}
          </button>
        )}
        {showEditButton && (
          <button
            onClick={handleToggleEdit}
            className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Toggle edit"
            title="Toggle edit"
          >
            <AiOutlineEdit className="transform transition duration-300" />
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleSaveEdit}
            className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="Save edit"
            title="Save edit"
          >
            <AiOutlineSave className="transform transition duration-300" />
          </button>
        )}
        {isEditing && showUndoRedoButtons && (
          <>
            <button
              onClick={() => document.execCommand("undo")}
              className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
              aria-label="Undo"
              title="Undo"
            >
              <AiOutlineUndo className="transform transition duration-300" />
            </button>
            <button
              onClick={() => document.execCommand("redo")}
              className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
              aria-label="Redo"
              title="Redo"
            >
              <AiOutlineRedo className="transform transition duration-300" />
            </button>
          </>
        )}
        {copied && (
          <span className="absolute text-green-400 mt-2 animate-pulse">
            已复制!
          </span>
        )}
      </div>
      {!collapsed && (
        <div className="flex">
          {lineNumbers && !isEditing && (
            <pre className="bg-gray-800 p-4 rounded-l-lg shadow-md overflow-x-auto transition-transform duration-300">
              <code className="text-gray-500">{renderLineNumbers(code)}</code>
            </pre>
          )}
          {isEditing ? (
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={highlight}
              padding={10}
              className="bg-gray-900 p-4 rounded-r-lg shadow-md overflow-x-auto transition-transform duration-300 hover:scale-105 hover:shadow-neon text-gray-300 w-full"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          ) : (
            <pre className="bg-gray-900 p-4 rounded-r-lg shadow-md overflow-x-auto transition-transform duration-300 hover:scale-105 hover:shadow-neon">
              <code
                ref={codeRef}
                className={`text-gray-300 whitespace-pre-wrap hljs ${language}`}
              >
                {renderCodeLines(code)}
              </code>
            </pre>
          )}
        </div>
      )}
      {showLanguageLabel && language && !isEditing && (
        <div className="absolute bottom-2 left-2 text-gray-500 text-sm">
          {language}
        </div>
      )}
      {showTooltip && (
        <div className={`tooltip ${tooltipClasses[tooltipPosition]}`}>
          {tooltip}
        </div>
      )}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 600ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          white-space: nowrap;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tooltip-top {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        }
        .tooltip-bottom {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
        }
        .tooltip-left {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 0.5rem;
        }
        .tooltip-right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        }
        label:hover .tooltip {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CodeBlock;
