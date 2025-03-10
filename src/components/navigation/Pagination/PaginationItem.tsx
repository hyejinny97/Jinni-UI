import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType } from '@/types/default-component-props';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { FirstPageIcon } from '@/components/icons/FirstPageIcon';
import { LastPageIcon } from '@/components/icons/LastPageIcon';
import { VariantType, ButtonProps, Button } from '@/components/general/Button';
import { ColorType } from '@/types/color';

export type ShapeType = 'circular' | 'rounded';
export type SizeType = 'sm' | 'md' | 'lg';

export type PageButtonType<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  'type' | 'disabled' | 'shape' | 'size'
> & {
  type: 'page';
  page: number;
  variant?: VariantType;
  selected?: boolean;
  color?: ColorType;
  shape?: ShapeType;
  size?: SizeType;
  disabled?: boolean;
};

type ControlButtonType<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  'type' | 'disabled' | 'shape' | 'size'
> & {
  type: 'prev' | 'next' | 'first' | 'last';
  page: number;
  shape?: ShapeType;
  size?: SizeType;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export type PaginationItemProps<T extends AsType = 'button'> =
  | PageButtonType<T>
  | ControlButtonType<T>;

const PageButton = forwardRef(
  <T extends AsType = 'button'>(
    props: PageButtonType<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      page,
      variant = 'text',
      selected = false,
      color = 'primary',
      shape = 'circular',
      size = 'md',
      disabled = false,
      className,
      ...rest
    } = props;

    return (
      <Button
        ref={ref}
        className={cn('PaginationItem', 'page-type', className)}
        variant={variant}
        color={selected ? color : 'gray-500'}
        shape={shape === 'circular' ? 'pill' : 'rounded'}
        size={size}
        disabled={disabled}
        isSquareSize
        {...rest}
      >
        {page}
      </Button>
    );
  }
);

const ControlButton = forwardRef(
  <T extends AsType = 'button'>(
    props: ControlButtonType<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      type,
      shape = 'circular',
      size = 'md',
      disabled = false,
      icon,
      className,
      ...rest
    } = props;

    let defaultIcon;
    switch (type) {
      case 'first':
        defaultIcon = <FirstPageIcon />;
        break;
      case 'last':
        defaultIcon = <LastPageIcon />;
        break;
      case 'prev':
        defaultIcon = <ArrowLeftIcon />;
        break;
      case 'next':
        defaultIcon = <ArrowRightIcon />;
    }

    return (
      <Button
        ref={ref}
        className={cn('PaginationItem', 'control-type', className)}
        centerIcon={icon || defaultIcon}
        variant="text"
        color="gray-500"
        shape={shape === 'circular' ? 'pill' : 'rounded'}
        size={size}
        disabled={disabled}
        isSquareSize
        {...rest}
      />
    );
  }
);

const PaginationItem = forwardRef(
  <T extends AsType = 'button'>(
    props: PaginationItemProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
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
