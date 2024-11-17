import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => handlePageChange(currentPage - 1)} className="p-2 bg-gray-300 rounded">Prev</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} className="p-2 bg-gray-300 rounded">Next</button>
        </div>
    );
};

export default Pagination;
