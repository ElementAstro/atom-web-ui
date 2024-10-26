// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface LinkItem {
  path: string;
  label: string;
  selected?: boolean;
}

interface DropdownItem {
  path: string;
  label: string;
}

interface Dropdown {
  label: string;
  items: DropdownItem[];
}

interface UserMenu {
  items: DropdownItem[];
}

interface NavbarProps {
  brand: string;
  links: LinkItem[];
  onLinkClick?: (link: LinkItem) => void;
  customClass?: string;
  dropdown?: Dropdown | null;
  search?: boolean;
  userMenu?: UserMenu | null;
  fixed?: boolean;
  themeToggle?: boolean;
  theme?: "light" | "dark" | "astronomy" | "eyeCare";
  tooltip?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  multiSelect?: boolean;
  customLinkClass?: string; // 新增属性
  customDropdownClass?: string; // 新增属性
  customSearchClass?: string; // 新增属性
  customUserMenuClass?: string; // 新增属性
}

const Navbar: React.FC<NavbarProps> = ({
  brand,
  links,
  onLinkClick,
  customClass = "",
  dropdown = null,
  search = false,
  userMenu = null,
  fixed = false,
  themeToggle = false,
  theme, // 新增属性
  tooltip = "", // 新增属性
  icon = null, // 新增属性
  iconPosition = "left", // 新增属性
  multiSelect = false, // 新增属性
  customLinkClass = "", // 解构新增属性
  customDropdownClass = "", // 解构新增属性
  customSearchClass = "", // 解构新增属性
  customUserMenuClass = "", // 解构新增属性
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    multiSelect ? [] : [links.findIndex((link) => link.selected)]
  );
  const { theme: currentTheme, toggleTheme } = useTheme();

  const handleLinkClick = (link: LinkItem, index: number) => {
    if (multiSelect) {
      setSelectedIndices((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedIndices([index]);
      setMobileMenuOpen(false); // 关闭移动端菜单
    }
    if (onLinkClick) onLinkClick(link);
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <nav
      className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg ${
        fixed ? "fixed w-full top-0" : ""
      } ${customClass} ${themeClasses[theme || currentTheme]}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-white text-xl font-bold">{brand}</div>
          <div className="hidden md:flex space-x-4 items-center">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 ${
                  selectedIndices.includes(index)
                    ? "border-b-2 border-white"
                    : ""
                } ${customLinkClass}`} // 使用 customLinkClass 属性
                onClick={() => handleLinkClick(link, index)}
                title={tooltip}
              >
                {icon && iconPosition === "left" && (
                  <span className="mr-2">{icon}</span>
                )}
                {link.label}
                {icon && iconPosition === "right" && (
                  <span className="ml-2">{icon}</span>
                )}
              </Link>
            ))}
            {dropdown && (
              <div className={`relative ${customDropdownClass}`}>
                {" "}
                {/* 使用 customDropdownClass 属性 */}
                <button className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  {dropdown.label}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20">
                  {dropdown.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleLinkClick(item, index)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {search && (
              <div className={`relative ${customSearchClass}`}>
                {" "}
                {/* 使用 customSearchClass 属性 */}
                <input
                  type="text"
                  className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="搜索..."
                />
                <AiOutlineSearch className="absolute right-2 top-2 text-gray-400" />
              </div>
            )}
            {userMenu && (
              <div className={`relative ${customUserMenuClass}`}>
                {" "}
                {/* 使用 customUserMenuClass 属性 */}
                <button className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <AiOutlineUser />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20">
                  {userMenu.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleLinkClick(item, index)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {themeToggle && (
              <button
                onClick={toggleTheme}
                className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
              >
                {theme === "light" ? "🌞" : "🌜"}
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden bg-gray-800 transition-max-height duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`block px-4 py-2 text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedIndices.includes(index) ? "border-b-2 border-white" : ""
            } ${customLinkClass}`} // 使用 customLinkClass 属性
            onClick={() => handleLinkClick(link, index)}
            title={tooltip}
          >
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            {link.label}
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </Link>
        ))}
        {dropdown && (
          <div className={`px-4 py-2 ${customDropdownClass}`}>
            {" "}
            {/* 使用 customDropdownClass 属性 */}
            <button className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              {dropdown.label}
            </button>
            <div className="mt-2">
              {dropdown.items.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block px-4 py-2 text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleLinkClick(item, index)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        {search && (
          <div className={`px-4 py-2 ${customSearchClass}`}>
            {" "}
            {/* 使用 customSearchClass 属性 */}
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="搜索..."
            />
          </div>
        )}
        {userMenu && (
          <div className={`px-4 py-2 ${customUserMenuClass}`}>
            {" "}
            {/* 使用 customUserMenuClass 属性 */}
            <button className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              <AiOutlineUser />
            </button>
            <div className="mt-2">
              {userMenu.items.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block px-4 py-2 text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleLinkClick(item, index)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        {themeToggle && (
          <div className="px-4 py-2">
            <button
              onClick={toggleTheme}
              className="text-gray-200 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              {theme === "light" ? "🌞" : "🌜"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
