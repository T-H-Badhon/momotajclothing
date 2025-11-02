'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Banner = ({ sliders }: any) => {
    sliders = JSON.parse(sliders);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [lineWidths, setLineWidths] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const totalSlides = sliders?.length || 4;

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        fade: true,
        speed: 1000,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        beforeChange: (current: number, next: number) => {
            setCurrentIndex(next);
            resetLineWidths(next);
        },
        appendDots: () => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '6px',
                }}
            >
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: '50px',
                            height: '5px',
                            backgroundColor: '#ddd',
                            margin: '0 5px',
                            position: 'relative',
                            borderRadius: '5px',
                        }}
                    >
                        <div
                            style={{
                                width: `${lineWidths[index] || 0}%`,
                                height: '100%',
                                backgroundColor:
                                    index === currentIndex ? '#fff' : '#ddd',
                                transition: 'width 0.2s ease-in',
                            }}
                        />
                    </div>
                ))}
            </div>
        ),
    };

    const resetLineWidths = (nextIndex: number) => {
        setLineWidths((prevWidths) => {
            const newWidths = Array(totalSlides).fill(0);
            newWidths[nextIndex] = prevWidths[nextIndex];
            return newWidths;
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLineWidths((prevWidths) => {
                const newWidths = [...prevWidths];
                newWidths[currentIndex] = Math.min(
                    (newWidths[currentIndex] || 0) +
                        100 / (settings.autoplaySpeed / 100),
                    100,
                );
                return newWidths;
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [currentIndex, settings.autoplaySpeed]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            <div className="relative h-full w-full">
                {isLoading && (
                    <div className="inset-0 z-10 hidden items-center justify-center bg-black md:absolute md:flex">
                        <div className="mx-auto w-1/2 max-w-xs">
                            <div className="mb-4 h-2 animate-pulse rounded-full bg-gray-700"></div>
                            <div className="h-4 animate-pulse rounded bg-gray-700"></div>
                            <div className="mt-2 h-4 animate-pulse rounded bg-gray-700"></div>
                        </div>
                    </div>
                )}

                <div className="slider-container hidden bg-black md:block">
                    <Slider {...settings}>
                        {sliders?.map((slider: any, index: number) => (
                            <Card
                                key={index}
                                handleImageLoad={handleImageLoad}
                                src={
                                    process.env.NEXT_PUBLIC_MEDIA +
                                    slider?.image
                                }
                                headline={slider?.subtitle}
                                title={slider?.title}
                            />
                        ))}

                        {/* <Card
                            src='/carousel/1.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='Restock is here'
                            title='Custom Moq'
                        />
                        <Card
                            src='/carousel/2.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='just launched'
                            title='Jumpsuit'
                        />
                        <Card
                            src='/carousel/3.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='Restock is here'
                            title='yoga suit'
                        />
                        <Card
                            src='/carousel/4.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='just launched'
                            title='MOQ'
                        /> */}
                    </Slider>
                </div>
            </div>

            {/* mobile carousel */}
            <div className="relative h-full w-full">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black md:hidden">
                        <div className="mx-auto w-1/2 max-w-xs">
                            <div className="mb-4 h-2 animate-pulse rounded-full bg-gray-700"></div>
                            <div className="h-4 animate-pulse rounded bg-gray-700"></div>
                            <div className="mt-2 h-4 animate-pulse rounded bg-gray-700"></div>
                        </div>
                    </div>
                )}
                <div className="slider-container md:hidden">
                    <Slider {...settings}>
                        {sliders?.map((slider: any, index: number) => (
                            <ResCard
                                key={index}
                                handleImageLoad={handleImageLoad}
                                src={
                                    process.env.NEXT_PUBLIC_MEDIA +
                                    slider?.image
                                }
                                headline={slider?.subtitle}
                                title={slider?.title}
                            />
                        ))}

                        {/* <ResCard
                            src='/carousel/1.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='Restock is here'
                            title='Custom Moq'
                        />
                        <ResCard
                            src='/carousel/2.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='just launched'
                            title='Jumpsuit'
                        />
                        <ResCard
                            src='/carousel/3.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='Restock is here'
                            title='yoga suit'
                        />
                        <ResCard
                            src='/carousel/4.jpg'
                            handleImageLoad={handleImageLoad}
                            headline='just launched'
                            title='MOQ'
                        /> */}
                    </Slider>
                </div>
            </div>
        </>
    );
};

const Card = ({
    handleImageLoad,
    src,
    headline,
    title,
}: {
    handleImageLoad: any;
    src: string;
    headline: string;
    title: string;
}) => {
    return (
        <div className="relative w-full">
            <Image
                src={src}
                width={1920}
                height={800}
                alt=""
                priority
                className="aspect-[12/5] h-full w-full"
                onLoadingComplete={handleImageLoad}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-10 right-10 z-10 flex w-full flex-col items-end gap-y-3">
                <h4 className="font-primary text-xl uppercase tracking-[5px] text-body">
                    {headline}
                </h4>
                <h2 className="font-secondary text-6xl uppercase text-body lg:text-7xl">
                    {title}
                </h2>
                {/* <SecondaryBtn name="Shop Now" /> */}
            </div>
        </div>
    );
};

const ResCard = ({
    handleImageLoad,
    src,
    headline,
    title,
}: {
    handleImageLoad: any;
    src: string;
    headline: string;
    title: string;
}) => {
    return (
        <div className="relative w-full">
            <Image
                src={src}
                width={1920}
                height={800}
                alt=""
                className="aspect-[12/5] h-full w-full"
                onLoadingComplete={handleImageLoad}
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-10 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center justify-center"></div>
        </div>
    );
};

export default Banner;
