'use client';

import * as React from 'react';
import { LuShieldAlert } from 'react-icons/lu';
import { cn } from 'src/utils/cn';
import DivDisabled from './div-disabled';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, children, disabled, ...props }, ref) => {
        const id = React.useId();

        return (
            <DivDisabled className="relative w-full" disabled={disabled}>
                <label
                    htmlFor={id}
                    className="flex w-full text-left font-primary text-[13px] uppercase tracking-[2px]"
                >
                    {label}
                </label>
                <input
                    id={id}
                    ref={ref}
                    type={type}
                    placeholder=""
                    className={cn(
                        'font-commuters flex h-[2.85rem] w-full cursor-pointer rounded-md border bg-background px-4 leading-none caret-black focus:border-foreground focus-visible:outline-none',
                        className,
                    )}
                    {...props}
                />
                {children}
                {error && (
                    <h6 className="mt-0.5 flex items-center gap-0.5 text-left text-xs text-red-500">
                        <LuShieldAlert size={14} />
                        {error}
                    </h6>
                )}
            </DivDisabled>
        );
    },
);
Input.displayName = 'Input';

export { Input };
