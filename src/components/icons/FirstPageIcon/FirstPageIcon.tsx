import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FirstPageIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FirstPageIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FirstPageIconProps) => {
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
      <g clipPath="url(#clip0_354_6154)">
        <path
          d="M18.41 16.59L13.82 12L18.41 7.41L17 6L11 12L17 18L18.41 16.59ZM6 6H8V18H6V6Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_354_6154">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FirstPageIcon;
