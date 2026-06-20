'use client';

import './PaginationItem.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { FirstPageIcon } from '@/components/icons/FirstPageIcon';
import { LastPageIcon } from '@/components/icons/LastPageIcon';
import Button, { ButtonProps } from '@/components/Button';
import { ColorType } from '@/types/color';

export type ShapeType = 'circular' | 'rounded';
export type SizeType = 'sm' | 'md' | 'lg';

type PageButtonOwnProps = {
  type: 'page';
  page: number;
  shape?: ShapeType;
  size?: SizeType;
  selected?: boolean;
  color?: ColorType;
  disabled?: boolean;
};

type ControlButtonOwnProps = {
  type: 'prev' | 'next' | 'first' | 'last';
  page: number;
  shape?: ShapeType;
  size?: SizeType;
  disabled?: boolean;
};

export type PageButtonType<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  keyof PageButtonOwnProps
> &
  PageButtonOwnProps;

export type ControlButtonType<T extends AsType = 'button'> = Omit<
  ButtonProps<T>,
  keyof ControlButtonOwnProps
> &
  ControlButtonOwnProps;

export type PaginationItemProps<T extends AsType = 'button'> =
  | PageButtonType<T>
  | ControlButtonType<T>;

const PaginationItem = <T extends AsType = 'button'>(
  props: PaginationItemProps<T>
) => {
  if (props.type === 'page') {
    const {
      ref,
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

    const buttonProps = {
      ref,
      className: cn('JinniPaginationItem', `${type}-type`, size, className),
      shape: shape === 'circular' ? 'pill' : 'rounded',
      size,
      variant,
      color: selected ? color : 'on-surface',
      ...rest
    } as ButtonProps<T>;

    return <Button {...buttonProps}>{children || page}</Button>;
  } else {
    const {
      ref,
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
        defaultIcon = <FirstPageIcon color="on-surface-variant" />;
        break;
      case 'last':
        defaultIcon = <LastPageIcon color="on-surface-variant" />;
        break;
      case 'prev':
        defaultIcon = <ArrowLeftIcon color="on-surface-variant" />;
        break;
      case 'next':
        defaultIcon = <ArrowRightIcon color="on-surface-variant" />;
    }

    const buttonProps = {
      ref,
      className: cn('JinniPaginationItem', 'control-type', size, className),
      shape: shape === 'circular' ? 'pill' : 'rounded',
      size,
      variant: 'text',
      color: 'on-surface-variant',
      ...rest
    } as ButtonProps<T>;

    return <Button {...buttonProps}>{children || defaultIcon}</Button>;
  }
};

export default PaginationItem;
