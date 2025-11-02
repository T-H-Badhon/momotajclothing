'use client';
import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface SortOption {
    label: string;
    value: number;
}

interface Props {
    options: SortOption[];
    onSelectOption: (value: number) => void;
}

const SortButton: React.FC<Props> = ({ options, onSelectOption }) => {
    const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown visibility

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle the dropdown visibility
    };

    const handleSortOptionClick = (option: SortOption) => {
        onSelectOption(option.value); // Set the number of items per page based on the selected option
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="mb-1 flex items-center justify-center gap-1 rounded bg-[#5BA497] px-3 py-2 text-xs text-white"
            >
                Show
                <LuChevronDown size={14} />
            </button>
            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-36 rounded-lg bg-white shadow-md">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSortOptionClick(option)}
                                className="cursor-pointer px-3 py-1 hover:bg-gray-100"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortButton;
