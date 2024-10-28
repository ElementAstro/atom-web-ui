// src/pages/ErrorPage.tsx
import React, { useState, useEffect } from "react";

interface RecommendedLink {
  label: string;
  url: string;
}

interface ErrorPageProps {
  errorCode?: number;
  errorMessage?: string;
  countdownStart?: number;
  showCountdown?: boolean;
  showSearch?: boolean;
  showRecommendedLinks?: boolean;
  recommendedLinks?: RecommendedLink[];
  showReportButton?: boolean;
  onReportError?:
    | ((error: {
        errorCode: number;
        errorMessage: string;
        url: string;
      }) => void)
    | null;
  primaryColor?: string;
  secondaryColor?: string;
  onGoBack?: () => void;
  onHomeRedirect?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = 404,
  errorMessage = "Page Not Found",
  countdownStart = 10,
  showCountdown = true,
  showSearch = true,
  showRecommendedLinks = true,
  recommendedLinks = [
    { label: "Home", url: "/" },
    { label: "Help Center", url: "/help" },
    { label: "Contact Us", url: "/contact" },
  ],
  showReportButton = true,
  onReportError = null,
  primaryColor = "indigo-500",
  secondaryColor = "purple-500",
  onGoBack = () => window.history.back(),
  onHomeRedirect = () => (window.location.href = "/"),
}) => {
  const [countdown, setCountdown] = useState(countdownStart);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown <= 0) {
      onHomeRedirect();
    }
  }, [countdown, showCountdown, onHomeRedirect]);

  const handleSearch = () => {
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  };

  const handleReportError = () => {
    if (onReportError) {
      onReportError({ errorCode, errorMessage, url: window.location.href });
    } else {
      alert("Error report sent!");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-${primaryColor} to-${secondaryColor} text-white`}
    >
      <div className="text-center p-8 max-w-lg rounded-lg shadow-lg bg-opacity-80 bg-gray-800">
        <h1 className="text-9xl font-bold text-white">{errorCode}</h1>
        <p className="text-2xl font-semibold mt-4">{errorMessage}</p>
        <p className="mt-2 text-gray-300">
          Sorry, something went wrong or the page you're looking for doesn’t
          exist.
        </p>

        {showCountdown && (
          <p className="mt-2 text-gray-400">
            Redirecting to homepage in{" "}
            <span className="font-bold">{countdown}</span> seconds...
          </p>
        )}

        {/* Search Bar */}
        {showSearch && (
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for pages or topics"
              className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white"
            />
            <button
              onClick={handleSearch}
              className={`bg-${primaryColor} hover:bg-opacity-80 px-4 py-2 rounded-r-lg transition-all`}
            >
              Search
            </button>
          </div>
        )}

        {/* Suggested Links */}
        {showRecommendedLinks && (
          <div className="mt-6 text-left">
            <p className="font-semibold text-gray-200">
              You might find these pages useful:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              {recommendedLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onGoBack}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all"
          >
            Go Back
          </button>
          <button
            onClick={onHomeRedirect}
            className={`bg-${primaryColor} hover:bg-opacity-80 px-4 py-2 rounded-lg transition-all`}
          >
            Home
          </button>
          <a
            href="mailto:support@example.com"
            className={`bg-${secondaryColor} hover:bg-opacity-80 px-4 py-2 rounded-lg transition-all`}
          >
            Contact Support
          </a>
        </div>

        {/* Report Error */}
        {showReportButton && (
          <button
            onClick={handleReportError}
            className="mt-4 bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg transition-all"
          >
            Report this Error
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
