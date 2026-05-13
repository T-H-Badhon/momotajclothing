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
    const page = searchParams?.page ?? '1';
    const category = searchParams?.category;

    const filteredProducts = products.filter((p) =>
        category ? p.category === category : true,
    );
    const totalPage = Math.ceil(filteredProducts.length / 9).toString();
    const paged = filteredProducts.slice(
        (Number(page) - 1) * 9,
        Number(page) * 9,
    );

    return (
        <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-10 md:py-16">
            <DropdownMenu>
                {/* Page header */}
                <div className="mb-10 text-center">
                    <p className="mb-3 font-primary text-[9px] uppercase tracking-[5px] text-accent">
                        Browse
                    </p>
                    <h1 className="font-secondary text-[32px] uppercase md:text-[44px]">
                        All Products
                    </h1>
                    <div className="mx-auto mt-4 h-px w-12 bg-accent" />
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                    <p className="font-primary text-[11px] uppercase tracking-[1.5px] text-bodyText/60">
                        {filteredProducts.length}{' '}
                        {filteredProducts.length === 1 ? 'item' : 'items'}
                    </p>
                    <DropdownMenuTrigger className="border border-border px-4 py-2 font-primary text-[10px] uppercase tracking-[2px] text-bodyText transition-colors hover:border-bodyText focus:outline-none">
                        Filter
                    </DropdownMenuTrigger>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                    {paged.map((p, i) => (
                        <Link
                            key={i}
                            href={`/products/${p.slug}`}
                            className="group block"
                        >
                            <div className="relative overflow-hidden bg-sand">
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_MEDIA +
                                        p?.images[0]
                                    }
                                    width={800}
                                    height={1000}
                                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    alt={p.name}
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="bg-body px-5 py-2 font-primary text-[10px] uppercase tracking-[2.5px] text-bodyText">
                                        View Details
                                    </span>
                                </div>
                            </div>
                            <div className="pt-3">
                                <h3 className="line-clamp-1 font-primary text-[10.5px] uppercase tracking-[2px] text-bodyText">
                                    {p.name}
                                </h3>
                                <p className="mt-1 font-primary text-[11px] text-accent">
                                    TK {p.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <ShopSort searchParams={searchParams} />
                <ShopPagePagination page={page} totalPage={totalPage} />
            </DropdownMenu>
        </div>
    );
};

export default Products;
