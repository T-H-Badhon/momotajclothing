const InputField = ({
    label,
    name,
    placeholder,
    type = 'text',
    handleChange,
    notice,
    sideLabel,
    disabled = false,
    required = false,
    textarea = false,
    ...rest
}: any) => {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 inline-block font-medium">
                    {label}{' '}
                    {sideLabel && (
                        <span className="text-[10px] text-slate-400">
                            ({sideLabel})
                        </span>
                    )}
                </label>
            )}

            {textarea ? (
                <textarea
                    className="h-32 w-full cursor-text resize-y rounded-md border-2 border-solid border-slate-200 px-4 py-2 outline-none"
                    placeholder={placeholder}
                    name={name}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    {...rest}
                />
            ) : (
                <input
                    className={`cursor-text ${
                        disabled ? 'bg-slate-100 text-slate-500' : ''
                    } h-10 w-full rounded-md border-2 border-solid border-slate-200 px-4 py-2 outline-none`}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    {...rest}
                />
            )}

            {notice && (
                <p className="mt-1 text-[10px] text-slate-400">{notice}</p>
            )}
        </div>
    );
};

export default InputField;
