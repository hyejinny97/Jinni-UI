import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface BoxIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const BoxIcon = ({ size = 24, color = 'black', ...rest }: BoxIconProps) => {
  const normalizedColor = useColor(color);
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6ZM16 8H8V14.375C8 14.7583 8.15833 15.0458 8.475 15.2375C8.79167 15.4292 9.11667 15.4417 9.45 15.275L12 14L14.55 15.275C14.8833 15.4417 15.2083 15.4292 15.525 15.2375C15.8417 15.0458 16 14.7583 16 14.375V8Z"
        fill={normalizedColor}
      />
    </svg>
  );
};

export default BoxIcon;
