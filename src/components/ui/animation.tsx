'use client';

import { motion } from 'framer-motion';

export function BottomToTop({
    children,
    className,
    index,
}: { index: number } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SliderTabAnimation({
    children,
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
