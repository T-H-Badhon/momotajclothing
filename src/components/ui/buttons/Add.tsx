'use client';

import { useRouter } from 'next/navigation';
import { LuPlus } from 'react-icons/lu';
import useModalStore from 'src/hooks/useModal';

const AddButton = ({ name }: { name: string }) => {
    const { toggleModal } = useModalStore();
    const router = useRouter();

    const handleClick = () => {
        if (name.toLowerCase() == 'category') {
            toggleModal('openAddCategoryModal');
        } else if (name.toLowerCase() == 'product') {
            router.push('/dashboard/products/add');
        } else if (name.toLowerCase() == 'slider') {
            router.push('/dashboard/slider/add');
            // toggleModal('openAddSliderModal');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="mb-1 flex items-center justify-center gap-1 rounded bg-[#F09234] px-3 py-2 text-xs text-white"
        >
            Add {name}
            <LuPlus size={14} />
        </button>
    );
};

export default AddButton;
