import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuPenLine } from 'react-icons/lu';
import HandleDelete from 'src/components/dashboard/blog/delete/HandleDelete';
import DashboardPageWrapper from 'src/components/dashboard/common/DashboardPageWrapper';
import AddButton from 'src/components/ui/buttons/Add';
import Article from 'src/modules/blog/article.model';
import BlogCategoryModel from 'src/modules/blog/category.model';
import connectMongo from 'src/utils/connect-mongo';
// import PaginationServer from "@/components/common/pagination/PaginationServer";

const ITEMS_PERPAGE = 10;

const ArticlesTable = async ({
    searchParams,
}: {
    searchParams: { page: number };
}) => {
    await connectMongo();

    const page = searchParams?.page * 1 || 1;
    const totalArticles = await Article.countDocuments();
    const pageCount = Math.ceil(totalArticles / ITEMS_PERPAGE);
    await BlogCategoryModel.find();
    const articles: any = await Article.find()
        .sort('-createdAt')
        .skip(ITEMS_PERPAGE * (page - 1))
        .limit(ITEMS_PERPAGE);

    return (
        <DashboardPageWrapper>
            <div className="bg-gray-100 text-sm text-zinc-800">
                <div className="mb-6 flex flex-col rounded-lg border bg-white">
                    {/* header */}
                    <div className="flex items-center justify-between gap-1 rounded-tl rounded-tr border-b border-solid px-5 py-4 font-medium">
                        <div className="text-base font-bold">News</div>
                        <div className="flex flex-wrap justify-end gap-2">
                            {/* <Link href={'/dashboard/news/category'}>
                                <button
                                    className="bg-[#5BA497] justify-center py-2 px-3  mb-1 rounded flex items-center gap-1 text-xs text-white"
                                >
                                    Categories
                                </button>
                            </Link> */}
                            <Link href="/dashboard/news/new">
                                <AddButton name="Article" />
                            </Link>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-full border-collapse overflow-y-visible rounded-lg border">
                                <colgroup>
                                    <col style={{ width: '5%' }} />
                                    <col style={{ width: '5%' }} />
                                    <col style={{ width: '75%' }} />
                                    {/* <col style={{ width: "35%" }} /> */}
                                    <col style={{ width: '15%' }} />
                                </colgroup>

                                <thead className="">
                                    <tr className="border">
                                        <th className="p-3 align-middle text-blue-600">
                                            <input
                                                className="inline-block h-3.5 w-3.5 rounded border align-middle"
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                        </th>
                                        <th className="min-w-[12.50rem] border-l p-3 text-start align-middle font-semibold">
                                            Cover Image
                                        </th>
                                        <th className="border-l p-3 text-start align-middle font-semibold">
                                            Title
                                        </th>
                                        {/* <th className="border-l text-start font-semibold align-middle   p-3">
                                            Category
                                        </th> */}
                                        <th className="border-l p-3 text-start align-middle font-semibold">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="">
                                    {articles?.map(
                                        (article: {
                                            _id: string;
                                            image: string;
                                            title:
                                                | string
                                                | number
                                                | boolean
                                                | React.ReactElement<
                                                      any,
                                                      | string
                                                      | React.JSXElementConstructor<any>
                                                  >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | Promise<React.AwaitedReactNode>
                                                | null
                                                | undefined;
                                            category: {
                                                name:
                                                    | string
                                                    | number
                                                    | boolean
                                                    | React.ReactElement<
                                                          any,
                                                          | string
                                                          | React.JSXElementConstructor<any>
                                                      >
                                                    | Iterable<React.ReactNode>
                                                    | React.ReactPortal
                                                    | Promise<React.AwaitedReactNode>
                                                    | null
                                                    | undefined;
                                            };
                                        }) => (
                                            <tr
                                                key={article?._id.toString()}
                                                className="border"
                                            >
                                                <th className="p-3 align-middle text-blue-600">
                                                    <input
                                                        className="inline-block h-3.5 w-3.5 rounded border align-middle"
                                                        defaultValue=""
                                                        type="checkbox"
                                                    />
                                                </th>
                                                <td className="border-l p-3 align-middle font-medium">
                                                    <div className="flex items-center">
                                                        <Image
                                                            width={100}
                                                            height={60}
                                                            className="h-10 w-16"
                                                            src={
                                                                process.env
                                                                    .NEXT_PUBLIC_MEDIA +
                                                                article.image
                                                            }
                                                            alt="Customer Avatar"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="border-l p-3 align-middle font-medium">
                                                    {article?.title}
                                                </td>
                                                {/* <td className="border-l font-medium align-middle p-3">
                                                {article?.category?.name}
                                            </td> */}

                                                <td className="border-collapse border-l p-3 text-zinc-800">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={
                                                                '/dashboard/news/update/' +
                                                                article?._id
                                                            }
                                                        >
                                                            <button className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded bg-emerald-400/[0.1] px-3 py-2 text-emerald-400">
                                                                <LuPenLine />
                                                            </button>
                                                        </Link>
                                                        <HandleDelete
                                                            id={article?._id}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="rounded-bl rounded-br border-t px-5 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                Showing {articles?.length} Entries <i />
                            </div>
                            {/* <PaginationServer pageCount={pageCount} activePage={page} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardPageWrapper>
    );
};

export default ArticlesTable;
