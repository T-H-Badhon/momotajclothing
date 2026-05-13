import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="border-t border-border bg-[#111111] text-[#F8F5EF]">
            <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2 space-y-4 md:col-span-1">
                        <h3 className="font-secondary text-xl uppercase tracking-[4px] text-[#F8F5EF]">
                            Momotaj
                        </h3>
                        <p className="font-primary text-[12px] leading-relaxed tracking-wide text-[#F8F5EF]/60">
                            Traditional Bengali elegance for the modern world.
                            Karimpur, Kushtia Sadar, Kushtia.
                        </p>
                        <div className="flex gap-3 pt-1">
                            <Link
                                href="#"
                                className="flex h-8 w-8 items-center justify-center border border-[#F8F5EF]/20 text-[#F8F5EF]/60 transition-colors duration-200 hover:border-accent hover:text-accent"
                            >
                                <FaFacebookF size={11} />
                            </Link>
                            <Link
                                href="#"
                                className="flex h-8 w-8 items-center justify-center border border-[#F8F5EF]/20 text-[#F8F5EF]/60 transition-colors duration-200 hover:border-accent hover:text-accent"
                            >
                                <FaInstagram size={11} />
                            </Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="font-primary text-[9px] uppercase tracking-[3px] text-accent">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'All Products', href: '/products' },
                                { label: 'Collections', href: '/collections' },
                                { label: 'New Arrivals', href: '/products' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="font-primary text-[12px] tracking-wide text-[#F8F5EF]/60 transition-colors duration-200 hover:text-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-primary text-[9px] uppercase tracking-[3px] text-accent">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Our Story', href: '/about' },
                                { label: 'Contact Us', href: '/contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="font-primary text-[12px] tracking-wide text-[#F8F5EF]/60 transition-colors duration-200 hover:text-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-primary text-[9px] uppercase tracking-[3px] text-accent">
                            Contact
                        </h4>
                        <div className="space-y-2">
                            <p className="font-primary text-[12px] tracking-wide text-[#F8F5EF]/60">
                                +8801970251998
                            </p>
                            <p className="font-primary text-[12px] tracking-wide text-[#F8F5EF]/60">
                                Karimpur, Kushtia Sadar
                            </p>
                            <p className="font-primary text-[12px] tracking-wide text-[#F8F5EF]/60">
                                Available 24 / 7
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#F8F5EF]/10 pt-6 md:flex-row">
                    <p className="font-primary text-[10px] uppercase tracking-[2px] text-[#F8F5EF]/30">
                        © 2024 Momotaj Clothing Store. All rights reserved.
                    </p>
                    <p className="font-primary text-[10px] uppercase tracking-[2px] text-[#F8F5EF]/30">
                        #BengaliCulture &nbsp;·&nbsp; #TraditionalWear
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
