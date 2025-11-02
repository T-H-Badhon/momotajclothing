'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';
import useCreateQuery from 'src/hooks/useCreateQuery';

interface PaginationProps {
    pageCount: number;
    activePage: number;
}

const PaginationServer: React.FC<PaginationProps> = ({
    pageCount,
    activePage,
}) => {
    const setQuery = useCreateQuery();

    return (
        <ReactPaginate
            previousLabel={
                <span
                    className={`${activePage === 1 && '!cursor-not-allowed'} mr-1 inline-block cursor-pointer rounded border px-3 py-1.5 text-sm font-medium text-zinc-400`}
                >
                    Previous
                </span>
            }
            nextLabel={
                <span
                    className={`${activePage === pageCount && '!cursor-not-allowed'} ml-1 inline-block cursor-pointer rounded border px-3 py-1.5 text-sm font-medium text-zinc-400`}
                >
                    Next
                </span>
            }
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            forcePage={Number(activePage) - 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected = 0 }) =>
                setQuery('page', (selected + 1)?.toString())
            }
            containerClassName={'pagination flex'}
            activeClassName={'active bg-[#5BA497] text-white rounded-lg'}
            pageClassName={'flex items-center gap-2'}
            pageLinkClassName={`py-1.5 px-3`}
        />
    );
};

export default PaginationServer;
