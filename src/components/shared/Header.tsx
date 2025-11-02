'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { rightNavItems } from 'src/constants/navitems';
import Sidebar from './Sidebar';

type Subcategory = {
    item: string;
    path: string;
};

type NavItem = {
    category: string;
    path: string;
    subcategory: Subcategory[];
};

const Header = ({ leftNavs }: any) => {
    const leftNavItems: NavItem[] = JSON.parse(leftNavs);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [showNavbar, setShowNavbar] = useState<boolean>(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleScroll = useCallback(() => {
        if (typeof window !== undefined) {
            if (window.scrollY >= 150) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
        if (showSidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [handleScroll, showSidebar]);

    return (
        <>
            {/* nav */}
            <div className="mx-auto flex h-[60px] max-w-[1500px] items-center justify-center px-4 shadow-sm md:h-[182px] md:px-10 md:py-5 lg:h-[112px] xl:h-[102px]">
                {/* nav contents */}
                <div className="flex w-full items-center justify-between">
                    <div className="w-[87px] md:w-[110px]">
                        <div className="flex w-full items-center justify-start">
                            <button
                                onClick={toggleSidebar}
                                className="md:hidden"
                            >
                                <HiOutlineMenuAlt1 className="size-[30px] md:size-7" />
                            </button>
                            {/* <button className="hidden py-[7.5px] md:block">
                                <CiSearch className="size-[30px] md:size-7" />
                            </button> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {/* left nav items container */}
                        <nav className="hidden items-center justify-center gap-x-7 md:block lg:flex lg:flex-wrap lg:px-16 xl:flex-nowrap xl:gap-x-7 xl:px-5">
                            {leftNavItems.map((each, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer text-center"
                                >
                                    <li className="group relative inline-block list-none py-[7px] text-[13px] uppercase">
                                        <Link href={each?.path} className="">
                                            {each?.category}
                                        </Link>

                                        <span className="absolute bottom-0 left-0 right-0 z-20 h-[1.5px] w-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black"></span>

                                        {/* Dropdown content */}
                                        <div
                                            className={`${each?.subcategory ? 'invisible absolute -left-5 top-7 z-10 w-48 bg-body p-5 opacity-0 shadow-md transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100' : ''} `}
                                        >
                                            {each?.subcategory?.map((subs) => (
                                                <Link
                                                    key={subs?.item}
                                                    href={subs?.path}
                                                >
                                                    <p className="py-2 text-start">
                                                        {subs?.item}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </nav>

                        {/* logo */}
                        <Link href="/" className="md:px-10 lg:px-0 xl:px-10">
                            <div className="h-[60px]">
                                <Image
                                    src="/pretty.png"
                                    width={300}
                                    height={60}
                                    className="h-full w-full"
                                    alt=""
                                    priority
                                />
                            </div>
                        </Link>

                        {/* right nav items container */}
                        <nav className="hidden items-center justify-center gap-x-7 md:block lg:flex lg:flex-wrap lg:px-16 xl:flex-nowrap xl:gap-x-7 xl:px-5">
                            {rightNavItems.map((each, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer text-center"
                                >
                                    <li className="group relative inline-block list-none py-[7px] text-[13px] uppercase">
                                        <Link href={each?.path}>
                                            {each?.category}
                                        </Link>
                                        <span className="absolute bottom-0 left-0 right-0 z-20 h-[1.5px] w-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black"></span>

                                        {/* Dropdown content */}
                                        <div
                                            className={`${each?.subcategory ? 'absolute -left-5 top-10 z-30 hidden w-48 bg-body px-5 shadow-md transition-all duration-300 ease-in-out group-hover:block' : ''} `}
                                        >
                                            {each?.subcategory?.map((subs) => (
                                                <link
                                                    key={subs?.path}
                                                    href={subs?.path}
                                                >
                                                    <p className="py-2 text-start">
                                                        {subs?.item}
                                                    </p>
                                                </link>
                                            ))}
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </nav>
                    </div>
                    <div className="w-[87px] md:w-[110px]">
                        <div className="flex w-full items-center justify-end">
                            {/* <Link href="/login" className="hidden md:block">
                                <p className="px-[7.5px] py-[7.5px] md:px-[12px]">
                                    <SlUser className="size-7 opacity-70" />
                                </p>
                            </Link>
                            <Link href="#" className="inline-block md:hidden">
                                <p className="px-[7.5px] py-[7.5px] md:px-[12px]">
                                    <CiSearch className="size-7" />
                                </p>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* fixed nav */}
            <div
                className={`fixed left-0 right-0 flex h-[60px] w-full items-center justify-center bg-body ${showNavbar ? 'top-0 z-50' : '-top-[200px] z-0'} shadow-sm transition-all duration-300 ease-in md:h-[162px] md:py-5 lg:h-[92px] xl:h-[82px]`}
            >
                <div className={`mx-auto w-full max-w-[1500px] px-4 md:px-10`}>
                    {/* nav contents */}
                    <div className="flex w-full items-center justify-between">
                        <div className="w-[87px] md:w-[110px]">
                            <div className="flex w-full items-center justify-start">
                                <button
                                    onClick={toggleSidebar}
                                    className="md:hidden"
                                >
                                    <HiOutlineMenuAlt1 className="size-[30px] md:size-7" />
                                </button>
                                {/* <button className="hidden py-[7.5px] md:block">
                                    <CiSearch className="size-[30px] md:size-7" />
                                </button> */}
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            {/* left nav items container */}
                            <nav className="hidden items-center justify-center gap-x-7 md:block lg:flex lg:flex-wrap lg:px-16 xl:flex-nowrap xl:gap-x-7 xl:px-5">
                                {leftNavItems.map((each, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer text-center"
                                    >
                                        <li className="group relative inline-block list-none py-[7px] text-[13px] uppercase">
                                            <Link
                                                href={each?.path}
                                                className=""
                                            >
                                                {each?.category}
                                            </Link>

                                            <span className="absolute bottom-0 left-0 right-0 z-20 h-[1.5px] w-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black"></span>

                                            {/* Dropdown content */}
                                            <div
                                                className={`${each?.subcategory ? 'invisible absolute -left-5 top-7 z-10 w-48 bg-body p-5 opacity-0 shadow-md transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100' : ''} `}
                                            >
                                                {each?.subcategory?.map(
                                                    (subs) => (
                                                        <Link
                                                            key={subs?.item}
                                                            href={subs?.path}
                                                        >
                                                            <p className="py-2 text-start">
                                                                {subs?.item}
                                                            </p>
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        </li>
                                    </div>
                                ))}
                            </nav>

                            {/* logo */}
                            <Link
                                href="/"
                                className="md:px-10 lg:px-0 xl:px-10"
                            >
                                <div className="h-[60px]">
                                    <Image
                                        src="/pretty.png"
                                        width={300}
                                        height={50}
                                        className="h-full w-full"
                                        alt=""
                                        priority
                                    />
                                </div>
                            </Link>

                            {/* right nav items container */}
                            <nav className="hidden items-center justify-center gap-x-7 md:block lg:flex lg:flex-wrap lg:px-16 xl:flex-nowrap xl:gap-x-7 xl:px-5">
                                {rightNavItems.map((each, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer text-center"
                                    >
                                        <li className="group relative inline-block list-none py-[7px] text-[13px] uppercase">
                                            <Link href={each?.path}>
                                                {each?.category}
                                            </Link>
                                            <span className="absolute bottom-0 left-0 right-0 z-20 h-[1.5px] w-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black"></span>

                                            {/* Dropdown content */}
                                            <div
                                                className={`${each?.subcategory ? 'absolute -left-5 top-10 z-30 hidden w-48 bg-body px-5 shadow-md transition-all duration-300 ease-in-out group-hover:block' : ''} `}
                                            >
                                                {each?.subcategory?.map(
                                                    (subs) => (
                                                        <link
                                                            key={subs?.path}
                                                            href={subs?.path}
                                                        >
                                                            <p className="py-2 text-start">
                                                                {subs?.item}
                                                            </p>
                                                        </link>
                                                    ),
                                                )}
                                            </div>
                                        </li>
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <div className="w-[87px] md:w-[110px]">
                            <div className="flex w-full items-center justify-end">
                                {/* <Link href="/login" className="hidden md:block">
                                    <p className="px-[7.5px] py-[7.5px] md:px-[12px]">
                                        <SlUser className="size-7 opacity-70" />
                                    </p>
                                </Link> */}
                                {/* <Link
                                    href="#"
                                    className="inline-block md:hidden"
                                >
                                    <p className="px-[7.5px] py-[7.5px] md:px-[12px]">
                                        <CiSearch className="size-7" />
                                    </p>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar
                toggleSidebar={toggleSidebar}
                showSidebar={showSidebar}
                leftNavItems={leftNavItems}
            />
        </>
    );
};

export default Header;
