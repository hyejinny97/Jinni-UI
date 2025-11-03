import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
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
        type: { summary: 'React.ReactNode | false' }
      }
    },
    status: {
      description: 'alert의 상태',
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

const ActionTemplate = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box style={{ width: '500px' }}>
      {open ? (
        <Alert
          action={
            <ButtonBase
              onClick={handleClose}
              style={{
                display: 'inline-flex',
                padding: '3px',
                borderRadius: '50%'
              }}
              aria-label="close alert"
            >
              <CloseIcon />
            </ButtonBase>
          }
        >
          Alert Content
        </Alert>
      ) : (
        <Button onClick={handleOpen}>Open Alert</Button>
      )}
    </Box>
  );
};

export const BasicAlert: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <Alert {...args}>Alert Content</Alert>
    </Box>
  )
};

export const AlertTitle: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <Alert title="Alert Title" {...args}>
        Alert Content
      </Alert>
    </Box>
  )
};

export const Actions: Story = {
  render: () => <ActionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ActionTemplate = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Box style={{ width: '500px' }}>
      {open ? (
        <Alert
          action={
            <ButtonBase
              onClick={handleClose}
              style={{
                display: 'inline-flex',
                padding: '3px',
                borderRadius: '50%'
              }}
              aria-label="close alert"
            >
              <CloseIcon />
            </ButtonBase>
          }
        >
          Alert Content
        </Alert>
      ) : (
        <Button onClick={handleOpen}>Open Alert</Button>
      )}
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const Status: Story = {
  render: (args) => (
    <Stack spacing={20} style={{ width: '500px' }}>
      <Alert status="success" {...args}>
        Alert Content
      </Alert>
      <Alert status="info" {...args}>
        Alert Content
      </Alert>
      <Alert status="warning" {...args}>
        Alert Content
      </Alert>
      <Alert status="error" {...args}>
        Alert Content
      </Alert>
    </Stack>
  )
};

export const Variant: Story = {
  render: (args) => (
    <Grid rows={4} columns={3} spacing={20} style={{ width: '600px' }}>
      {(['success', 'info', 'warning', 'error'] as const).map((status) => {
        return (['subtle-filled', 'filled', 'outlined'] as const).map(
          (variant) => (
            <Alert
              key={`${status}/${variant}`}
              status={status}
              variant={variant}
              {...args}
            >
              Alert Content
            </Alert>
          )
        );
      })}
    </Grid>
  )
};

export const Icons: Story = {
  render: (args) => (
    <Stack spacing={20} style={{ width: '500px' }}>
      <Alert icon={<CheckIcon />} {...args}>
        Alert Content
      </Alert>
      <Alert icon={false} {...args}>
        Alert Content
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20} style={{ width: '500px' }}>
  <Alert icon={<CheckIcon />}>
    Alert Content
  </Alert>
  <Alert icon={false}>
    Alert Content
  </Alert>
</Stack>`.trim()
      }
    }
  }
};

export const Customization: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <Alert
        icon={<CheckIcon />}
        style={{
          backgroundColor: 'secondary',
          color: 'on-secondary',
          fill: 'on-secondary'
        }}
        {...args}
      >
        Alert Content
      </Alert>
    </Box>
  )
};
