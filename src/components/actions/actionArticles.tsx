'use server';

import { revalidatePath } from 'next/cache';
import Article from 'src/modules/blog/article.model';
import {
    default as BlogCategoryModel,
    default as Category,
} from 'src/modules/blog/category.model';
import connectMongo from 'src/utils/connect-mongo';
import { uploadImage } from 'src/utils/imageUpload';

export const GetAllArticles = async () => {
    try {
        await connectMongo();
        await Category.find();
        const articles = await Article.find().lean();
        return articles;
    } catch (error) {
        console.error('Error getting product:', error);
        throw new Error('Error getting products');
    }
};

export const handleAddArticle = async (data: {
    title: string;
    category: string;
    image: string;
    excerpt: string;
    content: string;
}) => {
    try {
        await connectMongo();

        data.image = await uploadImage(data.image);

        const article = await Article.create(data);
        revalidatePath('/dashboard/news');

        return { success: true, article: article };
    } catch (error) {
        console.log(error);
        return { success: false, error };
    }
};

export const handleUpdateArticle = async (
    data: {
        title: string;
        tagline: string;
        image: string;
        excerpt: string;
        content: string;
    },
    id: string,
) => {
    try {
        await connectMongo();

        if (!data?.image.endsWith('.png')) {
            data.image = await uploadImage(data.image);
        }

        const article = await Article.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );
        revalidatePath('/dashboard/news');

        return { success: true, article: article };
    } catch (error) {
        console.log(error);
        return { success: false, error };
    }
};

export const handleDeleteArticle = async (id: string) => {
    try {
        await connectMongo();

        const article = await Article.findByIdAndDelete(id);
        revalidatePath('/dashboard/news');

        return { success: true, article: article };
    } catch (error) {
        console.log(error);
        return { success: false, error };
    }
};

export const addCategory = async (data: { name: string }) => {
    try {
        await connectMongo();

        await BlogCategoryModel.create(data);
        revalidatePath('/dashboard/news/category');

        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, error: error };
    }
};

export const updateCategory = async (data: { name: string }, id: string) => {
    try {
        await connectMongo();

        await BlogCategoryModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );
        revalidatePath('/dashboard/news/category');

        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, error: error };
    }
};

export const deleteCategory = async (id: string) => {
    try {
        await connectMongo();

        await BlogCategoryModel.findByIdAndDelete(id);
        revalidatePath('/dashboard/news/category');

        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, error: error };
    }
};
