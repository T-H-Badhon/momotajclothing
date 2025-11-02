import Link from 'next/link';
import React from 'react';
import { LuChevronLeftCircle } from 'react-icons/lu';
import AddSlidder from 'src/components/slider/AddSlider';

const AddSlide = () => {
    return (
        <div className="p">
            <div className="pb-4">
                <div className="w-32">
                    <Link href="/dashboard/slider">
                        <button className="flex items-center gap-2 text-slate-700">
                            <LuChevronLeftCircle />
                            <h1>Back to Slider</h1>
                        </button>
                    </Link>
                </div>
            </div>

            <AddSlidder />
        </div>
    );
};

export default AddSlide;