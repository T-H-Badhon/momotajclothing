const CreateProductButton = () => {
    return (
        <div className="mt-4 flex gap-2">
            <button
                type="submit"
                className="inline-block h-14 w-full cursor-pointer items-start rounded-md border-2 border-dashed border-blue-500 px-4 py-2 text-center text-blue-500"
            >
                Create Product
            </button>
        </div>
    );
};

export default CreateProductButton;
