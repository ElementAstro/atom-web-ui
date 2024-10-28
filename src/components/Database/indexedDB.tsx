import React, { useEffect, useState } from "react";
import {
  addData,
  getAllData,
  searchData,
  updateData,
  deleteData,
  recoverData,
  exportData,
  importData,
} from "../../database/indexedDBService";
import Modal from "../Modal"; // 导入项目中的 Modal 组件
import Button from "../Button"; // 导入项目中的 Button 组件
import Input from "../Input"; // 导入项目中的 Input 组件
import Textarea from "../Textarea"; // 导入项目中的 Textarea 组件
import { useTheme } from "../../context/ThemeContext"; // 导入主题上下文

interface Data {
  id?: number;
  name: string;
  [key: string]: any;
}

const IndexedDBManager: React.FC = () => {
  const { theme } = useTheme() as {
    theme:
      | "light"
      | "dark"
      | "astronomy"
      | "eyeCare"
      | "sunset"
      | "ocean"
      | "forest"
      | "astronomyDarkRed"
      | undefined;
  }; // 使用主题上下文
  const [data, setData] = useState<Data[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [importJSON, setImportJSON] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [deletedItems, setDeletedItems] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const result = await getAllData();
      setData(result);
      setDeletedItems([]); // Reset deleted items
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleAddData = async () => {
    try {
      await addData({ name: inputValue });
      setInputValue("");
      fetchAllData(); // 刷新数据
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleUpdateData = async () => {
    try {
      if (editId !== null) {
        await updateData(editId, { name: inputValue });
        setInputValue("");
        setEditId(null);
        fetchAllData(); // 刷新数据
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleDeleteData = async (id: number, item: Data) => {
    try {
      await deleteData(id);
      setDeletedItems((prev) => [...prev, item]); // 保存删除的项目
      fetchAllData(); // 刷新数据
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleRecoverData = async (item: Data) => {
    try {
      await recoverData(item);
      setDeletedItems((prev) => prev.filter((i) => i.id !== item.id)); // 移除恢复的项目
      fetchAllData(); // 刷新数据
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExportData = async () => {
    try {
      const dataToExport = await exportData();
      const blob = new Blob([dataToExport], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleImportData = async () => {
    try {
      await importData(importJSON);
      setImportJSON("");
      fetchAllData(); // 刷新数据
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleSearch = async () => {
    if (query.trim() === "") {
      fetchAllData();
    } else {
      const filteredData = await searchData(query);
      setData(filteredData);
    }
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`max-w-xl mx-auto p-5 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-semibold mb-4">IndexedDB 数据管理</h1>

      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="输入数据"
        customClass="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <Button
        onClick={editId ? handleUpdateData : handleAddData}
        customClass="bg-blue-500 text-white rounded-md p-2 mb-2 w-full hover:bg-blue-600"
      >
        {editId ? "更新数据" : "添加数据"}
      </Button>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索数据"
        customClass="border border-gray-300 rounded-md p-2 mb-2 w-full"
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button
        onClick={handleSearch}
        customClass="bg-green-500 text-white rounded-md p-2 mb-2 w-full hover:bg-green-600"
      >
        搜索
      </Button>

      <Button
        onClick={handleSort}
        customClass="bg-purple-500 text-white rounded-md p-2 mb-2 w-full hover:bg-purple-600"
      >
        排序 {sortOrder === "asc" ? "⬆️" : "⬇️"}
      </Button>

      <Button
        onClick={handleExportData}
        customClass="bg-yellow-500 text-white rounded-md p-2 mb-2 w-full hover:bg-yellow-600"
      >
        导出数据
      </Button>

      <Textarea
        value={importJSON}
        onChange={(e) => setImportJSON(e.target.value)}
        placeholder="粘贴JSON数据"
        customClass="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <Button
        onClick={handleImportData}
        customClass="bg-indigo-500 text-white rounded-md p-2 w-full mb-2 hover:bg-indigo-600"
      >
        导入数据
      </Button>

      <h2 className="text-xl font-semibold mt-4">数据列表</h2>
      <ul className="divide-y divide-gray-200">
        {paginatedData.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <span>{item.name}</span>
            <div>
              <Button
                onClick={() => {
                  setEditId(item.id ?? null);
                  setInputValue(item.name);
                }}
                customClass="bg-yellow-300 text-white rounded-md px-2 py-1 hover:bg-yellow-400 mr-2"
              >
                编辑
              </Button>
              <Button
                onClick={() => handleDeleteData(item.id!, item)}
                customClass="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
              >
                删除
              </Button>
              <Button
                onClick={() =>
                  openModal(
                    <div>
                      <h2 className="text-xl font-semibold">详细信息</h2>
                      <p>ID: {item.id}</p>
                      <p>名称: {item.name}</p>
                      {/* Add more fields as needed */}
                    </div>
                  )
                }
                customClass="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 ml-2"
              >
                查看
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          customClass="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
        >
          上一页
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= data.length}
          customClass="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
        >
          下一页
        </Button>
      </div>

      {deletedItems.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">已删除项目</h2>
          <ul className="divide-y divide-gray-200">
            {deletedItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <span>{item.name}</span>
                <Button
                  onClick={() => handleRecoverData(item)}
                  customClass="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600"
                >
                  恢复
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        theme={theme}
        header="Modal Header"
        tooltip="Close Modal"
        borderWidth="2"
        icon={<span>✖️</span>}
        fullscreen={false}
        autoClose={false}
        ariaLabel="错误模态框"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default IndexedDBManager;
