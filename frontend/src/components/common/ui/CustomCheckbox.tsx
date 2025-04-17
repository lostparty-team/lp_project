import { Check } from 'lucide-react';
import { forwardRef } from 'react';

interface CustomCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, className = '', checked, onChange, ...props }, ref) => {
    return (
      <label className={`flex cursor-pointer items-center gap-2 ${className}`}>
        <div className='relative flex h-5 w-5 items-center justify-center'>
          <input
            type='checkbox'
            ref={ref}
            checked={checked}
            onChange={onChange}
            className='peer absolute h-5 w-5 opacity-0'
            {...props}
          />
          <div className='h-5 w-5 rounded border border-lostark-400/50 bg-black2/80 transition-colors peer-checked:border-lostark-400 peer-focus:ring-2 peer-focus:ring-lostark-400/30'></div>
          {checked && <Check size={14} className='absolute text-lostark-400' strokeWidth={3} />}
        </div>
        {label && <span className='text-sm text-gray-300'>{label}</span>}
      </label>
    );
  },
);

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;
