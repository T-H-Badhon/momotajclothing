import AvailableCard from 'src/components/collections/slug/AvailableCard';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

const SimilarProducts = async () => {
    await connectMongo();
    const products = await Product.find().limit(10).lean();

    return (
        <div className="mx-auto max-w-[1500px] px-4 md:px-10 md:pb-[75px]">
            <h1 className="text-center font-secondary text-[26px] font-medium uppercase xl:text-[28px]">
                You may also like
            </h1>
            <div className="overflow-x-auto">
                <div className="flex gap-x-3 gap-y-5 py-8 md:grid md:flex-none md:grid-cols-5 md:gap-5 md:py-10">
                    {products.map((each, index) => (
                        <AvailableCard key={index} product={each} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// const SimilarCard = ({ product }: AvailableCardProps) => {
//     return (
//         <div className="w-full cursor-pointer">
//             <div className="group relative">
//                 <div className="relative h-[233px] w-[160px] sm:h-[370px] sm:w-[258px] md:h-[195px] md:w-full lg:h-[260px] xl:h-[400px]">
//                     <Image
//                         src={product?.p_image2}
//                         width={1200}
//                         height={800}
//                         className="h-full w-full object-cover transition-opacity ease-in-out group-hover:opacity-0"
//                         alt="Product Image"
//                     />
//                     <Image
//                         src={product?.p_image1}
//                         width={800}
//                         height={600}
//                         className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover opacity-0 transition-opacity ease-in-out group-hover:opacity-100"
//                         alt="Hover Product Image"
//                     />
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 z-0 hidden bg-gray-50 px-5 py-3 font-primary transition-all ease-in-out group-hover:block group-hover:bg-opacity-30 lg:px-10">
//                     <div className="flex flex-wrap items-center justify-center gap-1 lg:gap-2">
//                         {product.sizes.map((each, i) => (
//                             <span
//                                 key={i}
//                                 className="bg-body px-1 py-[1px] text-center text-[10px] uppercase text-bodyText hover:bg-gridOverlay hover:text-body lg:text-xs"
//                             >
//                                 {each}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="space-y-1 px-2 pt-2 text-center font-primary text-sm md:space-y-2 md:pt-5 md:text-xs lg:text-sm">
//                 <h3 className="uppercase tracking-[2px]">{product?.name}</h3>
//                 <p className="tracking-wide">${product?.price}</p>
//             </div>
//         </div>
//     );
// };

export default SimilarProducts;
