import ProductDetails from 'src/components/products/slug/ProductDetails';
import RecentlyViewed from 'src/components/products/slug/RecentlyViewed';
import SimilarProducts from 'src/components/products/slug/SimilarProducts';
import Story from 'src/components/products/slug/Story';
import Testimonials from 'src/components/products/slug/Testimonials';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

const SingleProductPage = async ({ params }: { params: { slug: string } }) => {
    await connectMongo();

    const product = await Product.findOne({ slug: params.slug }).lean();

    if (!product) {
        return (
            <div className="flex min-h-[calc(100dvh-200px)] items-center justify-center text-2xl">
                <p>No Product Found.</p>
            </div>
        );
    }

    return (
        <>
            <ProductDetails product={product} />
            {/* <Testimonials /> */}
            {/* <Story /> */}
            <SimilarProducts />
            <RecentlyViewed />
        </>
    );
};

export default SingleProductPage;
