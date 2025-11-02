'use client';

import { LuTrash2 } from 'react-icons/lu';
import useDataStore from 'src/hooks/useData';
import useModalStore from 'src/hooks/useModal';

const DeleteButton = ({ name, itemData }: any) => {
    const { toggleModal } = useModalStore();
    const { setCategoryData, setProductData, setSliderData } = useDataStore();

    const handleClick = () => {
        if (name.toLowerCase() == 'category') {
            setCategoryData(itemData);
            toggleModal('openDeleteCategoryModal');
        } else if (name.toLowerCase() == 'slider') {
            setSliderData(itemData);
            toggleModal('deleteSliderModalOpen');
        } else if (name.toLowerCase() == 'product') {
            setProductData(itemData);
            toggleModal('openDeleteProductModal');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded bg-rose-500/[0.1] px-3 py-2 text-rose-500"
        >
            <LuTrash2 />
        </button>
    );
};

export default DeleteButton;
