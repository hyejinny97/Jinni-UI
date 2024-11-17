import { editColor } from '@/utils/editColorStyle';
import { ColorType } from '@/types/color';

interface MailIconProps {
  size?: number;
  color?: ColorType;
}

const MailIcon = ({ size = 32, color = 'primary' }: MailIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_86_145)">
        <path
          d="M26.6667 5.33331H5.33334C3.86667 5.33331 2.68001 6.53331 2.68001 7.99998L2.66667 24C2.66667 25.4666 3.86667 26.6666 5.33334 26.6666H26.6667C28.1333 26.6666 29.3333 25.4666 29.3333 24V7.99998C29.3333 6.53331 28.1333 5.33331 26.6667 5.33331ZM26.6667 10.6666L16 17.3333L5.33334 10.6666V7.99998L16 14.6666L26.6667 7.99998V10.6666Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_86_145">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MailIcon;
