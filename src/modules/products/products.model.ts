import mongoose, { Model, Schema } from 'mongoose';

// Interfaces for sub-documents
interface Review {
    name: string;
    review: string;
}

interface Sizes {
    value: string;
    label: string;
}

// Main Product interface
export interface IProduct {
    name: string;
    price: string;
    slug: string;
    category: string;
    sub_category?: string;
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
    season?: string; // fixed typo
    thickness?: string;
    high?: string;
    usage?: string;

    selling_items?: string; // or units
    single_package_size?: string;
    single_gross_weight?: string;

    images: string[];

    reviews: Review[];
    sizes: Sizes[];
    colors: Sizes[];
    createdAt?: Date;
}

// Updated productSchema based on IProduct
const productSchema: Schema<IProduct> = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: String, required: true, default: '0' },
        slug: { type: String, required: true },
        category: { type: String, required: true },
        sub_category: { type: String, required: true, ref: 'Category' },
        description: { type: String, required: true },

        material: String,
        feature: String,
        pattern_type: String,
        style: String,

        place_of_origin: String,
        supply_type: String,
        length: String,
        waist_type: String,
        closure_type: String,
        fabric_type: String,
        printing_methods: String,
        sportswear_type: String,
        technics: String,
        needle_detection: String,
        logo_position: String,
        brand: String,
        model: String,
        available_quantity: String,
        product_type: String,
        season: String,
        thickness: String,
        high: String,
        usage: String,

        selling_items: String,
        single_package_size: String,
        single_gross_weight: String,

        images: { type: [String], default: [] },

        reviews: {
            type: [
                {
                    name: { type: String, required: true },
                    review: { type: String, required: true },
                },
            ],
            default: [],
        },
        sizes: {
            type: [
                {
                    value: { type: String, required: true },
                    label: { type: String, required: true },
                },
            ],
            default: [],
        },
        colors: {
            type: [
                {
                    value: { type: String, required: true },
                    label: { type: String, required: true },
                },
            ],
            default: [],
        },
    },
    { timestamps: true, versionKey: false },
);

// Define and export the model
export type ProductModel = Model<IProduct>;

const Product =
    (mongoose.models.Product as ProductModel) ||
    mongoose.model<IProduct, ProductModel>('Product', productSchema);

export default Product;
