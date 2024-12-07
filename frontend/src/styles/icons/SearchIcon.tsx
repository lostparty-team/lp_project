import { IconProps } from '@/types/icon';
import { IoSearchSharp } from 'react-icons/io5';
export default function ClockIcon({ size = 24, color, className }: IconProps) {
  return <IoSearchSharp size={size} color={color} className={className} />;
}
