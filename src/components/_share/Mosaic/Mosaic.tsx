import './Mosaic.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';

export type MosaicProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  mosaicColor?: ColorType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const Mosaic = <T extends AsType = 'div'>(props: MosaicProps<T>) => {
  const {
    children,
    mosaicColor = 'gray-200',
    size = 'md',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle({ '--color': mosaicColor, ...style });

  return (
    <Component
      className={cn('JinniMosaic', size, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Mosaic;
