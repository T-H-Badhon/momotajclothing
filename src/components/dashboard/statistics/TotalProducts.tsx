import { LuMoveUpRight, LuShoppingBag } from 'react-icons/lu';
import { getProductCount } from 'src/components/actions/actionProducts';

const TotalProducts = async () => {
    const total = await getProductCount();

    return (
        <div className="rounded-lg border bg-white">
            <div className="rounded-bl-lg rounded-br-lg p-6">
                <div className="flex justify-between">
                    <div>
                        <p className="mb-4 uppercase">Total Products</p>
                        <h4 className="mb-2 text-[1.38rem] font-medium leading-7">
                            {total}
                        </h4>
                        <div className="flex items-center">
                            <LuMoveUpRight
                                size={14}
                                className="text-green-400"
                            />{' '}
                            <h1 className="text-zinc-400">
                                In<span className="px-1 text-green-400">4</span>{' '}
                                categories
                            </h1>
                        </div>
                    </div>
                    <div className="flex h-full items-center justify-center rounded bg-emerald-50 px-5 py-5">
                        <LuShoppingBag className="text-green-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalProducts;
