import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex justify-between items-center my-4">
            <button onClick={handlePrev} disabled={currentPage === 1} className="p-2 bg-blue-500 text-white rounded-md">
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="p-2 bg-blue-500 text-white rounded-md">
                Next
            </button>
        </div>
    );
};

export default Pagination;
