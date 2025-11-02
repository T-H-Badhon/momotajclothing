'use client';

import { AnimatePresence, motion } from 'framer-motion';

const Container = ({ login }: { login: React.ReactNode }) => {
    return (
        <AnimatePresence mode="wait" initial={false}>
            <div className="screen-h mx-auto flex max-w-md flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {login}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Container;
