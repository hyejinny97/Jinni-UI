import './Month.scss';
import { forwardRef, memo } from 'react';
import cn from 'classnames';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ColorType } from '@/types/color';

type MonthProps = ButtonBaseProps<'button'> & {
  selected?: boolean;
  marked?: boolean;
  color?: ColorType;
  readOnly?: boolean;
};

const Month = forwardRef((props: MonthProps, ref: React.Ref<HTMLElement>) => {
  const {
    selected = false,
    marked = false,
    color = 'primary',
    readOnly = false,
    children,
    onClick,
    className,
    style,
    ...rest
  } = props;

  return (
    <ButtonBase
      ref={ref}
      className={cn('JinniMonth', { selected, marked }, className)}
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

export default memo(Month);
