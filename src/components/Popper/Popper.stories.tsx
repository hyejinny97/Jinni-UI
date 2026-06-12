import './CustomPopper.scss';
import { useRef, useState, forwardRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popper, { PopperProps } from './Popper';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import Chip from '@/components/Chip';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';

const meta: Meta<typeof Popper> = {
  component: Popper,
  argTypes: {
    anchorElRef: {
      description: 'anchor 요소 참조 객체',
      table: {
        type: {
          summary: 'React.RefObject<HTMLElement>'
        }
      }
    },
    anchorOrigin: {
      description: 'popper의 origin이 부착될 anchorEl의 origin',
      table: {
        type: {
          summary: `{ horizontal: 'left' | 'right' | 'center' | number; vertical: 'top' | 'bottom' | 'center' | number; }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'bottom' }` }
      }
    },
    anchorPosition: {
      description: 'client area에서 anchor의 상대적인 위치',
      table: {
        type: {
          summary: `{ left: number; top: number }`
        }
      }
    },
    anchorReference: {
      description:
        'popper의 위치를 설정할 때, 어떤 anchor prop을 참조할지 결정',
      table: {
        type: { summary: `'anchorEl' | 'anchorPosition'` },
        defaultValue: { summary: `'anchorEl'` }
      }
    },
    children: {
      description: 'anchor 주변에 띄울 콘텐츠',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    container: {
      description: 'popper가 렌더링될 target DOM 요소',
      table: {
        type: {
          summary: `HTMLElement`
        },
        defaultValue: { summary: `document.body` }
      }
    },
    popperOrigin: {
      description: 'anchor의 origin에 부착할 popper의 origin',
      table: {
        type: {
          summary: `{ horizontal: 'left' | 'right' | 'center' | number; vertical: 'top' | 'bottom' | 'center' | number; }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'top' }` }
      }
    },
    positionType: {
      description: `popper의 position type`,
      table: {
        type: { summary: `'absolute' | 'fixed'` },
        defaultValue: { summary: `'absolute'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Popper>;

const BasicPopperTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </>
  );
};

const AnchorOriginTemplate = () => {
  const ANCHOR_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const DEFAULT_ORIGIN: PopperProps['anchorOrigin'] = {
    horizontal: 'left',
    vertical: 'bottom'
  };

  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] =
    useState<PopperProps['anchorOrigin']>(DEFAULT_ORIGIN);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAnchorOrigin(JSON.parse(value) as PopperProps['anchorOrigin']);
  };

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Anchor Origin
        </Chip>
        <RadioGroup
          name="anchor-origin"
          value={JSON.stringify(anchorOrigin)}
          onChange={handleOriginChange}
        >
          <Grid columns={3} spacing={5}>
            {ANCHOR_ORIGIN.map((origin) => {
              const { label, ...rest } = origin;
              return (
                <Label content={label}>
                  <Radio value={JSON.stringify(rest)} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef} anchorOrigin={anchorOrigin}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </Stack>
  );
};

const PopperOriginTemplate = () => {
  const POPOVER_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const DEFAULT_ORIGIN: PopperProps['popperOrigin'] = {
    horizontal: 'left',
    vertical: 'top'
  };

  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [popperOrigin, setPopperOrigin] =
    useState<PopperProps['popperOrigin']>(DEFAULT_ORIGIN);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPopperOrigin(JSON.parse(value) as PopperProps['popperOrigin']);
  };

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Popper Origin
        </Chip>
        <RadioGroup
          name="popper-origin"
          value={JSON.stringify(popperOrigin)}
          onChange={handleOriginChange}
        >
          <Grid columns={3} spacing={5}>
            {POPOVER_ORIGIN.map((origin) => {
              const { label, ...rest } = origin;
              return (
                <Label content={label}>
                  <Radio value={JSON.stringify(rest)} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef} popperOrigin={popperOrigin}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </Stack>
  );
};

const AnchorPositionTemplate = () => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const openPopper = () => {
    setOpen(true);
  };
  const closePopper = () => {
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openPopper();
  };

  return (
    <>
      <Text onContextMenu={handleContextMenu} onClick={closePopper}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
        purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
        bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
        dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
        quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci,
        quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
        finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
        metus vel maximus consequat. Suspendisse lacinia tellus a libero
        volutpat maximus.
      </Text>
      {open && (
        <Popper anchorReference="anchorPosition" anchorPosition={coordinate}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </>
  );
};

const PositionTypeTemplate = () => {
  const POSITION_TYPE = ['absolute', 'fixed'] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [positionType, setPositionType] =
    useState<PopperProps['positionType']>('absolute');

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handlePositionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPositionType(event.target.value as PopperProps['positionType']);
  };

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Position Type
        </Chip>
        <RadioGroup
          name="position-type"
          value={positionType}
          onChange={handlePositionTypeChange}
        >
          <Grid columns={2} spacing={5}>
            {POSITION_TYPE.map((position) => (
              <Label content={position}>
                <Radio value={position} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef} positionType={positionType}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </Stack>
  );
};

const TriggerEventTemplate = () => {
  const TRIGGERS = ['click', 'hover', 'focus'] as const;
  type TriggerType = (typeof TRIGGERS)[number];

  const anchorElRef = useRef<
    Record<TriggerType, { current: HTMLElement | null }>
  >({
    click: { current: null },
    hover: { current: null },
    focus: { current: null }
  });
  const [open, setOpen] = useState<Record<TriggerType, boolean>>({
    click: false,
    hover: false,
    focus: false
  });

  const toggle = (trigger: TriggerType) => {
    const newValue: Record<TriggerType, boolean> = { ...open };
    newValue[trigger] = !newValue[trigger];
    setOpen(newValue);
  };
  const openPopper = (trigger: TriggerType) => {
    const newValue: Record<TriggerType, boolean> = { ...open };
    newValue[trigger] = true;
    setOpen(newValue);
  };
  const closePopper = (trigger: TriggerType) => {
    const newValue: Record<TriggerType, boolean> = { ...open };
    newValue[trigger] = false;
    setOpen(newValue);
  };

  return (
    <>
      <Stack direction="row" spacing={20}>
        <Button ref={anchorElRef.current.click} onClick={() => toggle('click')}>
          Trigger: 'click'
        </Button>
        <Button
          ref={anchorElRef.current.hover}
          onMouseEnter={() => openPopper('hover')}
          onMouseLeave={() => closePopper('hover')}
        >
          Trigger: 'hover'
        </Button>
        <Button
          ref={anchorElRef.current.focus}
          onFocus={() => openPopper('focus')}
          onBlur={() => closePopper('focus')}
        >
          Trigger: 'focus'
        </Button>
      </Stack>
      {TRIGGERS.map((trigger) => (
        <>
          {open[trigger] && (
            <Popper anchorElRef={anchorElRef.current[trigger]}>
              <Box
                className="typo-body-medium"
                round="xs"
                elevation={3}
                style={{
                  display: 'inline-block',
                  padding: '4px 16px',
                  backgroundColor: 'surface-container-lowest',
                  color: 'on-surface'
                }}
              >
                Popper Content
              </Box>
            </Popper>
          )}
        </>
      ))}
    </>
  );
};

const PopperWithArrowTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper
          className="custom-popper"
          anchorElRef={anchorElRef}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          popperOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={5}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
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
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      <AnimatePresence>
        {open && (
          <Popper
            anchorElRef={anchorElRef}
            as={ScaleFade}
            style={{ transformOrigin: 'top left' }}
          >
            <Box
              className="typo-body-medium"
              round="xs"
              elevation={3}
              style={{
                display: 'inline-block',
                padding: '4px 16px',
                backgroundColor: 'surface-container-lowest',
                color: 'on-surface'
              }}
            >
              Popper Content
            </Box>
          </Popper>
        )}
      </AnimatePresence>
    </>
  );
};

export const BasicPopper: Story = {
  render: () => <BasicPopperTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicPopperTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef}>
          <Box
            className='typo-body-medium'
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};

export const AnchorOrigin: Story = {
  render: () => <AnchorOriginTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AnchorOriginTemplate = () => {
  const ANCHOR_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const DEFAULT_ORIGIN = {
    horizontal: 'left',
    vertical: 'bottom'
  };

  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] =
    useState<PopperProps['anchorOrigin']>(DEFAULT_ORIGIN);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAnchorOrigin(JSON.parse(value) as PopperProps['anchorOrigin']);
  };

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Anchor Origin
        </Chip>
        <RadioGroup
          name="anchor-origin"
          value={JSON.stringify(anchorOrigin)}
          onChange={handleOriginChange}
        >
          <Grid columns={3} spacing={5}>
            {ANCHOR_ORIGIN.map((origin) => {
              const { label, ...rest } = origin;
              return (
                <Label content={label}>
                  <Radio value={JSON.stringify(rest)} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef} anchorOrigin={anchorOrigin}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const PopperOrigin: Story = {
  render: () => <PopperOriginTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PopperOriginTemplate = () => {
  const POPOVER_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const DEFAULT_ORIGIN: PopperProps['popperOrigin'] = {
    horizontal: 'left',
    vertical: 'top'
  };

  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [popperOrigin, setPopperOrigin] =
    useState<PopperProps['popperOrigin']>(DEFAULT_ORIGIN);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPopperOrigin(JSON.parse(value) as PopperProps['popperOrigin']);
  };

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Popper Origin
        </Chip>
        <RadioGroup
          name="popper-origin"
          value={JSON.stringify(popperOrigin)}
          onChange={handleOriginChange}
        >
          <Grid columns={3} spacing={5}>
            {POPOVER_ORIGIN.map((origin) => {
              const { label, ...rest } = origin;
              return (
                <Label content={label}>
                  <Radio value={JSON.stringify(rest)} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef} popperOrigin={popperOrigin}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const AnchorPosition: Story = {
  render: () => <AnchorPositionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AnchorPositionTemplate = () => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const openPopper = () => {
    setOpen(true);
  };
  const closePopper = () => {
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openPopper();
  };

  return (
    <>
      <Text onContextMenu={handleContextMenu} onClick={closePopper}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
        purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
        bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
        dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
        quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci,
        quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
        finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
        metus vel maximus consequat. Suspendisse lacinia tellus a libero
        volutpat maximus.
      </Text>
      {open && (
        <Popper anchorReference="anchorPosition" anchorPosition={coordinate}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};

export const PositionType: Story = {
  render: () => <PositionTypeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PositionTypeTemplate = () => {
  const POSITION_TYPE = ['absolute', 'fixed'] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [positionType, setPositionType] =
    useState<PopperProps['positionType']>('absolute');

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handlePositionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPositionType(event.target.value as PopperProps['positionType']);
  };

  return (
    <Stack spacing={30} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Position Type
        </Chip>
        <RadioGroup
          name="position-type"
          value={positionType}
          onChange={handlePositionTypeChange}
        >
          <Grid columns={2} spacing={5}>
            {POSITION_TYPE.map((position) => (
              <Label content={position}>
                <Radio value={position} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper anchorElRef={anchorElRef} positionType={positionType}>
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={3}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TriggerEvent: Story = {
  render: () => <TriggerEventTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TriggerEventTemplate = () => {
  const TRIGGERS = ['click', 'hover', 'focus'] as const;
  type TriggerType = (typeof TRIGGERS)[number];

  const anchorElRef = useRef<
    Record<TriggerType, { current: HTMLElement | null }>
  >({
    click: { current: null },
    hover: { current: null },
    focus: { current: null }
  });
  const [open, setOpen] = useState<Record<TriggerType, boolean>>({
    click: false,
    hover: false,
    focus: false
  });

  const toggle = (trigger: TriggerType) => {
    const newValue: Record<TriggerType, boolean> = { ...open };
    newValue[trigger] = !newValue[trigger];
    setOpen(newValue);
  };
  const openPopper = (trigger: TriggerType) => {
    const newValue: Record<TriggerType, boolean> = { ...open };
    newValue[trigger] = true;
    setOpen(newValue);
  };
  const closePopper = (trigger: TriggerType) => {
    const newValue: Record<TriggerType, boolean> = { ...open };
    newValue[trigger] = false;
    setOpen(newValue);
  };

  return (
    <>
      <Stack direction="row" spacing={20}>
        <Button ref={anchorElRef.current.click} onClick={() => toggle('click')}>
          Trigger: 'click'
        </Button>
        <Button
          ref={anchorElRef.current.hover}
          onMouseEnter={() => openPopper('hover')}
          onMouseLeave={() => closePopper('hover')}
        >
          Trigger: 'hover'
        </Button>
        <Button
          ref={anchorElRef.current.focus}
          onFocus={() => openPopper('focus')}
          onBlur={() => closePopper('focus')}
        >
          Trigger: 'focus'
        </Button>
      </Stack>
      {TRIGGERS.map((trigger) => (
        <>
          {open[trigger] && (
            <Popper anchorElRef={anchorElRef.current[trigger]}>
              <Box
                className="typo-body-medium"
                round="xs"
                elevation={3}
                style={{
                  display: 'inline-block',
                  padding: '4px 16px',
                  backgroundColor: 'surface-container-lowest',
                  color: 'on-surface'
                }}
              >
                Popper Content
              </Box>
            </Popper>
          )}
        </>
      ))}
    </>
  );
};
`.trim()
      }
    }
  }
};

export const PopperWithArrow: Story = {
  render: () => <PopperWithArrowTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PopperWithArrowTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      {open && (
        <Popper
          className="custom-popper"
          anchorElRef={anchorElRef}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          popperOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Box
            className="typo-body-medium"
            round="xs"
            elevation={5}
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              backgroundColor: 'surface-container-lowest',
              color: 'on-surface'
            }}
          >
            Popper Content
          </Box>
        </Popper>
      )}
    </>
  );
};`.trim()
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
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';

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
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={toggle}>
        Toggle Popper
      </Button>
      <AnimatePresence>
        {open && (
          <Popper
            anchorElRef={anchorElRef}
            as={ScaleFade}
            style={{ transformOrigin: 'top left' }}
          >
            <Box
              className="typo-body-medium"
              round="xs"
              elevation={3}
              style={{
                display: 'inline-block',
                padding: '4px 16px',
                backgroundColor: 'surface-container-lowest',
                color: 'on-surface'
              }}
            >
              Popper Content
            </Box>
          </Popper>
        )}
      </AnimatePresence>
    </>
  );
};
`.trim()
      }
    }
  }
};
