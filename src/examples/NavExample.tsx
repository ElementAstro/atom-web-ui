import React from "react";
import Navs from "../components/Nav";

const NavExample: React.FC = () => {
  const navItems = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Services", value: "services" },
    { label: "Contact", value: "contact", disabled: true },
  ];

  const handleNavClick = (value: string) => {
    console.log("Nav item clicked:", value);
  };

  const handleHover = (value: string) => {
    console.log("Nav item hovered:", value);
  };

  const handleFocus = (value: string) => {
    console.log("Nav item focused:", value);
  };

  const handleBlur = (value: string) => {
    console.log("Nav item blurred:", value);
  };

  return (
    <div className="p-4">
      <Navs
        items={navItems}
        onNavClick={handleNavClick}
        onHover={handleHover}
        onFocus={handleFocus}
        onBlur={handleBlur}
        customClass="my-custom-nav"
        theme="ocean"
        tooltip="Navigate"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>🔗</span>}
        iconPosition="left"
        multiSelect={false}
        customItemClass="my-custom-item"
        customIconClass="my-custom-icon"
      />
    </div>
  );
};

export default NavExample;