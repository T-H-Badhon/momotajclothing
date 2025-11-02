import Link from 'next/link';
import { LuChevronLeftCircle } from 'react-icons/lu';
import BlogCategory from 'src/modules/blog/category.model';
import connectMongo from 'src/utils/connect-mongo';
// import PaginationServer from "@/components/common/pagination/PaginationServer";
import AddCategoryModal from 'src/components/dashboard/blog/category/AddModal';
import DeleteModal from 'src/components/dashboard/blog/category/DeleteModal';
import UpdateCategoryModal from 'src/components/dashboard/blog/category/UpdateModal';
import DashboardPageWrapper from 'src/components/dashboard/common/DashboardPageWrapper';

const ITEMS_PERPAGE = 10;

export default async function BlogCategories({
    searchParams,
}: {
    searchParams: { page: number };
}) {
    await connectMongo();

    const page = searchParams?.page * 1 || 1;
    const totalArticles = await BlogCategory.countDocuments();
    const pageCount = Math.ceil(totalArticles / ITEMS_PERPAGE);
    const categories = await BlogCategory.find()
        .skip(ITEMS_PERPAGE * (page - 1))
        .limit(ITEMS_PERPAGE)
        .sort('-createdAt');

    return (
        <>
            <DashboardPageWrapper>
                <div className="pb-4">
                    <Link href="/dashboard/news">
                        <button className="flex items-center gap-2 text-slate-700">
                            <LuChevronLeftCircle />
                            <h1>Back to News</h1>
                        </button>
                    </Link>
                </div>

                <div className="bg-gray-100 text-sm text-zinc-800">
                    <div className="mb-6 flex flex-col rounded-lg bg-white">
                        {/* header */}
                        <div className="flex items-center justify-between gap-1 rounded-tl rounded-tr border-b-2 border-solid border-b-zinc-100 px-5 py-4 font-medium">
                            <div className="text-base font-bold">
                                Categories
                            </div>
                            <div className="flex flex-wrap justify-end gap-2">
                                <AddCategoryModal />
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-full border-collapse overflow-y-visible rounded-lg border-2 border-solid border-gray-100">
                                    <colgroup>
                                        <col style={{ width: '5%' }} />
                                        <col style={{ width: '50%' }} />
                                        <col style={{ width: '30%' }} />
                                        <col style={{ width: '15%' }} />
                                    </colgroup>

                                    <thead className="">
                                        <tr className="border-2 border-solid border-gray-100">
                                            <th className="p-3 align-middle text-blue-600">
                                                <input
                                                    className="inline-block h-3.5 w-3.5 rounded border-2 border-solid border-violet-100 align-middle"
                                                    defaultValue=""
                                                    type="checkbox"
                                                />
                                            </th>
                                            <th className="min-w-[12.50rem] border-l-2 border-solid border-gray-100 p-3 text-start align-middle font-semibold">
                                                Category
                                            </th>
                                            <th className="min-w-[12.50rem] border-l-2 border-solid border-gray-100 p-3 text-start align-middle font-semibold">
                                                Created At
                                            </th>
                                            <th className="border-l-2 border-solid border-gray-100 p-3 text-start align-middle font-semibold">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {categories?.map((category: any) => (
                                            <tr
                                                key={category?._id.toString()}
                                                className="border-2 border-solid border-gray-100"
                                            >
                                                <th className="p-3 align-middle text-blue-600">
                                                    <input
                                                        className="inline-block h-3.5 w-3.5 rounded border-2 border-solid border-violet-100 align-middle"
                                                        defaultValue=""
                                                        type="checkbox"
                                                    />
                                                </th>
                                                <td className="border-l-2 border-solid border-gray-100 p-3 align-middle font-medium">
                                                    {category?.name}
                                                </td>

                                                <td className="border-l-2 border-solid border-gray-100 p-3 align-middle font-medium">
                                                    {new Date(
                                                        category?.createdAt,
                                                    ).toDateString()}
                                                </td>

                                                <td className="border-collapse border-l-2 border-solid border-gray-100 p-3 text-zinc-800">
                                                    <div className="flex items-center gap-2">
                                                        <UpdateCategoryModal
                                                            categoryStr={JSON.stringify(
                                                                category,
                                                            )}
                                                        />
                                                        <DeleteModal
                                                            id={category?._id}
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
                        <div className="rounded-bl rounded-br border-t-2 border-solid border-gray-100 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    Showing {categories?.length} Entries <i />
                                </div>
                                {/* <PaginationServer pageCount={pageCount} activePage={page} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardPageWrapper>
        </>
    );
}
