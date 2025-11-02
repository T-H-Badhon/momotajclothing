'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import Category from 'src/modules/categories/categories.model';
import Product from 'src/modules/products/products.model';

export const handleSubmit = async (formData: any) => {
    // console.log(formData)

    try {
        const slug = slugify(formData?.name, {
            replacement: '-',
            lower: true,
            trim: true,
        });

        const category = await Category.findOne({
            name: formData?.category,
            sub_category: formData.sub_category,
        });

        const result = await Product.create({
            ...formData,
            slug,
            reviews: [],
            sub_category: category?.slug,
        });

        if (result) {
            revalidatePath('/dashboard/products');
            return { success: 'Product added successfully' };
        } else {
            return { error: 'There was an error adding the new product' };
        }
    } catch (error) {
        console.error('Error adding new product:', error);
        return { error: 'Error adding new product' };
    }
};
