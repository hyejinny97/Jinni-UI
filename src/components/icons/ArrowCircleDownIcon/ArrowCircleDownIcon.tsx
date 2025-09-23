import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface ArrowCircleDownIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const ArrowCircleDownIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: ArrowCircleDownIconProps) => {
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
      <g clipPath="url(#clip0_280_212)">
        <path
          d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 12V8H11V12H8L12 16L16 12H13Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_280_212">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowCircleDownIcon;
