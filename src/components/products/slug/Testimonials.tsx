import { IoStarSharp } from 'react-icons/io5';

const TestimonialCard = () => {
    return (
        <div className="w-full bg-body px-[15px] py-[30px] md:px-[30px]">
            <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex items-center gap-x-1">
                    <IoStarSharp size={16} />
                    <IoStarSharp size={16} />
                    <IoStarSharp size={16} />
                    <IoStarSharp size={16} />
                    <IoStarSharp size={16} />
                </div>
                <p className="text-center text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.{' '}
                    <br /> Porro nemo aliquid vero corporis <br /> nulla nostrum
                    dolore consequatur iste fugit numquam.
                </p>
                <div className="space-y-2">
                    <p className="text-base font-semibold">@lorem_ipsum</p>
                    <p className="text-[15px]">via instagram</p>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    return (
        <div className="bg-[#F9F9F9]">
            <div className="mx-auto max-w-[1500px] px-4 py-5 md:px-10 md:py-[75px]">
                <h2 className="text-center font-secondary text-[28px] uppercase md:text-[32px]">
                    Testimonials
                </h2>
                <div className="mx-auto flex w-10/12 flex-col gap-x-5 gap-y-5 py-10 sm:w-3/4 md:w-full md:flex-row">
                    <TestimonialCard />
                    <TestimonialCard />
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
