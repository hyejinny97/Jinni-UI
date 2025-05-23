import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface CheckboxIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const CheckboxIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: CheckboxIconProps) => {
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
        d="M5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5ZM10.6 15.775C10.7333 15.775 10.8583 15.7543 10.975 15.713C11.0917 15.671 11.2 15.6 11.3 15.5L16.975 9.825C17.1583 9.64167 17.25 9.41667 17.25 9.15C17.25 8.88333 17.15 8.65 16.95 8.45C16.7667 8.26667 16.5333 8.175 16.25 8.175C15.9667 8.175 15.7333 8.26667 15.55 8.45L10.6 13.4L8.425 11.225C8.24167 11.0417 8.01667 10.95 7.75 10.95C7.48333 10.95 7.25 11.05 7.05 11.25C6.86667 11.4333 6.775 11.6667 6.775 11.95C6.775 12.2333 6.86667 12.4667 7.05 12.65L9.9 15.5C10 15.6 10.1083 15.671 10.225 15.713C10.3417 15.7543 10.4667 15.775 10.6 15.775Z"
        fill={editColor(color)}
      />
    </svg>
  );
};

export default CheckboxIcon;
