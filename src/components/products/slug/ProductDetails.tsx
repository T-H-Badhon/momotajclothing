'use client';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { EmblaOptionsType } from 'embla-carousel';
import React, { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { ProductData } from 'src/types';
import ProductImageSlider from './ProductImageSlider';
import ProductSlide from './ProductSlide';

const ProductDetails = ({ product }: { product: ProductData }) => {
    const [size, setSize] = useState<string>('');

    return (
        <div className="mt-10">
            <div className="relative mx-auto max-w-[1500px] pb-[60px]">
                <div className="flex flex-col gap-5 md:flex-row">
                    {/* large devices left slider */}
                    <div className="hidden w-[60%] px-4 md:block md:px-10">
                        <div className="sticky top-4">
                            <ProductImageSlider images={product?.images} />
                        </div>
                    </div>

                    {/* small devices left slider  */}
                    <div className="md:hidden">
                        <ProductSlide
                            slides={product?.images}
                            options={OPTIONS}
                        />
                    </div>
                    {/* right contents */}
                    <div className="px-4 md:w-[40%] md:px-10 md:pl-5 lg:pl-10">
                        <div className="flex flex-col gap-y-3 text-bodyText">
                            <h1 className="text-center font-secondary text-[28px] uppercase leading-[1.25] md:text-start md:text-[33px]">
                                {product?.name}
                            </h1>
                            <div className="flex flex-col items-center justify-center gap-y-1 md:items-start md:justify-start">
                                <p className="text-[18px]">
                                    Price TK.{product?.price}
                                </p>
                                <p className="text-sm">Tax included.</p>
                            </div>
                        </div>

                        <hr className="mb-5 mt-8 h-[1px] w-full border-none bg-gray-300/50" />

                        <div className="mb-5 space-y-3">
                            <h5 className="text-base font-semibold uppercase">
                                Colors :
                            </h5>
                            <div className="grid grid-cols-4 gap-2 md:grid-cols-4">
                                {product?.colors.map((el, i) => (
                                    <button
                                        className={`px-2 py-[7px] text-center text-sm uppercase tracking-[2px] md:px-4 md:text-base ${size === el.value ? 'border-[2px] border-black' : 'border'}`}
                                        key={i}
                                    >
                                        {el.value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h5 className="text-base font-semibold uppercase">
                                Sizes :
                            </h5>
                            <div className="grid grid-cols-4 gap-2">
                                {product?.sizes.map((el, i) => (
                                    <button
                                        className={`px-2 py-[7px] text-center text-sm uppercase tracking-[2px] md:px-4 md:text-base ${size === el.value ? 'border-[2px] border-black' : 'border'}`}
                                        key={i}
                                    >
                                        {el.value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* <div className="space-y-5">
                            <button className="flex w-full items-center justify-center gap-x-2 border border-bodyText bg-[#5A31F4] px-5 py-[13px]">
                                <span className="text-sm text-body">
                                    Buy with
                                </span>
                                <div className="flex items-center gap-x-1 text-body">
                                    <p className="text-[20px] font-bold">
                                        ali{' '}
                                    </p>
                                    <p className="rounded-md bg-body px-2 py-1 text-sm text-bodyText">
                                        Pay
                                    </p>
                                </div>
                            </button>
                        </div> */}

                        {/* desc */}
                        <div className="space-y-8 py-8">
                            <div className="">
                                <h5 className="text-base font-semibold uppercase">
                                    Details:
                                </h5>
                                <p className="text-[17px] tracking-wide">
                                    {product.description}
                                </p>
                            </div>
                            <p className="text-base font-semibold text-[#FF00FF]">
                                This is a Pre-Order Item. Please allow up to 12
                                weeks for dispatch.
                            </p>
                        </div>

                        {/* accordion */}
                        <div className="border-b border-l border-r">
                            <Accordion
                                transition
                                transitionTimeout={200}
                                allowMultiple
                            >
                                <AccordionItem
                                    header="Industry-specific attributes"
                                    initialEntered={false}
                                >
                                    <div className="attribute-list">
                                        <ItemLine
                                            title="Material"
                                            value={product.material}
                                        />
                                        <ItemLine
                                            title="Style"
                                            value={product.style}
                                        />
                                        <ItemLine
                                            title="Feature"
                                            value={product.feature}
                                        />
                                    </div>
                                </AccordionItem>
                                <AccordionItem
                                    header="Packaging and delivery"
                                    initialEntered={false}
                                >
                                    <div className="attribute-list">
                                        <ItemLine
                                            title="Selling Units"
                                            value="Single item"
                                        />
                                        <ItemLine
                                            title="Single package size"
                                            value={product.single_package_size}
                                        />
                                        <ItemLine
                                            title="Single gross weight"
                                            value={product.single_gross_weight}
                                        />
                                    </div>
                                </AccordionItem>
                                {/* <AccordionItem
                                    header="Give Review"
                                    initialEntered={false}
                                >
                                    <QuestionForm />
                                </AccordionItem> */}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ItemLine = ({ title, value }: any) => {
    return (
        <div className={`attribute-list ${value ? '' : 'hidden'}`}>
            <div className="attribute-item">
                <div className="left">{title}</div>
                <div className="right">{value}</div>
            </div>
        </div>
    );
};

interface AccordionItemProps {
    header: string;
    initialEntered?: boolean;
    children: React.ReactNode;
}

const OPTIONS: EmblaOptionsType = { loop: true };

const AccordionItem: React.FC<AccordionItemProps> = ({ header, ...rest }) => {
    return (
        <Item
            {...rest}
            header={({ state: { isEnter } }) => (
                <div className="relative flex w-full items-center justify-between py-[15px]">
                    <span className="mx-auto text-xs tracking-[4px]">
                        {header}
                    </span>
                    <div className="absolute right-0 flex items-center justify-end px-[15px]">
                        <SlArrowDown
                            className={`size-[10px] transition-transform duration-200 ease-out ${
                                isEnter ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                </div>
            )}
            className="border-t"
            buttonProps={{
                className: ({}) =>
                    `flex w-full text-center uppercase text-[15px] tracking-widest items-center justify-between`,
            }}
            contentProps={{
                className: 'transition-height duration-300 ease-in-out',
            }}
            panelProps={{ className: ` py-5 text-center uppercase` }}
        />
    );
};

export default ProductDetails;
