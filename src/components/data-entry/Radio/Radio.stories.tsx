import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import { Stack } from '@/components/layout/Stack';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { RadioUncheckedIcon2 } from '@/components/icons/RadioUncheckedIcon2';
import { RadioCheckedIcon2 } from '@/components/icons/RadioCheckedIcon2';

const meta: Meta<typeof Radio> = {
  component: Radio,
  argTypes: {
    checked: {
      description: 'true이면, check 됨'
    },
    checkedIcon: {
      description: 'checked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<RadioCheckedIcon />' }
      }
    },
    color: {
      description: 'checkbox 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultChecked: {
      description: 'true이면, 기본적으로 check 됨'
    },
    disabled: {
      description: 'true이면, 비활성화 됨'
    },
    disableRipple: {
      description: 'true이면, ripple effect가 사라짐'
    },
    icon: {
      description: 'unchecked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<RadioUncheckedIcon />' }
      }
    },
    name: {
      description: 'radio name',
      type: 'string'
    },
    onChange: {
      description: 'checked/unchecked state가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void'
        }
      }
    },
    required: {
      description: 'true이면, required 처리 됨',
      type: 'boolean'
    },
    size: {
      description: 'radio 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'radio value',
      table: {
        type: { summary: `any` },
        defaultValue: { summary: `'on'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Radio>;

const ControlledRadioTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <Stack>
      <RadioLabel label="빨간색">
        <Radio
          name="color"
          value="red"
          checked={checkedValue === 'red'}
          onChange={handleChange}
        />
      </RadioLabel>
      <RadioLabel label="노란색">
        <Radio
          name="color"
          value="yellow"
          checked={checkedValue === 'yellow'}
          onChange={handleChange}
        />
      </RadioLabel>
    </Stack>
  );
};

export const BasicRadio: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio name="color" value="red" {...args} />
      <Radio name="color" value="red" disableRipple {...args} />
    </Stack>
  )
};

export const CheckedByDefault: Story = {
  render: (args) => <Radio defaultChecked {...args} />
};

export const Disabled: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio disabled {...args} />
      <Radio defaultChecked disabled {...args} />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio size="sm" defaultChecked {...args} />
      <Radio size="md" defaultChecked {...args} />
      <Radio size="lg" defaultChecked {...args} />
      <Radio size="50px" defaultChecked {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio color="error" defaultChecked {...args} />
      <Radio color="yellow-500" defaultChecked {...args} />
      <Radio color="green" defaultChecked {...args} />
      <Radio color="rgb(10, 20, 30)" defaultChecked {...args} />
    </Stack>
  )
};

export const Icon: Story = {
  render: (args) => (
    <Radio
      icon={<RadioUncheckedIcon2 />}
      checkedIcon={<RadioCheckedIcon2 />}
      {...args}
    />
  )
};

export const ControlledRadio: Story = {
  render: (args) => <ControlledRadioTemplate {...args} />
};
