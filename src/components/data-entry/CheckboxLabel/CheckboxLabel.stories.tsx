import type { Meta, StoryObj } from '@storybook/react';
import CheckboxLabel from './CheckboxLabel';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof CheckboxLabel> = {
  component: CheckboxLabel,
  argTypes: {
    children: {
      description: 'Checkbox 컴포넌트'
    },
    disabled: {
      description: 'true이면 input을 disabled 처리하고 label 색상을 dim 처리함'
    },
    label: {
      description: 'label text or element'
    },
    labelPlacement: {
      description: 'label 위치',
      table: {
        type: { summary: `'start' | 'end' | 'top' | 'bottom'` },
        defaultValue: { summary: `'end'` }
      }
    },
    required: {
      description: `true이면, input을 required 처리하고 label 마지막에 '*' 표시 추가`
    }
  }
};

export default meta;
type Story = StoryObj<typeof CheckboxLabel>;

export const BasicCheckboxLabel: Story = {
  render: (args) => (
    <CheckboxLabel label="빨간색" {...args}>
      <Checkbox name="color" value="red" />
    </CheckboxLabel>
  )
};

export const Required: Story = {
  render: (args) => (
    <CheckboxLabel label="빨간색" required {...args}>
      <Checkbox name="color" value="red" />
    </CheckboxLabel>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <CheckboxLabel label="빨간색" disabled {...args}>
      <Checkbox name="color" value="red" />
    </CheckboxLabel>
  )
};

export const LabelPlacement: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <CheckboxLabel label="빨간색" labelPlacement="start" {...args}>
        <Checkbox name="color" value="red" />
      </CheckboxLabel>
      <CheckboxLabel label="빨간색" labelPlacement="end" {...args}>
        <Checkbox name="color" value="red" />
      </CheckboxLabel>
      <CheckboxLabel label="빨간색" labelPlacement="top" {...args}>
        <Checkbox name="color" value="red" />
      </CheckboxLabel>
      <CheckboxLabel label="빨간색" labelPlacement="bottom" {...args}>
        <Checkbox name="color" value="red" />
      </CheckboxLabel>
    </Stack>
  )
};

export const Customization: Story = {
  render: (args) => (
    <CheckboxLabel
      label="빨간색"
      style={{
        gap: '10px',
        fontSize: '25px',
        fontWeight: 800,
        color: 'error'
      }}
      {...args}
    >
      <Checkbox name="color" value="red" color="error" />
    </CheckboxLabel>
  )
};
