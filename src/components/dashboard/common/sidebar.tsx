import NavItems from './navitems';

export default function Sidebar() {
    return (
        <nav className="flex flex-col overflow-y-auto px-6 py-4 sm:px-8">
            <ul role="list" className="flex w-full flex-col space-y-1">
                <NavItems />
            </ul>
        </nav>
    );
}
