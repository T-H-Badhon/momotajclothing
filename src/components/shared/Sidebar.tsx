import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { SlArrowDown } from 'react-icons/sl';
import { rightNavItems } from 'src/constants/navitems';

type Subcategory = {
    item?: string;
    path?: string;
};

type NavItem = {
    category: string;
    path: string;
    subcategory?: Subcategory[];
};

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
            {/* Drawer */}
            <div
                className={`fixed bottom-0 left-0 top-0 z-[60] h-[100dvh] bg-body transition-all duration-300 ease-in-out ${
                    showSidebar ? 'w-[78dvw] sm:w-[50dvw]' : 'w-0'
                }`}
            >
                <div
                    className={`flex h-full flex-col transition-opacity duration-200 ${
                        showSidebar ? 'opacity-100 delay-150' : 'invisible opacity-0'
                    }`}
                >
                    {/* Header */}
                    <div className="flex h-[64px] items-center justify-between border-b border-border px-5">
                        <span className="font-secondary text-[16px] uppercase tracking-[3px] text-bodyText">
                            Menu
                        </span>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 text-bodyText/60 transition-colors hover:text-bodyText"
                        >
                            <RxCross1 className="size-4" />
                        </button>
                    </div>

                    {/* Nav items */}
                    <div className="flex-1 overflow-y-auto px-5">
                        {navItems.slice(0, 7).map((item, i) => (
                            <Accordion key={i} transition transitionTimeout={200}>
                                <SidebarItem
                                    item={item}
                                    hasSubcategory={!!item.subcategory?.length}
                                    toggleSidebar={toggleSidebar}
                                />
                            </Accordion>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-border px-5 py-5">
                        <div className="mb-4 flex gap-3">
                            <Link
                                href="#"
                                className="flex h-8 w-8 items-center justify-center border border-border text-bodyText/60 transition-colors hover:border-accent hover:text-accent"
                            >
                                <FaFacebookF size={11} />
                            </Link>
                            <Link
                                href="#"
                                className="flex h-8 w-8 items-center justify-center border border-border text-bodyText/60 transition-colors hover:border-accent hover:text-accent"
                            >
                                <FaInstagram size={11} />
                            </Link>
                        </div>
                        <Link
                            href="/login"
                            onClick={toggleSidebar}
                            className="font-primary text-[10px] uppercase tracking-[2px] text-bodyText/50 transition-colors hover:text-accent"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div
                onClick={toggleSidebar}
                className={`fixed inset-0 z-50 bg-black/40 transition-all duration-300 ease-in-out md:hidden ${
                    showSidebar ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
            />
        </>
    );
};

const SidebarItem = ({
    item,
    hasSubcategory,
    toggleSidebar,
}: {
    item: NavItem;
    hasSubcategory: boolean;
    toggleSidebar: () => void;
}) => {
    const handleNavigate = () => {
        toggleSidebar();
        window.location.href = item.path;
    };

    return (
        <Item
            header={({ state: { isEnter } }) => (
                <div className="flex h-[50px] w-full items-center justify-between border-b border-border">
                    <button
                        onClick={handleNavigate}
                        className="flex-1 text-left font-primary text-[11px] uppercase tracking-[2px] text-bodyText"
                    >
                        {item.category}
                    </button>
                    {hasSubcategory && (
                        <div className="flex h-full items-center pl-3">
                            <SlArrowDown
                                size={9}
                                className={`transition-transform duration-200 ${
                                    isEnter ? 'rotate-180' : ''
                                }`}
                            />
                        </div>
                    )}
                </div>
            )}
            buttonProps={{
                className: () => 'flex w-full items-center',
            }}
            contentProps={{
                className: 'transition-height duration-200 ease-in-out',
            }}
            panelProps={{ className: 'pl-3 pb-2' }}
        >
            {item.subcategory?.map((sub, i) => (
                <Link
                    key={i}
                    href={sub.path as string}
                    onClick={toggleSidebar}
                    className="block py-2 font-primary text-[10px] uppercase tracking-[1.5px] text-bodyText/60 transition-colors hover:text-accent"
                >
                    {sub.item}
                </Link>
            ))}
        </Item>
    );
};

export default Sidebar;
