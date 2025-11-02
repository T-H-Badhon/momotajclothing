'use client';

import { useFormikContext } from 'formik';
import { Button } from '../button';
import { DialogClose } from '../dialog';

type FormSubmitProps = {
    loading?: boolean;
    children: React.ReactNode;
    fullWidth?: boolean;
    dialog?: boolean;
};

export default function FormSubmit({
    children,
    loading,
    fullWidth = true,
    dialog,
}: FormSubmitProps) {
    const { submitForm, errors } = useFormikContext();
    const hasError = Object.keys(errors).length !== 0;

    const SubmitButton = (
        <Button
            type="button"
            onClick={submitForm}
            buttonClassName="mt-1"
            leftIcon={loading && <Spinner />}
            disabled={loading || hasError}
            fullWidth={fullWidth}
        >
            {loading ? 'Loading...' : children}
        </Button>
    );

    return dialog ? (
        <DialogClose asChild>{SubmitButton}</DialogClose>
    ) : (
        SubmitButton
    );
}

function Spinner() {
    return (
        <svg
            className="h-6 w-6 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                opacity={0.25}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                opacity={0.75}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}
