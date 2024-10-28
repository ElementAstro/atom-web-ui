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

interface Data {
  id?: number;
  name: string;
  [key: string]: any;
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [importJSON, setImportJSON] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [deletedItems, setDeletedItems] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

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

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">IndexedDB 数据管理</h1>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="输入数据"
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <button
        onClick={editId ? handleUpdateData : handleAddData}
        className="bg-blue-500 text-white rounded-md p-2 mb-2 w-full hover:bg-blue-600"
      >
        {editId ? "更新数据" : "添加数据"}
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索数据"
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white rounded-md p-2 mb-2 w-full hover:bg-green-600"
      >
        搜索
      </button>

      <button
        onClick={handleExportData}
        className="bg-yellow-500 text-white rounded-md p-2 mb-2 w-full hover:bg-yellow-600"
      >
        导出数据
      </button>

      <textarea
        value={importJSON}
        onChange={(e) => setImportJSON(e.target.value)}
        placeholder="粘贴JSON数据"
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />
      <button
        onClick={handleImportData}
        className="bg-indigo-500 text-white rounded-md p-2 w-full mb-2 hover:bg-indigo-600"
      >
        导入数据
      </button>

      <h2 className="text-xl font-semibold mt-4">数据列表</h2>
      <ul className="divide-y divide-gray-200">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => {
                  setEditId(item.id ?? null);
                  setInputValue(item.name);
                }}
                className="bg-yellow-300 text-white rounded-md px-2 py-1 hover:bg-yellow-400 mr-2"
              >
                编辑
              </button>
              <button
                onClick={() => handleDeleteData(item.id!, item)}
                className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
              >
                删除
              </button>
            </div>
          </li>
        ))}
      </ul>

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
                <button
                  onClick={() => handleRecoverData(item)}
                  className="bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600"
                >
                  恢复
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        theme="light"
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

export default MyComponent;
