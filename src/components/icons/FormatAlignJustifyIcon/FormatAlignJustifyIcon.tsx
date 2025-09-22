import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FormatAlignJustifyIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FormatAlignJustifyIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FormatAlignJustifyIconProps) => {
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
      <g clipPath="url(#clip0_396_2128)">
        <path
          d="M3 21H21V19H3V21ZM3 17H21V15H3V17ZM3 13H21V11H3V13ZM3 9H21V7H3V9ZM3 3V5H21V3H3Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_396_2128">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FormatAlignJustifyIcon;
