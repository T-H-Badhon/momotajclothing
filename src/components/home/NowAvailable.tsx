import Link from 'next/link';
import { ProductData } from 'src/types';
import AvailableCard from '../collections/slug/AvailableCard';

const NowAvailable = ({ products }: { products: ProductData[] }) => {
    return (
        <section className="mx-auto max-w-[1500px] px-4 py-16 md:px-10 md:py-20">
            {/* Section header */}
            <div className="mb-10 text-center md:mb-14">
                <p className="mb-3 font-primary text-[9px] uppercase tracking-[5px] text-accent">
                    New Collection
                </p>
                <h2 className="font-secondary text-[30px] uppercase md:text-[42px]">
                    Now Available
                </h2>
                <div className="mx-auto mt-5 h-px w-12 bg-accent" />
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                {products.map((product) => (
                    <AvailableCard key={product?._id} product={product} />
                ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-center">
                <Link
                    href="/products"
                    className="inline-block border border-bodyText px-10 py-[11px] font-primary text-[10px] uppercase tracking-[3px] text-bodyText transition-all duration-300 hover:bg-bodyText hover:text-body"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
};

export default NowAvailable;
