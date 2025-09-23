import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface WarningIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const WarningIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: WarningIconProps) => {
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
      <path
        d="M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z"
        fill={normalizedColor}
      />
    </svg>
  );
};

export default WarningIcon;
