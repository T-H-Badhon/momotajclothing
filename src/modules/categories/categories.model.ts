import mongoose, { Model, Schema } from 'mongoose';

export interface ICategory {
    headline: string;
    name: string;
    sub_category: string;
    slug: string;
    image: string;
    createdAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>(
    {
        headline: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        sub_category: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true, versionKey: false },
);

export type CategoryModel = Model<ICategory>;

const Category =
    (mongoose.models.Category as CategoryModel) ||
    mongoose.model<ICategory, CategoryModel>('Category', categorySchema);

export default Category;
