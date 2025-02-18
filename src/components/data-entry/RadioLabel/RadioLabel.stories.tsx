import type { Meta, StoryObj } from '@storybook/react';
import RadioLabel from './RadioLabel';
import { Radio } from '@/components/data-entry/Radio';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof RadioLabel> = {
  component: RadioLabel,
  argTypes: {
    children: {
      description: 'Radio 컴포넌트'
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
type Story = StoryObj<typeof RadioLabel>;

export const BasicRadioLabel: Story = {
  render: () => (
    <RadioLabel label="빨간색">
      <Radio name="color" value="red" />
    </RadioLabel>
  )
};

export const Required: Story = {
  render: () => (
    <RadioLabel label="빨간색" required>
      <Radio name="color" value="red" />
    </RadioLabel>
  )
};

export const Disabled: Story = {
  render: () => (
    <RadioLabel label="빨간색" disabled>
      <Radio name="color" value="red" />
    </RadioLabel>
  )
};

export const LabelPlacement: Story = {
  render: () => (
    <Stack direction="row" spacing={10}>
      <RadioLabel label="빨간색" labelPlacement="start">
        <Radio name="color" value="red" />
      </RadioLabel>
      <RadioLabel label="빨간색" labelPlacement="end">
        <Radio name="color" value="red" />
      </RadioLabel>
      <RadioLabel label="빨간색" labelPlacement="top">
        <Radio name="color" value="red" />
      </RadioLabel>
      <RadioLabel label="빨간색" labelPlacement="bottom">
        <Radio name="color" value="red" />
      </RadioLabel>
    </Stack>
  )
};

export const Customization: Story = {
  render: () => (
    <RadioLabel
      label="빨간색"
      style={{
        gap: '10px',
        fontSize: '25px',
        fontWeight: 800,
        color: 'error'
      }}
    >
      <Radio name="color" value="red" color="error" />
    </RadioLabel>
  )
};
