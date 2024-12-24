import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface ArrowRightIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const ArrowRightIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: ArrowRightIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_196_183)">
        <path
          d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_196_183">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRightIcon;
