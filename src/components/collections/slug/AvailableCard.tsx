import Image from 'next/image';
import Link from 'next/link';
import { ProductData } from 'src/types';

const AvailableCard = ({ product }: { product: ProductData }) => {
    return (
        <Link href={`/products/${product.slug}`}>
            <div className="w-full cursor-pointer">
                <div className="group relative">
                    <div className="relative h-full w-full">
                        <Image
                            src={
                                process.env.NEXT_PUBLIC_MEDIA +
                                product?.images[0]
                            }
                            width={1200}
                            height={800}
                            className="aspect-square h-full w-full object-cover transition-opacity ease-in-out group-hover:opacity-0"
                            alt="Product Image"
                        />

                        <Image
                            src={
                                process.env.NEXT_PUBLIC_MEDIA +
                                product?.images[0]
                            }
                            width={800}
                            height={600}
                            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover opacity-0 transition-opacity ease-in-out group-hover:opacity-100"
                            alt="Hover Product Image"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-0 hidden bg-gray-50 px-5 py-3 font-primary transition-all ease-in-out group-hover:block group-hover:bg-opacity-30 lg:px-10">
                        <div className="flex flex-wrap items-center justify-center gap-1 lg:gap-2">
                            {product.sizes.map((each, i) => (
                                <span
                                    key={i}
                                    className="bg-body px-1 py-[1px] text-center text-[10px] uppercase text-bodyText hover:bg-gridOverlay hover:text-body lg:text-xs"
                                >
                                    {each.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-3 space-y-1 px-2 pt-2 text-center font-primary text-sm md:space-y-2 md:pt-5 md:text-xs lg:text-sm">
                    <h3 className="line-clamp-1 uppercase tracking-[2px]">
                        {product?.name}
                    </h3>
                    {/* <p className="tracking-wide">${product?.price}</p> */}
                </div>
            </div>
        </Link>
    );
};

export default AvailableCard;
