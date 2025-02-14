import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface BookmarkIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const BookmarkIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: BookmarkIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_294_245)">
        <path
          d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_294_245">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BookmarkIcon;
