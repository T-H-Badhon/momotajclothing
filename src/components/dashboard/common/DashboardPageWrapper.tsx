import { ReactNode } from 'react';

export default function DashboardPageWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="p">
            <div className="relative block min-h-[0.06rem] max-w-full basis-full text-sm">
                {children}
            </div>
        </div>
    );
}
