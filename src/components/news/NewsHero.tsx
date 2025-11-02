import Image from 'next/image';

const NewsHero = () => {
    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="col-span-3 lg:col-span-2">
                <div>
                    <Image
                        src={'/news/hero.webp'}
                        alt="news photo"
                        width={1000}
                        height={500}
                        className="h-full w-full"
                    />
                </div>
                <div>
                    <h1 className="px-5 py-4 font-primary text-[16px] font-semibold md:text-[24px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                    </h1>
                    <hr />
                    <div className="flex items-center gap-2 px-5 py-2">
                        <h1>Just auto.com </h1>
                        <div className="h-1 w-1 rounded-full bg-black"></div>
                        <h1> 09/17/2024</h1>
                    </div>
                </div>
            </div>

            <div className="col-span-3 space-y-3 lg:col-span-1">
                <NewsSmallCard />
                <NewsSmallCard />
                <NewsSmallCard />
                <NewsSmallCard />
            </div>
        </div>
    );
};

const NewsSmallCard = () => {
    return (
        <div>
            <div className="flex items-start gap-1">
                <div className="flex-1">
                    <h1 className="px-2 pt-2 font-secondary text-[13px] uppercase text-linkText">
                        Lorem, ipsum.
                    </h1>
                    <h1 className="line-clamp-2 h-[44px] px-2 pb-2 font-primary font-semibold uppercase">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        asperiores?
                    </h1>
                    <hr />
                </div>
                <div>
                    <Image
                        src={'/news/socialMedia.webp'}
                        width={150}
                        height={120}
                        alt="logo"
                        className="h-fit w-[120px]"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 px-2 pb-2 pt-1 text-[13px] text-gray-400">
                <h1>Just auto.com </h1>
                <div className="h-1 w-1 rounded-full bg-gray-400 text-[13px]"></div>
                <h1> 09/17/2024</h1>
            </div>
        </div>
    );
};

export default NewsHero;
