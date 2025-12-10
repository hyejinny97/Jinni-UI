import './TabList.scss';
import cn from 'classnames';
import { useRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import TabListContext from './TabList.context';
import { ButtonProps } from '@/components/general/Button';
import { ColorType } from '@/types/color';
import {
  useIndicator,
  useScroll,
  useKeyboardAccessibility
} from './TabList.hooks';
import { useTabsContext } from '../Tabs.hooks';

export type TabVariantType = {
  selectedTab: NonNullable<ButtonProps['variant']>;
  tab: NonNullable<ButtonProps['variant']>;
};

export type TabListProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  Pick<
    ButtonProps,
    | 'disabled'
    | 'overlayColor'
    | 'disableOverlay'
    | 'rippleColor'
    | 'rippleStartLocation'
    | 'disableRipple'
  > & {
    variant?: TabVariantType;
    color?: ColorType;
    fullWidth?: boolean;
    scrollable?: boolean;
  };

const DEFAULT_VARIANT = {
  selectedTab: 'text',
  tab: 'text'
} as const;

const TabList = <T extends AsType = 'div'>(props: TabListProps<T>) => {
  const {
    variant = DEFAULT_VARIANT,
    color = 'primary',
    fullWidth,
    scrollable = false,
    disabled,
    overlayColor,
    disableOverlay,
    rippleColor,
    rippleStartLocation,
    disableRipple,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const tabListContainerElRef = useRef<HTMLDivElement>(null);
  const tabListElRef = useRef<HTMLDivElement>(null);
  const indicatorElRef = useRef<HTMLDivElement>(null);
  const { tabListOrientation } = useTabsContext();
  useIndicator({
    tabListContainerElRef,
    tabListElRef,
    indicatorElRef,
    tabListOrientation
  });
  useScroll({
    tabListContainerElRef,
    tabListElRef,
    scrollable,
    tabListOrientation
  });
  useKeyboardAccessibility({
    tabListElRef,
    tabListOrientation
  });
  const newStyle = useStyle({ '--color': color, ...style });

  return (
    <TabListContext.Provider
      value={{
        variant,
        color,
        fullWidth,
        disabled,
        overlayColor,
        disableOverlay,
        rippleColor,
        rippleStartLocation,
        disableRipple
      }}
    >
      <Component
        ref={tabListContainerElRef}
        className={cn('JinniTabListContainer', tabListOrientation, className)}
        style={newStyle}
      >
        <div
          ref={tabListElRef}
          role="tablist"
          className={cn('JinniTabList', { fullWidth }, tabListOrientation)}
          {...rest}
        >
          {children}
          <div
            ref={indicatorElRef}
            className={cn('JinniTabListIndicator', tabListOrientation)}
          />
        </div>
      </Component>
    </TabListContext.Provider>
  );
};

export default TabList;
