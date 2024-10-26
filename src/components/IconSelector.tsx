// src/components/IconSelector.tsx
import { useState, ChangeEvent, FC } from "react";
import { useTheme } from "../context/ThemeContext";
import * as AiIcons from "react-icons/ai";
import Icon from "./Icon";
import Pagination from "./Pagination";
import Button from "./Button";
import Input from "./Input";
import {
  AiOutlineCopy,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

interface IconSelectorProps {
  onSelectIcon?: (iconId: string) => void;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "sunset" | "ocean";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  size?: string;
  color?: string;
  border?: boolean;
  borderColor?: string;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const IconSelector: FC<IconSelectorProps> = ({
  onSelectIcon,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  size = "sm",
  color = "",
  border = false,
  borderColor = "border-gray-300",
  searchPlaceholder = "搜索图标...",
  itemsPerPage = 20,
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-125 hover:rotate-12 hover:shadow-neon",
}) => {
  const { theme: currentTheme } = useTheme();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const iconList = Object.keys(AiIcons).map((key) => ({
    id: key,
    component: AiIcons[key as keyof typeof AiIcons],
    label: key,
  }));

  const handleIconClick = (icon: { id: string }) => {
    setSelectedIcon(icon.id);
    if (onSelectIcon) {
      onSelectIcon(icon.id);
    }
    navigator.clipboard.writeText(icon.id);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredIcons = iconList
    .filter((icon) =>
      icon.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.label.localeCompare(b.label);
      } else {
        return b.label.localeCompare(a.label);
      }
    });

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const paginatedIcons = filteredIcons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
    >
      <h3 className="text-lg font-bold mb-4">选择图标</h3>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button onClick={handleSortChange} title="排序">
          {sortOrder === "asc" ? (
            <AiOutlineSortAscending />
          ) : (
            <AiOutlineSortDescending />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {paginatedIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex justify-center items-center relative"
          >
            <Icon
              icon={icon.component}
              onClick={() => handleIconClick(icon)}
              tooltip={icon.label}
              size={size}
              color={selectedIcon === icon.id ? activeColor : color}
              theme={theme as ThemeKeys}
              animation={animation}
              borderWidth={selectedIcon === icon.id ? "4" : borderWidth}
              border={border}
              borderColor={borderColor}
              hoverColor={hoverColor}
              disabled={disabled}
              disabledColor={disabledColor}
              hoverAnimation={hoverAnimation}
            />
            <AiOutlineCopy
              className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(icon.id)}
              title="复制图标 ID"
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        theme={theme as ThemeKeys}
        tooltip={tooltip}
        borderWidth={borderWidth}
        animation={animation}
      />
    </div>
  );
};

export default IconSelector;
