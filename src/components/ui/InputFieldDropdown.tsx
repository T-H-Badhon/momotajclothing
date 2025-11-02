import { LuChevronDown } from 'react-icons/lu';

const InputFieldDropdown = ({
    data,
    label,
    name,
    handleChange,
    notice,
    sideLabel,
    disabled = false,
    required = false,
    value,
}: {
    data?: any;
    label: string;
    name: string;
    handleChange: any;
    notice?: any;
    sideLabel?: any;
    disabled?: boolean;
    required?: boolean;
    value?: string;
}) => {
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
            <div className="relative inline-block w-full">
                <select
                    name={name}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    value={value}
                    className="min-h-[2.44rem] w-full appearance-none rounded-md border-2 border-slate-200 px-4 py-2 outline-none"
                >
                    <option value="" selected disabled>
                        Select {label}
                    </option>
                    {data?.map((singleItem: any, index: number) => (
                        <option key={index} value={singleItem}>
                            {singleItem}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <LuChevronDown size={16} />
                </div>
            </div>
            {notice && (
                <p className="mt-1 text-[10px] text-slate-400">{notice}</p>
            )}
        </div>
    );
};

export default InputFieldDropdown;
