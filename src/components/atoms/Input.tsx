import { FC, HTMLInputTypeAttribute } from "react";

interface Props {
    label: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    required?: boolean;
}

export const Input: FC<Props> = ({
    label,
    name,
    value,
    onBlur,
    onChange,
    type = 'text',
    placeholder,
    disabled = false,
    error,
    size = 'md',
    required = false
}) => {
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs sm:text-sm',
        md: 'px-3 py-2 text-sm sm:text-base',
        lg: 'px-4 py-3 text-base sm:text-lg'
    };

    const labelSizeClasses = {
        sm: 'text-xs sm:text-sm',
        md: 'text-sm sm:text-base',
        lg: 'text-base sm:text-lg'
    };

    return (
        <div className="w-full space-y-2">
            <label
                htmlFor={name}
                className={`block font-medium text-gray-700 mb-1 ${labelSizeClasses[size]}`}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                onBlur={onBlur}
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`
          mt-1 block w-full 
          border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          transition-colors duration-200
          ${sizeClasses[size]}
          ${error ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : ''}
        `}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};