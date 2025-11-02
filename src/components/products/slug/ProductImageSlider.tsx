'use client';
import Image from 'next/image';
import {
    CarouselProvider,
    ImageWithZoom,
    Slide,
    Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useRef, useState } from 'react';

const ProductImageSlider = ({ images }: { images: string[] }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScrollUp = () => {
        setActiveSlide((prev) => Math.max(prev - 1, 0));
        if (containerRef.current) {
            containerRef.current.scrollBy({ top: -120, behavior: 'instant' });
        }
    };

    const handleScrollDown = () => {
        setActiveSlide((prev) => Math.min(prev + 1, images.length - 1));
        if (containerRef.current) {
            containerRef.current.scrollBy({ top: 120, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex gap-x-[15px]">
            {/* Left Side Image Navigation */}
            <div className="relative h-full w-full max-w-[80px]">
                {/* <div
                    className={`h-8 ${activeSlide === 0 ? 'hidden' : 'absolute top-0 w-full bg-body'}`}
                >
                    <button
                        onClick={handleScrollUp}
                        className="m-auto flex h-full items-center justify-center"
                    >
                        <GoChevronUp className="mx-auto text-xl" />
                    </button>
                </div> */}
                <div
                    ref={containerRef}
                    className="scrollbar-hidden flex max-h-[380px] flex-col overflow-auto lg:max-h-[750px]"
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`mb-2 cursor-pointer`}
                            onClick={() => setActiveSlide(index)}
                        >
                            <Image
                                src={process.env.NEXT_PUBLIC_MEDIA + image}
                                width={250}
                                height={100}
                                alt={`Product Image ${index + 1}`}
                                className={`aspect-square h-full w-full ${index === activeSlide ? 'border-2 border-black' : ''}`}
                            />
                        </div>
                    ))}
                </div>

                {/* <div
                    className={`h-8 ${activeSlide === images.length - 1 ? 'hidden' : 'absolute bottom-0 w-full bg-body'}`}
                >
                    <button
                        onClick={handleScrollDown}
                        className="m-auto flex h-full items-center justify-center"
                    >
                        <GoChevronDown className="mx-auto text-xl" />
                    </button>
                </div> */}
            </div>
            {/* carousel slider with zoom  */}
            <div className="w-full">
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={images.length}
                    step={1}
                    currentSlide={activeSlide}
                    hasMasterSpinner
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    lockOnWindowScroll
                    className=""
                >
                    <Slider className="h-[340px] border lg:h-[750px]">
                        {images.map((image, index) => (
                            <Slide index={index} key={index}>
                                <ImageWithZoom
                                    src={process.env.NEXT_PUBLIC_MEDIA + image}
                                />
                            </Slide>
                        ))}
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
    );
};

export default ProductImageSlider;
