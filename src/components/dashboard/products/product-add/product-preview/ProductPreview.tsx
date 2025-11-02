'use client';
import { useState } from 'react';
import { LuChevronDown, LuChevronUp, LuMinus, LuPlus } from 'react-icons/lu';
import { RenderStars } from 'src/utils/RenderStars';

const ProductPreview = ({ formData }: any) => {
    const {
        name,
        image,
        description,
        ingredients,
        price,
        discount,
        publishDate,
        netWeight,
        howToStore,
        reviews,
    } = formData;

    const [ingredientsOpen, setIngredientsOpen] = useState(false);
    const [netWeightOpen, setNetWeightOpen] = useState(false);
    const [howToStoreOpen, setHowToStoreOpen] = useState(false);

    const toggleIngredients = () => {
        setIngredientsOpen(!ingredientsOpen);
    };

    const toggleNetWeight = () => {
        setNetWeightOpen(!netWeightOpen);
    };

    const toggleHowToStore = () => {
        setHowToStoreOpen(!howToStoreOpen);
    };

    return (
        <div className="sticky top-0 mb-5 rounded-md bg-white">
            <div className="p-5">
                <h6 className="mb-4 text-base font-semibold">
                    Product Preview
                </h6>

                <img
                    alt="Image"
                    className="m-auto h-[280px] w-[380px] max-w-full"
                    src={'/placeholder/product-placeholder.png'}
                />

                {/*  */}

                <div className="mt-3 text-zinc-950">
                    <h2 className="text-2xl font-bold">
                        {name ? name : 'Product Name'}
                    </h2>

                    <div className="mt-3 flex items-center">
                        <RenderStars />{' '}
                        <h6 className="ml-3 text-sm">
                            {reviews?.length} Reviews
                        </h6>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold">
                        {discount > 0 ? (
                            <span className="font-bold text-green-500">
                                ${price}
                            </span>
                        ) : (
                            <span className="font-bold text-green-500">
                                ${price}
                            </span>
                        )}{' '}
                        {discount > 0 && (
                            <small className="text-base line-through">
                                ${price}
                            </small>
                        )}
                    </h3>

                    <div className="mb-8 flex h-0 w-full items-center justify-center bg-zinc-200">
                        <h6 className="bg-white px-1" />
                    </div>
                    <div className="w-max">
                        <div className="flex flex-col rounded border-2 border-solid border-zinc-200">
                            <div className="flex items-center gap-[0.63rem] py-3 pl-4 pr-6">
                                <input className="h-3 w-3" type="radio" />
                                <label className="text-sm font-semibold">
                                    One-time purchase:{' '}
                                    {discount > 0 ? (
                                        <span>$ {price}</span>
                                    ) : (
                                        <span>$ {price}</span>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="mb-0 mt-6 flex gap-8">
                            <div className="flex w-max rounded border-2 border-solid border-zinc-200">
                                <button className="flex h-11 w-11 cursor-not-allowed items-center justify-center opacity-50">
                                    <LuMinus />
                                </button>
                                <div className="flex h-11 w-11 items-center justify-center border-l-2 border-solid border-zinc-200">
                                    1
                                </div>
                                <button className="flex h-11 w-11 cursor-pointer items-center justify-center border-l-2 border-solid border-zinc-200">
                                    <LuPlus />
                                </button>
                            </div>
                            <button className="flex h-11 w-full cursor-pointer items-center justify-center rounded-sm border-2 border-solid border-black bg-black px-7 text-center text-sm uppercase text-white">
                                <div className="pt-1">Add To Cart</div>
                            </button>
                        </div>
                    </div>

                    <h3 className="mt-5 text-base font-bold">Description</h3>
                    <p className="mt-2 whitespace-break-spaces break-words text-sm text-zinc-500">
                        {description
                            ? description
                            : 'Explore the captivating essence of this unique herbal blend, carefully crafted to invigorate your senses and elevate your well-being. Immerse yourself in a symphony of aromas and flavors as you embark on a journey of rejuvenation and self-discovery. Let the soothing herbal notes transport you to a state of tranquility, where you can reconnect with yourself and embrace the harmony of nature. Indulge in this exquisite blend and awaken your senses to a world of pure bliss and inner peace.'}
                    </p>
                    <p className="mt-5 text-sm text-zinc-500">
                        Read more about the incredible powers of{' '}
                        {name ? name : 'Product'}
                    </p>

                    <div className="mt-6 border-2 border-solid border-zinc-200 px-6 text-2xl font-bold">
                        <div className="border-b-2 border-solid border-zinc-200">
                            <h3 className="flex">
                                <button
                                    onClick={toggleIngredients}
                                    className="flex h-12 w-[33.26rem] flex-grow cursor-pointer items-center justify-between py-4 text-center font-medium"
                                >
                                    <h6 className="text-sm uppercase">
                                        Ingredients
                                    </h6>
                                    {ingredientsOpen ? (
                                        <LuChevronUp size={16} color="gray" />
                                    ) : (
                                        <LuChevronDown size={16} color="gray" />
                                    )}
                                </button>
                            </h3>
                            {ingredientsOpen && (
                                <div className="pb-3 text-sm font-normal text-zinc-950">
                                    {ingredients
                                        ? ingredients
                                        : ' Details about ingredients...'}
                                </div>
                            )}
                        </div>

                        <div className="border-b-2 border-solid border-zinc-200">
                            <h3 className="flex">
                                <button
                                    onClick={toggleNetWeight}
                                    className="flex h-12 w-[33.26rem] flex-grow cursor-pointer items-center justify-between py-4 text-center font-medium"
                                >
                                    <h6 className="text-sm uppercase">
                                        Net Weight
                                    </h6>
                                    {netWeightOpen ? (
                                        <LuChevronUp size={16} color="gray" />
                                    ) : (
                                        <LuChevronDown size={16} color="gray" />
                                    )}
                                </button>
                            </h3>
                            {netWeightOpen && (
                                <div className="pb-3 text-sm font-normal text-zinc-950">
                                    {netWeight
                                        ? netWeight
                                        : '   Details about net weight...'}
                                </div>
                            )}
                        </div>

                        <div className="border-solid">
                            <h3 className="flex">
                                <button
                                    onClick={toggleHowToStore}
                                    className="flex h-12 w-[33.26rem] flex-grow cursor-pointer items-center justify-between py-4 text-center font-medium"
                                >
                                    <h6 className="text-sm uppercase">
                                        How to Store
                                    </h6>
                                    {howToStoreOpen ? (
                                        <LuChevronUp size={16} color="gray" />
                                    ) : (
                                        <LuChevronDown size={16} color="gray" />
                                    )}
                                </button>
                            </h3>
                            {howToStoreOpen && (
                                <div className="pb-3 text-sm font-normal text-zinc-950">
                                    {howToStore
                                        ? howToStore
                                        : ' Details about how to store...'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;
