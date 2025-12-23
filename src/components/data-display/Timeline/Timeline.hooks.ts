import { useContext } from 'react';
import TimelineContext from './Timeline.contexts';

export const useTimeline = () => {
  const value = useContext(TimelineContext);
  if (!value) throw Error('TimelineContext value is null');
  return value;
};
