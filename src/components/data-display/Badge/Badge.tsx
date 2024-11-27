import './Badge.scss';
import cn from 'classnames';
import type { ColorType } from '@/types/color';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

interface BadgeProps extends DefaultComponentProps<HTMLSpanElement> {
  badgeContent?: React.ReactNode;
  children: React.ReactNode;
  max?: number;
  showZero?: boolean;
  variant?: 'standard' | 'dot';
  invisible?: boolean;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg';
  origin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
}

const Badge = (props: BadgeProps) => {
  const {
    badgeContent,
    children,
    max = 99,
    showZero = false,
    variant = 'standard',
    invisible = false,
    color = 'primary',
    size = 'md',
    origin = { vertical: 'top', horizontal: 'right' },
    className,
    style,
    ...rest
  } = props;
  const newStyle = useStyle({ backgroundColor: color, ...style });
  const isNumberTypeContent = typeof badgeContent === 'number';
  const showBadge = !invisible && !(badgeContent === 0 && !showZero);
  const showContent = variant !== 'dot';

  const newBadgeContent =
    isNumberTypeContent && badgeContent > max ? `${max}+` : badgeContent;
  return (
    <span
      className={cn(
        'JinniBadge',
        variant,
        size,
        origin.vertical,
        origin.horizontal,
        className
      )}
      {...rest}
    >
      {showBadge && (
        <span className="badge" style={newStyle}>
          {showContent && newBadgeContent}
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
