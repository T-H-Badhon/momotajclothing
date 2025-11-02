'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'sonner';
import { updateProduct } from 'src/components/actions/actionProducts';
import InputField from 'src/components/ui/InputField';
import InputFieldDropdown from 'src/components/ui/InputFieldDropdown';
import MultipleImageField from 'src/components/ui/MultipleImageField';
import useDataStore from 'src/hooks/useData';
import useModalStore from 'src/hooks/useModal';
import { TFormData } from '../../product-add/Section';

const sizeOptions = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: '2XL', label: '2XL' },
    { value: '3XL', label: '3XL' },
];

const colorsOptions = [
    { value: 'Black', label: 'Black' },
    { value: 'White', label: 'White' },
    { value: 'Blue', label: 'Blue' },
    { value: 'Pink', label: 'Pink' },
    { value: 'Brown', label: 'Brown' },
];

const EditModal = ({ allCategoriesData }: any) => {
    const { toggleModal, openUpdateProductModal } = useModalStore();
    const { productData, setProductData } = useDataStore();
    const [formData, setFormData] = useState<TFormData | null>(productData);
    const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
    const [selectedColors, setSelectedColors] = useState<any[]>([]);

    const formattedCAtegory = JSON.parse(allCategoriesData);

    const cats = [...new Set(formattedCAtegory.map((cat: any) => cat.name))];
    const subcats = cats.map((catName: any) => {
        const subCategories = formattedCAtegory
            .filter((cat: any) => cat.name === catName)
            .map((cat: any) => cat.sub_category);

        return {
            cat: catName,
            value: subCategories,
        };
    });

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setFormData(productData);
        // Set the default selected sizes from product data
        if (productData?.sizes) {
            setSelectedSizes(productData?.sizes);
        }
        if (productData?.colors) {
            setSelectedColors(productData?.colors);
        }
    }, [productData]);

    const handleClose = () => {
        setProductData(null);
        setSelectedSizes([]);
        setSelectedColors([]);
        toggleModal('openUpdateProductModal');
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _id = formData?._id;

        const result = await updateProduct(_id, formData);

        if (result?.success) {
            formRef.current?.reset();
            toast.success('Product updated successfully');
            handleClose();
        } else {
            toast.error('There was an error updating the product', {
                description: 'Please check the entered details',
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSizeChange = (selectedOptions: any) => {
        setSelectedSizes(selectedOptions);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            sizes: selectedOptions,
        }));
    };

    const handleColorChange = (selectedOptions: any) => {
        setSelectedColors(selectedOptions);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            colors: selectedOptions,
        }));
    };

    const customReactSelectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            cursor: 'text',
            outline: 'none',
            focus: 'none',
            width: '100%',
            height: 'auto',
            borderColor: '#E5E7EB',
            borderWidth: '1px',
            borderStyle: 'solid',
        }),
    };

    return (
        <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 p-4 ${
                openUpdateProductModal ? 'flex' : 'hidden'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: openUpdateProductModal ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className="relative mx-2 w-full max-w-5xl bg-white p-8 shadow-xl"
                style={{
                    background:
                        'linear-gradient(to bottom right, #ffffff, #f6f8fa)',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-700 transition-colors duration-300 hover:text-gray-900"
                    onClick={handleClose}
                >
                    <LuX size={24} />
                </span>
                <form ref={formRef} onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex items-start gap-3">
                            <div className="flex w-full flex-col">
                                <label className="mb-2 font-medium">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData?.name || ''}
                                    onChange={handleChange}
                                    placeholder="Product name"
                                    required
                                    className="rounded border p-2"
                                />
                            </div>
                            <div className="flex w-full flex-col">
                                <label className="mb-2 font-medium">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData?.price || ''}
                                    onChange={handleChange}
                                    placeholder="$0.00"
                                    required
                                    className="rounded border p-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <InputFieldDropdown
                                data={cats}
                                label="Category"
                                name="category"
                                handleChange={handleChange}
                                sideLabel=""
                                value={formData?.category}
                                disabled={false}
                                required={true}
                            />
                            <InputFieldDropdown
                                data={
                                    subcats.find(
                                        (s) => s.cat === formData?.category,
                                    )?.value
                                }
                                label="Sub-Category"
                                name="sub_category"
                                handleChange={handleChange}
                                sideLabel=""
                                value={formData?.sub_category?.sub_category}
                                disabled={false}
                                required={true}
                            />
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex w-full flex-col items-start gap-2">
                                <label className="inline-block font-medium">
                                    Colors{' '}
                                    <span className="text-[10px] text-slate-400">
                                        (If Applicable)
                                    </span>
                                </label>
                                <CreatableSelect
                                    isMulti
                                    options={colorsOptions}
                                    onChange={handleColorChange}
                                    value={selectedColors}
                                    className="w-full"
                                    styles={customReactSelectStyles}
                                />
                            </div>

                            <div className="flex w-full flex-col items-start gap-2">
                                <label className="inline-block font-medium">
                                    Sizes{' '}
                                    <span className="text-[10px] text-slate-400">
                                        (If Applicable)
                                    </span>
                                </label>
                                <CreatableSelect
                                    isMulti
                                    options={sizeOptions}
                                    onChange={handleSizeChange}
                                    value={selectedSizes}
                                    className="w-full"
                                    styles={customReactSelectStyles}
                                />
                            </div>
                        </div>

                        <MultipleImageField
                            formData={formData!}
                            setFormData={setFormData}
                        />

                        <InputField
                            label="Description"
                            name="description"
                            placeholder="Write a description for this product"
                            handleChange={handleChange}
                            disabled={false}
                            value={formData?.description}
                            required={true}
                            textarea={true}
                        />

                        <h6 className="mb-4 text-base font-semibold">
                            Industry-specific attributes
                        </h6>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Product Material"
                                name="material"
                                placeholder="Product material"
                                type="text"
                                value={formData?.material}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Feature"
                                name="feature"
                                placeholder="product feature"
                                type="text"
                                value={formData?.feature}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Pattern Type"
                                name="pattern_type"
                                placeholder="pattern type"
                                type="text"
                                value={formData?.pattern_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Style"
                                name="style"
                                placeholder="product style"
                                type="text"
                                value={formData?.style}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>

                        <h6 className="mb-4 text-base font-semibold">
                            Other attributes
                        </h6>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Place of Origin"
                                name="place_of_origin"
                                placeholder="Place of origin"
                                type="text"
                                value={formData?.place_of_origin}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Supply type"
                                name="supply_type"
                                placeholder="supply type"
                                type="text"
                                value={formData?.supply_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Length"
                                name="length"
                                placeholder="length"
                                type="text"
                                value={formData?.length}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Waist Type"
                                name="waist_type"
                                placeholder="waist type"
                                type="text"
                                value={formData?.waist_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Closure Type"
                                name="closure_type"
                                placeholder="closure type"
                                type="text"
                                value={formData?.closure_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Fabric Type"
                                name="fabric_type"
                                placeholder="fabric type"
                                type="text"
                                value={formData?.fabric_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Printing Methods"
                                name="printing_methods"
                                placeholder="printing methods"
                                type="text"
                                value={formData?.printing_methods}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Sportswear Type"
                                name="sportswear_type"
                                placeholder="sportswear type"
                                type="text"
                                value={formData?.sportswear_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Technics"
                                name="technics"
                                placeholder="technics"
                                type="text"
                                value={formData?.technics}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Needle detection"
                                name="needle_detection"
                                placeholder="needle detection"
                                type="text"
                                value={formData?.needle_detection}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Logo Position"
                                name="logo_position"
                                placeholder="logo position"
                                type="text"
                                value={formData?.logo_position}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Available Quantity"
                                name="available_quantity"
                                placeholder="available quantity"
                                type="text"
                                value={formData?.available_quantity}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Brand"
                                name="brand"
                                placeholder="brand"
                                type="text"
                                value={formData?.brand}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Model"
                                name="model"
                                placeholder="model"
                                type="text"
                                value={formData?.model}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Season"
                                name="season"
                                placeholder="season"
                                type="text"
                                value={formData?.season}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Product type"
                                name="product_type"
                                placeholder="product type"
                                type="text"
                                value={formData?.product_type}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Thickness"
                                name="thickness"
                                placeholder="thickness"
                                type="text"
                                value={formData?.thickness}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="High"
                                name="high"
                                placeholder="high"
                                type="text"
                                value={formData?.high}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Usage"
                                name="usage"
                                placeholder="usage"
                                type="text"
                                value={formData?.usage}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>

                        <h6 className="mb-4 text-base font-semibold">
                            Packaging and delivery
                        </h6>
                        <div className="flex items-start gap-3">
                            <InputField
                                label="Single Package Size"
                                name="single_package_size"
                                placeholder="single package size"
                                type="text"
                                value={formData?.single_package_size}
                                handleChange={handleChange}
                                disabled={false}
                            />
                            <InputField
                                label="Single Gross Weight"
                                name="single_gross_weight"
                                placeholder="single gross weight"
                                type="text"
                                value={formData?.single_gross_weight}
                                handleChange={handleChange}
                                disabled={false}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full rounded bg-[#164E63] p-2 text-white transition-all duration-300 hover:bg-[#143744]"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default EditModal;
