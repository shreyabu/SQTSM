import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 mx-1 border rounded ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
