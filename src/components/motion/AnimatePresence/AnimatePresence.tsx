import { useState, useEffect, useLayoutEffect } from 'react';
import ExitContext from './AnimatePresence.contexts';

type AnimatePresenceProps = {
  children: React.ReactNode;
};

const AnimatePresence = (props: AnimatePresenceProps) => {
  const { children } = props;
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [exiting, setExiting] = useState(false);

  useLayoutEffect(() => {
    if (children) {
      setDisplayedChildren(children);
      setExiting(false);
    }
  }, [children]);

  useEffect(() => {
    if (!children && displayedChildren) {
      setExiting(true);
    }
  }, [children, displayedChildren]);

  if (!displayedChildren) return null;
  return (
    <ExitContext.Provider
      value={{
        isExiting: exiting,
        onExitComplete: () => {
          setExiting(false);
          setDisplayedChildren(null);
        }
      }}
    >
      {displayedChildren}
    </ExitContext.Provider>
  );
};

export default AnimatePresence;
