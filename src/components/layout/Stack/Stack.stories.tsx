import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '.';

const meta: Meta<typeof Stack> = {
  component: Stack,
  argTypes: {
    children: {
      description: '레이아웃을 적용할 items'
    },
    className: {
      description: '클래스명'
    },
    direction: {
      description: '정렬 방향',
      table: {
        type: {
          summary:
            'row | row-reverse | column | column-reverse | Responsive<row | row-reverse | column | column-reverse>'
        },
        defaultValue: { summary: 'column' }
      }
    },
    divider: {
      description: 'item 사이의 구분선'
    },
    spacing: {
      description: 'item 사이의 간격',
      table: {
        type: { summary: 'number | Responsive<number>' }
      }
    },
    style: {
      description: '스타일'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Stack>;

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

const Box = ({ order }: { order: 1 | 2 | 3 }) => {
  const backgroundColor = {
    1: 'red',
    2: 'green',
    3: 'blue'
  };
  return (
    <div
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
    </div>
  );
};

const Divider = () => <hr style={{ margin: 0 }} />;

export const BasicStack: Story = {
  render: (args) => (
    <Section>
      <Stack spacing={10} {...args}>
        <Box order={1} />
        <Box order={2} />
        <Box order={3} />
      </Stack>
    </Section>
  )
};

export const Direction: Story = {
  render: (args) => (
    <Section>
      <Stack spacing={10} direction="row" {...args}>
        <Box order={1} />
        <Box order={2} />
        <Box order={3} />
      </Stack>
    </Section>
  )
};

export const Dividers: Story = {
  render: (args) => (
    <Stack spacing={10}>
      <Section>
        <Stack spacing={10} direction="row" divider={<Divider />} {...args}>
          <Box order={1} />
          <Box order={2} />
          <Box order={3} />
        </Stack>
      </Section>
      <Section>
        <Stack spacing={10} direction="column" divider={<Divider />} {...args}>
          <Box order={1} />
          <Box order={2} />
          <Box order={3} />
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
        <Box order={1} />
        <Box order={2} />
        <Box order={3} />
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
        <Box order={1} />
        <Box order={2} />
        <Box order={3} />
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
        <Box order={1} />
        <Box order={2} />
        <Box order={3} />
      </Stack>
    </Section>
  )
};
