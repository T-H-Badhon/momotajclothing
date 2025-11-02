import { GetAllCategories } from 'src/components/actions/actionCategories';
import CommonTable from 'src/components/ui/table/Table';

const CategoriesTable = async () => {
    const data = (await GetAllCategories()).reverse();

    const columns = [
        { DataSearchKey: 'name', header: 'Category name' },
        { DataSearchKey: 'sub_category', header: 'Sub-Category' },
    ];

    const sortOptionsArray = [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '15', value: 15 },
    ];

    const columnWidths = ['30%', '30%', '3%'];

    return (
        <CommonTable
            tableName="Category"
            columns={columns}
            data={data}
            searchBy="category"
            sortOptionsArray={sortOptionsArray}
            columnWidths={columnWidths}
            viewOption={false}
            updateOption={true}
            deleteOption={true}
            actionButtons={true}
        />
    );
};

export default CategoriesTable;
