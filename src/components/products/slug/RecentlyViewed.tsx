import AvailableCard from 'src/components/collections/slug/AvailableCard';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

const RecentlyViewed = async () => {
    await connectMongo();
    const products = await Product.find().limit(5).lean();

    return (
        <div>
            <hr />
            <div className="mx-auto max-w-[1500px] px-4 pt-10 md:px-10 md:pb-[75px]">
                <h1 className="text-center font-secondary text-[26px] font-medium uppercase xl:text-[28px]">
                    Recently Viewed
                </h1>
                <div className="overflow-x-auto">
                    <div className="flex gap-x-3 gap-y-5 py-8 md:grid md:flex-none md:grid-cols-5 md:gap-5 md:py-10">
                        {products.map((each, index) => (
                            <AvailableCard key={index} product={each} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// const SimilarCard = ({ product }: ) => {
//     return (
//         <div className="w-full cursor-pointer">
//             <div className="group">
//                 <div className="h-[233px] w-[160px] sm:h-[370px] sm:w-[258px] md:h-[195px] md:w-full lg:h-[260px] xl:h-[400px]">
//                     <Image
//                         src={product?.p_image2}
//                         width={1200}
//                         height={800}
//                         className="h-full w-full object-cover transition-opacity ease-in-out"
//                         alt="Product Image"
//                     />
//                 </div>
//             </div>
//             <div className="px-2 pt-2 text-center font-primary text-sm md:pt-5 md:text-xs lg:text-sm">
//                 <h3 className="uppercase tracking-[2px]">{product?.name}</h3>
//             </div>
//         </div>
//     );
// };

export default RecentlyViewed;
