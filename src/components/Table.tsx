// src/components/Table.tsx
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineDrag,
  AiOutlinePlus,
} from "react-icons/ai";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CSVLink } from "react-csv";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface Column {
  Header: string;
  accessor: string;
}

interface TableProps {
  data: any[];
  columns: Column[];
  onSortChange?: (sortConfig: { key: string; direction: string }) => void;
  onSearchChange?: (searchTerm: string) => void;
  onRowSelect?: (row: any) => void;
  onRowDelete?: (row: any) => void;
  onRowEdit?: (row: any) => void;
  onRowsDelete?: (rows: any[]) => void;
  onRowsMove?: (rows: any[], direction: string) => void;
  onRowAdd?: (row: any) => void;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  onSortChange,
  onSearchChange,
  onRowSelect,
  onRowDelete,
  onRowEdit,
  onRowsDelete,
  onRowsMove,
  onRowAdd,
  theme,
  tooltip = "",
  borderWidth = "2",
  icon = null,
  fullscreen = false,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const getSortedData = () => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      return [...tableData].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return tableData;
  };

  const sortedData = getSortedData();

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    if (onSortChange) onSortChange({ key, direction });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  const handleRowSelect = (row: any) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((r) => r !== row)
        : [...prevSelectedRows, row]
    );
    if (onRowSelect) onRowSelect(row);
  };

  const handleRowDelete = (row: any) => {
    const newData = tableData.filter((r) => r !== row);
    setTableData(newData);
    if (onRowDelete) onRowDelete(row);
  };

  const handleRowsDelete = () => {
    const newData = tableData.filter((row) => !selectedRows.includes(row));
    setTableData(newData);
    if (onRowsDelete) onRowsDelete(selectedRows);
    setSelectedRows([]);
  };

  const handleRowEdit = (row: any) => {
    if (onRowEdit) onRowEdit(row);
  };

  const handleRowAdd = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.accessor] = "";
      return acc;
    }, {} as any);
    setTableData([...tableData, newRow]);
    if (onRowAdd) onRowAdd(newRow);
  };

  const handleRowsMove = (direction: string) => {
    const newData = [...tableData];
    selectedRows.forEach((row) => {
      const index = newData.indexOf(row);
      if (direction === "up" && index > 0) {
        [newData[index], newData[index - 1]] = [
          newData[index - 1],
          newData[index],
        ];
      } else if (direction === "down" && index < newData.length - 1) {
        [newData[index], newData[index + 1]] = [
          newData[index + 1],
          newData[index],
        ];
      }
    });
    setTableData(newData);
    if (onRowsMove) onRowsMove(selectedRows, direction);
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const newData = [...tableData];
    const [draggedRow] = newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, draggedRow);
    setTableData(newData);
  };

  const Row: React.FC<{ row: any; index: number }> = ({ row, index }) => {
    const ref = useRef<HTMLTableRowElement>(null);
    const [, drop] = useDrop({
      accept: "row",
      hover(item: { index: number }) {
        if (item.index !== index) {
          moveRow(item.index, index);
          item.index = index;
        }
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "row",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drag(drop(ref));

    return (
      <tr
        ref={ref}
        className={`hover:bg-gray-700 transition duration-300 transform hover:scale-105 ${
          index % 2 === 0 ? "bg-gray-800" : ""
        } ${selectedRows.includes(row) ? "bg-blue-500" : ""}`}
        onClick={() => handleRowSelect(row)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <td className="border px-4 py-2">
          <input
            type="checkbox"
            checked={selectedRows.includes(row)}
            onChange={() => handleRowSelect(row)}
          />
        </td>
        {columns.map(
          (col) =>
            !hiddenColumns.includes(col.accessor) && (
              <td key={col.accessor} className="border px-4 py-2">
                {row[col.accessor]}
              </td>
            )
        )}
        <td className="border px-4 py-2 flex space-x-2">
          <button
            onClick={() => handleRowEdit(row)}
            className="text-yellow-500 hover:text-yellow-300 transition duration-300"
            title={tooltip}
          >
            {icon || <AiOutlineEdit />}
          </button>
          <button
            onClick={() => handleRowDelete(row)}
            className="text-red-500 hover:text-red-300 transition duration-300"
            title={tooltip}
          >
            {icon || <AiOutlineDelete />}
          </button>
          <button
            className="text-gray-500 hover:text-gray-300 transition duration-300 cursor-move"
            title={tooltip}
          >
            {icon || <AiOutlineDrag />}
          </button>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    if (tableRef.current) {
      const maxWidth = Math.max(
        ...Array.from(tableRef.current.querySelectorAll("th, td")).map(
          (el) => el.scrollWidth
        )
      );
      tableRef.current.style.width = `${maxWidth + 20}px`; // 根据内容调整宽度
    }
  }, [sortedData, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  const handleColumnToggle = (accessor: string) => {
    setHiddenColumns((prevHiddenColumns) =>
      prevHiddenColumns.includes(accessor)
        ? prevHiddenColumns.filter((col) => col !== accessor)
        : [...prevHiddenColumns, accessor]
    );
  };

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";

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
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`relative overflow-x-auto ${
          fullscreen ? "w-full h-full" : ""
        } ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]}`}
      >
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`p-2 border-${borderWidth} rounded-lg bg-gray-900 text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600`}
          />
          <div>
            <button
              onClick={handleRowsDelete}
              className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 mr-2`}
              title={tooltip}
            >
              删除选中行
            </button>
            <button
              onClick={() => handleRowsMove("up")}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 mr-2`}
              title={tooltip}
            >
              上移
            </button>
            <button
              onClick={() => handleRowsMove("down")}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600`}
              title={tooltip}
            >
              下移
            </button>
            <button
              onClick={handleRowAdd}
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 ml-2`}
              title={tooltip}
            >
              <AiOutlinePlus />
            </button>
            <CSVLink
              data={tableData}
              headers={columns.map((col) => ({
                label: col.Header,
                key: col.accessor,
              }))}
              filename="table_data.csv"
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 ml-2`}
              title={tooltip}
            >
              导出 CSV
            </CSVLink>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            {columns.map((col) => (
              <label key={col.accessor} className="mr-4">
                <input
                  type="checkbox"
                  checked={!hiddenColumns.includes(col.accessor)}
                  onChange={() => handleColumnToggle(col.accessor)}
                  className="mr-2"
                />
                {col.Header}
              </label>
            ))}
          </div>
          <div>
            <label className="mr-2">每页行数:</label>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className={`p-2 border-${borderWidth} rounded-lg bg-gray-900 text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600`}
            >
              {[10, 20, 30, 40, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table
          ref={tableRef}
          className={`min-w-full border-collapse bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden ${
            fullscreen ? "w-full h-full" : ""
          }`}
        >
          <thead>
            <tr>
              <th className="border px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(e.target.checked ? sortedData : [])
                  }
                  checked={selectedRows.length === sortedData.length}
                />
              </th>
              {columns.map(
                (col) =>
                  !hiddenColumns.includes(col.accessor) && (
                    <th
                      key={col.accessor}
                      className={`border px-4 py-2 cursor-pointer hover:bg-blue-600 transition duration-300 transform hover:scale-105`}
                      onClick={() => requestSort(col.accessor)}
                      title={tooltip}
                    >
                      {col.Header}
                      {sortConfig && sortConfig.key === col.accessor && (
                        <span>
                          {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                        </span>
                      )}
                    </th>
                  )
              )}
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData
              .filter((row) =>
                columns.some(
                  (col) =>
                    !hiddenColumns.includes(col.accessor) &&
                    String(row[col.accessor])
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
              )
              .map((row, index) => (
                <Row key={index} row={row} index={index} />
              ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600`}
            title={tooltip}
          >
            上一页
          </button>
          <span className="text-white">
            第 {currentPage} 页，共 {Math.ceil(sortedData.length / rowsPerPage)}{" "}
            页
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(sortedData.length / rowsPerPage)
            }
            className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600`}
            title={tooltip}
          >
            下一页
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Table;
