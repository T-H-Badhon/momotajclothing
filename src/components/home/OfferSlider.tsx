'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const OfferSlider = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 400,
        slidesToShow: 1,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        swipeToSlide: true,
        slidesToScroll: 1,
    };

    return (
        <div className="slider-container bg-black px-4 md:px-10">
            <Slider {...settings} className="h-[56px] md:h-[42px]">
                {/*  */}
                <SliderContent
                    text="Worldwide shipping"
                    textSpan="Spend TK500 = Free in Kushtia"
                />
                <SliderContent
                    text="Hassle free returns"
                    textSpan="10-day returns & exchange"
                />
                <SliderContent
                    text="Buy now, pay later"
                    textSpan="with cash on delivery"
                />
            </Slider>
        </div>
    );
};

const SliderContent = ({
    text,
    textSpan,
}: {
    text: string;
    textSpan: string;
}) => {
    return (
        <div className="h-[56px] md:h-[42px]">
            <h3 className="flex h-full flex-col items-center justify-center gap-y-1 text-center text-[10px] font-bold uppercase leading-snug tracking-[2px] text-body md:flex-row md:text-[13px]">
                {text}
                <span className="font-sans text-[10px] font-medium capitalize tracking-wide opacity-85 md:pl-1 md:text-[13px]">
                    {textSpan}
                </span>
            </h3>
        </div>
    );
};

export default OfferSlider;
