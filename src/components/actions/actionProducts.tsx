'use server';

import { revalidatePath } from 'next/cache';
import Category from 'src/modules/categories/categories.model';
import Product from 'src/modules/products/products.model';
import { ProductData } from 'src/types';
import connectMongo from 'src/utils/connect-mongo';

// Getting total products number from database

export const getProductCount = async () => {
    try {
        await connectMongo();
        return await Product.countDocuments({});
    } catch (error) {
        console.error('Error getting product count:', error);
        throw new Error('Error getting product count');
    }
};

// Generating an unique product key for each newly added product

export const generateCustomProductCode = async () => {
    try {
        const count = await getProductCount();
        return `P${count + 1}`;
    } catch (error) {
        console.error('Error generating custom product code:', error);
        throw new Error('Error generating custom product code');
    }
};

// Get all products from the database
export const GetAllProducts = async () => {
    try {
        await connectMongo();
        await Category.find();

        const products = await Product.find()
            .populate({
                path: 'sub_category',
                model: 'Category',
                localField: 'sub_category',
                foreignField: 'slug',
                justOne: true,
            })
            .sort('-createdAt')
            .lean();

        return products;
    } catch (error) {
        console.error('Error getting product:', error);
        throw new Error('Error getting products');
    }
};

//  Add new product to the database - discard
export const addProduct = async (productInfo: ProductData) => {
    try {
        await connectMongo();

        // Create new product
        const newProduct = new Product(productInfo);
        await newProduct.save();

        // Revalidate path
        revalidatePath('/dashboard/products');

        return { success: true };
    } catch (error) {
        console.error('Error creating product:', error);
        return {
            success: false,
            error: 'There was an error creating the product',
        };
    }
};

// Update a product from the database

export const updateProduct = async (_id: any, updatedProductInfo: any) => {
    try {
        await connectMongo();
        const category = await Category.findOne({
            name: updatedProductInfo?.category,
            sub_category: updatedProductInfo.sub_category,
        });
        if (category) updatedProductInfo.sub_category = category?.slug;
        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            updatedProductInfo,
            { new: true, runValidators: true },
        );

        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        revalidatePath('/dashboard/products');
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return {
            success: false,
            error: 'There was an error updating the product',
        };
    }
};
//  Delete a product from database

export const deleteProduct = async (productId: string) => {
    try {
        await connectMongo();
        const result = await Product.deleteOne({ _id: productId });
        if (result.deletedCount === 0) {
            return { success: false, error: 'Product not found' };
        }
        revalidatePath('/dashboard/products');
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return {
            success: false,
            error: 'There was an error deleting the product',
        };
    }
};
