import { ValueType } from './Tab';
import {
  TabsProps,
  TabItemsType,
  TabVariantType,
  OrientationType
} from './Tabs';

export const insertProps = (
  elements: Array<JSX.Element> | undefined,
  selectedTabValue: ValueType,
  onChange: TabsProps['onChange'],
  variant: TabVariantType,
  color: TabsProps['color'],
  size: TabsProps['size'],
  fullWidth: TabsProps['fullWidth'],
  orientation: OrientationType,
  tabItemsRef: React.MutableRefObject<TabItemsType>
): Array<JSX.Element> | undefined => {
  return elements?.map((element, elementIdx) => {
    if (element.type?.displayName !== 'Tab') return element;
    const tabValue = element.props.value || elementIdx;
    const selected = selectedTabValue === tabValue;
    return {
      ...element,
      props: {
        ...element.props,
        value: tabValue,
        selected,
        onClick: (e: React.SyntheticEvent) => {
          if (element.props.onClick) element.props.onClick(e);
          if (onChange) onChange(e, tabValue);
        },
        variant: selected ? variant.selectedTab : variant.notSelectedTab,
        color,
        size,
        fullWidth: fullWidth || orientation === 'vertical',
        ref: (element: HTMLElement) => {
          if (!element) return;
          tabItemsRef.current[elementIdx] = { element, tabValue };
        }
      }
    };
  });
};
