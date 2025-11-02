'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { LuX } from 'react-icons/lu';
import { toast } from 'sonner';
import { updateCategory } from 'src/components/actions/actionCategories';
import useDataStore from 'src/hooks/useData';
import useModalStore from 'src/hooks/useModal';

const UpdatedCategoryInfoModal = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const { toggleModal, openUpdateCategoryModal } = useModalStore();
    const { categoryData } = useDataStore();

    const handleClick = () => {
        toggleModal('openUpdateCategoryModal');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const categoryId = categoryData?._id;
            const formData = new FormData(e.target);
            const updatedCategoryInfo = {
                name: formData.get('name'),
                sub_category: formData.get('sub_category'),
                // image: formData.get("image"),
            };

            const response = await updateCategory(
                categoryId,
                updatedCategoryInfo,
            );
            if (response.success) {
                // If the update was successful
                toggleModal('openUpdateCategoryModal');
                formRef.current?.reset();
                toast.success('Info updated');
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('There was an error updating the category info');
        }
    };

    return (
        <>
            <motion.div
                className={`fixed inset-0 z-50 overflow-hidden ${
                    openUpdateCategoryModal ? 'block' : 'hidden'
                }`}
            >
                <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={handleClick}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 1, ease: 'easeInOut' },
                    }}
                    exit={{ opacity: 0 }}
                ></motion.div>

                <motion.div
                    className="fixed inset-0 z-10 overflow-y-auto"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 1, ease: 'easeInOut' },
                    }}
                    exit={{ scale: 0.5, opacity: 0 }}
                >
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="relative w-full max-w-md rounded-md bg-white p-8 shadow-md">
                            <span
                                className="absolute right-1 top-1 cursor-pointer text-gray-600"
                                onClick={handleClick}
                            >
                                <LuX className="text-xl text-red-300" />
                            </span>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="mb-1 block"
                                        htmlFor="categoryname"
                                    >
                                        Category Name:
                                    </label>
                                    <input
                                        className="w-full rounded-md border px-3 py-2"
                                        type="text"
                                        name="name"
                                        id="categoryname"
                                        defaultValue={categoryData?.name}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="mb-1 block"
                                        htmlFor="description"
                                    >
                                        Sub-Category:
                                    </label>
                                    <textarea
                                        className="w-full rounded-md border px-3 py-2"
                                        name="sub_category"
                                        id="sub_category"
                                        defaultValue={
                                            categoryData?.sub_category
                                        }
                                    />
                                </div>

                                <button
                                    className="rounded-md bg-[#5BA497] px-4 py-2 text-white hover:bg-[#5BA497]"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default UpdatedCategoryInfoModal;
