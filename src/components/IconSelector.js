// src/components/IconSelector.js
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext
import * as AiIcons from "react-icons/ai"; // 导入所有 Ai 图标
import Icon from "./Icon"; // 导入现有的 Icon 组件
import Pagination from "./Pagination"; // 导入自主实现的分页组件

const IconSelector = ({
  onSelectIcon, // 当用户选择图标时的回调函数
  theme, // 主题
  tooltip = "", // 工具提示
  borderWidth = "2", // 边框宽度
  animation = "transform transition-transform duration-300 ease-in-out", // 动画效果
  size = "lg", // 图标大小
  color = "", // 图标颜色
  border = false, // 边框可选
  borderColor = "border-gray-300", // 边框颜色
  searchPlaceholder = "搜索图标...", // 搜索框占位符
  itemsPerPage = 20, // 每页显示的图标数量
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const [selectedIcon, setSelectedIcon] = useState(null); // 保存当前选择的图标
  const [searchTerm, setSearchTerm] = useState(""); // 搜索框输入值
  const [currentPage, setCurrentPage] = useState(1); // 当前页码

  // 可用的图标列表
  const iconList = Object.keys(AiIcons).map((key) => ({
    id: key,
    component: AiIcons[key],
    label: key,
  }));

  // 处理图标点击
  const handleIconClick = (icon) => {
    setSelectedIcon(icon.id); // 更新选中的图标
    if (onSelectIcon) {
      onSelectIcon(icon.id); // 回调函数，通知父组件选择了哪个图标
    }
  };

  // 处理搜索输入
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 搜索时重置页码
  };

  // 过滤后的图标列表
  const filteredIcons = iconList.filter((icon) =>
    icon.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页处理
  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const paginatedIcons = filteredIcons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500", // 新增主题
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500", // 新增主题
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        themeClasses[theme || currentTheme]
      }`}
    >
      <h3 className="text-lg font-bold mb-4">选择图标</h3>
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full mb-4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-5 gap-2">
        {paginatedIcons.map((icon) => (
          <div key={icon.id} className="flex justify-center items-center">
            <Icon
              icon={icon.component}
              onClick={() => handleIconClick(icon)}
              tooltip={icon.label}
              size={size}
              color={selectedIcon === icon.id ? "red" : color} // 选中时改变颜色
              theme={theme}
              animation={animation}
              borderWidth={selectedIcon === icon.id ? "4" : borderWidth} // 选中时加粗边框
              border={border}
              borderColor={borderColor}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        theme={theme}
        tooltip={tooltip}
        borderWidth={borderWidth}
        animation={animation}
      />
    </div>
  );
};

export default IconSelector;
