const AboutUs = () => {
    return (
        <div className="min-h-screen">
            {/* Hero banner */}
            <div className="bg-[#111111] py-20 text-center md:py-28">
                <p className="mb-3 font-primary text-[9px] uppercase tracking-[5px] text-accent">
                    Who We Are
                </p>
                <h1 className="font-secondary text-[44px] uppercase text-[#F8F5EF] md:text-[68px]">
                    Our Story
                </h1>
            </div>

            {/* Body content */}
            <div className="mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-24">
                <div className="space-y-7 font-primary text-[14px] leading-[1.9] text-bodyText md:text-[15px]">
                    <p>
                        Welcome to our shop! We are proudly based in{' '}
                        <strong className="font-semibold">
                            Karimpur, Kushtia Sadar, Kushtia
                        </strong>
                        , offering authentic Bengali traditional wear including
                        elegant{' '}
                        <strong className="font-semibold">
                            Shari, 3-piece sets, Panjabi
                        </strong>{' '}
                        and more. Each piece reflects the beauty and heritage of
                        Bengali culture.
                    </p>

                    <p>
                        Our team works with skilled local artisans to craft
                        every item with care and perfection. We ensure
                        high-quality materials, intricate designs, and modern
                        comfort for both traditional and contemporary styles.
                    </p>

                    {/* Pull quote */}
                    <blockquote className="border-l-2 border-accent py-3 pl-6">
                        <p className="font-secondary text-[22px] leading-snug text-bodyText md:text-[28px]">
                            &ldquo;Tradition never goes out of style.&rdquo;
                        </p>
                    </blockquote>

                    <p>
                        Whether you&apos;re looking for something classic for
                        festivals, stylish for special occasions, or simple
                        everyday wear, we bring you collections that celebrate
                        your unique Bengali identity.
                    </p>

                    <p>
                        We are continuously expanding our designs and updating
                        our stock to bring you the latest fashion trends rooted
                        in our culture. Custom orders are also available for
                        Panjabis, Sharis, and 3-piece sets.
                    </p>

                    <p>
                        Your satisfaction is our top priority — from design to
                        doorstep delivery, we make sure you receive the best
                        quality and service every time you shop with us.
                    </p>
                </div>

                {/* Brand statement */}
                <div className="mt-16 border-t border-border pt-10 text-center">
                    <p className="font-secondary text-[22px] uppercase text-bodyText md:text-[30px]">
                        Be Proud. Be Traditional. Be You.
                    </p>
                    <p className="mt-4 font-primary text-[10px] uppercase tracking-[3px] text-accent">
                        #BengaliCulture &nbsp;·&nbsp; #TraditionalWear
                        &nbsp;·&nbsp; @Bangla.Clothing
                    </p>
                    <p className="mt-8 font-primary text-[13px] leading-relaxed text-bodyText/60">
                        Thank you for your love and support. Every order brings
                        a smile to our team — we truly appreciate your trust.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
