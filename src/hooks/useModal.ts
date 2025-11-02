import { create } from 'zustand';

// Define the type for your modal store
interface ModalStore {
    openAddCategoryModal: boolean;
    openDeleteCategoryModal: boolean;
    openUpdateCategoryModal: boolean;

    openDeleteProductModal: boolean;
    openUpdateProductModal: boolean;
    viewProductModalOpen: boolean;

    openAddSliderModal: boolean;
    deleteSliderModalOpen: boolean;
    openUpdateSliderModal: boolean;

    toggleModal: (modalName: keyof ModalStore) => void; // Specify the function signature
}

const useModalStore = create<ModalStore>((set) => ({
    openAddCategoryModal: false,
    openDeleteCategoryModal: false,
    openUpdateCategoryModal: false,

    openDeleteProductModal: false,
    openUpdateProductModal: false,
    viewProductModalOpen: false,

    openAddSliderModal: false,
    deleteSliderModalOpen: false,
    openUpdateSliderModal: false,

    // Function to toggle a specific modal by its name
    toggleModal: (modalName) =>
        set((state) => ({
            [modalName]: !state[modalName],
        })),
}));

export default useModalStore;
