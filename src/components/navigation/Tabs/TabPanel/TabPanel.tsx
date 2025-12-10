import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Box, BoxProps } from '@/components/layout/Box';
import { ValueType } from '../Tabs.types';
import { useTabsContext } from '../Tabs.hooks';

type TabPanelProps<T extends AsType = 'div'> = Omit<BoxProps<T>, 'value'> & {
  value: ValueType;
};

const TabPanel = <T extends AsType = 'div'>(props: TabPanelProps<T>) => {
  const { value, children, className, ...rest } = props;
  const { tabsId, selectedValue } = useTabsContext();
  const selected = selectedValue === value;

  return (
    <Box
      role="tabpanel"
      className={cn('JinniTabPanel', className)}
      id={`${tabsId}-${value}-panel`}
      aria-labelledby={`${tabsId}-${value}-tab`}
      hidden={!selected}
      {...rest}
    >
      {selected && children}
    </Box>
  );
};

export default TabPanel;
