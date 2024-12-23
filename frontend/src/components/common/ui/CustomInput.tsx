import { InputHTMLAttributes, forwardRef } from 'react';

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightSide?: React.ReactNode;
  successMessage?: string | null;
  isDirty?: boolean;
  err?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, rightSide, successMessage, isDirty, disabled, className, err = false, ...props }, ref) => {
    return (
      <div>
        {label && <label className='mb-2 block text-lostark-400'>{label}</label>}
        <div className='group flex'>
          <input
            {...props}
            ref={ref}
            disabled={disabled}
            className={`w-full rounded-md ${rightSide ? 'rounded-br-none rounded-tr-none' : ''} border border-lostark-400/30 bg-black1 px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400 ${
              disabled ? 'text-white/30' : ''
            } ${className}`}
          />
          {rightSide}
        </div>
        {!err && error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
        {!err && !error && isDirty && successMessage && (
          <p className='mt-1 text-sm text-emerald-500'>{successMessage}</p>
        )}
      </div>
    );
  },
);

CustomInput.displayName = 'CustomInput';
