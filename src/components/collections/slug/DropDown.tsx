'use client';

import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import DropdownItem from './DropdownItem';

const DropDown = () => {
    const [showSorting, setShowSorting] = useState(false);
    const [sortedItem, setSortedItem] = useState('Default');

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setShowSorting(!showSorting)}
                className="flex w-[266px] items-center justify-between border bg-white px-[10px] py-2 text-sm focus:border-gray-500 focus:bg-gray-100 focus:outline-none"
            >
                <p className="text-base">{sortedItem}</p>
                <GoChevronDown size={20} />
            </button>

            <div
                className={`${showSorting ? 'absolute right-0 z-10 w-full origin-top-right bg-white shadow-xl focus:outline-none' : 'hidden'}`}
            >
                <DropdownItem
                    setSortedItem={setSortedItem}
                    title="Default"
                    value="asc"
                    setShowSorting={setShowSorting}
                    showSorting={showSorting}
                />
                <DropdownItem
                    setSortedItem={setSortedItem}
                    title="Price, low to high"
                    setShowSorting={setShowSorting}
                    showSorting={showSorting}
                    value="asc"
                />
                <DropdownItem
                    setSortedItem={setSortedItem}
                    title="Price, high to low"
                    setShowSorting={setShowSorting}
                    showSorting={showSorting}
                    value="desc"
                />
            </div>
        </div>
    );
};

export default DropDown;
