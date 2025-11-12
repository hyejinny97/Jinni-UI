import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface BurgerIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const BurgerIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: BurgerIconProps) => {
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
      <g clipPath="url(#clip0_50_2139)">
        <path d="M21 3H3V5H21V3Z" fill={normalizedColor} />
        <path d="M21 19H3V21H21V19Z" fill={normalizedColor} />
        <path d="M21 11H3V13H21V11Z" fill={normalizedColor} />
      </g>
      <defs>
        <clipPath id="clip0_50_2139">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BurgerIcon;
