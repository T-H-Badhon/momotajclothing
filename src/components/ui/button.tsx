'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { cn } from 'src/utils/cn';

const buttonVariants = cva(
    "relative flex justify-center items-center gap-2 uppercase text-sm leading-none border rounded transition-colors ease-in-out duration-500 after:absolute after:content-[''] after:inset-0 after:w-full after:h-full after:origin-right after:transition-transform after:ease-in-out after:duration-500 after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 disabled:opacity-70 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                    'bg-btnPrimary border-black text-white hover:text-black after:bg-white',
                white: 'bg-transparent hover:bg-transparent border-white text-black hover:text-white after:bg-white after:origin-left after:scale-x-100 hover:after:origin-right hover:after:scale-x-0',
                black: 'bg-transparent hover:bg-transparent border-black text-white hover:text-black after:bg-btnPrimary after:origin-left after:scale-x-100 hover:after:origin-right hover:after:scale-x-0',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'bg-transparent hover:bg-transparent border-black text-black hover:text-white after:bg-black after:scale-x-0 hover:after:scale-x-100',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-teal underline-offset-4 hover:underline',
            },
            size: { default: 'h-11 px-7' },
        },
        defaultVariants: { variant: 'default', size: 'default' },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    href?: string;
    asChild?: boolean;
    fullWidth?: boolean;
    buttonClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            href,
            onClick,
            asChild = false,
            children,
            fullWidth,
            buttonClassName,
            leftIcon,
            rightIcon,
            ...props
        },
        ref,
    ) => {
        const { push } = useRouter();
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                ref={ref}
                onClick={href ? () => push(href) : onClick}
                className={cn(
                    fullWidth ? 'w-full' : 'w-max',
                    buttonVariants({
                        variant,
                        size,
                        className: buttonClassName,
                    }),
                )}
                {...props}
            >
                {leftIcon}
                <div
                    className={cn(
                        'relative z-[1]',
                        !leftIcon && !rightIcon ? 'pt-0.5' : '',
                        className,
                    )}
                >
                    {children}
                </div>
                {rightIcon}
            </Comp>
        );
    },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
