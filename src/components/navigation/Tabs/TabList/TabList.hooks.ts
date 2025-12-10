import {
  useContext,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { TabListOrientation } from '../Tabs.types';
import TabListContext from './TabList.context';
import { useTabsContext } from '../Tabs.hooks';
import { useMountRef } from '@/hooks/useMount';

export const useTabListContext = () => {
  const value = useContext(TabListContext);
  if (!value) throw new Error('TabListContext value is null');
  return value;
};

export const useIndicator = ({
  tabListContainerElRef,
  tabListElRef,
  indicatorElRef,
  tabListOrientation
}: {
  tabListContainerElRef: React.RefObject<HTMLDivElement>;
  tabListElRef: React.RefObject<HTMLDivElement>;
  indicatorElRef: React.RefObject<HTMLDivElement>;
  tabListOrientation: TabListOrientation;
}) => {
  const isMountedRef = useMountRef();
  const { selectedValue } = useTabsContext();

  useLayoutEffect(() => {
    const tabListContainerEl = tabListContainerElRef.current;
    const tabListEl = tabListElRef.current;
    const indicatorEl = indicatorElRef.current;
    const isMounted = isMountedRef.current;
    if (!tabListContainerEl || !tabListEl || !indicatorEl) return;

    const tabEls = Array.from(
      tabListEl.querySelectorAll<HTMLElement>('.JinniTab')
    );
    const selectedTabEl = tabEls.find(
      (tabEl) => tabEl.dataset.value === selectedValue
    );
    if (!selectedTabEl) return;

    selectedTabEl.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'instant'
    });

    if (isMounted) {
      indicatorEl.style.transition = `
      transform var(--jinni-easing-emphasized) var(--jinni-duration-short3),
      width var(--jinni-easing-emphasized) var(--jinni-duration-short3),
      height var(--jinni-easing-emphasized) var(--jinni-duration-short3)`;
    }

    switch (tabListOrientation) {
      case 'horizontal':
        indicatorEl.style.transform = `translateX(${selectedTabEl.offsetLeft}px)`;
        indicatorEl.style.width = `${selectedTabEl.offsetWidth}px`;
        break;
      case 'vertical':
        indicatorEl.style.transform = `translateY(${selectedTabEl.offsetTop}px)`;
        indicatorEl.style.height = `${selectedTabEl.offsetHeight}px`;
    }
  }, [
    tabListContainerElRef,
    tabListElRef,
    indicatorElRef,
    isMountedRef,
    tabListOrientation,
    selectedValue
  ]);
};

export const useScroll = ({
  tabListContainerElRef,
  tabListElRef,
  scrollable,
  tabListOrientation
}: {
  tabListContainerElRef: React.RefObject<HTMLDivElement>;
  tabListElRef: React.RefObject<HTMLDivElement>;
  scrollable: boolean;
  tabListOrientation: TabListOrientation;
}) => {
  const isPointerDownRef = useRef<boolean>(false);

  const translateTabList = useCallback(
    (event: PointerEvent) => {
      const tabListContainerEl = tabListContainerElRef.current;
      const tabListEl = tabListElRef.current;
      if (!tabListContainerEl || !tabListEl) return;

      switch (tabListOrientation) {
        case 'horizontal': {
          const maxScroll =
            tabListEl.scrollWidth - tabListContainerEl.clientWidth;
          const nextScrollLeft =
            tabListContainerEl.scrollLeft - event.movementX;
          tabListContainerEl.scrollLeft = Math.max(
            0,
            Math.min(maxScroll, nextScrollLeft)
          );
          break;
        }
        case 'vertical': {
          const maxScroll =
            tabListEl.scrollHeight - tabListContainerEl.clientHeight;
          const nextScrollTop = tabListContainerEl.scrollTop - event.movementY;
          tabListContainerEl.scrollTop = Math.max(
            0,
            Math.min(maxScroll, nextScrollTop)
          );
        }
      }
    },
    [tabListContainerElRef, tabListElRef, tabListOrientation]
  );

  useEffect(() => {
    const tabListEl = tabListElRef.current;
    if (!scrollable || !tabListEl) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!tabListEl.contains(event.target as Node | null)) return;
      isPointerDownRef.current = true;
      translateTabList(event);
    };
    const handlePointerMove = (event: PointerEvent) => {
      const isPointerDown = isPointerDownRef.current;
      if (!isPointerDown) return;
      translateTabList(event);
    };
    const handlePointerUp = () => {
      isPointerDownRef.current = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [tabListElRef, scrollable, translateTabList]);
};

export const useKeyboardAccessibility = ({
  tabListElRef,
  tabListOrientation
}: {
  tabListElRef: React.RefObject<HTMLDivElement>;
  tabListOrientation: TabListOrientation;
}) => {
  const { selectedValue } = useTabsContext();

  useEffect(() => {
    const tabListEl = tabListElRef.current;
    if (!tabListEl) return;

    const tabEls = Array.from(
      tabListEl.querySelectorAll<HTMLElement>('.JinniTab')
    );
    const selectedTabIdx = tabEls.findIndex(
      (tabEl) => tabEl.dataset.value === selectedValue
    );
    if (tabEls.length === 0 || selectedTabIdx === -1) return;

    const lastTabIdx = tabEls.length - 1;
    let focusedTabIdx = selectedTabIdx;
    const focusPrevTab = () => {
      const prevTabIdx = focusedTabIdx - 1 < 0 ? lastTabIdx : focusedTabIdx - 1;
      const prevTab = tabEls[prevTabIdx];
      prevTab.focus();
      focusedTabIdx = prevTabIdx;
    };
    const focusNextTab = () => {
      const nextTabIdx = focusedTabIdx + 1 > lastTabIdx ? 0 : focusedTabIdx + 1;
      const nextTab = tabEls[nextTabIdx];
      nextTab.focus();
      focusedTabIdx = nextTabIdx;
    };
    const focusFirstTab = () => {
      const firstTab = tabEls[0];
      firstTab.focus();
      focusedTabIdx = 0;
    };
    const focusLastTab = () => {
      const lastTab = tabEls[lastTabIdx];
      lastTab.focus();
      focusedTabIdx = lastTabIdx;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (tabListOrientation) {
        case 'horizontal': {
          if (e.key === 'ArrowLeft') focusPrevTab();
          if (e.key === 'ArrowRight') focusNextTab();
          break;
        }
        case 'vertical': {
          if (e.key === 'ArrowUp') focusPrevTab();
          if (e.key === 'ArrowDown') focusNextTab();
        }
      }
      if (e.key === 'Home') focusFirstTab();
      if (e.key === 'End') focusLastTab();
    };
    tabListEl.addEventListener('keydown', handleKeyDown);
    return () => {
      tabListEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [tabListElRef, selectedValue, tabListOrientation]);
};
