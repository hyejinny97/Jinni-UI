import './Badge.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { validatePositiveInteger } from '@/utils/isNumber';

type AnchorOriginType = {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
};

type BadgeProps<T extends AsType = 'span'> = Omit<
  DefaultComponentProps<T>,
  'content'
> & {
  children: React.ReactNode;
  content?: React.ReactNode;
  max?: number;
  showZero?: boolean;
  variant?: 'standard' | 'dot';
  invisible?: boolean;
  size?: 'sm' | 'md' | 'lg';
  anchorOrigin?: AnchorOriginType;
};

const DEFAULT_ANCHOR_ORIGIN = { vertical: 'top', horizontal: 'right' };

const Badge = <T extends AsType = 'span'>(props: BadgeProps<T>) => {
  const {
    children,
    content,
    max = 99,
    showZero = false,
    variant = 'standard',
    invisible = false,
    size = 'md',
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const validatedMax = validatePositiveInteger({ value: max });
  const computedAnchorOrigin = useMemo(
    () => ({ ...DEFAULT_ANCHOR_ORIGIN, ...anchorOrigin }),
    [anchorOrigin]
  );
  const newStyle = useStyle(style);

  const showBadge = !invisible && !(content === 0 && !showZero);
  const showContent = variant === 'standard';
  const badgeContent =
    typeof content === 'number' && content > validatedMax
      ? `${validatedMax}+`
      : content;

  return (
    <Component
      className={cn(
        'JinniBadge',
        computedAnchorOrigin.vertical,
        computedAnchorOrigin.horizontal,
        className
      )}
    >
      {children}
      {showBadge && (
        <span
          className={cn('JinniBadgeRoot', variant, size)}
          style={newStyle}
          {...rest}
        >
          {showContent && badgeContent}
        </span>
      )}
    </Component>
  );
};

export default Badge;
