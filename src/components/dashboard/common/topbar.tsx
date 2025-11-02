import Link from 'next/link';
import { LuMenu } from 'react-icons/lu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { Separator } from 'src/components/ui/separator';
import { SheetTrigger } from 'src/components/ui/sheet';
import gettoken from 'src/utils/gettoken';
import LogoutButtonDashboard from './LogoutButtonDashboard';

export default function Topbar() {
    const token = gettoken();

    return (
        <nav className="gap-x sticky top-0 z-40 flex h-[4.5rem] shrink-0 items-center border-b bg-white px-8">
            <SheetTrigger asChild>
                <button type="button" className="-m-2.5 p-2.5 lg:hidden">
                    <LuMenu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            <Separator orientation="vertical" className="h-6 lg:hidden" />

            <div className="z-40 flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="-m-1.5 flex items-center p-1.5">
                            <p className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                                {token?.user?.first_name.charAt(0)}
                            </p>
                            <span className="flex lg:items-center">
                                <h6 className="mr-2">
                                    {token?.user?.first_name +
                                        ' ' +
                                        token?.user?.last_name}
                                </h6>
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href="/account">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="">
                                <LogoutButtonDashboard />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
