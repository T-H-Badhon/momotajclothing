import { GoChevronRight } from 'react-icons/go';

const pages = [1, 2, 3, 4, 5];

const Pagination = () => {
    return (
        <div className="flex items-center justify-center">
            {pages.map((each) => (
                <div key={each} className="px-3 py-2">
                    <p className="text-base">{each}</p>
                </div>
            ))}
            <button className="bg-bodyText px-3 py-2">
                <GoChevronRight className="size-4 text-body" />
            </button>
        </div>
    );
};

export default Pagination;
