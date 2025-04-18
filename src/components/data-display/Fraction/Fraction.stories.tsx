import type { Meta, StoryObj } from '@storybook/react';
import Fraction from './Fraction';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Fraction> = {
  component: Fraction,
  argTypes: {
    count: {
      description: '분모에 들어갈 값',
      table: {
        type: { summary: `number | string` }
      }
    },
    orientation: {
      description: 'fraction 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    size: {
      description: 'fraction 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: '분자에 들어갈 값',
      table: {
        type: { summary: `number | string` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Fraction>;

export const BasicFraction: Story = {
  render: () => {
    return (
      <Stack spacing={20}>
        <Fraction count={5} value={2} />
        <Fraction count="다섯" value="둘" />
      </Stack>
    );
  }
};

export const Size: Story = {
  render: () => {
    return (
      <Stack spacing={20}>
        <Fraction size="sm" count={5} value={2} />
        <Fraction size="md" count={5} value={2} />
        <Fraction size="lg" count={5} value={2} />
      </Stack>
    );
  }
};

export const Orientation: Story = {
  render: () => {
    return <Fraction count={5} value={2} orientation="vertical" />;
  }
};

export const Customization: Story = {
  render: () => {
    return (
      <Fraction
        count={5}
        value={2}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '20px',
          padding: '3px 10px'
        }}
      />
    );
  }
};
