import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    onPageChange(page);
    navigate(`?page=${page}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
  
    // Always show the first page
    pageNumbers.push(
      <button
        key={1}
        className={`page-number ${1 === currentPage ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );
  
    // Show the second page if totalPages > 2
    if (totalPages > 2) {
      pageNumbers.push(
        <button
          key={2}
          className={`page-number ${2 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
      );
    }
  
    // Add ellipsis if currentPage > 3
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="ellipsis">...</span>
      );
    }
  
    // Add currentPage and currentPage + 1 if they are within valid range
    for (let i = Math.max(3, currentPage); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
  
    // Add ellipsis if currentPage + 1 < totalPages - 1
    if (currentPage + 1 < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis2" className="ellipsis">...</span>
      );
    }
  
    // Always show the last page if totalPages > 1
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          className={`page-number ${totalPages === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
  
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="page-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="page-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };