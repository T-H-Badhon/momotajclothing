'use client';

import { motion } from 'framer-motion';
import useModalStore from 'src/hooks/useModal';

const ViewProductModal = () => {
    const { viewProductModalOpen, toggleModal } = useModalStore();

    const handleClose = () => {
        toggleModal('viewProductModalOpen');
    };

    return (
        <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 ${
                viewProductModalOpen ? 'block' : 'hidden'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: viewProductModalOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                <button
                    className="absolute right-4 top-4 text-lg text-gray-500 hover:text-gray-600"
                    onClick={handleClose}
                >
                    &times;
                </button>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                    Details
                </h2>
                <div>
                    <div className="relative flex w-full items-start rounded-xl border-2 border-solid border-slate-200 bg-white p-5">
                        <div className="flex flex-col items-center gap-1"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ViewProductModal;
