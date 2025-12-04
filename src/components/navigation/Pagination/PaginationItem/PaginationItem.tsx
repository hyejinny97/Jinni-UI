import './PaginationItem.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType } from '@/types/default-component-props';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { FirstPageIcon } from '@/components/icons/FirstPageIcon';
import { LastPageIcon } from '@/components/icons/LastPageIcon';
import { ButtonProps, Button } from '@/components/general/Button';
import { ColorType } from '@/types/color';

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

const PageButton = forwardRef<HTMLElement, PageButtonType>((props, ref) => {
  const {
    type,
    page,
    shape = 'circular',
    size = 'md',
    selected = false,
    color = 'primary',
    variant = 'text',
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
      {page}
    </Button>
  );
});

const ControlButton = forwardRef<HTMLElement, ControlButtonType>(
  (props, ref) => {
    const { type, shape = 'circular', size = 'md', className, ...rest } = props;

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
        {defaultIcon}
      </Button>
    );
  }
);

const PaginationItem = forwardRef<HTMLElement, PaginationItemProps>(
  (props, ref) => {
    switch (props.type) {
      case 'page': {
        return <PageButton ref={ref} {...props} />;
      }
      case 'first':
      case 'last':
      case 'prev':
      case 'next': {
        return <ControlButton ref={ref} {...props} />;
      }
    }
  }
);

export default PaginationItem;
