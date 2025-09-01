import { useRef, useLayoutEffect, useState } from 'react';
import { CollapseProps } from './Collapse';

export const useContentSize = ({
  children,
  orientation
}: Pick<CollapseProps, 'orientation' | 'children'>) => {
  const contentElRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState<string | null>(null);

  useLayoutEffect(() => {
    const contentEl = contentElRef.current;
    if (!contentEl) return;
    const size =
      orientation === 'vertical'
        ? contentEl.scrollHeight
        : contentEl.scrollWidth;
    setContentSize(`${size}px`);
  }, [children, orientation]);

  return {
    contentElRef,
    contentSize
  };
};
