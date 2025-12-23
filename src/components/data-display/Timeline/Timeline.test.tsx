import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot
} from '.';

describe('<Timeline />', () => {
  it('renders timeline', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineContent>Item 1</TimelineContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>Item 2</TimelineContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
        </TimelineItem>
      </Timeline>
    );

    const timeline = screen.getByRole('list');
    const timelineItems = screen.getAllByRole<HTMLElement>('listitem');
    expect(timeline).toBeInTheDocument();
    expect(timelineItems.length).toBe(2);
    expect(timelineItems[0]).toHaveTextContent('Item 1');
    expect(timelineItems[1]).toHaveTextContent('Item 2');
  });

  it('renders reversed timeline', () => {
    render(
      <Timeline reverse>
        <TimelineItem>
          <TimelineContent>Item 1</TimelineContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent>Item 2</TimelineContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
        </TimelineItem>
      </Timeline>
    );

    const timeline = screen.getByRole('list');
    const timelineItems = screen.getAllByRole<HTMLElement>('listitem');
    expect(timeline).toBeInTheDocument();
    expect(timelineItems.length).toBe(2);
    expect(timelineItems[0]).toHaveTextContent('Item 2');
    expect(timelineItems[1]).toHaveTextContent('Item 1');
  });

  it('renders timeline with opposite content', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineContent data-testid="content">Item 1</TimelineContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineOppositeContent data-testid="opposite-content">
            Opposite Item 1
          </TimelineOppositeContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineContent data-testid="content">Item 2</TimelineContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineOppositeContent data-testid="opposite-content">
            Opposite Item 2
          </TimelineOppositeContent>
        </TimelineItem>
      </Timeline>
    );

    const timeline = screen.getByRole('list');
    const timelineContents = screen.getAllByTestId<HTMLElement>('content');
    const timelineOppositeContents =
      screen.getAllByTestId<HTMLElement>('opposite-content');
    expect(timeline).toBeInTheDocument();
    expect(timelineContents.length).toBe(2);
    expect(timelineOppositeContents.length).toBe(2);
    expect(timelineContents[0]).toHaveTextContent('Item 1');
    expect(timelineContents[1]).toHaveTextContent('Item 2');
    expect(timelineOppositeContents[0]).toHaveTextContent('Opposite Item 1');
    expect(timelineOppositeContents[1]).toHaveTextContent('Opposite Item 2');
  });
});
