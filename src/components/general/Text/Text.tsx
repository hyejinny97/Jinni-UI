import './Text.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { validatePositiveInteger } from '@/utils/isNumber';

export type TextProps<T extends AsType = 'p'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  lineClamp?: number;
  noMargin?: boolean;
};

const Text = forwardRef(
  <T extends AsType = 'p'>(
    props: TextProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      lineClamp,
      noMargin,
      className,
      style,
      as: Component = 'p',
      ...rest
    } = props;
    const newStyle = useStyle({
      '--line-clamp':
        lineClamp && validatePositiveInteger({ value: lineClamp }),
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
  }
);

export default Text;
