import Image from 'next/image';
import Link from 'next/link';
import { ProductData } from 'src/types';

const Collection = ({ products }: { products: ProductData[] }) => {
    return (
        <div className="mx-auto max-w-[1500px] px-4 py-[40px] md:px-10 md:py-[60px]">
            <h1 className="text-center font-secondary text-[28px] font-medium uppercase md:text-[32px]">
                All Products
            </h1>
            <div className="grid grid-cols-2 gap-3 py-5 md:grid-cols-3 md:gap-[22px] md:py-10">
                {products?.map((p, index) => <Card key={index} product={p} />)}
            </div>
        </div>
    );
};

const Card = ({ product }: { product: ProductData }) => {
    return (
        <div className="w-full cursor-pointer">
            <div className="group relative h-[190px] w-full overflow-hidden transition-all duration-300 sm:h-[360px] md:h-[220px] lg:h-[320px] xl:h-[440px]">
                <Image
                    src={process.env.NEXT_PUBLIC_MEDIA + product?.images[0]}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    alt=""
                />
                <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/20" />
                <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
                    <Link
                        href={`/products/${product.slug}`}
                        className="bg-body px-[15px] py-2 text-center font-primary text-[11.5px] uppercase tracking-[.2em] md:text-[12.8px]"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Collection;
