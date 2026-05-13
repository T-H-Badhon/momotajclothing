'use client';

import axios from 'axios';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import React, { useState } from 'react';
import { LuLink, LuPlus, LuX } from 'react-icons/lu';
import { toast } from 'sonner';
import { TFormData } from '../dashboard/products/product-add/Section';
import { resolveImage } from 'src/utils/resolve-image';

const MultipleImageField = ({
    formData,
    setFormData,
}: {
    formData: TFormData;
    setFormData: any;
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [urlInput, setUrlInput] = useState('');

    const removeImage: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const index = Number(e.currentTarget.dataset.index);
        setFormData((prev: any) => ({
            ...prev,
            images: (prev.images ?? []).filter((_: any, i: number) => i !== index),
        }));
    };

    const handleImageChange = async (files: FileList | null) => {
        if (!files?.length) return;
        setIsUploading(true);

        const uploadedImages: string[] = [];

        const compressImage = (file: File): Promise<File> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const img = new Image();
                    img.src = ev.target!.result as string;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d')!;
                        let { width, height } = img;
                        const maxW = 1920, maxH = 1080;
                        if (width > height ? width > maxW : height > maxH) {
                            if (width > height) { height *= maxW / width; width = maxW; }
                            else { width *= maxH / height; height = maxH; }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        canvas.toBlob(
                            (blob) => blob
                                ? resolve(new File([blob], file.name, { type: 'image/jpeg' }))
                                : reject(new Error('Blob failed')),
                            'image/jpeg', 0.7,
                        );
                    };
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

        for (const file of Array.from(files)) {
            const toUpload = file.size < 700 * 1024 ? file : await compressImage(file);
            const result = await uploadImageFile(toUpload);
            if (result) uploadedImages.push(result);
        }

        setFormData((prev: any) => ({
            ...prev,
            images: uploadedImages,
        }));
        setIsUploading(false);
    };

    const handleAddUrl = () => {
        const url = urlInput.trim();
        if (!url) return;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            toast.error('Please enter a valid URL starting with http:// or https://');
            return;
        }
        setFormData((prev: any) => ({
            ...prev,
            images: [...(prev.images ?? []), url],
        }));
        setUrlInput('');
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        handleImageChange(e.dataTransfer.files);
    };

    return (
        <div>
            <label className="mb-2 inline-block font-medium">Product Images</label>

            {/* ── File upload area ── */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files)}
                style={{ display: 'none' }}
                id="image-upload"
                multiple
            />
            <div
                onClick={() => document.getElementById('image-upload')?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDraggingOver(false); }}
                className={`relative flex min-h-[12.5rem] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-slate-500 ${
                    isDraggingOver ? 'bg-gray-100' : ''
                }`}
            >
                <div className="py-6 text-center">
                    <svg className="m-auto mb-3 h-12 w-12" fill="rgb(226,232,240)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" fill="rgb(226,232,240)" stroke="#64748b" />
                        <path d="M12 12v9" fill="rgb(226,232,240)" stroke="#64748b" />
                        <path d="m16 16-4-4-4 4" fill="rgb(226,232,240)" stroke="#64748b" />
                    </svg>
                    <p className="text-sm">Drag & drop or click to browse</p>
                </div>
                {isUploading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-md bg-gray-300/50">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-500 border-r-transparent" />
                    </div>
                )}
            </div>

            {/* ── URL input area ── */}
            <div className="mt-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="flex items-center gap-1">
                        <LuLink size={12} /> or paste an image URL
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 rounded-md border-2 border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                    <button
                        type="button"
                        onClick={handleAddUrl}
                        className="flex items-center gap-1 rounded-md border-2 border-blue-400 px-4 py-2 text-sm text-blue-500 transition-colors hover:bg-blue-50"
                    >
                        <LuPlus size={15} /> Add
                    </button>
                </div>
            </div>

            {/* ── Image preview list ── */}
            {!!formData?.images?.length && (
                <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-slate-600">
                        Images ({formData.images.length}) — drag to reorder
                    </p>
                    <Reorder.Group
                        values={formData.images}
                        onReorder={(v) =>
                            setFormData((prev: any) => ({ ...prev, images: v }))
                        }
                        as="div"
                        axis="x"
                        className="flex flex-wrap gap-3"
                    >
                        <AnimatePresence initial={false}>
                            {formData.images.map((im: string, index: number) => (
                                <Reorder.Item
                                    key={im}
                                    value={im}
                                    as="div"
                                    style={{
                                        backgroundImage: `url(${resolveImage(im)})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.15 } }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    className="relative h-[100px] w-[100px] cursor-grab rounded border border-slate-200 bg-slate-100 active:cursor-grabbing"
                                >
                                    <motion.button
                                        type="button"
                                        data-index={index}
                                        onClick={removeImage}
                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                    >
                                        <LuX size={12} />
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

export const uploadImageFile = async (data: File): Promise<string | undefined> => {
    const form = new FormData();
    form.append('file', data, 'image.png');
    try {
        const response = await axios.post(
            'https://www.prettysportswear.com/files/upload',
            form,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

export default MultipleImageField;
