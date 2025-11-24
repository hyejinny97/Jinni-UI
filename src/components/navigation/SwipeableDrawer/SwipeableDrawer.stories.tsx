import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  SwipeableDrawer,
  SwipeableDrawerHeader,
  SwipeableDrawerBody,
  SwipeableDrawerFooter
} from '.';
import { Button } from '@/components/general/Button';
import { Stack } from '@/components/layout/Stack';
import { Label } from '@/components/data-entry/Label';
import { Radio } from '@/components/data-entry/Radio';
import { RadioGroup } from '@/components/data-entry/RadioGroup';

const meta: Meta<typeof SwipeableDrawer> = {
  component: SwipeableDrawer,
  argTypes: {
    anchorOrigin: {
      description: 'drawer가 위치할 anchor의 origin',
      table: {
        type: {
          summary: `'left' | 'right' | 'top' | 'bottom'`
        },
        defaultValue: { summary: `'left'` }
      }
    },
    BoxProps: {
      description: 'Box 컴포넌트에 적용되는 props',
      table: {
        type: { summary: `BoxProps` }
      }
    },
    children: {
      description:
        'swipeable drawer  콘텐츠 (SwipeableDrawerHeader, SwipeableDrawerBody, SwipeableDrawerFooter 등)'
    },
    onClose: {
      description: 'Escape 키/backdrop 클릭/snap일 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event, reason: "escapeKeyDown" | "backdropClick" | "snap") => void`
        }
      }
    },
    onOpen: {
      description: 'snap일 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: React.SyntheticEvent) => void`
        }
      }
    },
    open: {
      description: 'true이면, swipeable drawer가 나타남'
    },
    size: {
      description: 'drawer의 크기',
      table: {
        type: {
          summary: `number`
        },
        defaultValue: { summary: `250` }
      }
    },
    snapPoints: {
      description:
        'intersection ratio(0~1)에 따라 drawer가 어느 위치(0~1 비율)로 snap될지 정의',
      table: {
        type: {
          summary: `Array<{
  threshold: number;
  snapTo: number;
}>`
        },
        defaultValue: {
          summary: `[
	{ threshold: 0.5, snapTo: 0 },
	{ threshold: 1, snapTo: 1 }
]`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SwipeableDrawer>;

const BasicSwipeableDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <SwipeableDrawer open={open} onOpen={openDrawer} onClose={closeDrawer}>
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};

const PlacementTemplate = () => {
  const PLACEMENTS = [
    { label: 'Left Drawer', value: 'left' },
    { label: 'Right Drawer', value: 'right' },
    { label: 'Top Drawer', value: 'top' },
    { label: 'Bottom Drawer', value: 'bottom' }
  ] as const;
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] =
    useState<(typeof PLACEMENTS)[number]['value']>('left');

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const changePlacement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnchorOrigin(event.target.value as (typeof PLACEMENTS)[number]['value']);
  };

  return (
    <>
      <Stack spacing={20}>
        <RadioGroup
          name="anchor-origin"
          value={anchorOrigin}
          onChange={changePlacement}
        >
          <Stack>
            {PLACEMENTS.map((placement) => (
              <Label content={placement.label}>
                <Radio value={placement.value} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Button onClick={openDrawer} fullWidth>
          Open Drawer
        </Button>
      </Stack>
      <SwipeableDrawer
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        anchorOrigin={anchorOrigin}
      >
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};

const SnapPointsTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <SwipeableDrawer
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        anchorOrigin="bottom"
        snapPoints={[
          { threshold: 0.2, snapTo: 0 },
          { threshold: 0.8, snapTo: 0.5 },
          { threshold: 1, snapTo: 1 }
        ]}
      >
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};

const CustomizeDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <SwipeableDrawer
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        size={400}
        BoxProps={{
          elevation: 20,
          style: { backgroundColor: 'surface-container-low' }
        }}
      >
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};

export const BasicSwipeableDrawer: Story = {
  render: () => <BasicSwipeableDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicSwipeableDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <SwipeableDrawer open={open} onOpen={openDrawer} onClose={closeDrawer}>
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const Placement: Story = {
  render: () => <PlacementTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PlacementTemplate = () => {
  const PLACEMENTS = [
    { label: 'Left Drawer', value: 'left' },
    { label: 'Right Drawer', value: 'right' },
    { label: 'Top Drawer', value: 'top' },
    { label: 'Bottom Drawer', value: 'bottom' }
  ] as const;
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] =
    useState<(typeof PLACEMENTS)[number]['value']>('left');

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const changePlacement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnchorOrigin(event.target.value as (typeof PLACEMENTS)[number]['value']);
  };

  return (
    <>
      <Stack spacing={20}>
        <RadioGroup
          name="anchor-origin"
          value={anchorOrigin}
          onChange={changePlacement}
        >
          <Stack>
            {PLACEMENTS.map((placement) => (
              <Label content={placement.label}>
                <Radio value={placement.value} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Button onClick={openDrawer} fullWidth>
          Open Drawer
        </Button>
      </Stack>
      <SwipeableDrawer
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        anchorOrigin={anchorOrigin}
      >
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const SnapPoints: Story = {
  render: () => <SnapPointsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SnapPointsTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <SwipeableDrawer
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        anchorOrigin="bottom"
        snapPoints={[
          { threshold: 0.2, snapTo: 0 },
          { threshold: 0.8, snapTo: 0.5 },
          { threshold: 1, snapTo: 1 }
        ]}
      >
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const CustomizeDrawer: Story = {
  render: () => <CustomizeDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <SwipeableDrawer
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        size={400}
        BoxProps={{
          elevation: 20,
          style: { backgroundColor: 'surface-container-low' }
        }}
      >
        <SwipeableDrawerHeader>Drawer Header</SwipeableDrawerHeader>
        <SwipeableDrawerBody>Drawer Body</SwipeableDrawerBody>
        <SwipeableDrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </SwipeableDrawerFooter>
      </SwipeableDrawer>
    </>
  );
};
`.trim()
      }
    }
  }
};
