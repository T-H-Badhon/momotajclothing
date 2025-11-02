"use client";

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import useDataStore from 'src/hooks/useData';
import useModalStore from 'src/hooks/useModal';
import { updateSlider } from '../actions/sliderActions';
import { toast } from 'sonner';
import { LuX } from 'react-icons/lu';
import InputImageField from '../ui/InputImage';
import { fileToBase64 } from 'src/utils/FileToBase64';

const UpdateSlider = () => {
    const { toggleModal, openUpdateSliderModal } = useModalStore();
    const { sliderData, setSliderData } = useDataStore();
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState(sliderData || {
        title: '',
        subtitle: '',
        image: '',
    })

    useEffect(() => {
        setFormData(sliderData);
    }, [sliderData]);

    const handleClick = () => {
        toggleModal('openUpdateSliderModal');
        setSliderData(null);
        setBase64Image(null);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const sliderId = sliderData?._id;

            const data: any = {
                title: formData.title,
                subtitle: formData.subtitle,
            };
            if (base64Image) {
                data.image = base64Image
            }
            const response = await updateSlider(sliderId, data);
            if (response.success) {
                formRef.current?.reset();
                toast.success('Slider updated');
                handleClick();
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error('Error updating Slider:', error);
            toast.error('There was an error updating the slider info');
        }
    };

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

    return (
        <>
            <motion.div
                className={`fixed inset-0 z-50 overflow-hidden ${openUpdateSliderModal ? 'block' : 'hidden'
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
                        <div className="relative w-full max-w-xl rounded-md bg-white p-8 shadow-md">
                            <h4 className='text-xl font-semibold'>
                                Update Slider
                            </h4>
                            <span
                                className="absolute right-5 top-5 cursor-pointer text-gray-600"
                                onClick={handleClick}
                            >
                                <LuX className="text-xl text-slate-700" />
                            </span>

                            <form ref={formRef} onSubmit={handleSubmit} className="mt-6">
                                <div className="flex w-full items-start gap-2">
                                    <div className="mb-6 w-full">
                                        <label className="mb-2 inline-block">Title</label>

                                        <input
                                            className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                                            placeholder="Title"
                                            style={{
                                                display: 'initial',
                                            }}
                                            value={formData?.title}
                                            onChange={handleChange}
                                            type="text"
                                            name="title"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6 w-full">
                                        <label className="mb-2 inline-block">
                                            Sub-Title
                                        </label>

                                        <input
                                            className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                                            placeholder="sub-title"
                                            style={{
                                                display: 'initial',
                                            }}
                                            onChange={handleChange}
                                            value={formData?.subtitle}
                                            name="subtitle"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full items-start gap-2">
                                    <div className="mb-6 w-full">
                                        <InputImageField
                                            label="Slider Image"
                                            handleImageChange={handleImageChange}
                                            base64Image={base64Image}
                                            imagePath={
                                                process.env
                                                    .NEXT_PUBLIC_MEDIA +
                                                sliderData?.image
                                            }
                                            removeSelectedImage={removeSelectedImage}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="rounded-md bg-[#F09234] w-full px-4 py-2 text-white hover:bg-[#F09234]/80"
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

export default UpdateSlider;