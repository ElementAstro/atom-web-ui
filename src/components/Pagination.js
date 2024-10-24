// src/components/Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, onPageHover }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex space-x-2">
        <li>
          <button
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-1 rounded transition transform duration-300 
                          ${
                            index + 1 === currentPage
                              ? "bg-blue-500 text-white scale-105"
                              : "bg-gray-200 hover:bg-blue-300"
                          }`}
              onClick={() => handlePageChange(index + 1)}
              onMouseEnter={() => onPageHover && onPageHover(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-300 transition duration-300"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
