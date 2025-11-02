import Image from 'next/image';
import Link from 'next/link';
import SecondaryBtn from '../shared/SecondaryBtn';

const ReStock = () => {
    return (
        <div className="mx-auto space-y-[60px] py-[40px] md:py-[60px]">
            {/* top */}
            <div className="relative h-[430px] w-full sm:h-[80dvh]">
                <Image
                    src="https://sc02.alicdn.com/kf/H1143667fda814554adb54b8a2bf26ec9f.jpg"
                    width={2000}
                    height={1400}
                    className="h-full w-full object-cover"
                    alt=""
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* <h2 className="font-primary text-[22px] font-semibold uppercase tracking-[5px] text-body sm:text-[36px] md:tracking-[8px]">
                        {products[0]?.category || ""}
                    </h2>
                    <p className="pb-3 font-primary text-[17px] font-extralight uppercase text-body sm:text-[30px]">
                        {products[0]?.sub_category || ""}
                    </p> */}

                    <Link href="/collections/women-yoga-sets">
                        <SecondaryBtn name="shop now" />
                    </Link>
                </div>
            </div>

            {/* best selling */}
            <div className="flex w-full flex-col items-center justify-center gap-5 px-[10px] md:px-5 lg:flex-row">
                <BestSellersCard
                    image="https://sc02.alicdn.com/kf/H85362b206acb4df5b75aaf6e1a9fdfceU.jpg"
                    title="yoga pants"
                />
                <BestSellersCard
                    image="/home/section-bg2.webp"
                    title="swimwear"
                />
            </div>
        </div>
    );
};

type BestSellersCardProps = {
    image: string;
    title: string;
};

const BestSellersCard = ({ image, title }: BestSellersCardProps) => {
    return (
        <div className="relative h-[70dvh] w-full cursor-pointer md:h-[80dvh] md:w-[60dvw] lg:w-[50dvw]">
            <Image
                src={image}
                width={1920}
                height={800}
                className="h-full w-full object-cover"
                alt=""
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-2 flex items-center justify-center border-2 border-body p-5">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="font-primary text-[17px] font-extralight uppercase tracking-widest text-body sm:text-[28px]">
                        Best Sellers
                    </p>
                    <h2 className="pb-3 font-primary text-[22px] font-semibold uppercase tracking-[5px] text-body sm:text-[36px] md:tracking-[8px]">
                        {title}
                    </h2>
                    <Link href="/collections/swimwear-swimwear">
                        <SecondaryBtn name="shop now" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReStock;
