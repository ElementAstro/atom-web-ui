import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Button from "../components/Button"; // 使用项目中的 Button 组件
import Input from "../components/Input"; // 使用项目中的 Input 组件
import Select from "../components/Select"; // 使用项目中的 Select 组件

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: string;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dueDate, setDueDate] = useState(""); // 新增：到期日
  const [priority, setPriority] = useState("medium"); // 新增：优先级

  // 从本地存储加载任务
  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Todo[];
    setTodos(storedTodos);
  }, []);

  // 保存任务到本地存储
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim().length === 0) return;

    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      dueDate,
      priority,
    };
    setTodos([newTask, ...todos]);
    setNewTodo("");
    setDueDate("");
    setPriority("medium");
  };

  const editTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTodoId(id);
      setEditTodoText(todoToEdit.text);
      setDueDate(todoToEdit.dueDate);
      setPriority(todoToEdit.priority);
    }
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId
          ? { ...todo, text: editTodoText, dueDate, priority }
          : todo
      )
    );
    setEditTodoId(null);
    setEditTodoText("");
    setDueDate("");
    setPriority("medium");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const completionRate = totalCount
    ? ((completedCount / totalCount) * 100).toFixed(2)
    : 0;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          TODO 管理
        </h1>
        <div className="text-center text-sm text-gray-600">
          完成率: {completionRate}% ({completedCount}/{totalCount})
        </div>

        <div className="flex mt-4 space-x-2">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            customClass="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="添加新的任务"
          />
          <Button
            onClick={addTodo}
            customClass="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPlus />
          </Button>
        </div>

        {/* 新增：优先级选择 */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            优先级:
          </label>
          <Select
            value={priority}
            onChange={(value: string | string[]) =>
              setPriority(value as string)
            }
            customStyles="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            options={[
              { value: "low", label: "低" },
              { value: "medium", label: "中" },
              { value: "high", label: "高" },
            ]}
          />
        </div>

        {/* 新增：到期日 */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            到期日:
          </label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            customClass="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <Button
            onClick={() => setFilter("all")}
            customClass={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            全部
          </Button>
          <Button
            onClick={() => setFilter("active")}
            customClass={`px-3 py-1 rounded ${
              filter === "active" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            未完成
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            customClass={`px-3 py-1 rounded ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            已完成
          </Button>
        </div>

        <ul className="mt-6 space-y-2">
          {filteredTodos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-2 bg-gray-100 rounded shadow"
            >
              <div
                className={`flex-1 ml-2 cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}{" "}
                {todo.dueDate && (
                  <span className="text-xs text-gray-400">
                    （到期：{todo.dueDate}）
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => editTodo(todo.id)}
                  customClass="p-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  customClass="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <FaTrash />
                </Button>
              </div>
            </motion.li>
          ))}
        </ul>

        {editTodoId && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">编辑任务</h2>
            <Input
              type="text"
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
              customClass="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="编辑任务"
            />
            <Button
              onClick={updateTodo}
              customClass="mt-2 w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              更新任务
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
