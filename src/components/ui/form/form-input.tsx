'use client';

import { useField } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import { Input } from '../input';
import { Textarea } from '../textarea';

export interface FormInputProps {
    type?: HTMLInputTypeAttribute;
    name: string;
    label: string;
    textarea?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
}

const FormInput = ({
    type = 'text',
    name,
    label,
    textarea,
    disabled,
    children,
}: FormInputProps) => {
    const [field, meta] = useField(name);
    const config = { ...field, label, disabled };

    return textarea ? (
        <Textarea
            {...config}
            error={meta && meta.touched && meta.error ? meta.error : undefined}
        >
            {children}
        </Textarea>
    ) : (
        <Input
            type={type}
            {...config}
            error={meta && meta.touched && meta.error ? meta.error : undefined}
        >
            {children}
        </Input>
    );
};

export default FormInput;
