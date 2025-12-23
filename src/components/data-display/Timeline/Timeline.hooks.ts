import React, { useContext, useCallback } from 'react';
import TimelineContext from './Timeline.contexts';
import { TimelineProps } from './Timeline';
import { TimelineItem } from './TimelineItem';

export const useTimeline = () => {
  const value = useContext(TimelineContext);
  if (!value) throw Error('TimelineContext value is null');
  return value;
};

export const useTimelineItemChildren = ({
  children
}: Pick<TimelineProps, 'children'>) => {
  const containsTimelineItem = useCallback((node: React.ReactNode): boolean => {
    if (!node) return false;
    if (React.isValidElement(node)) {
      if (node.type === TimelineItem) return true;
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return React.Children.toArray(props.children).some(
          containsTimelineItem
        );
      }
    }
    return false;
  }, []);

  const childArray = React.Children.toArray(children);
  const timelineItemChildren = childArray.filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && containsTimelineItem(child)
  );
  return { timelineItemChildren };
};
