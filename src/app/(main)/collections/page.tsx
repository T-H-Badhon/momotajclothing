import Collection from 'src/components/collections/Collection';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

export const revalidate = 0;

const Collections = async () => {
    await connectMongo();
    const products = await Product.find().lean();

    return (
        <>
            <Collection products={products} />
        </>
    );
};

export default Collections;
