import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dots from './Dots';
import Dot from './Dot';
import { Stack } from '@/components/layout/Stack';
import { isNumber } from '@/utils/isNumber';

const meta: Meta<typeof Dots> = {
  component: Dots,
  argTypes: {
    color: {
      description: 'selected dot의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    count: {
      description: '총 dot 개수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `5` }
      }
    },
    defaultValue: {
      description: '초기 active dot index',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `0` }
      }
    },
    onChange: {
      description: 'active dot이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, value: number) => void`
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
    renderDot: {
      description: 'dotProps를 인자로 받아 Dot 컴포넌트를 렌더하는 함수',
      table: {
        type: { summary: `(dotProps: DotProps) => node` },
        defaultValue: {
          summary: `(dotProps: DotProps) => <Dot {...dotProps} />`
        }
      }
    },
    size: {
      description: 'dot의 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: {
          summary: `'md'`
        }
      }
    },
    value: {
      description: 'active dot index',
      table: {
        type: { summary: 'number' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dots>;

const ControlledDotsTemplate = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: Event | React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <Dots value={value} onChange={handleChange} />;
};

export const BasicDots: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Dots {...args} />
        <Dots count={10} defaultValue={3} {...args} />
      </Stack>
    );
  }
};

export const ControlledDots: Story = {
  render: (args) => {
    return <ControlledDotsTemplate {...args} />;
  }
};

export const Orientation: Story = {
  render: (args) => {
    return <Dots orientation="vertical" {...args} />;
  }
};

export const Color: Story = {
  render: (args) => {
    return <Dots color="yellow-400" {...args} />;
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Dots size="sm" {...args} />
        <Dots size="md" {...args} />
        <Dots size="lg" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return <Dots disabled {...args} />;
  }
};

export const OverlayEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Dots size="lg" overlayColor="white" {...args} />
        <Dots size="lg" disableOverlay {...args} />
      </Stack>
    );
  }
};

export const RippleEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Dots
          size="lg"
          rippleColor="white"
          rippleStartLocation="center"
          {...args}
        />
        <Dots size="lg" disableRipple {...args} />
      </Stack>
    );
  }
};

export const Elevation: Story = {
  render: (args) => {
    return <Dots size="lg" elevation={2} {...args} />;
  }
};

export const DotCustomization: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Dots
          renderDot={({ value, selected, ...restDotProps }) => (
            <Dot
              value={value}
              selected={selected}
              style={selected ? { color: 'white' } : {}}
              {...restDotProps}
            >
              {isNumber(value) && value + 1}
            </Dot>
          )}
          {...args}
        />
        <Dots
          renderDot={({ selected, ...restDotProps }) => (
            <Dot
              selected={selected}
              style={{
                width: selected ? '30px' : '20px',
                minHeight: '3px',
                padding: '0px',
                aspectRatio: 'auto',
                borderRadius: '2px',
                transition: 'width 0.3s'
              }}
              {...restDotProps}
            />
          )}
          {...args}
        />
      </Stack>
    );
  }
};
