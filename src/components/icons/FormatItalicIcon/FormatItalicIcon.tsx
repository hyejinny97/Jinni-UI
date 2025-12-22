import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FormatItalicIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FormatItalicIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FormatItalicIconProps) => {
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
      <g clipPath="url(#clip0_90_3027)">
        <path
          d="M10 4V7H12.21L8.79 15H6V18H14V15H11.79L15.21 7H18V4H10Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_90_3027">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FormatItalicIcon;
