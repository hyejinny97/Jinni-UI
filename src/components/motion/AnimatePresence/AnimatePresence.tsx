import React, {
  ReactNode,
  ReactElement,
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  cloneElement
} from 'react';
import ExitContext from './AnimatePresence.contexts';

interface AnimatePresenceProps {
  children: ReactNode;
}

const AnimatePresence = ({ children }: AnimatePresenceProps) => {
  const prevChildrenMapRef = useRef<Map<React.Key, ReactElement>>(new Map());
  const exitingMapRef = useRef<Map<React.Key, ReactElement>>(new Map());
  const [, forceUpdate] = useState(0);

  const childArray = useMemo(
    () =>
      React.Children.toArray(children).filter(
        React.isValidElement
      ) as ReactElement[],
    [children]
  );
  const currentKeys = childArray.map((child, i) =>
    child.key !== null ? child.key : `__idx_${i}`
  );

  useLayoutEffect(() => {
    const currentMap = new Map<React.Key, ReactElement>();
    childArray.forEach((child, i) => {
      const key = child.key !== null ? child.key : (`__idx_${i}` as React.Key);
      currentMap.set(key, child);
    });

    const prevMap = prevChildrenMapRef.current;
    const prevKeys = Array.from(prevMap.keys());

    for (const prevKey of prevKeys) {
      if (!currentMap.has(prevKey) && !exitingMapRef.current.has(prevKey)) {
        const el = prevMap.get(prevKey)!;
        exitingMapRef.current.set(prevKey, el);
      }
    }

    prevChildrenMapRef.current = currentMap;
    forceUpdate((n) => n + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const exitingElements = Array.from(exitingMapRef.current.entries())
    .filter(([key]) => !currentKeys.includes(key as string))
    .map(([key, el]) => ({ key, el }));

  const renderList: Array<{
    key: React.Key;
    element: ReactElement;
    isExiting: boolean;
  }> = [
    ...childArray.map((child, i) => ({
      key: child.key !== null ? child.key : (`__idx_${i}` as React.Key),
      element: child,
      isExiting: false
    })),
    ...exitingElements.map(({ key, el }) => ({
      key,
      element: el,
      isExiting: true
    }))
  ];

  const handleExitComplete = (key: React.Key) => {
    if (exitingMapRef.current.has(key)) {
      exitingMapRef.current.delete(key);
      prevChildrenMapRef.current.delete(key);
      forceUpdate((n) => n + 1);
    }
  };

  return (
    <>
      {renderList.map(({ key, element, isExiting }) => {
        const ctxValue = isExiting
          ? {
              isExiting: true,
              onExitComplete: () => handleExitComplete(key)
            }
          : { isExiting: false, onExitComplete: () => {} };

        return (
          <ExitContext.Provider key={key} value={ctxValue}>
            {cloneElement(element, { key })}
          </ExitContext.Provider>
        );
      })}
    </>
  );
};

export default AnimatePresence;
