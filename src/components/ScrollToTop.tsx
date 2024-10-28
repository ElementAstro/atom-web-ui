// ScrollToTop.tsx
import React, { useState, useEffect } from "react";

interface ScrollToTopProps {
  threshold?: number;
  position?: "left" | "right";
  color?: string;
  size?: number;
  icon?: React.ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 300,
  position = "right",
  color = "blue",
  size = 50,
  icon = "⬆️",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // 滚动监听
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  // 滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 ${position}-8 p-3 rounded-full bg-${color}-600 text-white shadow-lg hover:bg-${color}-700 transition duration-200`}
          style={{ width: size, height: size }}
          aria-label="Scroll to top"
        >
          {icon}
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
