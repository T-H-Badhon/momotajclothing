import useCreateQuery from 'src/hooks/useCreateQuery';

const DropdownItem = ({
    title,
    showSorting,
    setShowSorting,
    setSortedItem,
    value,
}: {
    title: string;
    showSorting: boolean;
    setShowSorting: any;
    setSortedItem: any;
    value?: string;
}) => {
    const createQuery = useCreateQuery();

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                setSortedItem(title);
                createQuery('sort', value);
            }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
        >
            <p
                onClick={() => setShowSorting(!showSorting)}
                className="block px-[10px] py-1 text-base hover:bg-blue-700 hover:text-body"
                role="menuitem"
            >
                {title}
            </p>
        </div>
    );
};

export default DropdownItem;
