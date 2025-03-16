import './Tabs.scss';
import cn from 'classnames';
import { useRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ValueType } from './Tab';
import { insertProps } from './Tabs.utils';
import { ColorType } from '@/types/color';
import { useIndicator, useScroll } from './Tabs.hooks';
import { VariantType, SizeType, Button } from '@/components/general/Button';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';

export type TabItemsType = Array<{
  element: HTMLElement;
  tabValue: ValueType;
}>;
export type TabVariantType = {
  selectedTab: VariantType;
  notSelectedTab: VariantType;
};
export type ScrollButtonsType = 'auto' | boolean;
export type OrientationType = 'vertical' | 'horizontal';

export type TabsProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'onChange'
> & {
  value: ValueType;
  onChange?: (event: React.SyntheticEvent, value: ValueType) => void;
  variant?: TabVariantType;
  color?: ColorType;
  size?: SizeType;
  fullWidth?: boolean;
  scrollable?: boolean;
  scrollButtons?: ScrollButtonsType;
  orientation?: OrientationType;
};

const DEFAULT_VARIANT = {
  selectedTab: 'text' as VariantType,
  notSelectedTab: 'text' as VariantType
};

const Tabs = <T extends AsType = 'div'>(props: TabsProps<T>) => {
  const {
    value: selectedTabValue,
    onChange,
    variant = DEFAULT_VARIANT,
    color = 'primary',
    size = 'md',
    fullWidth,
    scrollable = false,
    scrollButtons = 'auto',
    orientation = 'horizontal',
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const tabListContainerElRef = useRef<HTMLDivElement>(null);
  const tabListElRef = useRef<HTMLDivElement>(null);
  const tabItemsRef = useRef<TabItemsType>([]);
  const indicatorElRef = useRef<HTMLDivElement>(null);
  const { moveIndicator } = useIndicator({
    tabListContainerElRef,
    tabItemsRef,
    indicatorElRef,
    selectedTabValue,
    orientation
  });
  const {
    slideNextTab,
    slidePrevTab,
    hasPrevTab,
    hasNextTab,
    showScrollButtons,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useScroll({
    tabListContainerElRef,
    tabListElRef,
    tabItemsRef,
    scrollable,
    scrollButtons,
    orientation,
    moveIndicator
  });
  const newStyle = useStyle({ '--color': color, ...style });

  return (
    <Component
      className={cn('JinniTabs', orientation, className)}
      style={newStyle}
      {...rest}
    >
      {showScrollButtons && (
        <Button
          className={cn('JinniTabsScrollButton', 'prev-tab')}
          centerIcon={
            orientation === 'horizontal' ? <ArrowLeftIcon /> : <ArrowUpIcon />
          }
          variant="text"
          color="gray-500"
          size={size}
          disabled={!hasPrevTab}
          isSquareSize={orientation === 'horizontal'}
          fullWidth={orientation === 'vertical'}
          onClick={slidePrevTab}
        />
      )}
      <div
        ref={tabListContainerElRef}
        className="JinniTabListContainer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={tabListElRef}
          className={cn('JinniTabList', { fullWidth }, orientation)}
        >
          {insertProps(
            children,
            selectedTabValue,
            onChange,
            variant,
            color,
            size,
            fullWidth,
            orientation,
            tabItemsRef
          )}
        </div>
        <div
          ref={indicatorElRef}
          className={cn('JinniTabsIndicator', orientation)}
        />
      </div>
      {showScrollButtons && (
        <Button
          className={cn('JinniTabsScrollButton next-tab')}
          centerIcon={
            orientation === 'horizontal' ? (
              <ArrowRightIcon />
            ) : (
              <ArrowDownIcon />
            )
          }
          variant="text"
          color="gray-500"
          size={size}
          disabled={!hasNextTab}
          isSquareSize={orientation === 'horizontal'}
          fullWidth={orientation === 'vertical'}
          onClick={slideNextTab}
        />
      )}
    </Component>
  );
};

export default Tabs;
