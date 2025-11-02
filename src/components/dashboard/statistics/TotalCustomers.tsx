import { LuMoveUpRight, LuUserCircle } from 'react-icons/lu';

const TotalCustomers = async () => {
    const totalUserCount = 2;

    return (
        <div className="rounded-lg border bg-white">
            <div className="rounded-bl-lg rounded-br-lg p-6">
                <div className="flex justify-between">
                    <div>
                        <p className="mb-4 overflow-hidden text-ellipsis uppercase">
                            Customers
                        </p>
                        <h4 className="mb-2 text-[1.38rem] font-medium leading-7">
                            {totalUserCount}
                        </h4>
                        <div className="flex items-center">
                            <LuMoveUpRight
                                size={14}
                                className="text-green-400"
                            />{' '}
                            <h1 className="ml-1 text-zinc-400">
                                Since{' '}
                                <span className="text-green-400">
                                    {new Date().toLocaleDateString()}
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex h-full items-center justify-center rounded bg-yellow-50 px-5 py-5">
                        <LuUserCircle className="text-amber-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalCustomers;
