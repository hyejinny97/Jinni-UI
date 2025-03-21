import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface SuccessIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const SuccessIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: SuccessIconProps) => {
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
        d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 10.874 21.804 9.7942 21.459 8.7832L19.8398 10.4023C19.9448 10.9183 20 11.453 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C13.633 4 15.1519 4.49389 16.4199 5.33789L17.8516 3.90625C16.2036 2.71225 14.185 2 12 2ZM21.293 3.29297L11 13.5859L7.70703 10.293L6.29297 11.707L11 16.4141L22.707 4.70703L21.293 3.29297Z"
        fill={editColor(color)}
      />
    </svg>
  );
};

export default SuccessIcon;
