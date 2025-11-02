'use client';
import React, { useState } from 'react';
import { LuX } from 'react-icons/lu';

const InputImageField = ({
    label,
    handleImageChange,
    removeSelectedImage,
    base64Image,
    imagePath,
    name = 'image',
}: any) => {
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

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
                {label}
            </label>

            <input
                // name={name}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files as FileList)}
                style={{ display: 'none' }}
                id="image-upload"
            />
            {/* Hidden input field to hold image */}
            <input type="hidden" name={name} value={base64Image} />

            <div
                onClick={() => document.getElementById('image-upload')?.click()}
                className={`flex min-h-[12.50rem] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-lg text-slate-500 ${isDraggingOver ? 'bg-gray-200' : ''
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
            </div>

            {base64Image && (
                <div className='mt-2'>
                    <h5>Selected Image:</h5>
                    <div className="relative h-[150px] w-[200px]">
                        <img
                            src={base64Image}
                            className="absolute inset-0 h-full w-full object-cover"
                            alt="Selected Image"
                        />
                        <button
                            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                            onClick={(e) => {
                                e.preventDefault();
                                removeSelectedImage();
                            }}
                        >
                            <LuX size={16} />
                        </button>
                    </div>
                </div>
            )}

            {imagePath && !base64Image && (
                <div className='mt-2'>
                    <h5>Uploaded Image:</h5>
                    <div className="relative h-[150px] w-[200px]">
                        <img
                            src={imagePath}
                            className="absolute inset-0 h-full w-full object-cover"
                            alt="Selected Image"
                        />
                        {/* <button
                            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                            onClick={(e) => {
                                e.preventDefault();
                                removeSelectedImage();
                            }}
                        >
                            <LuX size={16} />
                        </button> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputImageField;
