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
  const { selectedValue } = useTabsContext();
  const selected = selectedValue === value;

  return (
    <Box
      className={cn('JinniTabPanel', className)}
      hidden={!selected}
      {...rest}
    >
      {selected && children}
    </Box>
  );
};

export default TabPanel;
