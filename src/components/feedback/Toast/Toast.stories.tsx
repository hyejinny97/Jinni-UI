import { useState, forwardRef, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toast, { CloseReason } from './Toast';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { Alert } from '@/components/feedback/Alert';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Box } from '@/components/layout/Box';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import Chip from '@/components/Chip';
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';

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
    WrapperComponent: {
      description: `wrapper 컴포넌트`,
      table: {
        type: { summary: `React.ComponentType<{ children: React.ReactNode }>` },
        defaultValue: { summary: `Fragment` }
      }
    },
    TransitionComponent: {
      description: `transition 컴포넌트`,
      table: {
        type: { summary: `React.ComponentType<any>` }
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
              <CloseIcon size={20} color="inverse-on-surface" />
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
  const [position, setPosition] =
    useState<(typeof POSITIONS)[number]['label']>('top + left');

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
  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPosition(value as (typeof POSITIONS)[number]['label']);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Anchor Origin
        </Chip>
        <RadioGroup
          name="anchorOrigin"
          value={position}
          onChange={handlePositionChange}
        >
          <Grid columns={3} spacing={5}>
            {POSITIONS.map(({ label }) => (
              <Label key={label} content={label}>
                <Radio value={label} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
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
            <CloseIcon size={20} color="inverse-on-surface" />
          </ButtonBase>
        }
        anchorOrigin={
          POSITIONS.find(({ label }) => label === position) || POSITIONS[0]
        }
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

const ScaleFade = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        {...props}
      />
    );
  }
);

const TransitionTemplate = () => {
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
        WrapperComponent={AnimatePresence}
        TransitionComponent={ScaleFade}
      />
    </>
  );
};

const getScaleFadeWithKey = (key: number) =>
  forwardRef(
    (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
      return (
        <motion.div
          ref={ref}
          key={key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          {...props}
        />
      );
    }
  );

const ConsecutiveToastsTemplate = () => {
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
            <CloseIcon size={20} color="inverse-on-surface" />
          </ButtonBase>
        }
        WrapperComponent={AnimatePresence}
        TransitionComponent={getScaleFadeWithKey(toast.key)}
      />
    </>
  );
};

type Toast = {
  id: number;
  content: string;
};

const SlideToRight = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        {...props}
      />
    );
  }
);

const SlideToRightTemplate = () => {
  const countRef = useRef<number>(0);
  const toastsInTimerRef = useRef<Set<number>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = () => {
    countRef.current += 1;
    const newToast = {
      id: countRef.current,
      content: `This is Toast ${countRef.current}`
    };
    setToasts((prev) => [...prev, newToast]);
  };
  const hideToast = (idToHide: number) => {
    setToasts((prev) => prev.filter(({ id }) => id !== idToHide));
  };

  useEffect(() => {
    toasts.forEach(({ id }) => {
      if (toastsInTimerRef.current.has(id)) return;
      const timeoutId = setTimeout(() => {
        hideToast(id);
        toastsInTimerRef.current.delete(id);
        clearTimeout(timeoutId);
      }, 3000);
      toastsInTimerRef.current.add(id);
    });
  }, [toasts]);

  return (
    <>
      <Button onClick={showToast}>Show Toast</Button>
      <AnimatePresence>
        {toasts.map(({ id, content }, idx) => (
          <Toast
            key={id}
            open
            message={content}
            TransitionComponent={SlideToRight}
            style={{
              bottom: `${(toasts.length - 1 - idx) * (60 + 8)}px`,
              transition: 'bottom 0.3s ease'
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

const ScaleSlide = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ transform: 'translate(-50%, -50%)', scale: 0.8, opacity: 0 }}
        animate={{ transform: 'translate(-50%, 0)', scale: 1, opacity: 1 }}
        exit={{ transform: 'translate(-50%, -50%)', scale: 0.8, opacity: 0 }}
        {...props}
      />
    );
  }
);

const SlideToDownTemplate = () => {
  const countRef = useRef<number>(0);
  const toastsInTimerRef = useRef<Set<number>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = () => {
    countRef.current += 1;
    const newToast = {
      id: countRef.current,
      content: `This is Toast ${countRef.current}`
    };
    setToasts((prev) => [...prev, newToast]);
  };
  const hideToast = (idToHide: number) => {
    setToasts((prev) => prev.filter(({ id }) => id !== idToHide));
  };

  useEffect(() => {
    toasts.forEach(({ id }) => {
      if (toastsInTimerRef.current.has(id)) return;
      const timeoutId = setTimeout(() => {
        hideToast(id);
        toastsInTimerRef.current.delete(id);
        clearTimeout(timeoutId);
      }, 3000);
      toastsInTimerRef.current.add(id);
    });
  }, [toasts]);

  return (
    <>
      <Button onClick={showToast}>Show Toast</Button>
      <AnimatePresence>
        {toasts.map(({ id, content }, idx) => (
          <Toast
            key={id}
            open
            message={content}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            TransitionComponent={ScaleSlide}
            style={{
              top: `${(toasts.length - 1 - idx) * (60 + 8)}px`,
              transition: 'top 0.3s ease'
            }}
          />
        ))}
      </AnimatePresence>
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
              aria-content="close"
            >
              <CloseIcon size={20} color="inverse-on-surface" />
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
  const [position, setPosition] =
    useState<(typeof POSITIONS)[number]['label']>('top + left');

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
  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPosition(value as (typeof POSITIONS)[number]['label']);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Anchor Origin
        </Chip>
        <RadioGroup
          name="anchorOrigin"
          value={position}
          onChange={handlePositionChange}
        >
          <Grid columns={3} spacing={5}>
            {POSITIONS.map(({ label }) => (
              <Label key={label} content={label}>
                <Radio value={label} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
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
            <CloseIcon size={20} color="inverse-on-surface" />
          </ButtonBase>
        }
        anchorOrigin={
          POSITIONS.find(({ label }) => label === position) || POSITIONS[0]
        }
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

export const Transition: Story = {
  render: () => <TransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
  
const ScaleFade = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        {...props}
      />
    );
  }
);

const TransitionTemplate = () => {
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
        WrapperComponent={AnimatePresence}
        TransitionComponent={ScaleFade}
      />
    </>
  );
};        
`.trim()
      }
    }
  }
};

export const ConsecutiveToasts: Story = {
  render: () => <ConsecutiveToastsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';

const getScaleFadeWithKey = (key: number) =>
  forwardRef(
    (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
      return (
        <motion.div
          ref={ref}
          key={key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          {...props}
        />
      );
    }
  );

const ConsecutiveToastsTemplate = () => {
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
            <CloseIcon size={20} color="inverse-on-surface" />
          </ButtonBase>
        }
        WrapperComponent={AnimatePresence}
        TransitionComponent={getScaleFadeWithKey(toast.key)}
      />
    </>
  );
};        
`.trim()
      }
    }
  }
};

