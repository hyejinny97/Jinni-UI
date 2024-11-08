import { editColor } from '@/utils/editColorStyle';

interface PersonIconProps {
  size?: number;
  color?: string;
}

const PersonIcon = ({ size = 44, color = 'white' }: PersonIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 22C28.0775 22 33 17.0775 33 11C33 4.9225 28.0775 0 22 0C15.9225 0 11 4.9225 11 11C11 17.0775 15.9225 22 22 22ZM22 27.5C14.6575 27.5 0 31.185 0 38.5V44H44V38.5C44 31.185 29.3425 27.5 22 27.5Z"
        fill={editColor(color)}
      />
    </svg>
  );
};

export default PersonIcon;
