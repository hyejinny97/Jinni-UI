import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TableCell from './TableCell';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof TableCell> = {
  component: TableCell,
  argTypes: {
    align: {
      description: 'cell 내 text alignment',
      table: {
        type: { summary: `'left' | 'center' | 'right'` },
        defaultValue: { summary: `'left'` }
      }
    },
    children: {
      description: 'cell contents',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TableCell>;

const AlignTemplate = () => {
  const ALIGNS = ['left', 'center', 'right'] as const;
  const [align, setAlign] = useState<(typeof ALIGNS)[number]>(ALIGNS[0]);

  const handleAlignChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAlign(value as (typeof ALIGNS)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Align
        </Chip>
        <RadioGroup name="align" value={align} onChange={handleAlignChange}>
          <Grid columns={3} spacing={5}>
            {ALIGNS.map((align) => (
              <Label content={align} style={{ color: 'on-surface' }}>
                <Radio value={align} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <TableCell align={align} style={{ width: '200px' }}>
        contents
      </TableCell>
    </Stack>
  );
};

export const BasicTableCell: Story = {
  render: (args) => <TableCell {...args}>contents</TableCell>
};

export const Align: Story = {
  render: () => <AlignTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AlignTemplate = () => {
  const ALIGNS = ['left', 'center', 'right'] as const;
  const [align, setAlign] = useState<(typeof ALIGNS)[number]>(ALIGNS[0]);

  const handleAlignChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAlign(value as (typeof ALIGNS)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Align
        </Chip>
        <RadioGroup name="align" value={align} onChange={handleAlignChange}>
          <Grid columns={3} spacing={5}>
            {ALIGNS.map((align) => (
              <Label content={align} style={{ color: 'on-surface' }}>
                <Radio value={align} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <TableCell align={align} style={{ width: '200px' }}>
        contents
      </TableCell>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
