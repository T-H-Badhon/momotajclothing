'use client';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { EmblaOptionsType } from 'embla-carousel';
import React, { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { ProductData } from 'src/types';
import ProductImageSlider from './ProductImageSlider';
import ProductSlide from './ProductSlide';

const OPTIONS: EmblaOptionsType = { loop: true };

const ProductDetails = ({ product }: { product: ProductData }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    return (
        <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-10 md:py-16">
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                {/* Images — left column */}
                <div className="md:sticky md:top-[80px] md:h-fit md:w-[55%]">
                    <div className="hidden md:block">
                        <ProductImageSlider images={product?.images} />
                    </div>
                    <div className="md:hidden">
                        <ProductSlide slides={product?.images} options={OPTIONS} />
                    </div>
                </div>

                {/* Details — right column */}
                <div className="md:w-[45%]">
                    {/* Name & price */}
                    <div className="mb-6 border-b border-border pb-6">
                        <h1 className="mb-3 text-center font-secondary text-[26px] uppercase leading-tight text-bodyText md:text-left md:text-[32px]">
                            {product?.name}
                        </h1>
                        <div className="flex flex-col items-center gap-1 md:items-start">
                            <p className="font-primary text-[18px] font-medium text-bodyText">
                                TK {product?.price}
                            </p>
                            <p className="font-primary text-[11px] uppercase tracking-[1.5px] text-bodyText/50">
                                Tax included
                            </p>
                        </div>
                    </div>

                    {/* Colors */}
                    {product?.colors?.length > 0 && (
                        <div className="mb-6">
                            <p className="mb-3 font-primary text-[10px] uppercase tracking-[2.5px] text-bodyText/70">
                                Color
                                {selectedColor && (
                                    <span className="ml-2 text-accent">
                                        — {selectedColor}
                                    </span>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((el, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(el.value)}
                                        className={`border px-4 py-2 font-primary text-[10px] uppercase tracking-[1.5px] transition-colors duration-150 ${
                                            selectedColor === el.value
                                                ? 'border-bodyText bg-bodyText text-body'
                                                : 'border-border text-bodyText hover:border-bodyText'
                                        }`}
                                    >
                                        {el.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {product?.sizes?.length > 0 && (
                        <div className="mb-8">
                            <p className="mb-3 font-primary text-[10px] uppercase tracking-[2.5px] text-bodyText/70">
                                Size
                                {selectedSize && (
                                    <span className="ml-2 text-accent">
                                        — {selectedSize}
                                    </span>
                                )}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((el, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedSize(el.value)}
                                        className={`border px-4 py-2 font-primary text-[10px] uppercase tracking-[1.5px] transition-colors duration-150 ${
                                            selectedSize === el.value
                                                ? 'border-bodyText bg-bodyText text-body'
                                                : 'border-border text-bodyText hover:border-bodyText'
                                        }`}
                                    >
                                        {el.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <a
                        href={`https://wa.me/8801970251998?text=I'm interested in: ${product?.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 flex w-full items-center justify-center border border-bodyText bg-bodyText py-4 font-primary text-[10.5px] uppercase tracking-[3px] text-body transition-all duration-300 hover:bg-transparent hover:text-bodyText"
                    >
                        Inquire on WhatsApp
                    </a>

                    {/* Pre-order notice */}
                    <p className="mb-6 text-center font-primary text-[11px] tracking-wide text-accent">
                        Pre-order item — please allow up to 12 weeks for dispatch.
                    </p>

                    {/* Description */}
                    {product.description && (
                        <div className="mb-8 border-t border-border pt-6">
                            <p className="mb-2 font-primary text-[10px] uppercase tracking-[2.5px] text-bodyText/70">
                                Details
                            </p>
                            <p className="font-primary text-[13px] leading-relaxed text-bodyText/80">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* Accordion — attributes */}
                    <div className="border-t border-border">
                        <Accordion transition transitionTimeout={200} allowMultiple>
                            <AccordionItem header="Product Attributes">
                                <div className="attribute-list">
                                    <ItemLine title="Material" value={product.material} />
                                    <ItemLine title="Style" value={product.style} />
                                    <ItemLine title="Feature" value={product.feature} />
                                </div>
                            </AccordionItem>
                            <AccordionItem header="Packaging & Delivery">
                                <div className="attribute-list">
                                    <ItemLine title="Selling Units" value="Single item" />
                                    <ItemLine title="Package Size" value={product.single_package_size} />
                                    <ItemLine title="Gross Weight" value={product.single_gross_weight} />
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ItemLine = ({ title, value }: { title: string; value?: string }) => {
    if (!value) return null;
    return (
        <div className="attribute-list">
            <div className="attribute-item">
                <div className="left">{title}</div>
                <div className="right">{value}</div>
            </div>
        </div>
    );
};

interface AccordionItemProps {
    header: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ header, ...rest }) => (
    <Item
        {...rest}
        header={({ state: { isEnter } }) => (
            <div className="flex w-full items-center justify-between py-4">
                <span className="font-primary text-[10px] uppercase tracking-[2.5px] text-bodyText">
                    {header}
                </span>
                <SlArrowDown
                    className={`size-[9px] transition-transform duration-200 ease-out ${
                        isEnter ? 'rotate-180' : ''
                    }`}
                />
            </div>
        )}
        className="border-b border-border"
        buttonProps={{
            className: () => 'flex w-full items-center justify-between',
        }}
        contentProps={{
            className: 'transition-height duration-300 ease-in-out',
        }}
        panelProps={{ className: 'pb-4' }}
    />
);

export default ProductDetails;
