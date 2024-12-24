import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface HomeIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const HomeIcon = ({ size = 24, color = 'black', ...rest }: HomeIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_194_180)">
        <path
          d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_194_180">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HomeIcon;
