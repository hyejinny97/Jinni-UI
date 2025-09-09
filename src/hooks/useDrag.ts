import { useEffect, useRef } from 'react';

export type DragProps = {
  direction?: 'horizontal' | 'vertical';
  slip?: boolean;
  slipSize?: 'small' | 'medium' | 'large';
  disableOverDragEffect?: boolean;
  disabled?: boolean;
  onMoveEnd?: () => void;
};

const useDrag = ({
  direction = 'horizontal',
  slip = false,
  slipSize = 'medium',
  disableOverDragEffect,
  disabled,
  onMoveEnd
}: DragProps) => {
  const targetElRef = useRef<HTMLElement | null>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);
  const containerElRef = useRef<HTMLElement | null>(null);

  const isTriggerElGrabbedRef = useRef<boolean>(false);
  const currentPositionRef = useRef<number>(0);
  const lastEventTimeRef = useRef<number>(0);
  const lastVelocityRef = useRef<number>(0);
  const intervalIdRef = useRef<NodeJS.Timeout>();

  const getTargetTranslatedValue = (targetEl: HTMLElement): number => {
    const transform = window.getComputedStyle(targetEl).transform;
    if (!transform || transform === 'none') return 0;

    const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(
      transform
    );
    switch (direction) {
      case 'horizontal':
        return translateX;
      case 'vertical':
        return translateY;
    }
  };

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
    movementX,
    overDraggable
  }: {
    movementX: number;
    overDraggable: boolean;
  }) => {
    const targetEl = targetElRef.current;
    const containerEl = containerElRef.current;
    if (!targetEl) return;
    const currentPosition = currentPositionRef.current;
    const draggedPosition = containerEl
      ? constrainHorizontal(containerEl, targetEl, movementX, overDraggable)
      : currentPosition + movementX;
    targetEl.style.transform = `translateX(${draggedPosition}px)`;
    currentPositionRef.current = draggedPosition;
  };
  const dragVertical = ({
    movementY,
    overDraggable
  }: {
    movementY: number;
    overDraggable: boolean;
  }) => {
    const targetEl = targetElRef.current;
    const containerEl = containerElRef.current;
    if (!targetEl) return;
    const currentPosition = currentPositionRef.current;
    const draggedPosition = containerEl
      ? constrainVertical(containerEl, targetEl, movementY, overDraggable)
      : currentPosition + movementY;
    targetEl.style.transform = `translateY(${draggedPosition}px)`;
    currentPositionRef.current = draggedPosition;
  };

  const moveToDestination = ({
    signedDestination,
    speed = 2, // 단위: px/ms
    acceleration = 0, // 단위: px/ms^2
    onComplete
  }: {
    signedDestination: number;
    speed?: number;
    acceleration?: number;
    onComplete?: () => void;
  }) => {
    const currentPosition = currentPositionRef.current;
    const INTERVAL_TIME = 1;
    const sign = Math.sign(signedDestination - currentPosition);

    let restDistance = Math.abs(currentPosition - signedDestination);
    let currentSpeed = speed;
    stopMove();
    const intervalId = setInterval(() => {
      if (restDistance === 0) {
        stopMove();
        onComplete?.();
        return;
      }
      const distanceToMove = Math.min(
        currentSpeed * INTERVAL_TIME,
        restDistance
      );
      const movement = distanceToMove * sign;
      switch (direction) {
        case 'horizontal':
          dragHorizontal({ movementX: movement, overDraggable: false });
          break;
        case 'vertical':
          dragVertical({ movementY: movement, overDraggable: false });
      }
      restDistance -= distanceToMove;
      currentSpeed += acceleration * INTERVAL_TIME;
    }, INTERVAL_TIME);
    intervalIdRef.current = intervalId;
  };
  const stopMove = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = undefined;
    }
  };

  const getOverMovement = (): number => {
    const targetEl = targetElRef.current;
    const containerEl = containerElRef.current;
    if (!targetEl || !containerEl) return 0;

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
    return overMovement;
  };
  const startSlip = ({ onComplete }: { onComplete?: () => void }) => {
    const targetEl = targetElRef.current;
    const lastVelocity = lastVelocityRef.current;
    const lastSpeed = Math.abs(lastVelocity);
    const currentPosition = currentPositionRef.current;
    if (!targetEl) return;

    let acceleration = 0; // 단위: px/ms^2
    switch (slipSize) {
      case 'small':
        acceleration = -0.06;
        break;
      case 'medium':
        acceleration = -0.03;
        break;
      case 'large':
        acceleration = -0.01;
        break;
    }
    const sign = lastVelocity > 0 ? 1 : -1;
    moveToDestination({
      signedDestination:
        currentPosition +
        (lastSpeed ** 2 / (2 * Math.abs(acceleration))) * sign,
      speed: lastSpeed,
      acceleration,
      onComplete
    });
  };
  const removeOverDrag = ({
    overMovement,
    onComplete
  }: {
    overMovement: number;
    onComplete?: () => void;
  }) => {
    const currentPosition = currentPositionRef.current;
    moveToDestination({
      signedDestination: currentPosition - overMovement,
      onComplete
    });
  };

  useEffect(() => {
    if (disabled) return;
    const targetEl = targetElRef.current;
    if (!targetEl) return;
    const triggerEl = triggerElRef?.current || targetEl;

    const handlePointerDown = () => {
      isTriggerElGrabbedRef.current = true;
      currentPositionRef.current = getTargetTranslatedValue(targetEl);
      stopMove();
    };
    const handlePointerUp = () => {
      const isTriggerElGrabbed = isTriggerElGrabbedRef.current;
      if (!isTriggerElGrabbed) return;

      isTriggerElGrabbedRef.current = false;
      const overMovement = getOverMovement();
      new Promise((resolve) => {
        const onComplete = () => resolve(true);
        if (overMovement) removeOverDrag({ overMovement, onComplete });
        else if (slip) startSlip({ onComplete });
        else onComplete();
      }).then(() => {
        if (onMoveEnd) onMoveEnd();
      });
    };
    const handlePointerMove = (event: PointerEvent) => {
      const { movementX, movementY, timeStamp } = event;
      const isTriggerElGrabbed = isTriggerElGrabbedRef.current;
      if (!isTriggerElGrabbed) return;

      const deltaTime = timeStamp - lastEventTimeRef.current;
      switch (direction) {
        case 'horizontal': {
          dragHorizontal({
            movementX,
            overDraggable: !disableOverDragEffect
          });
          lastVelocityRef.current = movementX / deltaTime;
          break;
        }
        case 'vertical': {
          dragVertical({
            movementY,
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
  }, [targetElRef, triggerElRef, containerElRef, direction, slip, disabled]);

  return {
    targetElRef,
    triggerElRef,
    containerElRef,
    moveToDestination
  };
};

export default useDrag;
