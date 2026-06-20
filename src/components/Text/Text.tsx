import './Text.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { validatePositiveInteger } from '@/utils/isNumber';

export type TextProps<T extends AsType = 'p'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  lineClamp?: number;
  noMargin?: boolean;
};

const Text = <T extends AsType = 'p'>({ ref, ...props }: TextProps<T>) => {
  const { children, lineClamp, noMargin, className, style, as, ...rest } =
    props;
  const Component = (as ?? 'p') as React.ElementType;
  const newStyle = useStyle({
    '--line-clamp': lineClamp && validatePositiveInteger({ value: lineClamp }),
    ...style
  });

  return (
    <Component
      ref={ref}
      className={cn('JinniText', { lineClamp, noMargin }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Text;
