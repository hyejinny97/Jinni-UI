import './PaginationItem.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { FirstPageIcon } from '@/components/icons/FirstPageIcon';
import { LastPageIcon } from '@/components/icons/LastPageIcon';
import { ButtonProps, Button } from '@/components/general/Button';
import { ColorType } from '@/types/color';
import { genericForwardRef } from '@/utils/genericForwardRef';

export type ShapeType = 'circular' | 'rounded';
export type SizeType = 'sm' | 'md' | 'lg';

export type PageButtonType<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  'type' | 'shape' | 'size' | 'disabled'
> & {
  type: 'page';
  page: number;
  shape?: ShapeType;
  size?: SizeType;
  selected?: boolean;
  color?: ColorType;
  disabled?: boolean;
};

type ControlButtonType<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  'type' | 'shape' | 'size' | 'disabled'
> & {
  type: 'prev' | 'next' | 'first' | 'last';
  page: number;
  shape?: ShapeType;
  size?: SizeType;
  disabled?: boolean;
};

export type PaginationItemProps<T extends AsType = 'button'> =
  | PageButtonType<T>
  | ControlButtonType<T>;

/* eslint-disable  @typescript-eslint/no-explicit-any */
const PaginationItem = genericForwardRef<HTMLElement, PaginationItemProps<any>>(
  (props, ref) => {
    if (props.type === 'page') {
      const {
        type,
        page,
        shape = 'circular',
        size = 'md',
        selected = false,
        color = 'primary',
        variant = 'text',
        children,
        className,
        ...rest
      } = props;

      return (
        <Button
          ref={ref}
          className={cn('JinniPaginationItem', `${type}-type`, size, className)}
          shape={shape === 'circular' ? 'pill' : 'rounded'}
          size={size}
          variant={variant}
          color={selected ? color : 'gray-500'}
          {...rest}
        >
          {children || page}
        </Button>
      );
    } else {
      const {
        type,
        shape = 'circular',
        size = 'md',
        children,
        className,
        ...rest
      } = props;

      let defaultIcon;
      switch (type) {
        case 'first':
          defaultIcon = <FirstPageIcon color="gray-500" />;
          break;
        case 'last':
          defaultIcon = <LastPageIcon color="gray-500" />;
          break;
        case 'prev':
          defaultIcon = <ArrowLeftIcon color="gray-500" />;
          break;
        case 'next':
          defaultIcon = <ArrowRightIcon color="gray-500" />;
      }

      return (
        <Button
          ref={ref}
          className={cn('JinniPaginationItem', 'control-type', size, className)}
          shape={shape === 'circular' ? 'pill' : 'rounded'}
          size={size}
          variant="text"
          color="gray-500"
          {...rest}
        >
          {children || defaultIcon}
        </Button>
      );
    }
  }
);

export default PaginationItem;
