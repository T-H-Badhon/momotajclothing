import { cva, type VariantProps } from 'class-variance-authority';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import * as React from 'react';
import { cn } from 'src/utils/cn';

const linkVariants = cva(
    "relative text-sm after:absolute after:content-[''] after:inset-0 after:top-[1.125rem] after:w-full after:h-[1px] after:transition-transform after:ease-in-out after:duration-500",
    {
        variants: {
            variant: {
                default:
                    'after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100',
                underline:
                    'after:origin-left after:scale-x-100 hover:after:origin-right hover:after:scale-x-0',
            },
            color: {
                default: 'text-muted-foreground after:bg-muted-foreground',
                foreground: 'text-foreground after:bg-foreground',
            },
        },
        defaultVariants: { variant: 'default', color: 'default' },
    },
);

export type LinkProps = {
    className?: string;
    children?: React.ReactNode;
} & NextLinkProps &
    VariantProps<typeof linkVariants>;

const Link = ({ className, variant, color, children, ...props }: LinkProps) => {
    return (
        <NextLink
            className={cn(linkVariants({ variant, color, className }))}
            {...props}
        >
            {children}
        </NextLink>
    );
};
Link.displayName = 'Link';

export { Link, linkVariants };
