'use client';

import { useState } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { toast } from 'sonner';
import { deleteCategory } from 'src/components/actions/actionArticles';

const DeleteModal = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = async () => {
        const result = await deleteCategory(id);
        if (result?.success) {
            toast.success('Category delete successfully');
            setIsModalOpen(false);
        } else {
            console.error('Error creating category:', result?.error);
            toast.error('There was an error deleting this category');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded bg-rose-500/[0.1] px-3 py-2 text-rose-500"
            >
                <LuTrash2 />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                    <div className="modal-container z-50 w-96 rounded-lg bg-white p-4 shadow-lg">
                        <span
                            className="modal-close absolute right-0 top-0 m-4 cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </span>
                        <h2 className="mb-4 text-lg font-bold">
                            Confirm Delete
                        </h2>
                        <p className="mb-4 text-sm">
                            Are you sure you want to delete this category?
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
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
