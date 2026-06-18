import cn from 'classnames';
import { useId } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import TabsContext from './Tabs.context';
import { useTabValue, useSlideTab } from './Tabs.hooks';
import { ValueType, TabListOrientation } from './Tabs.types';
import { ButtonProps } from '@/components/Button';

export type TabsProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: ValueType | null;
  value?: ValueType;
  onChange?: (event: React.SyntheticEvent, value: ValueType) => void;
  tabListOrientation?: TabListOrientation;
  tabSize?: ButtonProps['size'];
};

const Tabs = <T extends AsType = 'div'>(props: TabsProps<T>) => {
  const {
    defaultValue = null,
    value,
    onChange,
    tabListOrientation = 'horizontal',
    tabSize = 'md',
    children,
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'div') as React.ElementType;
  const tabsId = useId();
  const { selectedValue, handleChange } = useTabValue({
    defaultValue,
    value,
    onChange
  });
  const { tabsElRef, slidePrevTab, slideNextTab, noPrevTab, noNextTab } =
    useSlideTab({
      tabListOrientation
    });
  const newStyle = useStyle(style);

  return (
    <TabsContext
      value={{
        tabsId,
        selectedValue,
        handleChange,
        tabListOrientation,
        tabSize,
        slidePrevTab,
        slideNextTab,
        noPrevTab,
        noNextTab
      }}
    >
      <Component
        ref={tabsElRef}
        className={cn('JinniTabs', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </TabsContext>
  );
};

export default Tabs;
