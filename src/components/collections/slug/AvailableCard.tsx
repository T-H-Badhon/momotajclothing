import Image from 'next/image';
import Link from 'next/link';
import { ProductData } from 'src/types';

const AvailableCard = ({ product }: { product: ProductData }) => {
    return (
        <Link href={`/products/${product.slug}`}>
            <div className="group cursor-pointer">
                {/* Image container */}
                <div className="relative overflow-hidden bg-sand">
                    <Image
                        src={process.env.NEXT_PUBLIC_MEDIA + product?.images[0]}
                        width={600}
                        height={750}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        alt={product?.name}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                    {/* Size chips — slide up on hover */}
                    {product.sizes?.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-body/95 px-3 py-2 transition-transform duration-300 ease-out group-hover:translate-y-0">
                            <div className="flex flex-wrap items-center justify-center gap-1">
                                {product.sizes.map((s, i) => (
                                    <span
                                        key={i}
                                        className="border border-border px-2 py-0.5 font-primary text-[9px] uppercase tracking-[1px] text-bodyText"
                                    >
                                        {s.value}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Product info */}
                <div className="pt-3 text-center">
                    <h3 className="line-clamp-1 font-primary text-[10.5px] uppercase tracking-[2px] text-bodyText">
                        {product?.name}
                    </h3>
                    <p className="mt-1 font-primary text-[11px] tracking-wide text-accent">
                        TK {product?.price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default AvailableCard;
