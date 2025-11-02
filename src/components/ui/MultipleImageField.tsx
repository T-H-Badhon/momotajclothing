'use client';

import axios from 'axios';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import React, { useState } from 'react';
import { LuX } from 'react-icons/lu';
import { TFormData } from '../dashboard/products/product-add/Section';

const MultipleImageField = ({
    formData,
    setFormData,
}: {
    formData: TFormData;
    setFormData: any;
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

    const removeSelectedImage: React.MouseEventHandler<
        HTMLButtonElement
    > = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const index = Number(event.currentTarget.dataset.index);

        const updatedImages = formData.images!.filter(
            (_: any, i: any) => i !== index,
        );
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            images: updatedImages,
        }));
    };

    const handleImageChange = async (files: any) => {
        setIsUploading(true); // Start uploading state
        const uploadedImages: string[] = [];

        const compressImage = (file: File): Promise<File> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target!.result as string;

                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        const maxWidth = 1920; // Adjust this as needed
                        const maxHeight = 1080; // Adjust this as needed

                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        if (ctx) {
                            ctx.drawImage(img, 0, 0, width, height);
                        }

                        canvas.toBlob(
                            (blob) => {
                                if (blob) {
                                    resolve(
                                        new File([blob], file.name, {
                                            type: 'image/jpeg',
                                        }),
                                    );
                                } else {
                                    reject(new Error('Blob creation failed'));
                                }
                            },
                            'image/jpeg',
                            0.7, // Adjust quality as needed
                        );
                    };
                };

                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        };

        for (const file of files) {
            if (file.size < 700 * 1024) {
                // File is already small enough, upload directly
                const im = await uploadImageFile(file);
                uploadedImages.push(im);
            } else {
                // Compress large files before upload
                const compressedFile = await compressImage(file);
                const im = await uploadImageFile(compressedFile);
                uploadedImages.push(im);
            }
        }

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            images: uploadedImages,
        }));
        setIsUploading(false); // End uploading state
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        const files = e.dataTransfer.files;
        handleImageChange(files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDraggingOver(false);
    };

    return (
        <div>
            <label
                htmlFor="image-upload"
                className="mb-2 inline-block cursor-pointer font-medium"
            >
                Product Images
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files as FileList)}
                style={{ display: 'none' }}
                id="image-upload"
                multiple
            />

            <div
                onClick={() => document.getElementById('image-upload')?.click()}
                className={`relative flex min-h-[12.50rem] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-lg text-slate-500 ${
                    isDraggingOver ? 'bg-gray-200' : ''
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="w-full py-5 text-center">
                    <div className="mb-3">
                        <svg
                            className="m-auto h-12 w-12"
                            fill="rgb(226, 232, 240)"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
                                fill="rgb(226, 232, 240)"
                                stroke="#64748b"
                            />
                            <path
                                d="M12 12v9"
                                fill="rgb(226, 232, 240)"
                                stroke="#64748b"
                            />
                            <path
                                d="m16 16-4-4-4 4"
                                fill="rgb(226, 232, 240)"
                                stroke="#64748b"
                            />
                        </svg>
                    </div>

                    <h5 className="text-base">
                        Drag and drop your product image or browse your product
                        image
                    </h5>
                </div>
                {isUploading && (
                    <div className="absolute z-50 flex h-full w-full items-center justify-center bg-gray-300/[.5]">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-500 border-r-transparent"></div>
                    </div>
                )}
            </div>

            {formData?.images?.length !== 0 && (
                <div>
                    <h5 className="my-2">Selected Image:</h5>
                    <Reorder.Group
                        values={formData?.images || []}
                        onReorder={(v) => {
                            setFormData((prevFormData: any) => ({
                                ...prevFormData,
                                images: v,
                            }));
                        }}
                        as="div"
                        axis="x"
                        style={{ overflow: 'visible' }}
                        className="flex gap-5 overflow-x-auto"
                    >
                        <AnimatePresence initial={false}>
                            {formData?.images?.map((im, index) => (
                                <Reorder.Item
                                    key={im}
                                    value={im}
                                    as="div"
                                    style={{
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundImage: `url(${process.env.NEXT_PUBLIC_MEDIA}${im})`,
                                    }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        backgroundColor: '#f3f3f3',
                                        y: 0,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20,
                                        transition: { duration: 0.3 },
                                    }}
                                    whileDrag={{ backgroundColor: '#e3e3e3' }}
                                    className="relative z-[1000] h-[120px] w-[120px]"
                                >
                                    {/* <motion.img
                                            key={im}
                                            src={process.env.NEXT_PUBLIC_MEDIA + im}
                                            className="w-full h-full aspect-square object-cover rounded"
                                            alt="Selected Image"
                                        /> */}
                                    <motion.button
                                        key={im}
                                        data-index={index}
                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                                        onClick={removeSelectedImage}
                                    >
                                        <LuX size={16} />
                                    </motion.button>
                                </Reorder.Item>
                            ))}
                        </AnimatePresence>
                    </Reorder.Group>
                </div>
            )}
        </div>
    );
};

export const uploadImageFile = async (data: any) => {
    // console.log(data);

    const form = new FormData();
    form.append('file', data, 'image.png');
    // console.log(data);

    try {
        const response = await axios.post(
            'https://www.prettysportswear.com/files/upload',
            form,
            {
                // const response = await axios.post("https://iftheherbfitz.com/files/upload", form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

export default MultipleImageField;
