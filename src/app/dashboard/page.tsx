import TotalProducts from 'src/components/dashboard/statistics/TotalProducts';

const DashboardHomePage = async () => {
    return (
        <div className="p">
            <div className="relative block min-h-[0.06rem] max-w-full basis-full text-sm">
                <div>
                    <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <TotalProducts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomePage;
