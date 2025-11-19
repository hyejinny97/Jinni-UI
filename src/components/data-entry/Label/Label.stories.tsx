import type { Meta, StoryObj } from '@storybook/react';
import Label from './Label';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Link } from '@/components/navigation/Link';

const meta: Meta<typeof Label> = {
  component: Label,
  argTypes: {
    children: {
      description: 'form control element'
    },
    content: {
      description: 'label content'
    },
    disabled: {
      description: 'true이면 input을 disabled 처리하고 label 색상을 dim 처리함'
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
    },
    size: {
      description: 'label과 control 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
        defaultValue: { summary: `'md'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Label>;

export const BasicLabel: Story = {
  render: (args) => (
    <Label content="빨간색" {...args}>
      <Checkbox name="color" value="red" />
    </Label>
  )
};

export const Required: Story = {
  render: (args) => (
    <Label content="빨간색" required {...args}>
      <Checkbox name="color" value="red" />
    </Label>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Label content="빨간색" disabled {...args}>
      <Checkbox name="color" value="red" />
    </Label>
  )
};

export const LabelPlacement: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Label content="빨간색" labelPlacement="start" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
      <Label content="빨간색" labelPlacement="end" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
      <Label content="빨간색" labelPlacement="top" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
      <Label content="빨간색" labelPlacement="bottom" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Label content="빨간색" size="sm" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
      <Label content="빨간색" size="md" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
      <Label content="빨간색" size="lg" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
      <Label content="빨간색" size="35px" {...args}>
        <Checkbox name="color" value="red" />
      </Label>
    </Stack>
  )
};

export const Customization: Story = {
  render: (args) => (
    <Label
      content={
        <Text className="typo-label-large">
          <Link href="#" underline="always">
            이용 약관
          </Link>{' '}
          및{' '}
          <Link href="#" underline="always">
            개인정보 보호정책
          </Link>
          을 읽었으며 이에 동의합니다.
        </Text>
      }
      style={{
        padding: '0 10px 0',
        border: '1px solid',
        borderColor: 'gray-200',
        backgroundColor: 'gray-50',
        borderRadius: '4px',
        cursor: 'default'
      }}
      {...args}
    >
      <Checkbox name="terms" required />
    </Label>
  )
};
