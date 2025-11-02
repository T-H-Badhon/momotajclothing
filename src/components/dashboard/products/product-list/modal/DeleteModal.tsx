'use client';

import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { deleteProduct } from 'src/components/actions/actionProducts';
import useDataStore from 'src/hooks/useData';
import useModalStore from 'src/hooks/useModal';

const DeleteProductModal = () => {
    const { openDeleteProductModal, toggleModal } = useModalStore();
    const { productData, setProductData } = useDataStore();

    const handleConfirm = async () => {
        try {
            const productId = productData?._id;
            const result = await deleteProduct(productId);
            if (result.success) {
                toast.success('Product deleted successfully!');
                setProductData(null);
            } else {
                toast.error('Failed to delete category: ' + result.error);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('An error occurred while deleting the category.');
        }
        toggleModal('openDeleteProductModal');
    };

    const handleClose = () => {
        toggleModal('openDeleteProductModal');
        setProductData(null);
    };

    return (
        <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 ${
                openDeleteProductModal ? 'block' : 'hidden'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: openDeleteProductModal ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="modal-container z-50 w-96 rounded-lg bg-white p-4 shadow-lg">
                <span
                    className="modal-close absolute right-0 top-0 m-4 cursor-pointer"
                    onClick={handleClose}
                >
                    &times;
                </span>
                <h2 className="mb-4 text-lg font-bold">Confirm Delete</h2>
                <p className="mb-4 text-sm">
                    Are you sure you want to delete this product?
                </p>
                <div className="flex justify-end">
                    <button
                        className="mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default DeleteProductModal;
