import { ProductData } from 'src/types';
import { create } from 'zustand';

// Define the shape of CategoryData
interface CategoryData {
    _id: any;
    headline: string;
    name: string;
    sub_category: string;
    slug: string;
    image: string;
}

// Define the type for your data store
interface DataStore {
    categoryData: CategoryData | null;
    productData: ProductData | null;
    sliderData: any | null;
    setCategoryData: (data: CategoryData | null) => void;
    setProductData: (data: ProductData | null) => void;
    setSliderData: (data: any | null) => void;
}

const useDataStore = create<DataStore>((set) => ({
    categoryData: null,
    productData: null,
    sliderData: null,
    // Function to set slider data
    setSliderData: (data: any | null) =>
        set(() => ({
            sliderData: data,
        })),

    // Function to set category data
    setCategoryData: (data: CategoryData | null) =>
        set(() => ({
            categoryData: data,
        })),
    setProductData: (data: ProductData | null) =>
        set(() => ({
            productData: data,
        })),
}));

export default useDataStore;
