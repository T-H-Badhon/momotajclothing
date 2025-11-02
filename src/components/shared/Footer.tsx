'use client';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { SlArrowDown } from 'react-icons/sl';
import { TfiEmail } from 'react-icons/tfi';

interface AccordionItemProps {
    header: string;
    initialEntered?: boolean;
    children: React.ReactNode;
}

const Footer = () => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div className="">
            <div className="py-[40px] md:border-t md:py-[60px]">
                <div className="mx-auto max-w-[1500px] md:px-10">
                    {/* medium up devices footer */}
                    <div className="hidden gap-y-10 px-4 md:grid md:grid-cols-2 lg:flex lg:gap-y-0">
                        <div className="space-y-5 lg:w-[30%]">
                            {/* <h2 className="text-xs uppercase tracking-widest">
                                Collections
                            </h2>
                            <ul className="flex w-fit flex-col gap-y-2 text-sm">
                                <Link href="/collections/women-yoga-sets">
                                    <li>Women</li>
                                </Link>
                                <Link href="/collections/men-vest">
                                    <li>Men</li>
                                </Link>

                                <Link href="/collections/kids-yoga-wear">
                                    <li>Kids</li>
                                </Link>
                                <Link href="/collections/swimwear-swimwear">
                                    <li>Swimwear</li>
                                </Link>
                            </ul> */}
                        </div>
                        <div className="space-y-5 lg:w-[30%]">
                            <h2 className="text-xs uppercase tracking-widest">
                                Company
                            </h2>
                            <ul className="flex w-fit flex-col gap-y-2 text-sm">
                                <Link href="/about">
                                    <li>About Us</li>
                                </Link>
                                <Link href="/contact">
                                    <li>Contact</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="space-y-5 lg:w-[25%] xl:w-[30%]">
                            <h2 className="text-xs uppercase tracking-widest">
                                CONTACT US
                            </h2>
                            <p className="text-[13px]">
                                Please call for any query <br />
                                +8801970251998
                            </p>
                        </div>
                    </div>
                    <p className="pt-5 text-center text-xs tracking-widest">
                        @2024 Momotaj clothing store.
                    </p>
                </div>
            </div>
        </div>
    );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ header, ...rest }) => {
    return (
        <Item
            {...rest}
            header={({ state: { isEnter } }) => (
                <div className="relative flex w-full items-center justify-between">
                    <span className="mx-auto text-xs tracking-[4px]">
                        {header}
                    </span>
                    <div className="absolute right-0 flex h-[32px] items-center justify-end px-[15px]">
                        <SlArrowDown
                            className={`size-[10px] transition-transform duration-200 ease-out ${
                                isEnter ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                </div>
            )}
            className="border-t py-[15px]"
            buttonProps={{
                className: ({}) =>
                    `flex w-full text-center uppercase text-[15px] tracking-widest items-center justify-between`,
            }}
            contentProps={{
                className: 'transition-height duration-300 ease-in-out',
            }}
            panelProps={{ className: ` py-5 text-center uppercase` }}
        />
    );
};

export default Footer;
