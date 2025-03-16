import { useLayoutEffect, useCallback, useRef, useState } from 'react';
import { ValueType } from './Tab';
import { TabItemsType, ScrollButtonsType, OrientationType } from './Tabs';
import useBreakpoint from '@/hooks/useBreakpoint';

export const useIndicator = ({
  tabListContainerElRef,
  tabItemsRef,
  indicatorElRef,
  selectedTabValue,
  orientation
}: {
  tabListContainerElRef: React.RefObject<HTMLDivElement>;
  tabItemsRef: React.MutableRefObject<TabItemsType>;
  indicatorElRef: React.RefObject<HTMLDivElement>;
  selectedTabValue: ValueType;
  orientation: OrientationType;
}) => {
  useLayoutEffect(() => {
    const tabListContainerEl = tabListContainerElRef.current;
    const tabItems = tabItemsRef.current;
    const indicatorEl = indicatorElRef.current;
    if (tabItems.length === 0 || !indicatorEl || !tabListContainerEl) return;

    const selectedTabItem = tabItems.find(
      (el) => el.tabValue === selectedTabValue
    );
    if (!selectedTabItem) return;

    const { left: tabListContainerLeft, top: tanListContainerTop } =
      tabListContainerEl.getBoundingClientRect();
    const {
      left: selectedTabItemLeft,
      top: selectedTabItemTop,
      width: selectedTabItemWidth,
      height: selectedTabItemHeight
    } = selectedTabItem.element.getBoundingClientRect();

    switch (orientation) {
      case 'horizontal':
        indicatorEl.style.left = `${selectedTabItemLeft - tabListContainerLeft}px`;
        indicatorEl.style.width = `${selectedTabItemWidth}px`;
        break;
      case 'vertical':
        indicatorEl.style.top = `${selectedTabItemTop - tanListContainerTop}px`;
        indicatorEl.style.height = `${selectedTabItemHeight}px`;
    }
  }, [
    tabListContainerElRef,
    tabItemsRef,
    indicatorElRef,
    selectedTabValue,
    orientation
  ]);

  const moveIndicator = useCallback(
    (distanceToMove: number) => {
      const indicatorEl = indicatorElRef.current;
      if (!indicatorEl) return;

      switch (orientation) {
        case 'horizontal': {
          const currentIndicatorLeft =
            Number(indicatorEl.style.left.replace('px', '')) || 0;
          indicatorEl.style.left = `${currentIndicatorLeft + distanceToMove}px`;
          break;
        }
        case 'vertical': {
          const currentIndicatorTop =
            Number(indicatorEl.style.top.replace('px', '')) || 0;
          indicatorEl.style.top = `${currentIndicatorTop + distanceToMove}px`;
        }
      }
    },
    [indicatorElRef, orientation]
  );

  return { moveIndicator };
};

