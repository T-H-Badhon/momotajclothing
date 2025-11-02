import { ProductData } from 'src/types';
import AvailableCard from '../collections/slug/AvailableCard';
import { Button } from '../ui/button';

const NowAvailable = ({ products }: { products: ProductData[] }) => {
    return (
        <div className="mx-auto max-w-[1500px] px-4 py-[40px] md:px-10 md:py-[60px]">
            <h1 className="text-center font-secondary text-[28px] font-medium uppercase md:text-[32px]">
                Now available!
            </h1>

            <div className="grid grid-cols-2 gap-x-3 gap-y-5 py-8 md:grid-cols-4 md:gap-5 md:py-10">
                {products.map((each) => (
                    <AvailableCard key={each?._id} product={each} />
                ))}
            </div>

            <div className="flex items-center justify-center">
                <Button variant={'black'} href="/products">
                    View All
                </Button>
            </div>
        </div>
    );
};

export default NowAvailable;
