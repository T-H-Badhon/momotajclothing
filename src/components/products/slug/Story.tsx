import Image from 'next/image';
import PrimaryBtn from 'src/components/shared/PrimaryBtn';

const bg_image = '/products/story-bg.jpg';

const Story = () => {
    return (
        <div className="pb-10 md:pb-[75px]">
            <div className="relative h-[100dvh] max-w-[100dvw] md:h-[80dvh] 2xl:h-[50dvh]">
                <Image
                    src={bg_image}
                    width={2000}
                    height={1000}
                    className="h-full w-full object-cover"
                    alt=""
                />
                <div className="absolute bottom-0 m-2 bg-body p-5 md:bottom-auto md:right-10 md:top-10 md:m-0 md:max-w-[400px] md:p-10 xl:right-20 xl:top-20">
                    <div className="space-y-1 text-center md:text-start">
                        <h4 className="text-sm uppercase tracking-widest">
                            Pretty Sports Wear
                        </h4>
                        <h3 className="font-secondary text-[26px] uppercase">
                            Our Story
                        </h3>
                    </div>
                    <div className="space-y-4 py-5 text-center md:text-start">
                        <p>
                            Zhejiang Pretty Clothing Co., Ltd specialize in
                            fitness&sports apparel, children wear with 10 years.
                            We sincerely hope that create win-win cooperation
                            with all customers.
                        </p>
                        <p>
                            Yisheng strives to be better company where people
                            can find latest fashion apparel for yoga, fitness..
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <PrimaryBtn name="read full story" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Story;
