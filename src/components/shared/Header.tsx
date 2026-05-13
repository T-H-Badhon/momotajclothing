'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { rightNavItems } from 'src/constants/navitems';
import Sidebar from './Sidebar';

type Subcategory = {
    item?: string;
    path: string;
};

type NavItem = {
    category: string;
    path: string;
    subcategory?: Subcategory[];
};

const DesktopNavItem = ({ item }: { item: NavItem }) => (
    <div className="group relative">
        <Link
            href={item.path}
            className="block py-2 font-primary text-[10.5px] uppercase tracking-[2px] text-bodyText transition-colors duration-200 hover:text-accent"
        >
            {item.category}
        </Link>
        <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        {item.subcategory && item.subcategory.length > 0 && (
            <div className="invisible absolute left-0 top-full z-50 min-w-[180px] border border-border bg-body py-2 opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {item.subcategory.map((sub, i) => (
                    <Link key={i} href={sub.path}>
                        <p className="px-5 py-[7px] font-primary text-[10px] uppercase tracking-[1.5px] text-bodyText transition-colors duration-150 hover:bg-sand hover:text-accent">
                            {sub.item}
                        </p>
                    </Link>
                ))}
            </div>
        )}
    </div>
);

const Header = ({ leftNavs }: { leftNavs: string }) => {
    const leftNavItems: NavItem[] = JSON.parse(leftNavs);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleSidebar = () => setShowSidebar((p) => !p);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = showSidebar ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [showSidebar]);

    return (
        <>
            <header
                className={`sticky top-0 z-50 bg-body border-b border-border transition-shadow duration-300 ${
                    isScrolled ? 'shadow-sm' : ''
                }`}
            >
                <div className="mx-auto flex h-[64px] max-w-[1500px] items-center px-4 md:px-10">
                    {/* Left: hamburger (mobile) or left nav (desktop) */}
                    <div className="flex flex-1 items-center">
                        <button
                            onClick={toggleSidebar}
                            className="p-1 md:hidden"
                            aria-label="Open menu"
                        >
                            <HiOutlineMenuAlt1 className="size-6" />
                        </button>
                        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                            {leftNavItems.map((item, i) => (
                                <DesktopNavItem key={i} item={item} />
                            ))}
                        </nav>
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="flex-shrink-0 px-4 md:px-8">
                        <Image
                            src="/pretty.png"
                            width={180}
                            height={44}
                            className="h-[40px] w-auto object-contain"
                            alt="Momotaj Clothing"
                            priority
                        />
                    </Link>

                    {/* Right nav */}
                    <div className="flex flex-1 items-center justify-end">
                        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                            {rightNavItems.map((item, i) => (
                                <DesktopNavItem key={i} item={item} />
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
            <Sidebar
                toggleSidebar={toggleSidebar}
                showSidebar={showSidebar}
                leftNavItems={leftNavItems}
            />
        </>
    );
};

export default Header;
