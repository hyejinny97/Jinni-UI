import './Badge.scss';
import cn from 'classnames';
import { editColorStyle, editColor } from '@/utils/editColorStyle';
import type { StyleType } from '@/types/style';
import type { ColorType } from '@/types/color';

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
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
  className?: string;
  style?: StyleType;
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
    style
  } = props;
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
    >
      {showBadge && (
        <span
          className="badge"
          style={{
            backgroundColor: editColor(color),
            ...editColorStyle(style)
          }}
        >
          {showContent && newBadgeContent}
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
