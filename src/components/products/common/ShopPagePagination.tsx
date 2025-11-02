'use client';

import 'src/styles/pagination.css';

import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import ReactPaginate from 'react-paginate';
import useCreateQuery from 'src/hooks/useCreateQuery';

export default function ShopPagePagination({
    page,
    totalPage,
}: {
    page: string;
    totalPage: string;
}) {
    const createQuery = useCreateQuery();

    return (
        <ReactPaginate
            className="pagination"
            forcePage={Number(page) - 1}
            pageCount={Number(totalPage)}
            breakLabel="..."
            marginPagesDisplayed={1}
            pageRangeDisplayed={0}
            nextLabel={
                <button className="rounded bg-bodyText px-3 py-2">
                    <GoChevronRight className="size-4 text-body" />
                </button>
            }
            previousLabel={
                <button className="rounded bg-bodyText px-3 py-2">
                    <GoChevronLeft className="size-4 text-body" />
                </button>
            }
            onPageChange={({ selected }: any) =>
                createQuery('page', `${selected + 1}`)
            }
        />
    );
}
