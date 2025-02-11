import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '.';
import { ArrowCircleDownIcon } from '@/components/icons/ArrowCircleDownIcon';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  argTypes: {
    children: {
      description: 'accordion items',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const ITEMS = Array(3)
  .fill(0)
  .map((_, idx) => ({
    summary: `Accordion Summary ${idx + 1}`,
    details: `This is Accordion Details ${idx + 1}. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quo consectetur enim voluptates iusto delectus,
          voluptatum praesentium. Dignissimos fugiat ex eaque sapiente magnam,
          minus quos, iusto illo ratione doloribus hic in?`
  }));

const ACCORDION_STYLE = { width: '500px' };

const ControlledAccordionTemplate = ({ ...props }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={ACCORDION_STYLE} {...props}>
      {ITEMS.map(({ summary, details }, idx) => {
        return (
          <AccordionItem
            key={summary}
            expanded={expandedItem === idx}
            onChange={handleChange(idx)}
          >
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export const BasicAccordion: Story = {
  render: (args) => (
    <Accordion style={ACCORDION_STYLE} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem key={summary}>
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  )
};

export const ExpandIcon: Story = {
  render: (args) => (
    <Accordion style={ACCORDION_STYLE} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem key={summary}>
            <AccordionSummary expandIcon={<ArrowCircleDownIcon />}>
              {summary}
            </AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  )
};

export const ExpandedByDefault: Story = {
  render: (args) => (
    <Accordion style={ACCORDION_STYLE} {...args}>
      {ITEMS.map(({ summary, details }, idx) => {
        return (
          <AccordionItem key={summary} defaultExpanded={idx === 0}>
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  )
};

export const DisabledItem: Story = {
  render: (args) => (
    <Accordion style={ACCORDION_STYLE} {...args}>
      {ITEMS.map(({ summary, details }, idx) => {
        return (
          <AccordionItem key={summary} disabled={idx === 0}>
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  )
};

export const ControlledAccordion: Story = {
  render: (args) => <ControlledAccordionTemplate {...args} />
};

export const StyleCustomization: Story = {
  render: (args) => (
    <Accordion style={ACCORDION_STYLE} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem
            key={summary}
            style={{ marginBottom: 10, border: '1px solid gray' }}
          >
            <AccordionSummary
              style={{
                backgroundColor: 'gray-100',
                flexDirection: 'row-reverse'
              }}
            >
              {summary}
            </AccordionSummary>
            <AccordionDetails
              style={{ paddingTop: '8px', borderTop: '1px solid gray' }}
            >
              {details}
            </AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  )
};

export const HeadingComponent: Story = {
  render: (args) => (
    <Accordion style={ACCORDION_STYLE} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem key={summary}>
            <AccordionSummary HeadingComponent="h2">{summary}</AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  )
};
