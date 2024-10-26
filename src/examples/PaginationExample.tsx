import React, { useState } from "react";
import Pagination from "../components/Pagination";

const PaginationExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  const handlePageHover = (page: number) => {
    console.log("Hovered over page:", page);
  };

  const handleDoubleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button double-clicked:", event);
  };

  const handleDoubleClickInput = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log("Input double-clicked:", event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
    console.log("Key down:", event);
  };

  return (
    <div className="p-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageHover={handlePageHover}
        customClass="my-custom-pagination"
        customButtonClass="my-custom-button"
        customInputClass="my-custom-input"
        theme="light"
        tooltip="Navigate pages"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={<span>🔗</span>}
        iconPosition="left"
        showPageNumbers={true}
        compact={false}
        onDoubleClickButton={handleDoubleClickButton}
        onDoubleClickInput={handleDoubleClickInput}
        onKeyDown={handleKeyDown}
        ariaLabel="示例分页"
        maxPageNumbersToShow={5}
      />
    </div>
  );
};

export default PaginationExample;