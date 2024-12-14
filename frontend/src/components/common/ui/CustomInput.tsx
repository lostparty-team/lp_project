import { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: string;
  rightSide?: React.ReactNode;
  disabled?: boolean;
  successMessage?: string | null;
  isDirty?: boolean;
}

export const CustomInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  rules,
  error,
  disabled,
  successMessage,
  isDirty,
  rightSide,
}: InputProps) => {
  return (
    <div className='min-h-[102px]'>
      <label className='mb-2 block text-lostark-400'>{label}</label>
      <div className='group flex'>
        <input
          {...register(name, rules)}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-md ${rightSide ? 'rounded-br-none rounded-tr-none' : ''} border border-lostark-400/30 bg-black1 px-4 py-2 text-white/50 outline-none transition-all duration-200 placeholder:text-white/30 hover:border-lostark-400/50 focus:border-lostark-400 focus:ring-lostark-400 ${
            disabled ? 'text-white/30' : ''
          }`}
        />
        {rightSide}
      </div>
      {error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
      {!error && isDirty && successMessage && <p className='mt-1 text-sm text-emerald-500'>{successMessage}</p>}
    </div>
  );
};
