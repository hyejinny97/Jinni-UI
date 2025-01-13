import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';

const meta: Meta<typeof Alert> = {
  component: Alert,
  argTypes: {
    action: {
      description: 'alert의 action'
    },
    children: {
      description: 'alert의 내용'
    },
    icon: {
      description: 'custom icon (false이면, icon 안 나타남)',
      table: {
        type: { summary: 'node | false' }
      }
    },
    severity: {
      description: 'alert의 타입',
      table: {
        type: { summary: `'success' | 'info' | 'warning' | 'error'` },
        defaultValue: { summary: `'success'` }
      }
    },
    title: {
      description: 'alert의 제목'
    },
    variant: {
      description: 'alert의 스타일',
      table: {
        type: { summary: `'filled' | 'subtle-filled' | 'outlined'` },
        defaultValue: { summary: `'subtle-filled'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Alert>;

const widthStyle = { minWidth: '500px' };

const ActionTemplate = ({ ...args }) => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!open && <Button onClick={handleOpen}>Open Alert</Button>}
      {open && (
        <Alert
          action={
            <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          }
          {...args}
        >
          Alert Content
        </Alert>
      )}
    </>
  );
};

export const BasicAlert: Story = {
  render: (args) => (
    <Alert style={widthStyle} {...args}>
      Alert Content
    </Alert>
  )
};

export const Severity: Story = {
  render: (args) => (
    <Stack spacing={20} style={widthStyle}>
      <Alert severity="success" {...args}>
        Alert Content
      </Alert>
      <Alert severity="info" {...args}>
        Alert Content
      </Alert>
      <Alert severity="warning" {...args}>
        Alert Content
      </Alert>
      <Alert severity="error" {...args}>
        Alert Content
      </Alert>
    </Stack>
  )
};

export const FilledVariant: Story = {
  render: (args) => (
    <Stack spacing={20} style={widthStyle}>
      <Alert severity="success" variant="filled" {...args}>
        Alert Content
      </Alert>
      <Alert severity="info" variant="filled" {...args}>
        Alert Content
      </Alert>
      <Alert severity="warning" variant="filled" {...args}>
        Alert Content
      </Alert>
      <Alert severity="error" variant="filled" {...args}>
        Alert Content
      </Alert>
    </Stack>
  )
};

export const OutlinedVariant: Story = {
  render: (args) => (
    <Stack spacing={20} style={widthStyle}>
      <Alert severity="success" variant="outlined" {...args}>
        Alert Content
      </Alert>
      <Alert severity="info" variant="outlined" {...args}>
        Alert Content
      </Alert>
      <Alert severity="warning" variant="outlined" {...args}>
        Alert Content
      </Alert>
      <Alert severity="error" variant="outlined" {...args}>
        Alert Content
      </Alert>
    </Stack>
  )
};

export const Actions: Story = {
  render: (args) => <ActionTemplate style={widthStyle} {...args} />
};

export const CustomIcon: Story = {
  render: (args) => (
    <Alert icon={<CheckIcon />} style={widthStyle} {...args}>
      Alert Content
    </Alert>
  )
};

export const NoIcon: Story = {
  render: (args) => (
    <Alert icon={false} style={widthStyle} {...args}>
      Alert Content
    </Alert>
  )
};

export const AlertTitle: Story = {
  render: (args) => (
    <Alert title="Alert Title" style={widthStyle} {...args}>
      Alert Content
    </Alert>
  )
};

export const Customization: Story = {
  render: (args) => (
    <Alert
      icon={<CheckIcon color="on-secondary" />}
      style={{
        ...widthStyle,
        backgroundColor: 'secondary',
        color: 'on-secondary',
        alignItems: 'center'
      }}
      {...args}
    >
      Alert Content
    </Alert>
  )
};
