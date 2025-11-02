import AddCategoryModal from 'src/components/dashboard/collections/modal/AddModal';
import DeleteCategoryModal from 'src/components/dashboard/collections/modal/DeleteModal';
import UpdatedCategoryInfoModal from 'src/components/dashboard/collections/modal/UpdateModal';
import CategoriesTable from 'src/components/dashboard/collections/table/CategoriesTable';

const Collections = () => {
    return (
        <>
            <AddCategoryModal />
            <DeleteCategoryModal />
            <UpdatedCategoryInfoModal />
            <div className="p">
                <CategoriesTable />
            </div>
        </>
    );
};

export default Collections;
