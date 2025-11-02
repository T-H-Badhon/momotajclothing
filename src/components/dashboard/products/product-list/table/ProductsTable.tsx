import Image from 'next/image';
import { GetAllProducts } from 'src/components/actions/actionProducts';
import AddButton from 'src/components/ui/buttons/Add';
import DeleteButton from 'src/components/ui/buttons/Delete';
import UpdateButton from 'src/components/ui/buttons/Update';
import PaginationServer from 'src/components/ui/pagination/PaginationServer';
import { ProductData } from 'src/types';

const ProductsTable = async ({ pageCount }: { pageCount: number }) => {
    const page = pageCount ? pageCount : '1';
    const productsList: ProductData[] = await GetAllProducts();

    const totalPage = Math.ceil(productsList?.length / 10).toString();

    const columns = [
        { DataSearchKey: 'images', header: 'Images' },
        { DataSearchKey: 'name', header: 'Product name' },
        { DataSearchKey: 'category', header: 'Category' },
        { DataSearchKey: 'sub_category', header: 'Sub-Category' },
        { DataSearchKey: 'price', header: 'Price' },
    ];

    const columnWidths = ['10%', '30%', '25%', '25%', '10%', '5%'];

    return (
        <div className="bg-gray-100 text-sm text-zinc-800">
            <div className="mb-6 flex flex-col rounded-lg border bg-white">
                {/* header */}
                <div className="flex items-center justify-between gap-1 rounded-tl rounded-tr border-b border-solid px-5 py-4 font-medium">
                    <div className="text-base font-bold">Products</div>

                    <div className="flex flex-wrap justify-end gap-2">
                        <AddButton name="Product" />
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

                                    <th className="border-l p-3 text-start align-middle font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {productsList
                                    ?.slice(
                                        (Number(page) - 1) * Number(10),
                                        Number(page) * Number(10),
                                    )
                                    .map((item, index) => (
                                        <tr key={index} className="border">
                                            <td className="border-l p-3 align-middle font-medium">
                                                <div className="grid grid-cols-3 gap-1">
                                                    {item?.images?.map(
                                                        (im, index) => (
                                                            <Image
                                                                key={index}
                                                                src={
                                                                    process.env
                                                                        .NEXT_PUBLIC_MEDIA +
                                                                    im
                                                                }
                                                                width={300}
                                                                height={300}
                                                                className="aspect-square h-full w-full"
                                                                alt="product image"
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </td>
                                            <td className="border-l p-3 align-middle font-medium">
                                                {item?.name}
                                            </td>
                                            <td className="border-l p-3 align-middle font-medium">
                                                {item?.category || ''}
                                            </td>
                                            <td className="border-l p-3 align-middle font-medium">
                                                {
                                                    item?.sub_category
                                                        ?.sub_category
                                                }
                                            </td>
                                            <td className="border-l p-3 align-middle font-medium">
                                                ${item?.price}
                                            </td>

                                            <td className="border-collapse border-l p-3 text-zinc-800">
                                                <div className="flex items-center gap-2">
                                                    <DeleteButton
                                                        itemData={item}
                                                        name="product"
                                                    />
                                                    <UpdateButton
                                                        itemData={item}
                                                        name="product"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="rounded-bl rounded-br border-t px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            Showing {productsList?.length} Entries <i />
                        </div>
                        <PaginationServer
                            pageCount={Number(totalPage)}
                            activePage={Number(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsTable;
