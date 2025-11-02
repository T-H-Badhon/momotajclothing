'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useWindowSize } from '@uidotdev/usehooks';
import * as React from 'react';
import { LuX } from 'react-icons/lu';
import { cn } from 'src/utils/cn';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
            className,
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    header?: { title: string; shown?: boolean };
}

const DialogContent: React.FC<DialogContentProps> = React.forwardRef(
    (
        { className, children, header, ...props },
        ref: React.Ref<React.ElementRef<typeof DialogPrimitive.Content>>,
    ) => {
        const { width } = useWindowSize();

        return (
            <DialogPortal>
                <DialogOverlay />
                <DialogPrimitive.Content
                    ref={ref}
                    className={cn(
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 mx-auto mt-auto max-h-max max-w-max gap-4 rounded border bg-background shadow-lg duration-300 md:mb-auto',
                        width && width <= 768
                            ? 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom'
                            : 'data-[state=closed]:zoom-out-75 data-[state=open]:zoom-in-75',
                    )}
                    {...props}
                >
                    <div
                        className={cn(
                            'grid h-14 grid-cols-[3.5rem_auto_3.5rem] items-center border-b',
                            header?.shown ? '' : 'md:hidden',
                        )}
                    >
                        <div />
                        <h4 className="text-center">{header?.title}</h4>
                        <DialogPrimitive.Close asChild>
                            <LuX className="mx-auto cursor-pointer" />
                        </DialogPrimitive.Close>
                    </div>
                    <div
                        className={cn(
                            'p max-h-[90vh] w-full max-w-4xl overflow-y-scroll',
                            header?.shown ? 'md:max-h-[85vh]' : 'md:max-h-max',
                            className,
                        )}
                    >
                        {children}
                    </div>
                    <DialogPrimitive.Close asChild>
                        <LuX
                            className={cn(
                                'absolute right-4 top-4 cursor-pointer',
                                header?.shown ? 'hidden' : 'max-md:hidden',
                            )}
                        />
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPortal>
        );
    },
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col space-y-1.5 text-center sm:text-left',
            className,
        )}
        {...props}
    />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            className,
        )}
        {...props}
    />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            'text-lg font-semibold leading-none tracking-tight',
            className,
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
