'use client';

import * as React from 'react';
import { LuShieldAlert } from 'react-icons/lu';
import { cn } from 'src/utils/cn';
import DivDisabled from './div-disabled';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        { className, label, rows = 6, error, children, disabled, ...props },
        ref,
    ) => {
        const id = React.useId();

        return (
            <DivDisabled className="relative w-full" disabled={disabled}>
                <textarea
                    id={id}
                    ref={ref}
                    rows={rows}
                    placeholder=""
                    className={cn(
                        'font-commuters peer flex w-full rounded-md border bg-background px-4 py-3.5 leading-none focus:border-foreground focus-visible:outline-none',
                        className,
                    )}
                    {...props}
                />
                <label
                    htmlFor={id}
                    className="font-commuters text-muted-foreground absolute inset-0 -top-1.5 left-3.5 size-max bg-background px-0.5 text-sm leading-none transition-all peer-placeholder-shown:left-4 peer-placeholder-shown:top-[0.7rem] peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-base"
                >
                    {label}
                </label>
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
Textarea.displayName = 'Textarea';

export { Textarea };
