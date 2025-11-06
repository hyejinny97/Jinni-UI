import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toast, { CloseReason } from './Toast';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { Alert } from '@/components/feedback/Alert';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { Motion } from '@/components/motion/Motion';

const meta: Meta<typeof Toast> = {
  component: Toast,
  argTypes: {
    action: {
      description: 'toast의 action'
    },
    anchorOrigin: {
      description: 'toast가 위치할 anchor의 origin',
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
    BoxProps: {
      description: 'Box 컴포넌트의 props',
      table: {
        type: {
          summary: `BoxProps`
        }
      }
    },
    children: {
      description: '기존 Box를 대체할 요소'
    },
    message: {
      description: 'toast 콘텐츠'
    },
    onClose: {
      description: `타임아웃/Escape 키/background 클릭 이벤트 발생 시 호출되는 함수`,
      table: {
        type: {
          summary: `(event: React.SyntheticEvent | Event | null, reason: 'timeout' | 'backgroundClick' | 'escapeKeydown') => void`
        }
      }
    },
    open: {
      description: 'true이면, toast가 나타남'
    },
    TransitionComponent: {
      description: `transition 컴포넌트`,
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `ScaleFade` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

const BasicToastTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast open={open} onClose={closeToast} message="Toast Message" />
    </>
  );
};

const ToastActionTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'backgroundClick') return;
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        action={
          <>
            <Button
              onClick={closeToast}
              variant="text"
              color="primary"
              size="sm"
              style={{ fontWeight: 700 }}
            >
              UNDO
            </Button>
            <ButtonBase
              onClick={closeToast}
              style={{
                display: 'inline-flex',
                padding: '4px',
                borderRadius: '50%'
              }}
              aria-label="close"
            >
              <CloseIcon size={20} color="white" />
            </ButtonBase>
          </>
        }
      />
    </>
  );
};

const ToastPositionTemplate = () => {
  const POSITIONS = [
    { label: 'top + left', horizontal: 'left', vertical: 'top' },
    { label: 'top + center', horizontal: 'center', vertical: 'top' },
    { label: 'top + right', horizontal: 'right', vertical: 'top' },
    { label: 'bottom + left', horizontal: 'left', vertical: 'bottom' },
    { label: 'bottom + center', horizontal: 'center', vertical: 'bottom' },
    { label: 'bottom + right', horizontal: 'right', vertical: 'bottom' }
  ] as const;
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };
  const openToast = () => {
    setOpen(true);
  };
  const closeToast = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'backgroundClick') return;
    setOpen(false);
  };

  return (
    <Stack spacing={20}>
      <Grid columns={3}>
        {POSITIONS.map((position, idx) => (
          <RadioLabel key={position.label} label={position.label}>
            <Radio
              value={idx}
              checked={checkedValue === idx}
              onChange={check}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        action={
          <ButtonBase
            onClick={closeToast}
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon size={20} color="white" />
          </ButtonBase>
        }
        anchorOrigin={{
          horizontal: POSITIONS[checkedValue].horizontal,
          vertical: POSITIONS[checkedValue].vertical
        }}
      />
    </Stack>
  );
};

const AutoDismissTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        autoHideDuration={3}
      />
    </>
  );
};

const AlertToastTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast open={open} onClose={closeToast}>
        <Alert style={{ elevation: 3 }}>Alert Message</Alert>
      </Toast>
    </>
  );
};

const ConsecutiveToastWithoutStackingTemplate = () => {
  const [toast, setToast] = useState({ message: '', key: -1 });
  const [open, setOpen] = useState(false);

  const openToast = (newMessage: string) => () => {
    setToast({ message: newMessage, key: new Date().getTime() });
    setOpen(true);
  };
  const closeToast = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'backgroundClick') return;
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={20}>
        <Button onClick={openToast('Message A')}>Show message A</Button>
        <Button onClick={openToast('Message B')}>Show message B</Button>
      </Stack>
      <Toast
        key={toast.key}
        open={open}
        onClose={closeToast}
        message={toast.message}
        action={
          <ButtonBase
            onClick={closeToast}
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon size={20} color="white" />
          </ButtonBase>
        }
      />
    </>
  );
};

const CustomizeToastTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        BoxProps={{
          elevation: 10,
          style: {
            backgroundColor: 'primary-container',
            color: 'on-primary-container'
          }
        }}
        style={{ padding: '30px 10px' }}
      />
    </>
  );
};

const SlideFade = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'translateY(20px)', opacity: 0 }}
      animate={{ transform: 'translateY(0)', opacity: 1 }}
      exit={{ transform: 'translateY(20px)', opacity: 0 }}
      transition="transform var(--jinni-duration-short4) var(--jinni-easing-emphasized), opacity var(--jinni-duration-short4) var(--jinni-easing-emphasized)"
    >
      {children}
    </Motion>
  );
};

const CustomizeTransitionTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        TransitionComponent={SlideFade}
      />
    </>
  );
};

export const BasicToast: Story = {
  render: () => <BasicToastTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicToastTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast open={open} onClose={closeToast} message="Toast Message" />
    </>
  );
};`.trim()
      }
    }
  }
};

export const ToastAction: Story = {
  render: () => <ToastActionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ToastActionTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'backgroundClick') return;
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        action={
          <>
            <Button
              onClick={closeToast}
              variant="text"
              color="primary"
              size="sm"
              style={{ fontWeight: 700 }}
            >
              UNDO
            </Button>
            <ButtonBase
              onClick={closeToast}
              style={{
                display: 'inline-flex',
                padding: '4px',
                borderRadius: '50%'
              }}
              aria-label="close"
            >
              <CloseIcon size={20} color="white" />
            </ButtonBase>
          </>
        }
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const ToastPosition: Story = {
  render: () => <ToastPositionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ToastPositionTemplate = () => {
  const POSITIONS = [
    { label: 'top + left', horizontal: 'left', vertical: 'top' },
    { label: 'top + center', horizontal: 'center', vertical: 'top' },
    { label: 'top + right', horizontal: 'right', vertical: 'top' },
    { label: 'bottom + left', horizontal: 'left', vertical: 'bottom' },
    { label: 'bottom + center', horizontal: 'center', vertical: 'bottom' },
    { label: 'bottom + right', horizontal: 'right', vertical: 'bottom' }
  ] as const;
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };
  const openToast = () => {
    setOpen(true);
  };
  const closeToast = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'backgroundClick') return;
    setOpen(false);
  };

  return (
    <Stack spacing={20}>
      <Grid columns={3}>
        {POSITIONS.map((position, idx) => (
          <RadioLabel key={position.label} label={position.label}>
            <Radio
              value={idx}
              checked={checkedValue === idx}
              onChange={check}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        action={
          <ButtonBase
            onClick={closeToast}
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon size={20} color="white" />
          </ButtonBase>
        }
        anchorOrigin={{
          horizontal: POSITIONS[checkedValue].horizontal,
          vertical: POSITIONS[checkedValue].vertical
        }}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const AutomaticDismiss: Story = {
  render: () => <AutoDismissTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AutoDismissTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        autoHideDuration={3}
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const UseWithAlerts: Story = {
  render: () => <AlertToastTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AlertToastTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast open={open} onClose={closeToast}>
        <Alert style={{ elevation: 3 }}>Alert Message</Alert>
      </Toast>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const ConsecutiveToastWithoutStacking: Story = {
  render: () => <ConsecutiveToastWithoutStackingTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ConsecutiveToastWithoutStackingTemplate = () => {
  const [toast, setToast] = useState({ message: '', key: -1 });
  const [open, setOpen] = useState(false);

  const openToast = (newMessage: string) => () => {
    setToast({ message: newMessage, key: new Date().getTime() });
    setOpen(true);
  };
  const closeToast = (
    _: React.SyntheticEvent | Event | null,
    reason: CloseReason
  ) => {
    if (reason === 'backgroundClick') return;
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={20}>
        <Button onClick={openToast('Message A')}>Show message A</Button>
        <Button onClick={openToast('Message B')}>Show message B</Button>
      </Stack>
      <Toast
        key={toast.key}
        open={open}
        onClose={closeToast}
        message={toast.message}
        action={
          <ButtonBase
            onClick={closeToast}
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon size={20} color="white" />
          </ButtonBase>
        }
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeToast: Story = {
  render: () => <CustomizeToastTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeToastTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        BoxProps={{
          elevation: 10,
          style: {
            backgroundColor: 'primary-container',
            color: 'on-primary-container'
          }
        }}
        style={{ padding: '30px 10px' }}
      />
    </>
  );
};
`.trim()
      }
    }
  }
};

export const CustomizeTransition: Story = {
  render: () => <CustomizeTransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SlideFade = ({children}: {children: React.ReactNode}) => {
return (
	<Motion
		initial={{ transform: 'translateY(20px)', opacity: 0 }}
		animate={{ transform: 'translateY(0)', opacity: 1 }}
		exit={{ transform: 'translateY(20px)', opacity: 0 }}
		transition='transform var(--jinni-duration-short4) var(--jinni-easing-emphasized), opacity var(--jinni-duration-short4) var(--jinni-easing-emphasized)'
	>
		{children}
	</Motion>
)}

const CustomizeTransitionTemplate = () => {
  const [open, setOpen] = useState(false);

  const openToast = () => {
    setOpen(true);
  };
  const closeToast = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openToast}>Open Toast</Button>
      <Toast
        open={open}
        onClose={closeToast}
        message="Toast Message"
        TransitionComponent={SlideFade}
      />
    </>
  );
};`.trim()
      }
    }
  }
};
