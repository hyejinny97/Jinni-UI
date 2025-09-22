import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface AddIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const AddIcon = ({ size = 24, color = 'black', ...rest }: AddIconProps) => {
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
      <g clipPath="url(#clip0_376_1815)">
        <path
          d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_376_1815">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AddIcon;
