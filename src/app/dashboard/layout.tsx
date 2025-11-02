import Image from 'next/image';
import Link from 'next/link';
import { LuX } from 'react-icons/lu';
import ResSidebar from 'src/components/dashboard/common/resSidebar';
import Sidebar from 'src/components/dashboard/common/sidebar';
import Topbar from 'src/components/dashboard/common/topbar';
import { Sheet, SheetClose, SheetContent } from 'src/components/ui/sheet';
import isAdmin from 'src/utils/isAdmin';

function DashboardLayout({ children }: React.PropsWithChildren) {
    return (
        <Sheet>
            <SheetContent side="left">
                <div className="flex h-[4.5rem] items-center justify-between">
                    <Link href="/" className="mx-3.5">
                        <Image
                            src="/pretty.png"
                            alt=""
                            width={160}
                            height={46}
                        />
                    </Link>
                    <SheetClose className="pr-4 sm:pr-6">
                        <LuX />
                    </SheetClose>
                </div>
                <ResSidebar />
            </SheetContent>

            <div className="hidden border-r bg-background lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <Link
                    href="/"
                    className="flex h-[4.5rem] items-center border-b"
                >
                    <Image
                        src="/pretty.png"
                        alt=""
                        width={140}
                        height={26}
                        className="ml-10"
                    />
                </Link>
                <Sidebar />
            </div>

            <div className="relative bg-white lg:pl-72">
                <Topbar />
                {children}
            </div>
        </Sheet>
    );
}

export default isAdmin(DashboardLayout);
