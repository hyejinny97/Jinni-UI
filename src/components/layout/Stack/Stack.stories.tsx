import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, DirectionType } from '.';
import { Box } from '@/components/layout/Box';
import { Divider } from '@/components/layout/Divider';
import { ColorType } from '@/types/color';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';

const meta: Meta<typeof Stack> = {
  component: Stack,
  argTypes: {
    children: {
      description: '레이아웃을 적용할 items',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    direction: {
      description: '정렬 방향',
      table: {
        type: {
          summary: `'row' | 'row-reverse' | 'column' | 'column-reverse' | Responsive<'row' | 'row-reverse' | 'column' | 'column-reverse'>`
        },
        defaultValue: { summary: `'column'` }
      }
    },
    divider: {
      description: 'item 사이의 구분선',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    spacing: {
      description: 'item 사이의 간격',
      table: {
        type: { summary: 'number | Responsive<number>' },
        default: '0'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Stack>;

type BackgroundColorType = {
  [key: number]: ColorType;
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <section
    style={{
      border: '1px solid gray',
      borderRadius: '10px',
      padding: '20px',
      minWidth: '300px',
      maxWidth: '500px'
    }}
  >
    {children}
  </section>
);

const Item = ({ order }: { order: 1 | 2 | 3 }) => {
  const backgroundColor: BackgroundColorType = {
    1: 'red',
    2: 'green',
    3: 'blue'
  };
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '50px',
        minHeight: '50px',
        backgroundColor: backgroundColor[order],
        color: 'white'
      }}
    >
      Box {order}
    </Box>
  );
};

const DirectionPlayground = () => {
  const DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
  const [checkedValue, setCheckedValue] = useState<DirectionType>(DIRECTION[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value as DirectionType);
  };

  return (
    <Stack spacing={20}>
      <Stack direction="row" spacing={10}>
        {DIRECTION.map((direction) => (
          <RadioLabel key={direction} label={direction}>
            <Radio
              value={direction}
              checked={checkedValue === direction}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Stack>
      <Section>
        <Stack spacing={10} direction={checkedValue}>
          <Item order={1} />
          <Item order={2} />
          <Item order={3} />
        </Stack>
      </Section>
    </Stack>
  );
};

export const BasicStack: Story = {
  render: (args) => (
    <Section>
      <Stack spacing={10} {...args}>
        <Item order={1} />
        <Item order={2} />
        <Item order={3} />
      </Stack>
    </Section>
  )
};

export const Direction: Story = {
  render: (args) => <DirectionPlayground {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const DirectionPlayground = () => {
  const DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
  const [checkedValue, setCheckedValue] = useState<DirectionType>(DIRECTION[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value as DirectionType);
  };

  return (
    <Stack spacing={20}>
      <Stack direction="row" spacing={10}>
        {DIRECTION.map((direction) => (
          <RadioLabel key={direction} label={direction}>
            <Radio
              value={direction}
              checked={checkedValue === direction}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Stack>
      <Section>
        <Stack spacing={10} direction={checkedValue}>
          <Item order={1} />
          <Item order={2} />
          <Item order={3} />
        </Stack>
      </Section>
    </Stack>
  );
}`.trim()
      }
    }
  }
};

export const Dividers: Story = {
  render: (args) => (
    <Stack spacing={10}>
      <Section>
        <Stack
          spacing={10}
          direction="row"
          divider={<Divider orientation="vertical" />}
          {...args}
        >
          <Item order={1} />
          <Item order={2} />
          <Item order={3} />
        </Stack>
      </Section>
      <Section>
        <Stack spacing={10} direction="column" divider={<Divider />} {...args}>
          <Item order={1} />
          <Item order={2} />
          <Item order={3} />
        </Stack>
      </Section>
    </Stack>
  )
};

export const ResponsiveSpacing: Story = {
  render: (args) => (
    <Section>
      <Stack
        direction="row"
        spacing={{
          xs: 10,
          sm: 20,
          md: 30,
          lg: 40,
          xl: 50
        }}
        {...args}
      >
        <Item order={1} />
        <Item order={2} />
        <Item order={3} />
      </Stack>
    </Section>
  )
};

export const ResponsiveDirection: Story = {
  render: (args) => (
    <Section>
      <Stack
        spacing={10}
        direction={{
          xs: 'row',
          sm: 'column',
          md: 'row',
          lg: 'column',
          xl: 'row'
        }}
        {...args}
      >
        <Item order={1} />
        <Item order={2} />
        <Item order={3} />
      </Stack>
    </Section>
  )
};

export const Customization: Story = {
  render: (args) => (
    <Section>
      <Stack
        direction="row"
        style={{
          justifyContent: {
            xs: 'flex-start',
            sm: 'flex-end',
            md: 'center',
            lg: 'space-between',
            xl: 'stretch'
          }
        }}
        {...args}
      >
        <Item order={1} />
        <Item order={2} />
        <Item order={3} />
      </Stack>
    </Section>
  )
};
