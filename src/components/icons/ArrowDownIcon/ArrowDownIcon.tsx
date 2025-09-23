import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface ArrowDownIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const ArrowDownIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: ArrowDownIconProps) => {
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
      <g clipPath="url(#clip0_182_182)">
        <path
          d="M7.41 8.59003L12 13.17L16.59 8.59003L18 10L12 16L6 10L7.41 8.59003Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_182_182">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowDownIcon;
