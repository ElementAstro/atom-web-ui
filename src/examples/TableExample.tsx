import React from "react";
import Table from "../components/Table";

const TableExample: React.FC = () => {
  const data = [
    { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
    { id: 3, name: "Sam Johnson", age: 45, email: "sam@example.com" },
  ];

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "age" },
    { Header: "Email", accessor: "email" },
  ];

  const handleSortChange = (sortConfig: { key: string; direction: string }) => {
    console.log("Sort changed:", sortConfig);
  };

  const handleSearchChange = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  const handleRowSelect = (row: any) => {
    console.log("Row selected:", row);
  };

  const handleRowDelete = (row: any) => {
    console.log("Row deleted:", row);
  };

  const handleRowEdit = (row: any) => {
    console.log("Row edited:", row);
  };

  const handleRowsDelete = (rows: any[]) => {
    console.log("Rows deleted:", rows);
  };

  const handleRowsMove = (rows: any[], direction: string) => {
    console.log("Rows moved:", rows, direction);
  };

  const handleRowAdd = (row: any) => {
    console.log("Row added:", row);
  };

  return (
    <div className="p-4">
      <Table
        data={data}
        columns={columns}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        onRowSelect={handleRowSelect}
        onRowDelete={handleRowDelete}
        onRowEdit={handleRowEdit}
        onRowsDelete={handleRowsDelete}
        onRowsMove={handleRowsMove}
        onRowAdd={handleRowAdd}
        theme="light"
        tooltip="Table actions"
        borderWidth="2"
        icon={null}
        fullscreen={false}
      />
    </div>
  );
};

export default TableExample;
