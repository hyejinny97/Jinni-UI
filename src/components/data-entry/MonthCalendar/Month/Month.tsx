import './Month.scss';
import { forwardRef, memo } from 'react';
import cn from 'classnames';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ColorType } from '@/types/color';

export type MonthProps = Omit<
  ButtonBaseProps<'button'>,
  'children' | 'value'
> & {
  value: Date;
  children: React.ReactNode;
  selected?: boolean;
  marked?: boolean;
  color?: ColorType;
  readOnly?: boolean;
};

const Month = forwardRef((props: MonthProps, ref: React.Ref<HTMLElement>) => {
  const {
    value,
    children,
    selected,
    marked,
    color = 'primary',
    readOnly,
    overlayColor = selected ? 'white' : 'black',
    rippleColor = selected ? 'white' : 'black',
    onClick,
    className,
    style,
    ...rest
  } = props;

  return (
    <ButtonBase
      ref={ref}
      className={cn('JinniMonth', { selected, marked }, className)}
      overlayColor={overlayColor}
      rippleColor={rippleColor}
      onClick={readOnly ? undefined : onClick}
      style={{ '--color': color, ...style }}
      data-value={value.toISOString()}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
});

export default memo(Month);
