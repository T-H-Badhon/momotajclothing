export type TProduct = {
    _id: any;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    sizes?: any;
};

// interface TCategory {
//   name: string;
// }

// export type TIArticle = {
//   _id: any;
//   image: string;
//   title: string;
//   content: string;
//   category: TCategory;
//   createdAt: string;
// };

export type TUser = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    role: string;
};

interface Review {
    name: string;
    review: string;
}

interface Sizes {
    value: string;
    label: string;
}

export type ProductData = {
    _id?: any;
    name: string;
    price: string;
    slug?: string;
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
};

export type CategoryModel = {
    _id?: any;
    headline?: string;
    name?: string;
    slug?: string;
    sub_category?: string;
    image?: string;
};

export type TestimonialsModel = {
    _id?: any;
    userName?: string;
    image?: any;
    review?: string;
};