export const useScroll = ({
  tabListContainerElRef,
  tabListElRef,
  tabItemsRef,
  scrollable,
  scrollButtons,
  orientation,
  moveIndicator
}: {
  tabListContainerElRef: React.RefObject<HTMLDivElement>;
  tabListElRef: React.RefObject<HTMLDivElement>;
  tabItemsRef: React.MutableRefObject<TabItemsType>;
  scrollable: boolean;
  scrollButtons: ScrollButtonsType;
  orientation: OrientationType;
  moveIndicator: (distanceToMove: number) => void;
}) => {
  const firstTabIdxInViewRef = useRef<number | null>(null);
  const lastTabIdxInViewRef = useRef<number | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const touchPositionRef = useRef<number | null>(null);
  const [hasPrevTab, setHasPrevTab] = useState(false);
  const [hasNextTab, setHasNextTab] = useState(false);
  const breakpoint = useBreakpoint();

  const isDesktopViewport = breakpoint === 'lg' || breakpoint === 'xl';
  let showScrollButtons = false;
  if (scrollable) {
    if (
      (scrollButtons === 'auto' && isDesktopViewport) ||
      scrollButtons === true
    )
      showScrollButtons = true;
  }

  const findFirstTabIdxInView = useCallback(() => {
    const tabListContainerEl = tabListContainerElRef.current;
    const tabItems = tabItemsRef.current;
    if (!tabListContainerEl || tabItems.length === 0) return;

    const { left: tabListContainerLeft, top: tabListContainerTop } =
      tabListContainerEl.getBoundingClientRect();
    for (let idx = tabItems.length - 1; idx >= 0; idx--) {
      const { left: tabItemLeft, top: tabItemTop } =
        tabItems[idx].element.getBoundingClientRect();
      switch (orientation) {
        case 'horizontal': {
          if (tabListContainerLeft <= tabItemLeft)
            firstTabIdxInViewRef.current = idx;
          break;
        }
        case 'vertical':
          if (tabListContainerTop <= tabItemTop)
            firstTabIdxInViewRef.current = idx;
      }
    }
  }, [tabListContainerElRef, tabItemsRef, orientation]);

  const findLastTabIdxInView = useCallback(() => {
    const tabListContainerEl = tabListContainerElRef.current;
    const tabItems = tabItemsRef.current;
    if (!tabListContainerEl || tabItems.length === 0) return;

    const { right: tabListContainerRight, bottom: tabListContainerBottom } =
      tabListContainerEl.getBoundingClientRect();
    for (let idx = 0; idx < tabItems.length; idx++) {
      const { right: tabItemRight, bottom: tabItemBottom } =
        tabItems[idx].element.getBoundingClientRect();
      switch (orientation) {
        case 'horizontal': {
          if (tabListContainerRight >= tabItemRight)
            lastTabIdxInViewRef.current = idx;
          break;
        }
        case 'vertical': {
          if (tabListContainerBottom >= tabItemBottom)
            lastTabIdxInViewRef.current = idx;
        }
      }
    }
  }, [tabListContainerElRef, tabItemsRef, orientation]);

  const checkPrevTab = useCallback(() => {
    if (firstTabIdxInViewRef.current === null) return;
    if (firstTabIdxInViewRef.current === 0) setHasPrevTab(false);
    else setHasPrevTab(true);
  }, []);

  const checkNextTab = useCallback(() => {
    const tabItems = tabItemsRef.current;
    if (lastTabIdxInViewRef.current === null || tabItems.length === 0) return;
    if (lastTabIdxInViewRef.current === tabItems.length - 1)
      setHasNextTab(false);
    else setHasNextTab(true);
  }, [tabItemsRef]);

  useLayoutEffect(() => {
    findFirstTabIdxInView();
    findLastTabIdxInView();
    checkPrevTab();
    checkNextTab();
  }, [findFirstTabIdxInView, findLastTabIdxInView, checkPrevTab, checkNextTab]);

  const checkReferences = () => {
    const tabListContainerEl = tabListContainerElRef.current;
    const tabListEl = tabListElRef.current;
    const tabItems = tabItemsRef.current;
    const firstTabIdxInView = firstTabIdxInViewRef.current;
    const lastTabIdxInView = lastTabIdxInViewRef.current;
    if (
      !tabListContainerEl ||
      !tabListEl ||
      tabItems.length === 0 ||
      firstTabIdxInView === null ||
      lastTabIdxInView === null
    )
      return;
    return {
      tabListContainerEl,
      tabListEl,
      tabItems,
      firstTabIdxInView,
      lastTabIdxInView
    };
  };

  const moveTabList = (distanceToMove: number) => {
    const tabListEl = tabListElRef.current;
    if (!tabListEl) return;

    switch (orientation) {
      case 'horizontal': {
        const prevLeftValue =
          Number(tabListEl.style.left.replace('px', '')) || 0;
        tabListEl.style.left = `${prevLeftValue + distanceToMove}px`;
        break;
      }
      case 'vertical': {
        const prevTopValue = Number(tabListEl.style.top.replace('px', '')) || 0;
        tabListEl.style.top = `${prevTopValue + distanceToMove}px`;
      }
    }
    isTransitioningRef.current = true;
  };

  const slideNextTab = () => {
    const references = checkReferences();
    if (!references || !hasNextTab || isTransitioningRef.current) return;

    const { tabListContainerEl, tabListEl, tabItems, lastTabIdxInView } =
      references;
    const nextTabIdx = lastTabIdxInView + 1;
    const nextTab = tabItems[nextTabIdx].element;
    let distanceToMove;
    switch (orientation) {
      case 'horizontal': {
        distanceToMove =
          tabListContainerEl.getBoundingClientRect().right -
          nextTab.getBoundingClientRect().right;
        break;
      }
      case 'vertical': {
        distanceToMove =
          tabListContainerEl.getBoundingClientRect().bottom -
          nextTab.getBoundingClientRect().bottom;
      }
    }
    moveTabList(distanceToMove);
    moveIndicator(distanceToMove);

    lastTabIdxInViewRef.current = nextTabIdx;
    tabListEl.addEventListener('transitionend', () => {
      findFirstTabIdxInView();
      checkPrevTab();
      checkNextTab();
      isTransitioningRef.current = false;
    });
  };

  const slidePrevTab = () => {
    const references = checkReferences();
    if (!references || !hasPrevTab || isTransitioningRef.current) return;

    const { tabListContainerEl, tabListEl, tabItems, firstTabIdxInView } =
      references;
    const prevTabIdx = firstTabIdxInView - 1;
    const prevTab = tabItems[prevTabIdx].element;
    let distanceToMove;
    switch (orientation) {
      case 'horizontal': {
        distanceToMove =
          tabListContainerEl.getBoundingClientRect().left -
          prevTab.getBoundingClientRect().left;
        break;
      }
      case 'vertical': {
        distanceToMove =
          tabListContainerEl.getBoundingClientRect().top -
          prevTab.getBoundingClientRect().top;
      }
    }
    moveTabList(distanceToMove);
    moveIndicator(distanceToMove);

    firstTabIdxInViewRef.current = prevTabIdx;
    tabListEl.addEventListener('transitionend', () => {
      findLastTabIdxInView();
      checkPrevTab();
      checkNextTab();
      isTransitioningRef.current = false;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    switch (orientation) {
      case 'horizontal': {
        touchPositionRef.current = e.touches[0].clientX;
        break;
      }
      case 'vertical': {
        touchPositionRef.current = e.touches[0].clientY;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const tabListContainerEl = tabListContainerElRef.current;
    const touchPosition = touchPositionRef.current;
    if (!tabListContainerEl || touchPosition === null) return;

    let currentTouchPosition;
    let threshold;
    switch (orientation) {
      case 'horizontal': {
        currentTouchPosition = e.touches[0].clientX;
        threshold = tabListContainerEl.clientWidth * 0.1;
        break;
      }
      case 'vertical': {
        currentTouchPosition = e.touches[0].clientY;
        threshold = tabListContainerEl.clientHeight * 0.1;
      }
    }
    const moveDistance = touchPosition - currentTouchPosition;
    if (Math.abs(moveDistance) < threshold) return;
    if (moveDistance > 0) slideNextTab();
    else slidePrevTab();
    touchPositionRef.current = currentTouchPosition;
  };

  const handleTouchEnd = () => {
    touchPositionRef.current = null;
  };

  return {
    slideNextTab,
    slidePrevTab,
    hasPrevTab,
    hasNextTab,
    showScrollButtons,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
