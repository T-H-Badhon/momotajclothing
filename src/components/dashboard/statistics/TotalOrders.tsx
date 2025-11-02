import { LuBriefcase, LuMoveUpRight } from 'react-icons/lu';

const TotalOrders = async () => {
    return (
        <div className="rounded-lg border bg-white">
            <div className="rounded-bl-lg rounded-br-lg p-6">
                <div className="flex flex-row-reverse justify-between">
                    <div className="flex h-full items-center justify-center rounded bg-slate-200 px-5 py-5">
                        <LuBriefcase className="text-blue-400" />
                    </div>

                    <div className="text-left">
                        <p className="mb-4 overflow-hidden text-ellipsis uppercase">
                            Orders
                        </p>
                        <h4 className="mb-2 text-[1.38rem] font-medium leading-7">
                            66
                        </h4>
                        <div className="flex items-center">
                            <LuMoveUpRight
                                size={14}
                                className="text-green-400"
                            />{' '}
                            <h1 className="text-zinc-400">
                                <span className="text-green-400">66</span> Total
                                orders
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalOrders;
