import { IconProps } from '@/types/icon';
import { FaShieldAlt } from 'react-icons/fa';

export default function ShieldIcon({ size = 24, color }: IconProps) {
  return <FaShieldAlt size={size} color={color} />;
}
