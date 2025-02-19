import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';
import './SwitchCustom.scss';
import { SwitchLabel } from '@/components/data-entry/SwitchLabel';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Switch> = {
  component: Switch,
  argTypes: {
    checked: {
      description: 'true이면, check 됨'
    },
    color: {
      description: 'switch 색상',
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
    name: {
      description: 'switch name',
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
      description: 'switch 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'switch value',
      table: {
        type: { summary: `any` },
        defaultValue: { summary: `'on'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

const ControlledSwitchTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return <Switch checked={checked} onChange={handleChange} />;
};

export const BasicSwitch: Story = {
  render: (args) => <Switch name="color" value="red" {...args} />
};

export const CheckedByDefault: Story = {
  render: (args) => <Switch defaultChecked {...args} />
};

export const Disabled: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Switch disabled {...args} />
      <Switch defaultChecked disabled {...args} />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      <Switch size="sm" defaultChecked {...args} />
      <Switch size="md" defaultChecked {...args} />
      <Switch size="lg" defaultChecked {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Switch color="error" defaultChecked {...args} />
      <Switch color="yellow-500" defaultChecked {...args} />
      <Switch color="green" defaultChecked {...args} />
      <Switch color="rgb(10, 20, 30)" defaultChecked {...args} />
    </Stack>
  )
};

export const ControlledSwitch: Story = {
  render: (args) => <ControlledSwitchTemplate {...args} />
};

export const Customization: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <SwitchLabel label="Theme Switch">
        <Switch className="theme-switch" {...args} />
      </SwitchLabel>
      <SwitchLabel label="Android Style" style={{ gap: '5px' }}>
        <Switch className="android-style" {...args} />
      </SwitchLabel>
      <SwitchLabel label="iOS Style" style={{ gap: '5px' }}>
        <Switch className="ios-style" {...args} />
      </SwitchLabel>
    </Stack>
  )
};
