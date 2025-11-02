import { cn } from 'src/utils/cn';

type DivDisabledProps = {
    className?: string;
    disabled?: boolean;
} & React.PropsWithChildren;

export default function DivDisabled({
    className,
    children,
    disabled,
}: DivDisabledProps) {
    return (
        <div
            className={cn(
                className,
                disabled ? 'pointer-events-none opacity-30' : undefined,
            )}
        >
            {children}
        </div>
    );
}
