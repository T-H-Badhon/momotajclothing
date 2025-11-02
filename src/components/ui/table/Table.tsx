'use client';

import React, { useEffect, useState } from 'react';
import AddButton from '../buttons/Add';
import DeleteButton from '../buttons/Delete';
import SortButton from '../buttons/Sort';
import UpdateButton from '../buttons/Update';
import Pagination from '../pagination/Pagination';

interface TableColumn {
    DataSearchKey: string;
    header: string;
}

interface CommonTableProps {
    tableName: string;
    columns: TableColumn[];
    data: any[];
    sortOptionsArray: { label: string; value: number }[];
    columnWidths: string[];
    searchBy?: string;
    viewOption?: boolean;
    updateOption?: boolean;
    deleteOption?: boolean;
    actionButtons?: boolean;
}

const CommonTable: React.FC<CommonTableProps> = ({
    tableName,
    columns,
    data,
    sortOptionsArray,
    columnWidths,
    searchBy = 'name',
    viewOption = false,
    updateOption = false,
    deleteOption = false,
    actionButtons = false,
}) => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let filteredData = data.filter((dataItem: any) => {
                    const itemValue = dataItem[searchBy]?.toLowerCase() ?? '';
                    const searchTermLower = searchTerm?.toLowerCase();
                    return itemValue.includes(searchTermLower);
                });

                if (filteredData.length === 0 && searchTerm !== '') {
                    filteredData = data; // fallback to original data if no items match the filter
                }

                const start = offset;
                const end = start + perPage;
                const paginatedItems = filteredData.slice(start, end);
                setDataList(paginatedItems);
                setPageCount(Math.ceil(filteredData.length / perPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [offset, perPage, searchTerm, data, searchBy]);

    const handlePageClick = (selectedPage: number) => {
        setOffset(selectedPage * perPage);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="mb-6 flex flex-col rounded-lg border bg-white text-sm text-zinc-800">
            <div className="flex items-start justify-between gap-1 rounded-tl rounded-tr border-b px-5 py-4 font-medium md:items-center">
                <div className="text-md font-medium">{tableName}</div>
                <div className="flex flex-wrap justify-end gap-2">
                    <AddButton name={tableName} />
                    <SortButton
                        options={sortOptionsArray}
                        onSelectOption={handlePerPageChange}
                    />
                </div>
            </div>

            <div className="p-5">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-full border-collapse overflow-y-visible rounded-lg border">
                        <colgroup>
                            {columnWidths.map((width, index) => (
                                <col key={index} style={{ width: width }} />
                            ))}
                        </colgroup>
                        <thead>
                            <tr className="border">
                                {columns.map((column) => (
                                    <th
                                        key={column.header}
                                        className="border-l p-3 text-start align-middle font-semibold"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                                {actionButtons && (
                                    <th className="border-l p-3 text-start align-middle font-semibold">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {dataList.map((item) => (
                                <tr key={item._id} className="border">
                                    {columns.map((column) => (
                                        <td
                                            key={`${column.DataSearchKey ?? 'custom'}-${item._id}`}
                                            className="border-l p-3 align-middle font-medium"
                                        >
                                            {item[column.DataSearchKey]}
                                        </td>
                                    ))}

                                    {actionButtons && (
                                        <td className="border-collapse border-l p-3 text-zinc-800">
                                            <div className="flex items-center gap-2">
                                                {updateOption && (
                                                    <UpdateButton
                                                        itemData={item}
                                                        name={tableName}
                                                    />
                                                )}

                                                {deleteOption && (
                                                    <DeleteButton
                                                        itemData={item}
                                                        name={tableName}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-bl rounded-br border-t px-5 py-4">
                <div className="flex items-center justify-between">
                    <div>Showing {dataList.length} Entries</div>
                    <Pagination
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommonTable;
