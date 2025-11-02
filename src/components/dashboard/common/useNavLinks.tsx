import { usePathname } from 'next/navigation';
import {
    LuFiles,
    LuFolderClosed,
    LuNewspaper,
    LuPieChart,
} from 'react-icons/lu';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';

export default function useNavLinks() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: LuPieChart },
        { name: 'Products', href: '/dashboard/products', icon: LuFiles },
        {
            name: 'Collections',
            href: '/dashboard/collections',
            icon: LuFolderClosed,
        },
        { name: 'News', href: '/dashboard/news', icon: LuNewspaper },
        { name: 'Slider', href: '/dashboard/slider', icon: TfiLayoutSliderAlt },
        // { name: "Client", href: "/dashboard/client", icon: LuUserSquare },
    ];

    return navLinks.map((nav) => ({ ...nav, isActive: nav.href === pathname }));
}
