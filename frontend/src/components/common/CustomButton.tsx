interface ButtonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const CustomButton = ({
  type = 'button',
  disabled,
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
}: ButtonProps) => {
  const baseStyle = 'font-medieval w-full  rounded-md border outline-none transition-all';

  const variantStyles = {
    primary: 'border-lostark-500 text-lostark-400 hover:border-lostark-400',
    secondary: 'border-lostark-400/30 bg-black1',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
