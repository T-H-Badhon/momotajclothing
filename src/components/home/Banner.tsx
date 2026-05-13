'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Banner = ({ sliders }: { sliders: string }) => {
    const parsed = JSON.parse(sliders);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lineWidths, setLineWidths] = useState<number[]>([]);
    const totalSlides = parsed?.length || 0;
    const autoplaySpeed = 4000;

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        fade: true,
        speed: 1200,
        autoplaySpeed,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => {
            setCurrentIndex(next);
            setLineWidths(Array(totalSlides).fill(0));
        },
        appendDots: () => (
            <div
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                }}
            >
                {Array.from({ length: totalSlides }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: '40px',
                            height: '2px',
                            backgroundColor: 'rgba(248,245,239,0.35)',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                width: `${lineWidths[i] || 0}%`,
                                height: '100%',
                                backgroundColor:
                                    i === currentIndex
                                        ? '#F8F5EF'
                                        : 'transparent',
                                transition: 'width 0.15s linear',
                            }}
                        />
                    </div>
                ))}
            </div>
        ),
    };

    useEffect(() => {
        const id = setInterval(() => {
            setLineWidths((prev) => {
                const next = [...prev];
                next[currentIndex] = Math.min(
                    (next[currentIndex] || 0) + 100 / (autoplaySpeed / 100),
                    100,
                );
                return next;
            });
        }, 100);
        return () => clearInterval(id);
    }, [currentIndex, autoplaySpeed]);

    if (!parsed?.length) return null;

    return (
        <div className="relative w-full bg-[#111111]">
            <div className="slider-container">
                <Slider {...settings}>
                    {parsed.map((slider: any, i: number) => (
                        <BannerSlide
                            key={i}
                            src={process.env.NEXT_PUBLIC_MEDIA + slider?.image}
                            headline={slider?.subtitle}
                            title={slider?.title}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

const BannerSlide = ({
    src,
    headline,
    title,
}: {
    src: string;
    headline: string;
    title: string;
}) => {
    return (
        <div className="relative w-full">
            <Image
                src={src}
                width={1920}
                height={900}
                alt=""
                priority
                className="aspect-[3/2] w-full object-cover md:aspect-[12/5]"
            />
            {/* Gradient overlay — stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center md:pb-16">
                {headline && (
                    <p className="mb-2 font-primary text-[10px] uppercase tracking-[4px] text-[#F8F5EF]/80 md:text-[12px] md:tracking-[6px]">
                        {headline}
                    </p>
                )}
                {title && (
                    <h1 className="font-secondary text-[38px] uppercase leading-tight text-[#F8F5EF] md:text-[72px] lg:text-[88px]">
                        {title}
                    </h1>
                )}
                <Link
                    href="/products"
                    className="mt-6 inline-block border border-[#F8F5EF] px-8 py-3 font-primary text-[10px] uppercase tracking-[3px] text-[#F8F5EF] transition-all duration-300 hover:bg-[#F8F5EF] hover:text-[#111111] md:text-[11px]"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default Banner;
