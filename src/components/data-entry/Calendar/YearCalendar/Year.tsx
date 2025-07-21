import './Year.scss';
import { forwardRef, memo } from 'react';
import cn from 'classnames';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ColorType } from '@/types/color';

type YearProps = ButtonBaseProps<'button'> & {
  selected?: boolean;
  marked?: boolean;
  color?: ColorType;
  readOnly?: boolean;
};

const Year = forwardRef((props: YearProps, ref: React.Ref<HTMLElement>) => {
  const {
    selected = false,
    marked = false,
    color = 'primary',
    readOnly = false,
    onClick,
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <ButtonBase
      ref={ref}
      className={cn('JinniYear', { selected, marked }, className)}
      style={{ '--color': color, ...style }}
      overlayColor={selected ? 'white' : 'black'}
      rippleColor={selected ? 'white' : 'black'}
      onClick={readOnly ? undefined : onClick}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
});

export default memo(Year);
