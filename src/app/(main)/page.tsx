import { GetAllSliders } from 'src/components/actions/sliderActions';
import Banner from 'src/components/home/Banner';
import NowAvailable from 'src/components/home/NowAvailable';
import ReStock from 'src/components/home/ReStock';
import Shout from 'src/components/home/Shout';
import Product from 'src/modules/products/products.model';
import connectMongo from 'src/utils/connect-mongo';

export const revalidate = 0;

const Home = async () => {
    await connectMongo();
    const products = await Product.find().limit(12).lean();
    const sliders = await GetAllSliders();

    return (
        <>
            <Banner sliders={JSON.stringify(sliders)} />
            <NowAvailable products={products} />
        </>
    );
};

export default Home;
