'use client';

import { LuPenLine } from 'react-icons/lu';
import useDataStore from 'src/hooks/useData';
import useModalStore from 'src/hooks/useModal';

const UpdateButton = ({ name, itemData }: any) => {
    const { toggleModal } = useModalStore();
    const { setCategoryData, setProductData, setSliderData } = useDataStore();

    const handleClick = () => {
        if (name?.toLowerCase() == 'category') {
            setCategoryData(itemData);
            toggleModal('openUpdateCategoryModal');
        } else if (name?.toLowerCase() == "slider") {
            setSliderData(itemData);
            toggleModal('openUpdateSliderModal');
        } else if (name?.toLowerCase() == 'product') {
            setProductData(itemData);
            toggleModal('openUpdateProductModal');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded bg-emerald-400/[0.1] px-3 py-2 text-emerald-400"
        >
            <LuPenLine />
        </button>
    );
};

export default UpdateButton;
