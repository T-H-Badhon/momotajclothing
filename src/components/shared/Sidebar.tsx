import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { SlArrowDown } from 'react-icons/sl';
import { rightNavItems } from 'src/constants/navitems';

interface AccordionItemProps {
    item: any;
    header: string;
    showSidebar: boolean;
    initialEntered?: boolean;
    children: React.ReactNode;
}

type Subcategory = {
    item?: string;
    path?: string;
};

type NavItem = {
    category: string;
    path: string;
    subcategory?: Subcategory[];
};

interface SocialMediaLinkProps {
    href: string;
    icon: React.ReactNode;
}

const Sidebar = ({
    toggleSidebar,
    showSidebar,
    leftNavItems,
}: {
    toggleSidebar: () => void;
    showSidebar: boolean;
    leftNavItems: NavItem[];
}) => {
    const navItems: NavItem[] = [...leftNavItems, ...rightNavItems];

    return (
        <>
            <div
                className={`fixed bottom-0 left-0 top-0 z-[60] h-[100dvh] bg-body ${showSidebar ? 'w-[75dvw] transition-all duration-300 ease-in-out sm:w-[48dvw] md:w-0' : 'z-0 w-0 transition-all duration-200'}`}
            >
                <div
                    className={`h-full transition-opacity delay-300 duration-300 ${
                        showSidebar ? 'block' : 'invisible opacity-0'
                    }`}
                >
                    <div className={`flex h-[70px] px-[15px]`}>
                        <button
                            onClick={toggleSidebar}
                            className="my-auto ml-auto p-[15px] md:hidden"
                        >
                            <RxCross1 className="size-5 opacity-50" />
                        </button>
                    </div>

                    <div className="h-dvh overflow-y-auto">
                        {navItems.slice(0, 7).map((each, index) => (
                            <div key={index} className="px-[15px]">
                                <Accordion
                                    transition
                                    transitionTimeout={200}
                                    allowMultiple
                                >
                                    <AccordionItem
                                        item={each}
                                        header={each?.category}
                                        initialEntered={false}
                                        hasSubcategory={!!each.subcategory}
                                        showSidebar={showSidebar}
                                    >
                                        {each.subcategory &&
                                            each?.subcategory.map(
                                                (sub, subIndex) => (
                                                    <Link
                                                        href={
                                                            sub?.path as string
                                                        }
                                                        key={subIndex}
                                                        onClick={toggleSidebar}
                                                        className=" "
                                                    >
                                                        <ul
                                                            className={`py-[7.5px]`}
                                                        >
                                                            <li>{sub.item}</li>
                                                        </ul>
                                                    </Link>
                                                ),
                                            )}
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        ))}

                        <Link href="/login" className="">
                            <p
                                className={`transition-transform duration-700 ease-in-out ${showSidebar ? 'translate-y-0 delay-200' : 'translate-y-6'} overflow-hidden border-t border-t-gray-200 px-[15px] pb-[5px] pt-5 text-sm`}
                            >
                                Log in
                            </p>
                        </Link>

                        <div
                            className={`grid grid-cols-3 items-center justify-center overflow-hidden p-[15px] transition-transform duration-700 ease-in-out ${showSidebar ? 'translate-y-0 delay-200' : 'translate-y-6'}`}
                        >
                            <SocialMediaLink
                                href="#"
                                icon={<FaInstagram className="size-5" />}
                            />
                            <SocialMediaLink
                                href="#"
                                icon={<FaFacebookF className="size-5" />}
                            />
                            <SocialMediaLink
                                href="#"
                                icon={<FaYoutube className="size-5" />}
                            />
                            <SocialMediaLink
                                href="#"
                                icon={<FaTiktok className="size-5" />}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* overlay */}
            <div
                onClick={toggleSidebar}
                className={`fixed inset-0 z-50 bg-gray-50 transition-all duration-500 ease-in-out md:hidden ${
                    showSidebar ? 'visible opacity-75' : 'invisible opacity-0'
                } sm:fixed sm:bottom-0 sm:right-0 sm:top-0 sm:h-full sm:w-full md:w-full`}
            />
        </>
    );
};

const AccordionItem: React.FC<
    AccordionItemProps & { hasSubcategory: boolean }
> = ({ item, header, hasSubcategory, showSidebar, ...rest }) => {
    const handleHeaderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        window.location.href = `/${header}`;
    };
    return (
        <div>
            <Item
                {...rest}
                header={({ state: { isEnter } }) => (
                    <div className="flex h-[54px] w-full items-center justify-between border-t">
                        <Link
                            className="h-full flex-1"
                            href={item?.path}
                            onClick={(e) => e.preventDefault()}
                        >
                            <p
                                onClick={handleHeaderClick}
                                className="flex h-full items-center text-[15px]"
                            >
                                {header}
                            </p>
                        </Link>
                        {hasSubcategory ? (
                            <div className="my-auto ml-auto flex h-[30px] items-center justify-center border-l border-l-gray-200 px-[15px]">
                                <SlArrowDown
                                    size={10}
                                    className={`transition-transform duration-300 ease-out ${
                                        isEnter ? 'rotate-180' : ''
                                    }`}
                                />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                )}
                className={`relative overflow-hidden transition-transform duration-700 ease-in-out ${showSidebar ? 'translate-y-0 delay-200' : 'translate-y-6'}`}
                buttonProps={{
                    className: ({ isEnter }) =>
                        `flex w-full text-left  uppercase text-[15px] tracking-widest flex items-center ${hasSubcategory ? 'justify-center' : 'justify-start'}  ${isEnter ? '' : ''}`,
                }}
                contentProps={{
                    className: 'transition-height duration-300 ease-in-out',
                }}
                panelProps={{
                    className: `delay-400 ${hasSubcategory ? 'text-[13.6px] uppercase ' : ''}`,
                }}
            />
        </div>
    );
};

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ href, icon }) => {
    return (
        <Link
            href={href}
            className="mx-auto flex w-full items-center justify-center border border-gray-200 py-2"
        >
            {icon}
        </Link>
    );
};

export default Sidebar;
