import './CustomPopover.scss';
import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Motion } from '@/components/motion/Motion';

const meta: Meta<typeof Popover> = {
  component: Popover,
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
      description: 'popover의 origin이 부착될 anchorEl의 origin',
      table: {
        type: {
          summary: `{ horizontal: 'left' | 'right' | 'center' | number, vertical: 'top' | 'bottom' | 'center' | number }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'bottom' }` }
      }
    },
    anchorPosition: {
      description: 'client area에서 popover의 상대적인 위치',
      table: {
        type: {
          summary: `{ left: number, top: number }`
        }
      }
    },
    anchorReference: {
      description:
        'popover의 위치를 설정할 때, 어떤 anchor prop을 참조할지 결정',
      table: {
        type: { summary: `'anchorEl' | 'anchorPosition'` },
        defaultValue: { summary: 'anchorEl' }
      }
    },
    BoxProps: {
      description: 'Box 컴포넌트에 적용되는 props',
      table: {
        type: { summary: 'BoxProps' }
      }
    },
    children: {
      description: 'popover의 콘텐츠',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    disableScroll: {
      description: 'true이면, 화면이 스크롤 되지 않음'
    },
    onClose: {
      description: `Escape 키/backdrop 클릭 이벤트가 발생 시 호출되는 함수`,
      table: {
        type: {
          summary: `(event: MouseEvent | KeyboardEvent, reason: 'escapeKeyDown' |  'backdropClick') => void`
        }
      }
    },
    open: {
      description: 'true이면, popover가 나타남'
    },
    popoverOrigin: {
      description: 'anchor의 origin에 부착할 popover의 origin',
      table: {
        type: {
          summary: `{ horizontal: 'left' | 'right' | 'center' | number, vertical: 'top' | 'bottom' | 'center' | number }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'top' }` }
      }
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
type Story = StoryObj<typeof Popover>;

const BasicPopoverTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};

const PopoverOriginTemplate = () => {
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
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {POPOVER_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={String(idx)}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openPopover}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="basic-popover"
        >
          Open Popover
        </Button>
      </Stack>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        popoverOrigin={{
          horizontal: POPOVER_ORIGIN[checkedValue].horizontal,
          vertical: POPOVER_ORIGIN[checkedValue].vertical
        }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
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
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {ANCHOR_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={String(idx)}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openPopover}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="basic-popover"
        >
          Open Popover
        </Button>
      </Stack>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        anchorOrigin={{
          horizontal: ANCHOR_ORIGIN[checkedValue].horizontal,
          vertical: ANCHOR_ORIGIN[checkedValue].vertical
        }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};

const AnchorPositionTemplate = () => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openPopover();
  };

  return (
    <>
      <p
        onContextMenu={handleContextMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
        purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
        bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
        dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
        quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci,
        quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
        finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
        metus vel maximus consequat. Suspendisse lacinia tellus a libero
        volutpat maximus.
      </p>
      <Popover
        id="basic-popover"
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};

const DisableScrollTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        disableScroll
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};

const CustomizePopoverTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        className="custom-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px', marginTop: '10px' }}
        BoxProps={{
          elevation: 0,
          round: 'sm',
          style: { padding: '8px' }
        }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};

const Scale = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'scale(0)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0)' }}
      transition={{
        enter:
          'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-decelerate)',
        exit: 'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-accelerate)'
      }}
    >
      {children}
    </Motion>
  );
};

const CustomizeTransitionTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        TransitionComponent={Scale}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};

export const BasicPopover: Story = {
  render: () => <BasicPopoverTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicPopoverTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};`.trim()
      }
    }
  }
};

export const PopoverOrigin: Story = {
  render: () => <PopoverOriginTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PopoverOriginTemplate = () => {
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
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {POPOVER_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={idx}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openPopover}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="basic-popover"
        >
          Open Popover
        </Button>
      </Stack>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        popoverOrigin={{
          horizontal: POPOVER_ORIGIN[checkedValue].horizontal,
          vertical: POPOVER_ORIGIN[checkedValue].vertical
        }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
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
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {ANCHOR_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={idx}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openPopover}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="basic-popover"
        >
          Open Popover
        </Button>
      </Stack>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        anchorOrigin={{
          horizontal: ANCHOR_ORIGIN[checkedValue].horizontal,
          vertical: ANCHOR_ORIGIN[checkedValue].vertical
        }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
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

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openPopover();
  };

  return (
    <>
      <p
        onContextMenu={handleContextMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
        purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
        bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
        dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
        quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci,
        quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
        finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
        metus vel maximus consequat. Suspendisse lacinia tellus a libero
        volutpat maximus.
      </p>
      <Popover
        id="basic-popover"
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};`.trim()
      }
    }
  }
};

export const DisableScroll: Story = {
  render: () => <DisableScrollTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DisableScrollTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        disableScroll
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomizePopover: Story = {
  render: () => <CustomizePopoverTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizePopoverTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        className="custom-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px', marginTop: '10px' }}
        BoxProps={{
          elevation: 0,
          round: 'sm',
          style: { padding: '8px' }
        }}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeTransition: Story = {
  render: () => <CustomizeTransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const Scale = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'scale(0)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0)' }}
      transition={{
        enter:
          'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-decelerate)',
        exit: 'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-accelerate)'
      }}
    >
      {children}
    </Motion>
  );
};

const CustomizeTransitionTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openPopover}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="basic-popover"
      >
        Open Popover
      </Button>
      <Popover
        id="basic-popover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closePopover}
        style={{ maxWidth: '300px' }}
        TransitionComponent={Scale}
      >
        Are you sure you want to continue with your action?
        <Stack
          direction="row"
          spacing={5}
          style={{ marginTop: '10px', justifyContent: 'end' }}
        >
          <Button variant="text" onClick={closePopover}>
            Close
          </Button>
          <Button onClick={closePopover}>Ok</Button>
        </Stack>
      </Popover>
    </>
  );
};`.trim()
      }
    }
  }
};
