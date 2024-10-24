import React, { useState } from "react";
import { Link } from "react-router-dom"; // 如果使用 React Router
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = ({ brand, links, onLinkClick, customClass = "" }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    if (onLinkClick) onLinkClick(link);
    setMobileMenuOpen(false); // 关闭移动端菜单
  };

  return (
    <nav className={`bg-gray-900 shadow-lg ${customClass}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-white text-xl font-bold">{brand}</div>
          <div className="hidden md:flex space-x-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-gray-400 hover:text-white transition duration-200"
                onClick={() => handleLinkClick(link)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white transition duration-200"
            >
              {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="block px-4 py-2 text-gray-400 hover:text-white transition duration-200"
              onClick={() => handleLinkClick(link)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
