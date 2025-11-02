'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { toast } from 'sonner';
import { addCategory } from 'src/components/actions/actionCategories';
import InputImageField from 'src/components/ui/form/InputImage';
import useModalStore from 'src/hooks/useModal';
import { fileToBase64 } from 'src/utils/FileToBase64';

const AddCategoryModal = () => {
    const { toggleModal, openAddCategoryModal } = useModalStore();
    const formRef = useRef<HTMLFormElement>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const handleImageChange = async (files: any) => {
        if (files && files.length > 0) {
            const selectedFile = files[0];
            try {
                const base64String = await fileToBase64(selectedFile);
                setBase64Image(base64String as string);
            } catch (error) {
                console.error('Error converting image to base64:', error);
            }
        }
    };

    const removeSelectedImage = () => {
        setBase64Image(null);
    };

    const handleClose = () => {
        toggleModal('openAddCategoryModal');
        formRef.current?.reset();
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const categoryInfo = {
                headline: formData.get('headline') as string,
                name: formData.get('name') as string,
                sub_category: formData.get('sub_category') as any,
                image: base64Image as string,
            };

            const result = await addCategory(categoryInfo);
            if (result.success) {
                toggleModal('openAddCategoryModal');
                formRef.current?.reset();
                toast.success('Category added successfully');
            } else {
                // If there was an error
                console.error('Error creating category:', result.error);
                toast.error('There was an error adding new category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('There was an error adding new category');
        }
    };

    return (
        <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 ${openAddCategoryModal ? 'block' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: openAddCategoryModal ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={handleClose}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <LuX className="text-xl text-red-300" />
                </button>
                <h4 className="mb-3 text-lg font-medium">Add New Category</h4>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-6">
                    <div className="flex w-full items-start gap-2">
                        <div className="mb-6 w-full">
                            <label className="mb-2 inline-block">
                                Category Name
                            </label>

                            <input
                                className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                                placeholder="Name of the Category"
                                style={{
                                    display: 'initial',
                                }}
                                type="text"
                                name="name"
                                required
                            />
                        </div>

                        <div className="mb-6 w-full">
                            <label className="mb-2 inline-block">
                                Sub-Category Name
                            </label>

                            <input
                                className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                                placeholder="sub-category"
                                style={{
                                    display: 'initial',
                                }}
                                name="sub_category"
                                type="text"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex w-full items-start gap-2">
                        <div className="mb-6 w-full">
                            <InputImageField
                                label="Category Image"
                                handleImageChange={handleImageChange}
                                base64Image={base64Image}
                                removeSelectedImage={removeSelectedImage}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="inline-block cursor-pointer items-start rounded bg-[#163133] px-3 py-2 text-center align-middle text-sm text-white"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddCategoryModal;
