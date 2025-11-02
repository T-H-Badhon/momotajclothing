import Link from 'next/link';
import { LuChevronLeftCircle } from 'react-icons/lu';
import { GetAllCategories } from 'src/components/actions/actionCategories';
import ProductAddSection from 'src/components/dashboard/products/product-add/Section';

const page = async () => {
    const allCategoriesData = await GetAllCategories();

    return (
        <div className="p">
            <div className="pb-4">
                <div className="w-32">
                    <Link href="/dashboard/products">
                        <button className="flex items-center gap-2 text-slate-700">
                            <LuChevronLeftCircle />
                            <h1>Back to Products</h1>
                        </button>
                    </Link>
                </div>
            </div>

            <ProductAddSection
                allCategoriesData={JSON.stringify(
                    allCategoriesData ? allCategoriesData : '',
                )}
            />
        </div>
    );
};

export default page;
