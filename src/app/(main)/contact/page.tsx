import Link from 'next/link';

const page = () => {
    return (
        <div className="mx-auto max-h-[700px] w-full max-w-[1000px] px-[17px] py-[40px] text-center md:h-screen md:px-[40px] md:py-[75px]">
            <div className="pb-10 font-secondary text-[32.3px] uppercase md:text-[38px]">
                <h1>Contact us</h1>
            </div>
            <div>
                <div className="space-y-7 font-primary text-[13.6px] md:text-[16px]">
                    <h1>
                        Our customer service is online 24 hours a day, 7 days a week.
                    </h1>
                    <h1>For all enquiries please contact:</h1>
                </div>

                <h1 className="font-primary text-[13.6px] font-semibold text-bodyTextPink md:text-[16px]">
                    +8801970251998
                </h1>
            </div>
        </div>
    );
};

export default page;
