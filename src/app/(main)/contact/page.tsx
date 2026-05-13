import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import { TfiEmail } from 'react-icons/tfi';

const ContactPage = () => {
    return (
        <div className="min-h-[80vh] px-6 py-16 md:py-24">
            {/* Heading */}
            <div className="mb-14 text-center">
                <p className="mb-3 font-primary text-[9px] uppercase tracking-[5px] text-accent">
                    Reach Out
                </p>
                <h1 className="font-secondary text-[40px] uppercase md:text-[58px]">
                    Contact Us
                </h1>
                <div className="mx-auto mt-5 h-px w-12 bg-accent" />
            </div>

            {/* Info cards */}
            <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-5 md:grid-cols-3">
                <div className="border border-border p-8 text-center">
                    <HiOutlinePhone className="mx-auto mb-4 size-6 text-accent" />
                    <h3 className="mb-2 font-primary text-[9px] uppercase tracking-[3px] text-bodyText">
                        Phone
                    </h3>
                    <p className="font-primary text-[13px] text-bodyText/70">
                        +8801970251998
                    </p>
                </div>

                <div className="border border-border p-8 text-center">
                    <HiOutlineLocationMarker className="mx-auto mb-4 size-6 text-accent" />
                    <h3 className="mb-2 font-primary text-[9px] uppercase tracking-[3px] text-bodyText">
                        Location
                    </h3>
                    <p className="font-primary text-[13px] text-bodyText/70">
                        Karimpur, Kushtia Sadar
                        <br />
                        Kushtia, Bangladesh
                    </p>
                </div>

                <div className="border border-border p-8 text-center">
                    <TfiEmail className="mx-auto mb-4 size-6 text-accent" />
                    <h3 className="mb-2 font-primary text-[9px] uppercase tracking-[3px] text-bodyText">
                        Hours
                    </h3>
                    <p className="font-primary text-[13px] text-bodyText/70">
                        24 hours a day
                        <br />7 days a week
                    </p>
                </div>
            </div>

            <p className="mt-10 text-center font-primary text-[12px] tracking-wide text-bodyText/50">
                For all enquiries, please call or message us directly.
            </p>
        </div>
    );
};

export default ContactPage;
