import { GetAllCategories } from 'src/components/actions/actionCategories';
import DeleteProductModal from 'src/components/dashboard/products/product-list/modal/DeleteModal';
import EditModal from 'src/components/dashboard/products/product-list/modal/EditModal';
import ViewProductModal from 'src/components/dashboard/products/product-list/modal/ViewModal';
import ProductsTable from 'src/components/dashboard/products/product-list/table/ProductsTable';

const Products = async ({
    searchParams,
}: {
    searchParams: { page: number };
}) => {
    const allCategoriesData = await GetAllCategories();

    return (
        <>
            <DeleteProductModal />
            <ViewProductModal />
            <EditModal
                allCategoriesData={JSON.stringify(
                    allCategoriesData ? allCategoriesData : '',
                )}
            />
            <div className="p">
                <ProductsTable pageCount={searchParams.page} />
            </div>
        </>
    );
};

export default Products;
