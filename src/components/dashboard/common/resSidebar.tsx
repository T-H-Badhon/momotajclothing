'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createElement } from 'react';
import { SheetClose } from 'src/components/ui/sheet';
import { cn } from 'src/utils/cn';
import useNavLinks from './useNavLinks';

const ResSidebar = () => {
    const navLinks = useNavLinks();
    const router = useRouter();

    return (
        <nav className="flex flex-col overflow-y-auto py-4">
            <ul role="list" className="flex w-full flex-col space-y-1">
                {navLinks.map(({ name, icon, href, isActive }) => (
                    <SheetClose key={name} className="w-full">
                        <li key={name} className="relative">
                            <button
                                onClick={() => router.push(href)}
                                className="group relative z-10 flex gap-2.5 px-4 py-2.5"
                            >
                                {createElement(icon, {
                                    size: 20,
                                    className: cn(
                                        'transition-colors',
                                        isActive
                                            ? 'text-teal'
                                            : 'text-muted-foreground group-hover:text-teal',
                                    ),
                                })}
                                <h6
                                    className={cn(
                                        isActive ? '' : 'text-muted-foreground',
                                    )}
                                >
                                    {name}
                                </h6>
                            </button>
                            {isActive && (
                                <motion.div
                                    layoutId="DashboardItem"
                                    className="bg-muted border-teal absolute inset-0 size-full border-l-[3px]"
                                />
                            )}
                        </li>
                    </SheetClose>
                ))}
            </ul>
        </nav>
    );
};

export default ResSidebar;
