import { useContext, useState, useRef, useEffect } from 'react';
import TabsContext from './Tabs.context';
import { TabsProps } from './Tabs';
import { ValueType, TabListOrientation } from './Tabs.types';

type UseTabValue = Required<Pick<TabsProps, 'defaultValue'>> &
  Pick<TabsProps, 'value' | 'onChange'>;

export const useTabValue = ({ defaultValue, value, onChange }: UseTabValue) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<ValueType | null>(
    defaultValue
  );

  const handleChange = (event: React.SyntheticEvent, newValue: ValueType) => {
    if (!isControlled) setUncontrolledValue(newValue);
    if (onChange) onChange(event, newValue);
  };

  return {
    selectedValue: isControlled ? value : uncontrolledValue,
    handleChange
  };
};

export const useTabsContext = () => {
  const value = useContext(TabsContext);
  if (!value) throw new Error('TabsContext value is null');
  return value;
};

export const useSlideTab = ({
  tabListOrientation
}: {
  tabListOrientation: TabListOrientation;
}) => {
  const tabsElRef = useRef<HTMLElement>(null);
  const [noPrevTab, setNoPrevTab] = useState<boolean>(false);
  const [noNextTab, setNoNextTab] = useState<boolean>(false);

  useEffect(() => {
    const tabsEl = tabsElRef.current;
    if (!tabsEl) return;

    const tabListContainerEl = tabsEl.querySelector<HTMLElement>(
      '.JinniTabListContainer'
    );
    const tabListEl = tabsEl.querySelector<HTMLElement>('.JinniTabList');
    if (!tabListContainerEl || !tabListEl) return;

    const checkTabToSlide = () => {
      switch (tabListOrientation) {
        case 'horizontal': {
          setNoPrevTab(tabListContainerEl.scrollLeft === 0);
          setNoNextTab(
            tabListContainerEl.scrollLeft ===
              tabListEl.clientWidth - tabListContainerEl.clientWidth
          );
          break;
        }
        case 'vertical': {
          setNoPrevTab(tabListContainerEl.scrollTop === 0);
          setNoNextTab(
            tabListContainerEl.scrollTop ===
              tabListEl.clientHeight - tabListContainerEl.clientHeight
          );
        }
      }
    };
    tabListContainerEl.addEventListener('scroll', checkTabToSlide);
    const resizeObserver = new ResizeObserver(checkTabToSlide);
    resizeObserver.observe(tabListContainerEl);
    return () => {
      tabListContainerEl.removeEventListener('scroll', checkTabToSlide);
      resizeObserver.unobserve(tabListContainerEl);
    };
  }, [tabListOrientation]);

  const slidePrevTab = () => {
    const tabsEl = tabsElRef.current;
    if (!tabsEl) return;

    const tabListContainerEl = tabsEl.querySelector<HTMLElement>(
      '.JinniTabListContainer'
    );
    const tabEls = Array.from(
      tabsEl.querySelectorAll<HTMLElement>('.JinniTab')
    );
    if (!tabListContainerEl || tabEls.length === 0) return;

    const prevTab = [...tabEls].reverse().find((el) => {
      switch (tabListOrientation) {
        case 'horizontal':
          return el.offsetLeft < tabListContainerEl.scrollLeft;
        case 'vertical':
          return el.offsetTop < tabListContainerEl.scrollTop;
      }
    });
    if (!prevTab) return;

    prevTab.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth'
    });
  };

  const slideNextTab = () => {
    const tabsEl = tabsElRef.current;
    if (!tabsEl) return;

    const tabListContainerEl = tabsEl.querySelector<HTMLElement>(
      '.JinniTabListContainer'
    );
    const tabEls = Array.from(
      tabsEl.querySelectorAll<HTMLElement>('.JinniTab')
    );
    if (!tabListContainerEl || tabEls.length === 0) return;

    const nextTab = tabEls.find((el) => {
      switch (tabListOrientation) {
        case 'horizontal':
          return (
            tabListContainerEl.scrollLeft + tabListContainerEl.clientWidth <
            el.offsetLeft + el.clientWidth
          );
        case 'vertical':
          return (
            tabListContainerEl.scrollTop + tabListContainerEl.clientHeight <
            el.offsetTop + el.clientHeight
          );
      }
    });
    if (!nextTab) return;

    nextTab.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth'
    });
  };

  return { tabsElRef, slidePrevTab, slideNextTab, noPrevTab, noNextTab };
};
