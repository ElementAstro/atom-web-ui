import React from "react";
import Navbar from "../components/Navbars";
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineContacts } from "react-icons/ai";

const NavbarExample: React.FC = () => {
  const links = [
    { path: "/", label: "Home", selected: true },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const dropdown = {
    label: "More",
    items: [
      { path: "/services", label: "Services" },
      { path: "/portfolio", label: "Portfolio" },
    ],
  };

  const userMenu = {
    items: [
      { path: "/profile", label: "Profile" },
      { path: "/logout", label: "Logout" },
    ],
  };

  const handleLinkClick = (link: { path: string; label: string }) => {
    console.log("Link clicked:", link);
  };

  return (
    <div className="p-4">
      <Navbar
        brand="My Website"
        links={links}
        onLinkClick={handleLinkClick}
        customClass="my-custom-navbar"
        dropdown={dropdown}
        search={true}
        userMenu={userMenu}
        fixed={true}
        themeToggle={true}
        theme="light"
        tooltip="Navigate"
        icon={<AiOutlineHome />}
        iconPosition="left"
        multiSelect={false}
        customLinkClass="my-custom-link"
        customDropdownClass="my-custom-dropdown"
        customSearchClass="my-custom-search"
        customUserMenuClass="my-custom-user-menu"
      />
    </div>
  );
};

export default NavbarExample;