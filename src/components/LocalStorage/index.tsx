import React, { useState, useEffect, ChangeEvent } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ItemList from "./ItemList";
import ItemForm from "./ItemForm";
import { useTheme } from "../../context/ThemeContext";
import Button from "../Button"; // 使用项目中的 Button 组件
import Input from "../Input"; // 使用项目中的 Input 组件

interface Item {
  text: string;
  priority: string;
}

const LocalStorage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [priority, setPriority] = useState<string>("普通");
  const [items, setItems] = useState<Item[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedItems = JSON.parse(
      localStorage.getItem("items") || "[]"
    ) as Item[];
    setItems(storedItems);
  }, []);

  const handleSubmit = () => {
    if (inputValue) {
      let newItems: Item[];
      const newItem: Item = { text: inputValue, priority: priority };

      if (editIndex !== null) {
        newItems = items.map((item, index) =>
          index === editIndex ? newItem : item
        );
        setEditIndex(null);
      } else {
        newItems = [...items, newItem];
      }

      setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
      setInputValue("");
      setPriority("普通");
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const clearItems = () => {
    setItems([]);
    localStorage.removeItem("items");
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);
    localStorage.setItem("items", JSON.stringify(reorderedItems));
  };

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`container mx-auto p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">LocalStorage 示例</h1>
      <Button
        onClick={toggleTheme}
        customClass="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        切换主题
      </Button>

      <ItemForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        priority={priority}
        setPriority={setPriority}
        handleSubmit={handleSubmit}
        editIndex={editIndex}
      />

      <Input
        type="text"
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        customClass="border border-gray-300 p-2 rounded mb-4 w-full"
        placeholder="搜索项目..."
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <ItemList
          items={filteredItems}
          onEdit={(index: number) => {
            setInputValue(filteredItems[index].text);
            setPriority(filteredItems[index].priority);
            setEditIndex(index);
          }}
          onRemove={removeItem}
        />
      </DragDropContext>

      <div className="my-4">
        <Button
          onClick={clearItems}
          customClass="bg-gray-400 text-white px-4 rounded mr-2"
        >
          清空所有
        </Button>
      </div>
      <div>
        <p>当前条目数量: {items.length}</p>
      </div>
    </div>
  );
};

export default LocalStorage;
