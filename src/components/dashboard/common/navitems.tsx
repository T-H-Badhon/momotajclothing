'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { createElement } from 'react';
import { cn } from 'src/utils/cn';
import useNavLinks from './useNavLinks';

export default function NavItems() {
    const navLinks = useNavLinks();

    return navLinks.map(({ name, icon, href, isActive }) => (
        <li key={name} className="relative">
            <Link
                href={href}
                className="group relative z-10 flex gap-2.5 px-4 py-2.5"
            >
                {createElement(icon, {
                    size: 20,
                    className: cn(
                        'transition-colors',
                        isActive
                            ? 'text-[hsl(186,42%,14%)]'
                            : 'text-[hsl(240,3.8%,46.1%)] group-hover:text-[hsl(186,42%,14%)]',
                    ),
                })}
                <h6
                    className={cn(isActive ? '' : 'text-[hsl(240,3.8%,46.1%)]')}
                >
                    {name}
                </h6>
            </Link>

            {isActive && (
                <motion.div
                    layoutId="DashboardItem"
                    className="absolute inset-0 size-full border-l-[3px] border-[hsl(186,42%,14%)] bg-[hsl(240,4.8%,95.9%)]"
                />
            )}
        </li>
    ));
}
