import { useEffect, useRef } from 'react';

export type DragFreeProps = {
  direction?: 'horizontal' | 'vertical';
  friction?: 'small' | 'medium' | 'large';
  disableSlipEffect?: boolean;
  disableOverDragEffect?: boolean;
  disabled?: boolean;
};

const useDragFree = ({
  direction = 'horizontal',
  friction = 'medium',
  disableSlipEffect,
  disableOverDragEffect,
  disabled
}: DragFreeProps) => {
  const targetElRef = useRef<HTMLElement | null>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);
  const containerElRef = useRef<HTMLElement | null>(null);

  const isTriggerElGrabbedRef = useRef<boolean>(false);
  const currentPositionRef = useRef<number>(0);
  const lastEventTimeRef = useRef<number>(0);
  const lastVelocityRef = useRef<number>(0);
  const slipIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const recoverIntervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const constrainHorizontal = (
    containerEl: HTMLElement,
    targetEl: HTMLElement,
    movementX: number,
    overDraggable: boolean
  ): number => {
    const {
      left: containerElLeft,
      right: containerElRight,
      width: containerElWidth
    } = containerEl.getBoundingClientRect();
    const {
      left: targetElLeft,
      right: targetElRight,
      width: targetElWidth
    } = targetEl.getBoundingClientRect();
    const currentPosition = currentPositionRef.current;

    let maxDistance = 0;
    let farAway = 0;
    if (containerElWidth >= targetElWidth) {
      if (movementX > 0) {
        maxDistance = Math.abs(containerElRight - targetElRight);
        farAway = targetElRight + movementX - containerElRight;
      } else {
        maxDistance = Math.abs(containerElLeft - targetElLeft);
        farAway = containerElLeft - (targetElLeft + movementX);
      }
    } else {
      if (movementX > 0) {
        maxDistance = Math.abs(containerElLeft - targetElLeft);
        farAway = targetElLeft + movementX - containerElLeft;
      } else {
        maxDistance = Math.abs(containerElRight - targetElRight);
        farAway = containerElRight - (targetElRight + movementX);
      }
    }

    let distance = Math.min(maxDistance, Math.abs(movementX));
    if (overDraggable && farAway > 0) {
      distance = Math.abs(movementX) / Math.sqrt(farAway);
    }
    const movement = movementX > 0 ? distance : -distance;
    return currentPosition + movement;
  };
  const constrainVertical = (
    containerEl: HTMLElement,
    targetEl: HTMLElement,
    movementY: number,
    overDraggable: boolean
  ): number => {
    const {
      top: containerElTop,
      bottom: containerElBottom,
      height: containerElHeight
    } = containerEl.getBoundingClientRect();
    const {
      top: targetElTop,
      bottom: targetElBottom,
      height: targetElHeight
    } = targetEl.getBoundingClientRect();
    const currentPosition = currentPositionRef.current;

    let maxDistance = 0;
    let farAway = 0;
    if (containerElHeight >= targetElHeight) {
      if (movementY > 0) {
        maxDistance = Math.abs(containerElBottom - targetElBottom);
        farAway = targetElBottom + movementY - containerElBottom;
      } else {
        maxDistance = Math.abs(containerElTop - targetElTop);
        farAway = containerElTop - (targetElTop + movementY);
      }
    } else {
      if (movementY > 0) {
        maxDistance = Math.abs(containerElTop - targetElTop);
        farAway = targetElTop + movementY - containerElTop;
      } else {
        maxDistance = Math.abs(containerElBottom - targetElBottom);
        farAway = containerElBottom - (targetElBottom + movementY);
      }
    }

    let distance = Math.min(maxDistance, Math.abs(movementY));
    if (overDraggable && farAway > 0) {
      distance = Math.abs(movementY) / Math.sqrt(farAway);
    }
    const movement = movementY > 0 ? distance : -distance;
    return currentPosition + movement;
  };

  const dragHorizontal = ({
    targetEl,
    movementX,
    containerEl,
    overDraggable = true
  }: {
    targetEl: HTMLElement;
    movementX: number;
    containerEl?: HTMLElement | null;
    overDraggable?: boolean;
  }) => {
    const currentPosition = currentPositionRef.current;
    const draggedPosition = containerEl
      ? constrainHorizontal(containerEl, targetEl, movementX, overDraggable)
      : currentPosition + movementX;
    targetEl.style.transform = `translateX(${draggedPosition}px)`;
    currentPositionRef.current = draggedPosition;
  };
  const dragVertical = ({
    targetEl,
    movementY,
    containerEl,
    overDraggable = true
  }: {
    targetEl: HTMLElement;
    movementY: number;
    containerEl?: HTMLElement | null;
    overDraggable?: boolean;
  }) => {
    const currentPosition = currentPositionRef.current;
    const draggedPosition = containerEl
      ? constrainVertical(containerEl, targetEl, movementY, overDraggable)
      : currentPosition + movementY;
    targetEl.style.transform = `translateY(${draggedPosition}px)`;
    currentPositionRef.current = draggedPosition;
  };

  const calculateLaterSpeed = (
    initSpeed: number,
    time: number,
    acceleration: number
  ): number => {
    return Math.max(initSpeed + acceleration * time, 0); // 단위: px/ms
  };
  const calculateDistance = (
    initSpeed: number,
    time: number,
    acceleration: number
  ): number => {
    return Math.max(initSpeed * time + 0.5 * acceleration * time ** 2, 0); // 단위: px
  };

  const slip = () => {
    const targetEl = targetElRef.current;
    const containerEl = containerElRef?.current;
    if (!targetEl) return;

    let ACCELERATION = 0; // 단위: px/ms^2
    switch (friction) {
      case 'small':
        ACCELERATION = -0.005;
        break;
      case 'medium':
        ACCELERATION = -0.01;
        break;
      case 'large':
        ACCELERATION = -0.08;
        break;
    }
    const MILLISECOND = 1;
    const INTERVAL_TIME = 1 * MILLISECOND;

    const intervalId = setInterval(() => {
      const lastVelocity = lastVelocityRef.current;
      const lastSpeed = Math.abs(lastVelocityRef.current);
      if (lastVelocity === 0) {
        stopSlip();
        return;
      }
      const speed = calculateLaterSpeed(lastSpeed, INTERVAL_TIME, ACCELERATION);
      const distance = calculateDistance(
        lastSpeed,
        INTERVAL_TIME,
        ACCELERATION
      );
      const velocity = lastVelocity > 0 ? speed : -speed;
      const movement = lastVelocity > 0 ? distance : -distance;
      switch (direction) {
        case 'horizontal':
          dragHorizontal({
            targetEl,
            movementX: movement,
            containerEl,
            overDraggable: false
          });
          break;
        case 'vertical':
          dragVertical({
            targetEl,
            movementY: movement,
            containerEl,
            overDraggable: false
          });
      }
      lastVelocityRef.current = velocity;
    }, INTERVAL_TIME);
    slipIntervalIdRef.current = intervalId;
  };
  const stopSlip = () => {
    if (slipIntervalIdRef.current) {
      clearInterval(slipIntervalIdRef.current);
      slipIntervalIdRef.current = null;
    }
  };

  const recoverOverDrag = (containerEl: HTMLElement, targetEl: HTMLElement) => {
    const {
      left: containerElLeft,
      right: containerElRight,
      top: containerElTop,
      bottom: containerElBottom,
      width: containerElWidth,
      height: containerElHeight
    } = containerEl.getBoundingClientRect();
    const {
      left: targetElLeft,
      right: targetElRight,
      top: targetElTop,
      bottom: targetElBottom,
      width: targetElWidth,
      height: targetElHeight
    } = targetEl.getBoundingClientRect();

    let overMovement = 0;
    switch (direction) {
      case 'horizontal':
        {
          if (containerElWidth >= targetElWidth) {
            if (containerElRight < targetElRight)
              overMovement = targetElRight - containerElRight;
            if (targetElLeft < containerElLeft)
              overMovement = targetElLeft - containerElLeft;
          } else {
            if (containerElRight > targetElRight)
              overMovement = targetElRight - containerElRight;
            if (targetElLeft > containerElLeft)
              overMovement = targetElLeft - containerElLeft;
          }
        }
        break;
      case 'vertical': {
        if (containerElHeight >= targetElHeight) {
          if (containerElBottom < targetElBottom)
            overMovement = targetElBottom - containerElBottom;
          if (targetElTop < containerElTop)
            overMovement = targetElTop - containerElTop;
        } else {
          if (containerElBottom > targetElBottom)
            overMovement = targetElBottom - containerElBottom;
          if (targetElTop > containerElTop)
            overMovement = targetElTop - containerElTop;
        }
      }
    }

    const INTERVAL_TIME = 1;
    const SPEED = 2; // 단위: px/ms
    const oppositeSign = overMovement > 0 ? -1 : 1;
    const intervalId = setInterval(() => {
      if (overMovement === 0) {
        stopOverDragRecovering();
        return;
      }
      const distance = Math.min(SPEED * INTERVAL_TIME, Math.abs(overMovement));
      const oppositeMovement = distance * oppositeSign;
      switch (direction) {
        case 'horizontal':
          dragHorizontal({ targetEl, movementX: oppositeMovement });
          break;
        case 'vertical':
          dragVertical({ targetEl, movementY: oppositeMovement });
      }
      overMovement += oppositeMovement;
    }, INTERVAL_TIME);
    recoverIntervalIdRef.current = intervalId;
  };
  const stopOverDragRecovering = () => {
    if (recoverIntervalIdRef.current) {
      clearInterval(recoverIntervalIdRef.current);
      recoverIntervalIdRef.current = null;
    }
  };

  useEffect(() => {
    if (disabled) return;
    const targetEl = targetElRef.current;
    if (!targetEl) return;
    const triggerEl = triggerElRef?.current || targetEl;
    const containerEl = containerElRef?.current;

    const handlePointerDown = () => {
      isTriggerElGrabbedRef.current = true;
      if (!disableSlipEffect) stopSlip();
      if (containerEl) stopOverDragRecovering();
    };
    const handlePointerUp = () => {
      isTriggerElGrabbedRef.current = false;
      if (!disableSlipEffect) slip();
      if (containerEl) recoverOverDrag(containerEl, targetEl);
    };
    const handlePointerMove = (event: PointerEvent) => {
      const { movementX, movementY, timeStamp } = event;
      const isTriggerElGrabbed = isTriggerElGrabbedRef.current;
      if (!isTriggerElGrabbed) return;

      const deltaTime = timeStamp - lastEventTimeRef.current;
      switch (direction) {
        case 'horizontal': {
          dragHorizontal({
            targetEl,
            movementX,
            containerEl,
            overDraggable: !disableOverDragEffect
          });
          lastVelocityRef.current = movementX / deltaTime;
          break;
        }
        case 'vertical': {
          dragVertical({
            targetEl,
            movementY,
            containerEl,
            overDraggable: !disableOverDragEffect
          });
          lastVelocityRef.current = movementY / deltaTime;
        }
      }
      lastEventTimeRef.current = timeStamp;
    };

    triggerEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      triggerEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [
    targetElRef,
    triggerElRef,
    containerElRef,
    direction,
    disableSlipEffect,
    disabled
  ]);

  return {
    targetElRef,
    triggerElRef,
    containerElRef
  };
};

export default useDragFree;
