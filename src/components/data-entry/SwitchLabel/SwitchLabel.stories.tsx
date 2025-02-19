import type { Meta, StoryObj } from '@storybook/react';
import SwitchLabel from './SwitchLabel';
import { Switch } from '@/components/data-entry/Switch';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof SwitchLabel> = {
  component: SwitchLabel,
  argTypes: {
    children: {
      description: 'Switch 컴포넌트'
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
type Story = StoryObj<typeof SwitchLabel>;

export const BasicSwitchLabel: Story = {
  render: () => (
    <SwitchLabel label="Dark Theme">
      <Switch name="theme-mode" value="dark" />
    </SwitchLabel>
  )
};

export const Required: Story = {
  render: () => (
    <SwitchLabel label="접근 권한" required>
      <Switch name="access-rights" />
    </SwitchLabel>
  )
};

export const Disabled: Story = {
  render: () => (
    <SwitchLabel label="접근 권한" disabled>
      <Switch name="access-rights" />
    </SwitchLabel>
  )
};

export const LabelPlacement: Story = {
  render: () => (
    <Stack direction="row" spacing={10}>
      <SwitchLabel label="접근 권한" labelPlacement="start">
        <Switch name="access-rights" />
      </SwitchLabel>
      <SwitchLabel label="접근 권한" labelPlacement="end">
        <Switch name="access-rights" />
      </SwitchLabel>
      <SwitchLabel label="접근 권한" labelPlacement="top">
        <Switch name="access-rights" />
      </SwitchLabel>
      <SwitchLabel label="접근 권한" labelPlacement="bottom">
        <Switch name="access-rights" />
      </SwitchLabel>
    </Stack>
  )
};

export const Customization: Story = {
  render: () => (
    <SwitchLabel
      label="접근 권한"
      style={{
        gap: '10px',
        fontSize: '25px',
        fontWeight: 800,
        color: 'error'
      }}
    >
      <Switch name="access-rights" color="error" />
    </SwitchLabel>
  )
};
