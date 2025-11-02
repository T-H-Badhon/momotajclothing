import Image from 'next/image';

const NewsCard = () => {
    return (
        <div className="">
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
                <h1 className="px-3 py-2 font-primary text-[13px] font-semibold md:text-[16px]">
                    Lorem, ipsum dolor sit amet consectetur adipisicing.
                </h1>
                <hr />
                <div className="flex items-center gap-2 px-3 py-1 text-[13px]">
                    <h1>Just auto.com </h1>
                    <div className="h-1 w-1 rounded-full bg-black"></div>
                    <h1 className="text-[13px]"> 09/17/2024</h1>
                </div>
            </div>
        </div>
    );
};

const NewsList = () => {
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </div>
    );
};

export default NewsList;
