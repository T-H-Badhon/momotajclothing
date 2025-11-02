'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'sonner';
import InputField from 'src/components/ui/InputField';
import InputFieldDropdown from 'src/components/ui/InputFieldDropdown';
import MultipleImageField from 'src/components/ui/MultipleImageField';
import { TFormData } from '../Section';
import { handleSubmit } from './SubmitForm';

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

const Form = ({
    setFormData,
    formData,
    cats,
    subcats,
}: {
    setFormData: any;
    formData: TFormData;
    cats: any;
    subcats: any;
}) => {
    const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
    const [selectedColors, setSelectedColors] = useState<any[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const clientAction = async (event: React.FormEvent) => {
        event.preventDefault();
        // calling a server action
        const result = await handleSubmit({ ...formData });

        if (result?.success) {
            formRef.current?.reset();
            toast.success('Product added successfully');
            router.push('/dashboard/products');
        } else {
            console.error('Error creating category:', result?.error);
            toast.error('There was an error adding new product');
        }
    };

    const handleChange = (e: any) => {
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
            height: '2.5rem',
            borderColor: '#E5E7EB',
            borderWidth: '2px',
            borderStyle: 'solid',
        }),
    };

    return (
        <form ref={formRef} onSubmit={clientAction}>
            <div className="grid grid-cols-1 gap-5">
                <div className="flex items-start gap-3">
                    <InputField
                        label="Product Name"
                        name="name"
                        placeholder="Product name"
                        type="text"
                        handleChange={handleChange}
                        notice="Try not to exceed 30 characters"
                        disabled={false}
                        required={true}
                    />
                    <InputField
                        label="Price"
                        name="price"
                        placeholder="$0.00"
                        type="text"
                        handleChange={handleChange}
                        disabled={false}
                        required={true}
                    />
                </div>

                <div className="flex items-start gap-3">
                    <InputFieldDropdown
                        data={cats}
                        label="Category"
                        name="category"
                        handleChange={handleChange}
                        // notice="Category not in the list? Make one from the shop"
                        sideLabel=""
                        disabled={false}
                        required={true}
                    />
                    <InputFieldDropdown
                        data={
                            subcats.find(
                                (s: any) => s.cat === formData.category,
                            )?.value
                        }
                        label="Sub-Category"
                        name="sub_category"
                        handleChange={handleChange}
                        sideLabel=""
                        disabled={false}
                        required={true}
                    />
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex w-full flex-col items-start gap-1">
                        <label className="mb-2 inline-block font-medium">
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

                    <div className="flex w-full flex-col items-start gap-1">
                        <label className="mb-2 inline-block font-medium">
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
                    setFormData={setFormData}
                    formData={formData}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Write a description for this product"
                    handleChange={handleChange}
                    disabled={false}
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Feature"
                        name="feature"
                        placeholder="product feature"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Style"
                        name="style"
                        placeholder="product style"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Supply type"
                        name="supply_type"
                        placeholder="supply type"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Waist Type"
                        name="waist_type"
                        placeholder="waist type"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Fabric Type"
                        name="fabric_type"
                        placeholder="fabric type"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Sportswear Type"
                        name="sportswear_type"
                        placeholder="sportswear type"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Needle detection"
                        name="needle_detection"
                        placeholder="needle detection"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Available Quantity"
                        name="available_quantity"
                        placeholder="available quantity"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Model"
                        name="model"
                        placeholder="model"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Product type"
                        name="product_type"
                        placeholder="product type"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="High"
                        name="high"
                        placeholder="high"
                        type="text"
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
                        handleChange={handleChange}
                        disabled={false}
                    />
                    <InputField
                        label="Single Gross Weight"
                        name="single_gross_weight"
                        placeholder="single gross weight"
                        type="text"
                        handleChange={handleChange}
                        disabled={false}
                    />
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    // onClick={clientAction}
                    type="submit"
                    className="inline-block h-14 w-full cursor-pointer items-start rounded-md border-2 border-dashed border-blue-500 px-4 py-2 text-center text-blue-500"
                >
                    Create Product
                </button>
            </div>
        </form>
    );
};

export default Form;
