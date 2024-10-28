// ScrollToTopExample.tsx
import React from "react";
import ScrollToTop from "../components/ScrollToTop";

const ScrollToTopExample: React.FC = () => {
  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <h1>Scroll Down to See the Button</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <ScrollToTop
        threshold={200}
        position="left"
        color="red"
        size={60}
        icon={<span>🔝</span>}
      />
      <ScrollToTop
        threshold={300}
        position="right"
        color="green"
        size={50}
        icon={<span>⬆️</span>}
      />
    </div>
  );
};

export default ScrollToTopExample;
