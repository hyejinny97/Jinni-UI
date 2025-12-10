import './Tab.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { ValueType } from '../Tabs.types';
import { useTabsContext } from '../Tabs.hooks';
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

  return (
    <Button
      role="tab"
      className={cn('JinniTab', className)}
      onClick={(e: React.MouseEvent) => handleChange(e, value)}
      id={`${tabsId}-${value}-tab`}
      aria-controls={`${tabsId}-${value}-panel`}
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      data-value={value}
      variant={variant[selected ? 'selectedTab' : 'tab']}
      color={selected ? color : 'gray-500'}
      size={tabSize}
      fullWidth={fullWidth}
      disabled={disabled}
      overlayColor={overlayColor}
      disableOverlay={disableOverlay}
      rippleColor={rippleColor}
      rippleStartLocation={rippleStartLocation}
      disableRipple={disableRipple}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default Tab;
