import AvailableCard from 'src/components/collections/slug/AvailableCard';
import DropDown from 'src/components/collections/slug/DropDown';
import Category from 'src/modules/categories/categories.model';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

const SingleCollections = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: any;
}) => {
    await connectMongo();
    const products = await Product.find({ sub_category: params.slug }).lean();
    const category = await Category.findOne({ slug: params.slug }).lean();

    return (
        <div className="mx-auto max-w-[1500px] px-4 py-[40px] md:px-10 md:py-[60px]">
            <h1 className="text-center font-secondary text-[28px] font-medium uppercase md:text-[32px]">
                {category?.name} {category?.sub_category}
            </h1>

            <div className="flex w-full items-center justify-between pt-[45px]">
                <div>
                    <p className="text-base">
                        <span>{products.length}</span> product
                    </p>
                </div>
                <div>
                    <DropDown />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-5 py-8 md:grid-cols-4 md:gap-5 md:py-10">
                {products
                    ?.sort((a, b) => {
                        // Ensure the price is compared as a number
                        const priceA = parseFloat(a.price);
                        const priceB = parseFloat(b.price);
                        if (searchParams.sort === 'desc') {
                            return priceB - priceA;
                        } else {
                            return priceA - priceB;
                        }
                    })
                    ?.map((each) => (
                        <AvailableCard
                            key={each?._id.toString()}
                            product={each}
                        />
                    ))}
            </div>

            {/* pagination */}
            {/* <Pagination /> */}
        </div>
    );
};

export default SingleCollections;
