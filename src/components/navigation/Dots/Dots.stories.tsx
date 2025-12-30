import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dot, Dots, DotsProps } from '.';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';

const meta: Meta<typeof Dots> = {
  component: Dots,
  argTypes: {
    defaultValue: {
      description: '초기 active dot의 value',
      table: {
        type: { summary: 'number | string | null' },
        defaultValue: { summary: `null` }
      }
    },
    max: {
      description: '화면 상에 나타나는 최대 Dot 갯수',
      table: {
        type: { summary: 'number' }
      }
    },
    onChange: {
      description: 'active dot value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, value: number | string) => void`
        }
      }
    },
    orientation: {
      description: 'dots 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    value: {
      description: 'active dot의 value',
      table: {
        type: { summary: 'number | string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dots>;

const ControlledDotsTemplate = () => {
  const [value, setValue] = useState<DotsProps['value']>(1);

  const handleChange: DotsProps['onChange'] = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack style={{ alignItems: 'center' }}>
      <Text>Selected Dot: {value}</Text>
      <Dots value={value} onChange={handleChange}>
        <Dot value={1} />
        <Dot value={2} />
        <Dot value={3} />
      </Dots>
    </Stack>
  );
};

const SequentiallyScaledDotsTemplate = () => {
  const SCALE_RATIO = 0.6;
  const [value, setValue] = useState<number>(1);

  const handleChange: DotsProps['onChange'] = (_, newValue) => {
    setValue(newValue as number);
  };

  return (
    <Stack style={{ alignItems: 'center' }}>
      <Text>Selected Dot: {value}</Text>
      <Dots value={value} onChange={handleChange} max={5}>
        {Array(10)
          .fill(0)
          .map((_, idx) => {
            const dotValue = idx + 1;
            const isActiveDot = value === dotValue;
            const scale = isActiveDot
              ? 1
              : SCALE_RATIO ** Math.abs(value - dotValue);
            return (
              <Dot
                value={dotValue}
                style={{
                  transition: 'transform 0.1s ease',
                  transform: `scale(${scale})`
                }}
              />
            );
          })}
      </Dots>
    </Stack>
  );
};

const CustomizeDotsTemplate = () => {
  const [value, setValue] = useState<DotsProps['value']>(1);

  const handleChange: DotsProps['onChange'] = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Dots value={value} onChange={handleChange}>
      {Array(5)
        .fill(0)
        .map((_, idx) => {
          const dotValue = idx + 1;
          const isActiveDot = value === dotValue;
          return (
            <Dot
              value={dotValue}
              style={{
                width: isActiveDot ? '30px' : '15px',
                minHeight: '5px',
                padding: '0px',
                aspectRatio: 'auto',
                borderRadius: '2px',
                transition: 'width 0.1s'
              }}
            />
          );
        })}
    </Dots>
  );
};

export const BasicDots: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Dots {...args}>
          <Dot value={1} />
          <Dot value={2} />
          <Dot value={3} />
        </Dots>
        <Dots defaultValue="first" {...args}>
          <Dot value="first" aria-label="go to first page" />
          <Dot value="second" aria-label="go to second page" />
          <Dot value="third" aria-label="go to third page" />
        </Dots>
      </Stack>
    );
  }
};

export const ControlledDots: Story = {
  render: () => <ControlledDotsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDotsTemplate = () => {
  const [value, setValue] = useState<DotsProps['value']>(1);

  const handleChange: DotsProps['onChange'] = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack style={{ alignItems: 'center' }}>
      <Text>Selected Dot: {value}</Text>
      <Dots value={value} onChange={handleChange}>
        <Dot value={1} />
        <Dot value={2} />
        <Dot value={3} />
      </Dots>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MaxDots: Story = {
  render: (args) => (
    <Dots defaultValue={1} max={3} {...args}>
      {Array(5)
        .fill(0)
        .map((_, idx) => {
          return (
            <Dot key={idx} value={idx + 1} style={{ color: 'white' }}>
              {idx + 1}
            </Dot>
          );
        })}
    </Dots>
  )
};

export const Orientation: Story = {
  render: (args) => (
    <Dots defaultValue={1} orientation="vertical" {...args}>
      <Dot value={1} />
      <Dot value={2} />
      <Dot value={3} />
    </Dots>
  )
};

export const Color: Story = {
  render: (args) => (
    <Dots defaultValue={1} color="yellow-400" {...args}>
      <Dot value={1} />
      <Dot value={2} />
      <Dot value={3} />
    </Dots>
  )
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Dots defaultValue={1} size="sm" {...args}>
          <Dot value={1} />
          <Dot value={2} />
          <Dot value={3} />
        </Dots>
        <Dots defaultValue={1} size="md" {...args}>
          <Dot value={1} />
          <Dot value={2} />
          <Dot value={3} />
        </Dots>
        <Dots defaultValue={1} size="lg" {...args}>
          <Dot value={1} />
          <Dot value={2} />
          <Dot value={3} />
        </Dots>
      </Stack>
    );
  }
};

export const OverlayEffect: Story = {
  render: (args) => (
    <Dots defaultValue={1} disableOverlay {...args}>
      <Dot value={1} />
      <Dot value={2} />
      <Dot value={3} />
    </Dots>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <Dots defaultValue={1} rippleColor="white" {...args}>
      <Dot value={1} />
      <Dot value={2} />
      <Dot value={3} />
    </Dots>
  )
};

export const Elevation: Story = {
  render: (args) => (
    <Dots defaultValue={1} elevation={2} {...args}>
      <Dot value={1} />
      <Dot value={2} />
      <Dot value={3} />
    </Dots>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Dots defaultValue={1} disabled {...args}>
      <Dot value={1} />
      <Dot value={2} />
      <Dot value={3} />
    </Dots>
  )
};

export const SequentiallyScaledDots: Story = {
  render: () => <SequentiallyScaledDotsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SequentiallyScaledDotsTemplate = () => {
  const SCALE_RATIO = 0.6;
  const [value, setValue] = useState<number>(1);

  const handleChange: DotsProps['onChange'] = (_, newValue) => {
    setValue(newValue as number);
  };

  return (
    <Stack style={{ alignItems: 'center' }}>
      <Text>Selected Dot: {value}</Text>
      <Dots value={value} onChange={handleChange} max={5}>
        {Array(10)
          .fill(0)
          .map((_, idx) => {
            const dotValue = idx + 1;
            const isActiveDot = value === dotValue;
            const scale = isActiveDot
              ? 1
              : SCALE_RATIO ** Math.abs(value - dotValue);
            return (
              <Dot
                value={dotValue}
                style={{
                  transition: 'transform 0.1s ease',
                  transform: \`scale(\${scale})\`
                }}
              />
            );
          })}
      </Dots>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeDots: Story = {
  render: () => <CustomizeDotsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeDotsTemplate = () => {
  const [value, setValue] = useState<DotsProps['value']>(1);

  const handleChange: DotsProps['onChange'] = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Dots value={value} onChange={handleChange}>
      {Array(5)
        .fill(0)
        .map((_, idx) => {
          const dotValue = idx + 1;
          const isActiveDot = value === dotValue;
          return (
            <Dot
              value={dotValue}
              style={{
                width: isActiveDot ? '30px' : '15px',
                minHeight: '5px',
                padding: '0px',
                aspectRatio: 'auto',
                borderRadius: '2px',
                transition: 'width 0.1s'
              }}
            />
          );
        })}
    </Dots>
  );
};
`.trim()
      }
    }
  }
};
