'use client';

import './Tab.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import Button, { ButtonProps } from '@/components/Button';
import { ValueType, useTabsContext } from '../Tabs';
import { useTabListContext } from '../TabList';

type TabProps<T extends AsType = 'button'> = Omit<ButtonProps<T>, 'value'> & {
  value: ValueType;
};

const Tab = <T extends AsType = 'button'>(props: TabProps<T>) => {
  const { value, children, className, ...rest } = props;
  const { tabsId, selectedValue, handleChange, tabSize } = useTabsContext();
  const {
    variant,
    color,
    fullWidth,
    disabled,
    overlayColor,
    disableOverlay,
    rippleColor,
    rippleStartLocation,
    disableRipple
  } = useTabListContext();
  const selected = selectedValue === value;

  const buttonProps = {
    role: 'tab',
    className: cn('JinniTab', className),
    onClick: (e: React.MouseEvent) => handleChange(e, value),
    id: `${tabsId}-${value}-tab`,
    'aria-controls': `${tabsId}-${value}-panel`,
    tabIndex: selected ? 0 : -1,
    'aria-selected': selected,
    'data-value': value,
    variant: variant[selected ? 'selectedTab' : 'tab'],
    color: selected ? color : 'on-surface-variant',
    size: tabSize,
    fullWidth,
    disabled,
    overlayColor,
    disableOverlay,
    rippleColor,
    rippleStartLocation,
    disableRipple,
    ...rest
  } as ButtonProps<T>;

  return <Button {...buttonProps}>{children}</Button>;
};

export default Tab;
