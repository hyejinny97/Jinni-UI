import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FlightLandIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FlightLandIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FlightLandIconProps) => {
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
      <g clipPath="url(#clip0_515_2198)">
        <path
          d="M2.5 19H21.5V21H2.5V19ZM19.34 15.85C20.14 16.06 20.96 15.59 21.18 14.79C21.39 13.99 20.92 13.17 20.12 12.95L14.81 11.53L12.05 2.51L10.12 2V10.28L5.15 8.95L4.22 6.63L2.77 6.24V11.41L19.34 15.85Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_515_2198">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FlightLandIcon;
