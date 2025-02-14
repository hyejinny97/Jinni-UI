import { editColor } from '@/utils/color';
import { ColorType } from '@/types/color';

interface BookmarkBorderIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
  color?: ColorType;
}

const BookmarkBorderIcon = ({
  size = 24,
  color = 'black',
  ...rest
}: BookmarkBorderIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_294_242)">
        <path
          d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z"
          fill={editColor(color)}
        />
      </g>
      <defs>
        <clipPath id="clip0_294_242">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BookmarkBorderIcon;
