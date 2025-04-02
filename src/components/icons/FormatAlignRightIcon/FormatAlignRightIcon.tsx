import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface FormatAlignRightIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FormatAlignRightIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FormatAlignRightIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_396_2127)">
        <path
          d="M3 21H21V19H3V21ZM9 17H21V15H9V17ZM3 13H21V11H3V13ZM9 9H21V7H9V9ZM3 3V5H21V3H3Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_396_2127">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FormatAlignRightIcon;
