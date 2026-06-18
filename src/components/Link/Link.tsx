import './Link.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { validatePositiveInteger } from '@/utils/isNumber';

type LinkProps<T extends AsType = 'a'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  href: string;
  lineClamp?: number;
  underline?: 'always' | 'hover' | 'none';
};

const Link = <T extends AsType = 'a'>({ ref, ...props }: LinkProps<T>) => {
  const {
    children,
    href,
    lineClamp,
    underline = 'always',
    className,
    style,
    as: Component = 'a',
    ...rest
  } = props;
  const newStyle = useStyle({
    '--line-clamp': lineClamp && validatePositiveInteger({ value: lineClamp }),
    ...style
  });

  return (
    <Component
      ref={ref}
      href={href}
      className={cn('JinniLink', { lineClamp }, underline, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Link;
