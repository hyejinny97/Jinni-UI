import cn from 'classnames';
import { useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ReorderItemValueType } from './Reorder.types';
import { useReorder } from './Reorder.hooks';
import { ReorderItemContext } from './Reorder.contexts';

type ReorderItemProps<T extends AsType = 'li'> = DefaultComponentProps<T> & {
  value: ReorderItemValueType;
};

const ReorderItem = <T extends AsType = 'li'>(props: ReorderItemProps<T>) => {
  const {
    children,
    value,
    className,
    style,
    as: Component = 'li',
    ...rest
  } = props;
  const { moveItem, direction, isReorderingRef } = useReorder();
  const reorderItemElRef = useRef<HTMLElement>(null);
  const triggerElRef = useRef<HTMLElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const initItemPositionRef = useRef<{ top: number; left: number } | null>(
    null
  );
  const currentItemPositionRef = useRef<{ top: number; left: number } | null>(
    null
  );
  const needToTranslateToZeroRef = useRef<boolean>(false);
  const newStyle = useStyle(style);

  const findNextReorderItem = (targetEl: HTMLElement): Element | null => {
    const nextSibling = targetEl.nextElementSibling;
    if (nextSibling) {
      if (nextSibling.classList.contains('JinniReorderItem'))
        return nextSibling;
      else return findNextReorderItem(nextSibling as HTMLElement);
    }
    return null;
  };
  const findPrevReorderItem = (targetEl: HTMLElement): Element | null => {
    const prevSibling = targetEl.previousElementSibling;
    if (prevSibling) {
      if (prevSibling.classList.contains('JinniReorderItem'))
        return prevSibling;
      else return findPrevReorderItem(prevSibling as HTMLElement);
    }
    return null;
  };
  const checkOverlap = useCallback(
    (isForwardMoved: boolean) => {
      const targetEl = reorderItemElRef.current;
      const isReordering = isReorderingRef.current;
      if (!targetEl || isReordering) return;

      let sibling: Element | null = null;
      if (isForwardMoved) sibling = findNextReorderItem(targetEl);
      else sibling = findPrevReorderItem(targetEl);
      if (!sibling) return;

      const {
        top: siblingTop,
        bottom: siblingBottom,
        left: siblingLeft,
        right: siblingRight,
        width: siblingWidth,
        height: siblingHeight
      } = sibling.getBoundingClientRect();
      const {
        top: targetTop,
        bottom: targetBottom,
        left: targetLeft,
        right: targetRight
      } = targetEl.getBoundingClientRect();
      const siblingId = (sibling as HTMLElement).dataset.id;

      let isOverHalf: boolean = false;
      switch (direction) {
        case 'horizontal':
          isOverHalf = isForwardMoved
            ? targetRight > siblingLeft + siblingWidth / 2
            : targetLeft < siblingRight - siblingWidth / 2;
          break;
        case 'vertical':
          isOverHalf = isForwardMoved
            ? targetBottom > siblingTop + siblingHeight / 2
            : targetTop < siblingBottom - siblingHeight / 2;
      }

      if (isOverHalf && siblingId) {
        moveItem(value, siblingId);
      }
    },
    [moveItem]
  );
  const translateTemporary = ({
    transformValue,
    onTransitionEnd
  }: {
    transformValue: string;
    onTransitionEnd?: () => void;
  }) => {
    const reorderItemEl = reorderItemElRef.current;
    if (!reorderItemEl || !transformValue) return;

    reorderItemEl.addEventListener(
      'transitionend',
      () => {
        reorderItemEl.style.transition = 'none';
        onTransitionEnd?.();
      },
      {
        once: true
      }
    );
    requestAnimationFrame(() => {
      reorderItemEl.style.transition = `transform 0.1s ease`;
      reorderItemEl.style.transform = transformValue;
    });
  };

  useLayoutEffect(() => {
    const reorderItemEl = reorderItemElRef.current;
    if (!reorderItemEl) return;

    const initItemPosition = initItemPositionRef.current;
    const currentItemPosition = currentItemPositionRef.current;
    const { top, left } = reorderItemEl.getBoundingClientRect();
    if (!initItemPosition) {
      initItemPositionRef.current = { top, left };
      return;
    }

    if (isDraggingRef.current && currentItemPosition) {
      switch (direction) {
        case 'horizontal': {
          const movementX = currentItemPosition.left - initItemPosition.left;
          const newInitPosition = left - movementX;
          reorderItemEl.style.transform = `translateX(${currentItemPosition.left - newInitPosition}px)`;
          initItemPositionRef.current = { left: newInitPosition, top };
          break;
        }
        case 'vertical': {
          const movementY = currentItemPosition.top - initItemPosition.top;
          const newInitPosition = top - movementY;
          reorderItemEl.style.transform = `translateY(${currentItemPosition.top - newInitPosition}px)`;
          initItemPositionRef.current = { left, top: newInitPosition };
        }
      }
    } else {
      switch (direction) {
        case 'horizontal':
          if (initItemPosition.left !== left) {
            reorderItemEl.style.transform = `translateX(${initItemPosition.left - left}px)`;
            needToTranslateToZeroRef.current = true;
          }
          break;
        case 'vertical':
          if (initItemPosition.top !== top) {
            reorderItemEl.style.transform = `translateY(${initItemPosition.top - top}px)`;
            needToTranslateToZeroRef.current = true;
          }
      }
      initItemPositionRef.current = { top, left };
    }
  });

  useEffect(() => {
    if (needToTranslateToZeroRef.current) {
      let transformValue: string = '';
      switch (direction) {
        case 'horizontal':
          transformValue = 'translateX(0px)';
          break;
        case 'vertical':
          transformValue = 'translateY(0px)';
      }
      translateTemporary({
        transformValue,
        onTransitionEnd: () => {
          isReorderingRef.current = false;
          needToTranslateToZeroRef.current = false;
        }
      });
    }
  });

  useEffect(() => {
    const reorderItemEl = reorderItemElRef.current;
    const triggerEl = triggerElRef.current || reorderItemEl;
    if (!reorderItemEl || !triggerEl) return;

    const handlePointerDown = () => {
      isDraggingRef.current = true;
      const { top, left } = reorderItemEl.getBoundingClientRect();
      currentItemPositionRef.current = { top, left };
      reorderItemEl.style.zIndex = '1';
    };
    const handlePointerMove = (e: PointerEvent) => {
      const initItemPosition = initItemPositionRef.current;
      const currentItemPosition = currentItemPositionRef.current;
      if (!isDraggingRef.current || !currentItemPosition || !initItemPosition)
        return;

      let movement: number = 0;
      switch (direction) {
        case 'horizontal': {
          const translatedX = currentItemPosition.left - initItemPosition.left;
          const newTranslateX = translatedX + e.movementX;
          movement = e.movementX;
          reorderItemEl.style.transform = `translateX(${newTranslateX}px)`;
          break;
        }
        case 'vertical':
          const translatedY = currentItemPosition.top - initItemPosition.top;
          const newTranslateY = translatedY + e.movementY;
          movement = e.movementY;
          reorderItemEl.style.transform = `translateY(${newTranslateY}px)`;
      }
      const { top, left } = reorderItemEl.getBoundingClientRect();
      currentItemPositionRef.current = { top, left };
      if (movement !== 0) {
        checkOverlap(movement > 0);
      }
    };
    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      reorderItemEl.style.zIndex = '0';
      let transformValue: string = '';
      switch (direction) {
        case 'horizontal':
          transformValue = 'translateX(0)';
          break;
        case 'vertical':
          transformValue = 'translateY(0)';
      }
      translateTemporary({
        transformValue,
        onTransitionEnd: () => {
          const { top, left } = reorderItemEl.getBoundingClientRect();
          currentItemPositionRef.current = { top, left };
        }
      });
    };

    triggerEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      triggerEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [checkOverlap]);

  return (
    <ReorderItemContext.Provider value={{ triggerElRef }}>
      <Component
        ref={reorderItemElRef}
        data-id={value}
        className={cn('JinniReorderItem', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </ReorderItemContext.Provider>
  );
};

export default ReorderItem;
