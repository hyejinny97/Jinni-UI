import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FormatAlignLeftIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FormatAlignLeftIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FormatAlignLeftIconProps) => {
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
      <g clipPath="url(#clip0_396_2125)">
        <path
          d="M15 15H3V17H15V15ZM15 7H3V9H15V7ZM3 13H21V11H3V13ZM3 21H21V19H3V21ZM3 3V5H21V3H3Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_396_2125">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FormatAlignLeftIcon;
