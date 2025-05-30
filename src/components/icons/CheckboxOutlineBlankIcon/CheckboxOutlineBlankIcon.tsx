import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface CheckboxOutlineBlankIconProps
  extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const CheckboxOutlineBlankIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: CheckboxOutlineBlankIconProps) => {
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
        d="M5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5ZM5 19H19V5H5V19Z"
        fill={editColor(color)}
      />
    </svg>
  );
};

export default CheckboxOutlineBlankIcon;
