import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface CheckIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const CheckIcon = ({ size = 24, color = 'black', ...rest }: CheckIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_190_182)">
        <path
          d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7.00003L19.59 5.59003L9 16.17Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_190_182">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckIcon;
