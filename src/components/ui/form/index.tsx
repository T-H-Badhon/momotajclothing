'use client';

import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { cn } from 'src/utils/cn';
import FormSubmit from './form-submit';
import useValidationSchema, { SchemaName } from './useValidationSchema';

type FormProps<FData> = {
    className?: string;
    extraData?: any;
    initialValues: FData;
    schema?: SchemaName;
    footer?: React.ReactNode;
    action: (
        data: any,
    ) => Promise<{ success: boolean; error?: string; message?: string }>;
    submitButton: { label: string; fullWidth?: boolean; dialog?: boolean };
    formHelper?: (formikHelpers: FormikHelpers<FData>) => void;
    message?: string;
} & React.PropsWithChildren;

export default function Form<FData extends Record<string, any>>(
    props: FormProps<FData>,
) {
    const {
        action,
        extraData,
        footer,
        children,
        className,
        formHelper,
        submitButton,
        initialValues,
        schema,
        message,
    } = props;

    const [error, setError] = useState('');
    const [isPending, startTransition] = useTransition();
    const validationSchema = useValidationSchema(schema);

    const config = {
        onSubmit: (data: FData, formikHelpers: FormikHelpers<FData>) => {
            startTransition(async () => {
                const result = await action({ ...data, ...extraData });

                if (!result.success) {
                    setError(result.error!);
                    formikHelpers.resetForm();
                }
                formikHelpers.resetForm();
                if (message)
                    toast.success(result.message, {
                        duration: 2000,
                    });
            });
            formHelper && formHelper(formikHelpers);
        },
        initialValues,
        validationSchema,
        validateOnBlur: true,
        validateOnMount: true,
        validateOnChange: true,
    };

    return (
        <Formik {...config}>
            <FormikForm
                className={cn(
                    'mx-auto mt-10 grid min-w-[90vw] gap-4 sm:min-w-[440px]',
                    className,
                )}
            >
                {error && (
                    <h6 className="rounded bg-red-100 px-5 py-2.5 text-left text-red-500">
                        {error}
                    </h6>
                )}
                {children}
                <FormSubmit
                    loading={isPending}
                    fullWidth={submitButton?.fullWidth}
                    dialog={submitButton?.dialog}
                >
                    {submitButton?.label}
                </FormSubmit>
                {footer}
            </FormikForm>
        </Formik>
    );
}
