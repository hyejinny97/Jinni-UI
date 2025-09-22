import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface FileUploadIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const FileUploadIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: FileUploadIconProps) => {
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
      <g clipPath="url(#clip0_447_1835)">
        <path
          d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z"
          fill={normalizedColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_447_1835">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FileUploadIcon;
