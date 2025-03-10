import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type EllipsisProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    type: 'ellipsis';
    page?: null;
    size?: 'sm' | 'md' | 'lg';
  };

const Ellipsis = <T extends AsType = 'span'>(props: EllipsisProps<T>) => {
  const { size = 'md', className, style, ...rest } = props;

  let sizeStyle;
  switch (size) {
    case 'sm':
      sizeStyle = { width: '26px', height: '26px', fontSize: '13px' };
      break;
    case 'md':
      sizeStyle = { width: '32px', height: '32px', fontSize: '15px' };
      break;
    case 'lg':
      sizeStyle = { width: '38px', height: '38px', fontSize: '17px' };
  }

  const newStyle = useStyle({ ...sizeStyle, ...style });

  return (
    <span className={cn('JinniEllipsis', className)} style={newStyle} {...rest}>
      ...
    </span>
  );
};

export default Ellipsis;
