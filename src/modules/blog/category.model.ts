import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlogCategory extends Document {
    name: string;
    createdAt: string;
}

const categorySchema = new Schema<IBlogCategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true, versionKey: false },
);

// Check if the model is already defined to avoid redefining it
const BlogCategoryModel: Model<IBlogCategory> =
    mongoose.models.BlogCategory ||
    mongoose.model<IBlogCategory>('BlogCategory', categorySchema);

export default BlogCategoryModel;
