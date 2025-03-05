import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type IconsProps = DefaultComponentProps<'span'> & {
  icon: React.ReactNode;
  count: number;
  className?: string;
};

const Icons = (props: IconsProps) => {
  const { icon, count, className, style, ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <span
      className={cn('JinniRatingIcons', className)}
      style={newStyle}
      {...rest}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <span key={index} className="JinniRatingIcon">
            {icon}
          </span>
        ))}
    </span>
  );
};

export default Icons;
