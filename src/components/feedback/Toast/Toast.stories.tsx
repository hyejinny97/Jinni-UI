import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toast, { CloseReason } from './Toast';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { Alert } from '@/components/feedback/Alert';

const meta: Meta<typeof Toast> = {
  component: Toast,
  argTypes: {
    action: {
      description: 'toast의 action'
    },
    anchorOrigin: {
      description: 'toast의 anchor 위치',
      table: {
        type: {
          summary: `{ horizontal: 'center' | 'left' | 'right', vertical: 'bottom' | 'top' }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'bottom' }` }
      }
    },
    autoHideDuration: {
      description:
        'onClose 함수를 자동으로 호출하기 전까지 기다리는 시간 (단위: s)',
      table: {
        type: {
          summary: `number | null`
        },
        defaultValue: { summary: `null` }
      }
    },
    children: {
      description: '기존 ToastContent를 대체'
    },
    message: {
      description: 'toast 메시지'
    },
    onClose: {
      description: `'timeout', 'clickAway', 'escapeKeydown' 이벤트 발생 시 호출되는 함수`,
      table: {
        type: {
          summary: `(event: React.SyntheticEvent | Event, reason: string) => void`
        }
      }
    },
    open: {
      description: 'true이면, toast가 나타남'
    },
    ToastContentProps: {
      description: 'ToastContent 컴포넌트의 props',
      table: {
        type: {
          summary: `ToastContentProps`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastTemplate = ({
  buttonContent,
  ...rest
}: {
  buttonContent?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{buttonContent || 'Open Toast'}</Button>
      <Toast
        open={open}
        onClose={handleClose}
        message="Toast Message"
        {...rest}
      />
    </>
  );
};

const ToastWithActionTemplate = ({
  buttonContent,
  ...rest
}: {
  buttonContent?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{buttonContent || 'Open Toast'}</Button>
      <Toast
        open={open}
        onClose={handleClose}
        message="Toast Message"
        action={
          <>
            <Button
              variant="text"
              color="primary"
              size="sm"
              style={{ fontWeight: 700 }}
              onClick={handleClose}
            >
              UNDO
            </Button>
            <Button
              centerIcon={<CloseIcon size={20} />}
              variant="text"
              color="white"
              isSquareSize
              onClick={handleClose}
            />
          </>
        }
        {...rest}
      />
    </>
  );
};

const ConsecutiveToastTemplate = () => {
  const [toast, setToast] = useState({ message: '', key: -1 });
  const [open, setOpen] = useState(false);

  const handleClick = (newMessage: string) => () => {
    setToast({ message: newMessage, key: new Date().getTime() });
    setOpen(true);
  };

  const handleClose = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'clickAway') return;
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={20}>
        <Button onClick={handleClick('Message A')}>Show message A</Button>
        <Button onClick={handleClick('Message B')}>Show message B</Button>
      </Stack>
      <Toast
        key={toast.key}
        open={open}
        onClose={handleClose}
        message={toast.message}
        action={
          <Button
            centerIcon={<CloseIcon size={20} />}
            variant="text"
            color="white"
            isSquareSize
            onClick={handleClose}
          />
        }
      />
    </>
  );
};

export const BasicToast: Story = {
  render: (args) => <ToastTemplate {...args} />
};

export const ActionToast: Story = {
  render: (args) => <ToastWithActionTemplate {...args} />
};

export const ToastPosition: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Stack direction="row" spacing={20}>
        <ToastTemplate
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          buttonContent="left / top"
          {...args}
        />
        <ToastTemplate
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          buttonContent="center / top"
          {...args}
        />
        <ToastTemplate
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          buttonContent="right / top"
          {...args}
        />
      </Stack>
      <Stack direction="row" spacing={20}>
        <ToastTemplate
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          buttonContent="left / bottom"
          {...args}
        />
        <ToastTemplate
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          buttonContent="center / bottom"
          {...args}
        />
        <ToastTemplate
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          buttonContent="right / bottom"
          {...args}
        />
      </Stack>
    </Stack>
  )
};

export const AutomaticDismiss: Story = {
  render: (args) => <ToastTemplate autoHideDuration={3} {...args} />
};

export const UseWithAlerts: Story = {
  render: (args) => (
    <ToastTemplate {...args}>
      <Alert>Alert Message</Alert>
    </ToastTemplate>
  )
};

export const ConsecutiveToast: Story = {
  render: (args) => <ConsecutiveToastTemplate {...args} />
};

export const ToastContentProps: Story = {
  render: (args) => (
    <ToastTemplate
      ToastContentProps={{
        style: {
          backgroundColor: 'primary',
          color: 'on-primary'
        }
      }}
      {...args}
    />
  )
};

export const ToastStyle: Story = {
  render: (args) => <ToastTemplate style={{ padding: '5px' }} {...args} />
};
