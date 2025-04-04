import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface FormatAlignCenterIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FormatAlignCenterIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FormatAlignCenterIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_396_2126)">
        <path
          d="M7 15V17H17V15H7ZM3 21H21V19H3V21ZM3 13H21V11H3V13ZM7 7V9H17V7H7ZM3 3V5H21V3H3Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_396_2126">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FormatAlignCenterIcon;
