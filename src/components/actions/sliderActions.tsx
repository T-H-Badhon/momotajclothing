'use server';

import { revalidatePath } from 'next/cache';
import Slider, { TSlider } from 'src/modules/slider/slider.model';
import connectMongo from 'src/utils/connect-mongo';
import { uploadImage } from 'src/utils/imageUpload';

export const GetAllSliders = async () => {
    await connectMongo();
    const sliders = await Slider.find().lean();
    return sliders;
};

export const addSlider = async (data: TSlider) => {
    try {
        await connectMongo();

        if (data.image) {
            data.image = await uploadImage(data.image);
        }
        const slider = new Slider(data);
        await slider.save();

        // Revalidate path
        revalidatePath('/');

        return { success: true, slider };
    } catch (error) {
        console.error('Error creating slider:', error);
        return {
            success: false,
            error: 'There was an error creating the slider',
        };
    }
};

export const updateSlider = async (sliderId: any, updatedSliderInfo: any) => {
    try {
        await connectMongo();

        // Find the slider by ID
        const slider = await Slider.findById(sliderId);
        if (!slider) {
            throw new Error('Slider not found');
        }
        if (updatedSliderInfo.image){
            updatedSliderInfo.image = await uploadImage(updatedSliderInfo.image);
        }
        // Update slider information with the provided data
        Object.assign(slider, updatedSliderInfo);
        // Save the updated slider document
        await slider.save();

        revalidatePath('/');
        return { success: true, slider };
    } catch (error) {
        console.error('Error updating slider:', error);
        return {
            success: false,
            error: 'There was an error updating the slider',
        };
    }
};

export const deleteSlider = async (sliderId: string) => {
    try {
        await connectMongo();
        const result = await Slider.deleteOne({ _id: sliderId });
        if (result.deletedCount === 0) {
            return { success: false, error: 'Slider not found' };
        }
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting slider:', error);
        return {
            success: false,
            error: 'There was an error deleting the slider',
        };
    }
};
