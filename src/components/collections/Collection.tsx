import Image from 'next/image';
import Link from 'next/link';
import { ProductData } from 'src/types';

const Collection = ({ products }: { products: ProductData[] }) => {
    return (
        <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-10 md:py-16">
            <div className="mb-10 text-center">
                <p className="mb-3 font-primary text-[9px] uppercase tracking-[5px] text-accent">
                    Browse
                </p>
                <h1 className="font-secondary text-[32px] uppercase md:text-[44px]">
                    All Collections
                </h1>
                <div className="mx-auto mt-4 h-px w-12 bg-accent" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {products?.map((p, index) => <Card key={index} product={p} />)}
            </div>
        </div>
    );
};

const Card = ({ product }: { product: ProductData }) => {
    return (
        <Link href={`/products/${product.slug}`} className="group block cursor-pointer">
            <div className="relative overflow-hidden bg-sand">
                <Image
                    src={process.env.NEXT_PUBLIC_MEDIA + product?.images[0]}
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={product.name}
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
                    {product.name}
                </h3>
                <p className="mt-1 font-primary text-[11px] text-accent">
                    TK {product.price}
                </p>
            </div>
        </Link>
    );
};

export default Collection;
