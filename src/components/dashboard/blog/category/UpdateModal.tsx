'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LuPenLine, LuX } from 'react-icons/lu';
import { toast } from 'sonner';
import { updateCategory } from 'src/components/actions/actionArticles';

const UpdateCategoryModal = ({ categoryStr }: { categoryStr: string }) => {
    const category = JSON.parse(categoryStr);
    const [name, setName] = useState(category?.name);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await updateCategory({ name }, category?._id);
        if (result.success) {
            setName('');
            setIsModalOpen(false);
            toast.success('Category update successfully');
        } else {
            // If there was an error
            console.error('Error creating category:', result.error);
            toast.error('There was an error updating category', {
                description: 'Category with this name probably already exists',
            });
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded bg-emerald-400/[0.1] px-3 py-2 text-emerald-400"
            >
                <LuPenLine />
            </button>

            <AnimatePresence>
                <motion.div
                    className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-800 bg-opacity-50 ${
                        isModalOpen ? 'block' : 'hidden'
                    }`}
                >
                    <motion.div
                        className="relative z-[60] max-w-[500px] rounded bg-white p-5 text-sm font-light text-neutral-800"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <LuX className="text-red-300" />
                        </button>
                        <h4 className="mb-3 text-lg font-medium">
                            Add New Category
                        </h4>

                        <h6 className="-mt-1.5 mb-3.5 text-gray-500">
                            {' '}
                            Add a new category from here{' '}
                        </h6>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="mb-6">
                                <label className="mb-2 inline-block">
                                    Category
                                </label>

                                <input
                                    className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                                    placeholder="Name of the Category"
                                    style={{
                                        display: 'initial',
                                    }}
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-block h-9 cursor-pointer items-start rounded border-2 border-solid border-orange-300 bg-orange-300 px-3 py-1.5 text-center align-middle text-white"
                            >
                                Update Category
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default UpdateCategoryModal;
