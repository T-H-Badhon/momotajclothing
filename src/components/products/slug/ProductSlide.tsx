import { EmblaOptionsType } from 'embla-carousel';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { DotButton, useDotButton } from './ProductSlideDotBtn';

type PropType = {
    slides: string[];
    options?: EmblaOptionsType;
};

const ProductSlide: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((each, index) => {
                        return (
                            <div className="embla__slide" key={index}>
                                <div className="relative h-[450px] sm:h-[700px]">
                                    <Image
                                        src={
                                            process.env.NEXT_PUBLIC_MEDIA + each
                                        }
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-cover"
                                        alt=""
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="embla__controls my-5">
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSlide;
