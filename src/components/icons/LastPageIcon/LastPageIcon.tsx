import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface LastPageIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const LastPageIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: LastPageIconProps) => {
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
      <g clipPath="url(#clip0_354_6156)">
        <path
          d="M5.58997 7.41L10.18 12L5.58997 16.59L6.99997 18L13 12L6.99997 6L5.58997 7.41ZM16 6H18V18H16V6Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_354_6156">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LastPageIcon;
