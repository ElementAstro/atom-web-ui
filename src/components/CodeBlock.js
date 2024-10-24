// src/components/CodeBlock.js
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";

const CodeBlock = ({ code, onCopySuccess, onCopyFailure }) => {
  const [copied, setCopied] = React.useState(false);

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

  return (
    <div className="relative">
      <div className="absolute top-2 right-2">
        <CopyToClipboard
          text={code}
          onCopy={handleCopy}
          onError={handleCopyFailure}
        >
          <button
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Copy code"
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
      <pre className="bg-gray-900 p-4 rounded-lg shadow-md overflow-x-auto transition-transform duration-300 hover:scale-105 hover:shadow-neon">
        <code className="text-gray-300 whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
