import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
    return (
        <div className="mx-auto w-full max-w-[1000px] px-[17px] py-[40px] text-center md:px-[40px] md:py-[75px]">
            <div>
                <h1 className="pb-10 font-secondary text-[32.3px] uppercase md:text-[38px]">
                    our story
                </h1>
            </div>
            <div className="space-y-7 font-primary text-[13.6px] md:text-[16px]">
                <h1>
                    Welcome to our shop! We are proudly based in{" "}
                    <strong>Karimpur, Kushtia Sadar, Kushtia</strong>, offering
                    authentic Bengali traditional wear including elegant{" "}
                    <strong>Shari, 3-piece sets, Panjabi</strong>, and more.
                    Each piece reflects the beauty and heritage of Bengali
                    culture.
                </h1>
                <h1>
                    Our team works with skilled local artisans to craft every
                    item with care and perfection. We ensure high-quality
                    materials, intricate designs, and modern comfort for both
                    traditional and contemporary styles.
                </h1>
                <h1>
                    Whether you’re looking for something classic for festivals,
                    stylish for special occasions, or simple everyday wear, we
                    bring you collections that celebrate your unique Bengali
                    identity.
                </h1>
                <h1>
                    We are continuously expanding our designs and updating our
                    stock to bring you the latest fashion trends rooted in our
                    culture. Custom orders are also available for Panjabis,
                    Sharis, and 3-piece sets.
                </h1>
                <h1>
                    Your satisfaction is our top priority — from design to
                    doorstep delivery, we make sure you receive the best
                    quality and service every time you shop with us.
                </h1>
                <h1>
                    Our belief: <strong>Tradition never goes out of style.</strong>{" "}
                    We aim to promote Bengali heritage through fashion that
                    speaks to your heart.
                </h1>
            </div>

            <div className="my-8 space-y-8 font-primary text-[13.6px] font-bold md:text-[16px]">
                <h1>Be Proud. Be Traditional. Be You.</h1>
                <h1>Because Bengali elegance is timeless.</h1>
            </div>

            <h1 className="font-primary text-[13.6px] font-bold uppercase md:text-[16px]">
                #BENGALICULTURE #TRADITIONALWEAR @BANGLA.CLOTHING
            </h1>

            <div className="space-y-5 font-primary text-[13.6px] md:text-[16px] mt-5">
                <h1>Thank you for your love and support.</h1>
                <h1>
                    Every order you place brings a smile to our team — we truly
                    appreciate your trust in our handmade Bengali wear.
                </h1>
            </div>
        </div>
    );
};

export default AboutUs;
