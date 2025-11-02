'use client';
import { useState } from 'react';
import Form from './form/Form';

interface Review {
    name: string;
    review: string;
}

interface Sizes {
    value: string;
    label: string;
}

export interface TFormData {
    _id?: string;
    name: string;
    price: string;
    category: string;
    sub_category?: any;
    description?: string;

    material?: string;
    feature?: string;
    pattern_type?: string;
    style?: string;

    place_of_origin?: string;
    supply_type?: string;
    length?: string;
    waist_type?: string;
    closure_type?: string;
    fabric_type?: string;
    printing_methods?: string;
    sportswear_type?: string;
    technics?: string;
    needle_detection?: string;
    logo_position?: string;
    brand?: string;
    model?: string;
    available_quantity?: string;
    product_type?: string;
    season?: string;
    thickness?: string;
    high?: string;
    usage?: string;

    selling_items?: string;
    single_package_size?: string;
    single_gross_weight?: string;

    images: string[];

    reviews: Review[];
    sizes: Sizes[];
    colors: Sizes[];
    createdAt?: Date;
}

const ProductAddSection = ({ allCategoriesData }: any) => {
    const formattedCAtegory = JSON.parse(allCategoriesData);

    const cats = [...new Set(formattedCAtegory.map((cat: any) => cat.name))];
    const subCats = cats.map((catName: any) => {
        const subCategories = formattedCAtegory
            .filter((cat: any) => cat.name === catName)
            .map((cat: any) => cat.sub_category);

        return {
            cat: catName,
            value: subCategories,
        };
    });

    const [formData, setFormData] = useState<TFormData>({
        name: '',
        price: '',
        category: '',
        sub_category: '',
        description: '',

        material: '',
        feature: '',
        pattern_type: '',
        style: '',

        place_of_origin: '',
        supply_type: '',
        length: '',
        waist_type: '',
        closure_type: '',
        fabric_type: '',
        printing_methods: '',
        sportswear_type: '',
        technics: '',
        needle_detection: '',
        logo_position: '',
        brand: '',
        model: '',
        available_quantity: '',
        product_type: '',
        season: '',
        thickness: '',
        high: '',
        usage: '',

        selling_items: '',
        single_package_size: '',
        single_gross_weight: '',

        images: [],

        reviews: [],
        sizes: [],
        colors: [],
    });

    return (
        <>
            <div className="flex items-start gap-x-5 text-sm text-slate-800">
                <div className="mb-5 w-full rounded-md border bg-white p-5">
                    <h6 className="mb-4 text-base font-semibold">
                        Create Product
                    </h6>
                    <Form
                        cats={cats}
                        subcats={subCats}
                        setFormData={setFormData}
                        formData={formData}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductAddSection;
