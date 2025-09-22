import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface IndeterminateCheckIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const IndeterminateCheckIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: IndeterminateCheckIconProps) => {
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
      <g clipPath="url(#clip0_286_324)">
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H7V11H17V13Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_286_324">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IndeterminateCheckIcon;
