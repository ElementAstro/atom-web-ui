// src/components/Table.js
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineDrag } from "react-icons/ai";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Table = ({
  data,
  columns,
  onSortChange,
  onSearchChange,
  onRowSelect,
  onRowDelete,
  onRowEdit,
  onRowsDelete,
  onRowsMove,
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState(data);
  const tableRef = useRef(null);

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

  const requestSort = (key) => {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((r) => r !== row)
        : [...prevSelectedRows, row]
    );
    if (onRowSelect) onRowSelect(row);
  };

  const handleRowDelete = (row) => {
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

  const handleRowEdit = (row) => {
    if (onRowEdit) onRowEdit(row);
  };

  const handleRowsMove = (direction) => {
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

  const moveRow = (dragIndex, hoverIndex) => {
    const newData = [...tableData];
    const [draggedRow] = newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, draggedRow);
    setTableData(newData);
  };

  const Row = ({ row, index }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "row",
      hover(item) {
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
        {columns.map((col) => (
          <td key={col.accessor} className="border px-4 py-2">
            {row[col.accessor]}
          </td>
        ))}
        <td className="border px-4 py-2 flex space-x-2">
          <button
            onClick={() => handleRowEdit(row)}
            className="text-yellow-500 hover:text-yellow-300 transition duration-300"
          >
            <AiOutlineEdit />
          </button>
          <button
            onClick={() => handleRowDelete(row)}
            className="text-red-500 hover:text-red-300 transition duration-300"
          >
            <AiOutlineDelete />
          </button>
          <button className="text-gray-500 hover:text-gray-300 transition duration-300 cursor-move">
            <AiOutlineDrag />
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg bg-gray-900 text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <div>
            <button
              onClick={handleRowsDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 mr-2"
            >
              删除选中行
            </button>
            <button
              onClick={() => handleRowsMove("up")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 mr-2"
            >
              上移
            </button>
            <button
              onClick={() => handleRowsMove("down")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              下移
            </button>
          </div>
        </div>
        <table
          ref={tableRef}
          className="min-w-full border-collapse bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden"
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
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="border px-4 py-2 cursor-pointer hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                  onClick={() => requestSort(col.accessor)}
                >
                  {col.Header}
                  {sortConfig && sortConfig.key === col.accessor && (
                    <span>
                      {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              ))}
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedData
              .filter((row) =>
                columns.some((col) =>
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
      </div>
    </DndProvider>
  );
};

export default Table;
