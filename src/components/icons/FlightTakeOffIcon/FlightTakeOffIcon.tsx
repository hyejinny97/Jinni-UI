import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface FlightTakeOffIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FlightTakeOffIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FlightTakeOffIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_515_2197)">
        <path
          d="M2.50009 19H21.5001V21H2.50009V19ZM22.0701 9.64001C21.8601 8.84001 21.0301 8.36001 20.2301 8.58001L14.9201 10L8.02009 3.57001L6.09009 4.08001L10.2301 11.25L5.26009 12.58L3.29009 11.04L1.84009 11.43L4.43009 15.92C4.43009 15.92 11.5501 14.02 21.0001 11.49C21.8101 11.26 22.2801 10.44 22.0701 9.64001Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_515_2197">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FlightTakeOffIcon;
