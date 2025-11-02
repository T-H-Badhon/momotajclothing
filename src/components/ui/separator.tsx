'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { cn } from 'src/utils/cn';

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        {
            className,
            orientation = 'horizontal',
            decorative = true,
            children,
            ...props
        },
        ref,
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'bg-border relative flex shrink-0 items-center justify-center',
                orientation === 'horizontal'
                    ? 'h-[1px] w-full'
                    : 'h-full w-[1px]',
                className,
            )}
            {...props}
        >
            <h6 className="bg-background px-1 leading-none">{children}</h6>
        </SeparatorPrimitive.Root>
    ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
