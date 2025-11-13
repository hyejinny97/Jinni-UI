import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '.';
import { ArrowCircleDownIcon } from '@/components/icons/ArrowCircleDownIcon';
import { Motion } from '@/components/motion/Motion';

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
    details: `This is Accordion Details ${idx + 1}. \nLorem ipsum dolor, sit amet consectetur adipisicing elit. \nQuo consectetur enim voluptates iusto delectus, \nvoluptatum praesentium. Dignissimos fugiat ex eaque sapiente magnam, \nminus quos, iusto illo ratione doloribus hic in?`
  }));

const ControlledAccordionTemplate = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={{ width: '500px' }}>
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

const Fade = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition="opacity var(--jinni-duration-short3) var(--jinni-easing-emphasized)"
    >
      {children}
    </Motion>
  );
};

export const BasicAccordion: Story = {
  render: (args) => (
    <Accordion style={{ width: '500px' }} {...args}>
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

export const ExpandedByDefault: Story = {
  render: (args) => (
    <Accordion style={{ width: '500px' }} {...args}>
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

export const ControlledAccordion: Story = {
  render: () => <ControlledAccordionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledAccordionTemplate = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={{ width: '500px' }}>
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
};`.trim()
      }
    }
  }
};

export const DisabledItem: Story = {
  render: (args) => (
    <Accordion style={{ width: '500px' }} {...args}>
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

export const ExpandIcon: Story = {
  render: (args) => (
    <Accordion style={{ width: '500px' }} {...args}>
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

export const CustomizeAccordion: Story = {
  render: (args) => (
    <Accordion style={{ width: '500px' }} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem
            key={summary}
            style={{ marginBottom: 10, border: '1px solid gray' }}
          >
            <AccordionSummary
              as="h6"
              style={{
                backgroundColor: 'gray-100'
              }}
              ButtonBaseProps={{
                disableOverlay: true,
                disableRipple: true,
                style: { flexDirection: 'row-reverse' }
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

export const CustomizeTransition: Story = {
  render: (args) => (
    <Accordion style={{ width: '500px' }} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem key={summary}>
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails TransitionComponent={Fade}>
              {details}
            </AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const Fade = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition="opacity var(--jinni-duration-short3) var(--jinni-easing-emphasized)"
    >
      {children}
    </Motion>
  );
};

const CustomizeTransition = () => {
  return (
    <Accordion style={{ width: '500px' }} {...args}>
      {ITEMS.map(({ summary, details }) => {
        return (
          <AccordionItem key={summary}>
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails TransitionComponent={Fade}>
              {details}
            </AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
        `.trim()
      }
    }
  }
};
