import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FileCopyIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FileCopyIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FileCopyIconProps) => {
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
      <g clipPath="url(#clip0_387_1506)">
        <path
          d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_387_1506">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FileCopyIcon;
