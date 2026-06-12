import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Accordion from '@/components/Accordion';
import AccordionItem from '@/components/AccordionItem';
import AccordionSummary from '@/components/AccordionSummary';
import AccordionDetails from '@/components/AccordionDetails';
import { ArrowCircleDownIcon } from '@/components/icons/ArrowCircleDownIcon';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { motion, AnimatePresence } from 'motion/react';

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

const Collapse = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: 'auto' }}
    exit={{ height: 0 }}
    style={{ overflow: 'hidden' }}
  >
    {children}
  </motion.div>
);

const Fade = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const TransitionTemplate = () => {
  const TRANSITIONS = ['collapse', 'fade'] as const;
  const [transition, setTransition] = useState<(typeof TRANSITIONS)[number]>(
    TRANSITIONS[0]
  );

  const handleTransitionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransition(event.target.value as (typeof TRANSITIONS)[number]);
  };

  let TransitionComponent: React.ComponentType<{ children: React.ReactNode }>;
  switch (transition) {
    case 'collapse':
      TransitionComponent = Collapse;
      break;
    case 'fade':
      TransitionComponent = Fade;
      break;
  }

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Transition
        </Chip>
        <RadioGroup
          name="transition"
          value={transition}
          onChange={handleTransitionChange}
        >
          <Grid columns={2} spacing={5}>
            {TRANSITIONS.map((transition) => (
              <Label content={transition}>
                <Radio value={transition} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Accordion style={{ width: '500px' }}>
        {ITEMS.map(({ summary, details }) => {
          return (
            <AccordionItem key={summary}>
              <AccordionSummary>{summary}</AccordionSummary>
              <AccordionDetails
                WrapperComponent={AnimatePresence}
                TransitionComponent={TransitionComponent}
              >
                {details}
              </AccordionDetails>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Stack>
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

export const Transition: Story = {
  render: () => <TransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, AnimatePresence } from 'motion/react';

const Collapse = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: 'auto' }}
    exit={{ height: 0 }}
    style={{ overflow: 'hidden' }}
  >
    {children}
  </motion.div>
);

const Fade = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const TransitionTemplate = () => {
  const TRANSITIONS = ['collapse', 'fade'] as const;
  const [transition, setTransition] = useState<(typeof TRANSITIONS)[number]>(
    TRANSITIONS[0]
  );

  const handleTransitionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransition(event.target.value as (typeof TRANSITIONS)[number]);
  };

  let TransitionComponent: React.ComponentType<{ children: React.ReactNode }>;
  switch (transition) {
    case 'collapse':
      TransitionComponent = Collapse;
      break;
    case 'fade':
      TransitionComponent = Fade;
      break;
  }

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Transition
        </Chip>
        <RadioGroup
          name="transition"
          value={transition}
          onChange={handleTransitionChange}
        >
          <Grid columns={2} spacing={5}>
            {TRANSITIONS.map((transition) => (
              <Label content={transition}>
                <Radio value={transition} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Accordion style={{ width: '500px' }}>
        {ITEMS.map(({ summary, details }) => {
          return (
            <AccordionItem key={summary}>
              <AccordionSummary>{summary}</AccordionSummary>
              <AccordionDetails
                WrapperComponent={AnimatePresence}
                TransitionComponent={TransitionComponent}
              >
                {details}
              </AccordionDetails>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};
