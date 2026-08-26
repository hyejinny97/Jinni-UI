import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '@/components/Accordion';
import AccordionItem from '@/components/AccordionItem';
import AccordionSummary from '@/components/AccordionSummary';
import AccordionDetails from '@/components/AccordionDetails';
import { ArrowCircleDownIcon } from '@/components/icons/ArrowCircleDownIcon';
import { motion } from 'motion/react';

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

const UnmountOnCollapseTemplate = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={{ width: '500px' }}>
      {ITEMS.map(({ summary, details }, idx) => {
        const expanded = expandedItem === idx;
        return (
          <AccordionItem
            key={summary}
            expanded={expanded}
            onChange={handleChange(idx)}
          >
            <AccordionSummary>{summary}</AccordionSummary>
            {expanded && <AccordionDetails>{details}</AccordionDetails>}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const TransitionTemplate = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={{ width: '500px' }}>
      {ITEMS.map(({ summary, details }, idx) => {
        const expanded = expandedItem === idx;
        return (
          <AccordionItem
            key={summary}
            expanded={expanded}
            onChange={handleChange(idx)}
          >
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails
              as={motion.div}
              animate={{
                height: expanded ? 'auto' : '0px',
                opacity: expanded ? 1 : 0
              }}
              style={{
                overflow: 'hidden',
                display: 'block',
                paddingBottom: expanded ? '16px' : 0
              }}
            >
              {details}
            </AccordionDetails>
          </AccordionItem>
        );
      })}
    </Accordion>
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
            <AccordionSummary
              expandIcon={<ArrowCircleDownIcon color="on-surface" />}
            >
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
                backgroundColor: 'surface-dim'
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

export const UnmountOnCollapse: Story = {
  render: () => <UnmountOnCollapseTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const UnmountOnCollapseTemplate = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={{ width: '500px' }}>
      {ITEMS.map(({ summary, details }, idx) => {
        const expanded = expandedItem === idx;
        return (
          <AccordionItem
            key={summary}
            expanded={expanded}
            onChange={handleChange(idx)}
          >
            <AccordionSummary>{summary}</AccordionSummary>
            {expanded && <AccordionDetails>{details}</AccordionDetails>}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};`
      }
    }
  }
};

export const Transition: Story = {
  render: () => <TransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion } from 'motion/react';

const TransitionTemplate = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleChange =
    (itemIdx: number) => (_: React.SyntheticEvent, expanded: boolean) => {
      setExpandedItem(expanded ? itemIdx : null);
    };

  return (
    <Accordion style={{ width: '500px' }}>
      {ITEMS.map(({ summary, details }, idx) => {
        const expanded = expandedItem === idx;
        return (
          <AccordionItem
            key={summary}
            expanded={expanded}
            onChange={handleChange(idx)}
          >
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails
              as={motion.div}
              animate={{
                height: expanded ? 'auto' : '0px',
                opacity: expanded ? 1 : 0
              }}
              style={{
                overflow: 'hidden',
                display: 'block',
                paddingBottom: expanded ? '16px' : 0
              }}
            >
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
