import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface ArrowLeftIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const ArrowLeftIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: ArrowLeftIconProps) => {
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
      <g clipPath="url(#clip0_354_6155)">
        <path
          d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_354_6155">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowLeftIcon;
