import { cn } from 'src/utils/cn';

export default function Overlay({ className }: { className?: string }) {
    return (
        <div
            style={{
                backgroundImage:
                    'linear-gradient(to top, rgba(4, 4, 4, .65), rgba(54, 54, 54, .2))',
            }}
            className={cn('absolute inset-0 h-full w-full', className)}
        />
    );
}
