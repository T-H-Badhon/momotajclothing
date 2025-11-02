'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import Category from 'src/modules/categories/categories.model';
import { CategoryModel } from 'src/types';
import connectMongo from 'src/utils/connect-mongo';
import { uploadImage } from 'src/utils/imageUpload';

export const GetAllCategories = async () => {
    await connectMongo();
    const categories = await Category.find().lean();
    return categories;
};

export const getCategoryCount = async () => {
    try {
        await connectMongo();
        return await Category.countDocuments({});
    } catch (error) {
        console.error('Error getting category count:', error);
        throw new Error('Error getting category count');
    }
};

export const generateCustomCategoryId = async () => {
    try {
        const count = await getCategoryCount();
        return `C${count + 1}`;
    } catch (error) {
        console.error('Error generating custom category ID:', error);
        throw new Error('Error generating custom category ID');
    }
};

export const addCategory = async (categoryInfo: CategoryModel) => {
    try {
        const slug = slugify(
            categoryInfo.name + ' ' + categoryInfo.sub_category!,
            {
                replacement: '-',
                lower: true,
                trim: true,
            },
        );

        await connectMongo();

        if (categoryInfo.image) {
            categoryInfo.image = await uploadImage(categoryInfo.image);
        }
        categoryInfo.slug = slug;

        // Create new category
        const newCategory = new Category(categoryInfo);
        await newCategory.save();
        console.log(newCategory);

        // Revalidate path
        revalidatePath('/');

        return { success: true, category: 'newCategory' };
    } catch (error) {
        console.error('Error creating category:', error);
        return {
            success: false,
            error: 'There was an error creating the category',
        };
    }
};

export const updateCategory = async (
    categoryId: any,
    updatedCategoryInfo: any,
) => {
    try {
        // const slug = slugify(updatedCategoryInfo.name + " " + updatedCategoryInfo.sub_category!, {
        //   replacement: '-',
        //   lower: true,
        //   trim: true
        // });
        // updatedCategoryInfo.slug = slug;

        await connectMongo();
        // Find the user by ID
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        // Update category information with the provided data
        Object.assign(category, updatedCategoryInfo);
        // Save the updated category document
        await category.save();
        revalidatePath('/');
        return { success: true, category };
    } catch (error) {
        console.error('Error updating category:', error);
        return {
            success: false,
            error: 'There was an error updating the category',
        };
    }
};

export const deleteCategory = async (categoryId: string) => {
    try {
        await connectMongo();
        const result = await Category.deleteOne({ _id: categoryId });
        if (result.deletedCount === 0) {
            return { success: false, error: 'Category not found' };
        }
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        return {
            success: false,
            error: 'There was an error deleting the category',
        };
    }
};
