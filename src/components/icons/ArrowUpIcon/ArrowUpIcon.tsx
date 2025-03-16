import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface ArrowUpIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const ArrowUpIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: ArrowUpIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_374_1811)">
        <path
          d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_374_1811">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowUpIcon;
