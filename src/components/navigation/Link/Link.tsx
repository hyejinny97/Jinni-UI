import './Link.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type LinkProps<T extends AsType = 'a'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  lineClamp?: number;
  underline?: 'always' | 'hover' | 'none';
};

const Link = forwardRef(
  <T extends AsType = 'a'>(
    props: LinkProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      lineClamp,
      underline = 'always',
      className,
      style,
      as: Component = 'a',
      ...rest
    } = props;
    const newStyle = useStyle({ '--line-clamp': lineClamp, ...style });

    return (
      <Component
        ref={ref}
        className={cn('JinniLink', { lineClamp }, underline, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Link;
