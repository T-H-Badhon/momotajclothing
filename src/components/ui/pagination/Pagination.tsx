import React, { useState } from 'react';

interface PaginationProps {
    pageCount: number;
    handlePageClick: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    pageCount,
    handlePageClick,
}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
        handlePageClick(selectedItem.selected);
    };

    const getPageNumbers = () => {
        let startPage = Math.max(0, currentPage - 1);
        let endPage = Math.min(startPage + 2, pageCount - 1);

        if (currentPage === 0) {
            startPage = 0;
            endPage = Math.min(2, pageCount - 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pagesToShow = getPageNumbers();

    return (
        <div className="flex items-center justify-center">
            {currentPage > 0 && (
                <span
                    className="mr-1 inline-block cursor-pointer rounded border px-3 py-1.5 text-sm font-medium text-zinc-400"
                    onClick={() =>
                        handlePageChange({ selected: currentPage - 1 })
                    }
                >
                    Previous
                </span>
            )}
            {pagesToShow.map((page) => (
                <span
                    key={page}
                    className={`cursor-pointer px-3 py-1.5 ${
                        currentPage === page
                            ? 'active rounded-lg bg-[#5BA497] text-white'
                            : ''
                    }`}
                    onClick={() => handlePageChange({ selected: page })}
                >
                    {page + 1}
                </span>
            ))}
            {currentPage < pageCount - 1 && (
                <span
                    className="ml-1 inline-block cursor-pointer rounded border px-3 py-1.5 text-sm font-medium text-zinc-400"
                    onClick={() =>
                        handlePageChange({ selected: currentPage + 1 })
                    }
                >
                    Next
                </span>
            )}
        </div>
    );
};

export default Pagination;
