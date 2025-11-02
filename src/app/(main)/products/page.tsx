import Image from 'next/image';
import Link from 'next/link';
import ShopPagePagination from 'src/components/products/common/ShopPagePagination';
import ShopSort from 'src/components/products/common/ShopSort';
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

export const revalidate = 0;

type SearchParams = {
    searchParams: {
        page?: string;
        category?: string;
    };
};

const Products = async ({ searchParams }: SearchParams) => {
    await connectMongo();
    const products = await Product.find().lean();
    const page = searchParams?.page ? searchParams.page : '1';

    const category = searchParams?.category;
    const filteredProducts = products.filter((p) =>
        category ? p.category === category : true,
    );
    const totalPage = Math.ceil(filteredProducts?.length / 9).toString();

    return (
        <div className="mx-auto max-w-[1500px] px-4 py-[40px] md:px-10 md:py-[60px]">
            <DropdownMenu>
                <h1 className="text-center font-secondary text-[28px] font-medium uppercase md:text-[32px]">
                    All Products
                </h1>

                <div className="flex w-full items-center justify-between pt-[20px]">
                    <div>
                        <p className="text-base">
                            <span>{filteredProducts?.length}</span> products
                        </p>
                    </div>
                    <div className="rounded border p-3">
                        <DropdownMenuTrigger>
                            <h6 className="select-none text-xs uppercase">
                                Filter By
                            </h6>
                        </DropdownMenuTrigger>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-5 md:grid-cols-3 md:gap-[22px] md:py-10">
                    {filteredProducts
                        ?.slice(
                            (Number(page) - 1) * Number(9),
                            Number(page) * Number(9),
                        )
                        .map((p, index) => (
                            <div key={index} className="w-full cursor-pointer">
                                <div className="group relative h-[190px] w-full overflow-hidden transition-all duration-300 sm:h-[360px] md:h-[220px] lg:h-[320px] xl:h-[440px]">
                                    <Image
                                        src={
                                            process.env.NEXT_PUBLIC_MEDIA +
                                            p?.images[0]
                                        }
                                        width={800}
                                        height={800}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/20" />
                                    <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
                                        <Link
                                            href={`/products/${p.slug}`}
                                            className="bg-body px-[15px] py-2 text-center font-primary text-[11.5px] uppercase tracking-[.2em] md:text-[12.8px]"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <ShopSort searchParams={searchParams} />
                <ShopPagePagination page={page} totalPage={totalPage} />
            </DropdownMenu>
        </div>
    );
};

export default Products;
