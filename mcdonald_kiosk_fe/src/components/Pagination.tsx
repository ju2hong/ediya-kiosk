import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className='flex items-center justify-center mt-8'>
            {[...Array(totalPages).keys()].map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`px-4 py-2 font-bold text-white ${
                        currentPage === pageNumber
                            ? 'bg-green-600'
                            : 'bg-slate-400'
                    } rounded hover:bg-lime-500 focus:outline-none mx-1`}
                >
                    {pageNumber + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
