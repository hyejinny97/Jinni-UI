import { createContext } from 'react';
import { TimelineProps } from './Timeline';

type TimelineContextProps = Required<Pick<TimelineProps, 'orientation'>>;

const TimelineContext = createContext<TimelineContextProps | null>(null);

export default TimelineContext;