export const SlideToRightToast: Story = {
  render: () => <SlideToRightTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
   
type Toast = {
  id: number;
  content: string;
};

const SlideToRight = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        {...props}
      />
    );
  }
);

const SlideToRightTemplate = () => {
  const countRef = useRef<number>(0);
  const toastsInTimerRef = useRef<Set<number>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = () => {
    countRef.current += 1;
    const newToast = {
      id: countRef.current,
      content: \`This is Toast \${countRef.current}\`
    };
    setToasts((prev) => [...prev, newToast]);
  };
  const hideToast = (idToHide: number) => {
    setToasts((prev) => prev.filter(({ id }) => id !== idToHide));
  };

  useEffect(() => {
    toasts.forEach(({ id }) => {
      if (toastsInTimerRef.current.has(id)) return;
      const timeoutId = setTimeout(() => {
        hideToast(id);
        toastsInTimerRef.current.delete(id);
        clearTimeout(timeoutId);
      }, 3000);
      toastsInTimerRef.current.add(id);
    });
  }, [toasts]);

  return (
    <>
      <Button onClick={showToast}>Show Toast</Button>
      <AnimatePresence>
        {toasts.map(({ id, content }, idx) => (
          <Toast
            key={id}
            open
            message={content}
            TransitionComponent={SlideToRight}
            style={{
              bottom: \`\${(toasts.length - 1 - idx) * (60 + 8)}px\`,
              transition: 'bottom 0.3s ease'
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};        
`.trim()
      }
    }
  }
};

export const SlideToDownToast: Story = {
  render: () => <SlideToDownTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
   
type Toast = {
  id: number;
  content: string;
};
        
const ScaleSlide = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ transform: 'translate(-50%, -50%)', scale: 0.8, opacity: 0 }}
        animate={{ transform: 'translate(-50%, 0)', scale: 1, opacity: 1 }}
        exit={{ transform: 'translate(-50%, -50%)', scale: 0.8, opacity: 0 }}
        {...props}
      />
    );
  }
);

const SlideToDownTemplate = () => {
  const countRef = useRef<number>(0);
  const toastsInTimerRef = useRef<Set<number>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = () => {
    countRef.current += 1;
    const newToast = {
      id: countRef.current,
      content: \`This is Toast \${countRef.current}\`
    };
    setToasts((prev) => [...prev, newToast]);
  };
  const hideToast = (idToHide: number) => {
    setToasts((prev) => prev.filter(({ id }) => id !== idToHide));
  };

  useEffect(() => {
    toasts.forEach(({ id }) => {
      if (toastsInTimerRef.current.has(id)) return;
      const timeoutId = setTimeout(() => {
        hideToast(id);
        toastsInTimerRef.current.delete(id);
        clearTimeout(timeoutId);
      }, 3000);
      toastsInTimerRef.current.add(id);
    });
  }, [toasts]);

  return (
    <>
      <Button onClick={showToast}>Show Toast</Button>
      <AnimatePresence>
        {toasts.map(({ id, content }, idx) => (
          <Toast
            key={id}
            open
            message={content}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            TransitionComponent={ScaleSlide}
            style={{
              top: \`\${(toasts.length - 1 - idx) * (60 + 8)}px\`,
              transition: 'top 0.3s ease'
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};  
`.trim()
      }
    }
  }
};
