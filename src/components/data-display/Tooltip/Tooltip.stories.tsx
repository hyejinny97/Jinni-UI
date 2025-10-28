import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { Motion } from '@/components/motion/Motion';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  argTypes: {
    arrow: {
      description: 'tooltip 화살표 여부'
    },
    BoxProps: {
      description: 'Box 컴포넌트에 적용되는 props',
      table: {
        type: {
          summary: `BoxProps`
        }
      }
    },
    children: {
      description: 'anchor 요소'
    },
    content: {
      description: 'tooltip 콘텐츠'
    },
    enterDelay: {
      description: 'tooltip이 나타날 때까지 delay 되는 시간 (단위: ms)',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `0` }
      }
    },
    leaveDelay: {
      description: 'tooltip이 사라질 때까지 delay 되는 시간 (단위: ms)',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `0` }
      }
    },
    offset: {
      description: 'anchor와 tooltip 사이 거리',
      defaultValue: { summary: '14' }
    },
    onClose: {
      description: `triggers prop에 의한 close 이벤트 발생 시 실행되는 함수`,
      table: {
        type: { summary: `(event: React.SyntheticEvent) => void` }
      }
    },
    onOpen: {
      description: `triggers prop에 의한 open 이벤트 발생 시 실행되는 함수`,
      table: {
        type: { summary: `(event: React.SyntheticEvent) => void` }
      }
    },
    open: {
      description: 'true이면, tooltip이 나타남'
    },
    placement: {
      description: 'tooltip의 위치',
      table: {
        type: {
          summary: `'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end' | 'right-start' | 'right' | 'right-end'`
        },
        defaultValue: { summary: `'bottom'` }
      }
    },
    TransitionComponent: {
      description: `transition 컴포넌트`,
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `ScaleFade` }
      }
    },
    triggers: {
      description: 'tooltip의 open을 유발하는 이벤트 종류',
      table: {
        type: {
          summary: `Array<'hover' | 'click' | 'focus'>`
        },
        defaultValue: { summary: `['hover', 'click', 'focus']` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const ControlledTooltipTemplate = () => {
  const [open, setOpen] = useState(false);

  const openTooltip = () => {
    setOpen(true);
  };
  const closeTooltip = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      content={
        <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
          Tooltip Contents
          <ButtonBase
            onClick={closeTooltip}
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon size={13} color="white" />
          </ButtonBase>
        </Stack>
      }
      open={open}
      onOpen={openTooltip}
      onClose={closeTooltip}
      triggers={['click']}
    >
      <Button variant="outlined">Open Tooltip</Button>
    </Tooltip>
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

export const BasicTooltip: Story = {
  render: (args) => {
    return (
      <Tooltip content="Tooltip Contents" {...args}>
        <Button variant="outlined">Open Tooltip</Button>
      </Tooltip>
    );
  }
};

export const TooltipPosition: Story = {
  render: (args) => {
    return (
      <Grid
        spacing={20}
        style={{
          maxWidth: '600px',
          justifyItems: 'center',
          gridTemplateAreas: `'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'`
        }}
      >
        {(
          [
            'top-start',
            'top',
            'top-end',
            'bottom-start',
            'bottom',
            'bottom-end',
            'left-start',
            'left',
            'left-end',
            'right-start',
            'right',
            'right-end'
          ] as const
        ).map((placement) => (
          <Tooltip
            key={placement}
            content="Tooltip Contents"
            placement={placement}
            {...args}
          >
            <Button variant="outlined" style={{ gridArea: placement }}>
              {placement}
            </Button>
          </Tooltip>
        ))}
      </Grid>
    );
  }
};

export const ArrowTooltip: Story = {
  render: (args) => {
    return (
      <Grid
        spacing={20}
        style={{
          maxWidth: '600px',
          justifyItems: 'center',
          gridTemplateAreas: `'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'`
        }}
      >
        {(
          [
            'top-start',
            'top',
            'top-end',
            'bottom-start',
            'bottom',
            'bottom-end',
            'left-start',
            'left',
            'left-end',
            'right-start',
            'right',
            'right-end'
          ] as const
        ).map((placement) => (
          <Tooltip
            key={placement}
            content="Tooltip Contents"
            placement={placement}
            arrow
            {...args}
          >
            <Button variant="outlined" style={{ gridArea: placement }}>
              {placement}
            </Button>
          </Tooltip>
        ))}
      </Grid>
    );
  }
};

export const DistanceFromAnchor: Story = {
  render: (args) => {
    return (
      <Tooltip content="Tooltip Contents" offset={0} {...args}>
        <Button variant="outlined">Open Tooltip</Button>
      </Tooltip>
    );
  }
};

export const Triggers: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Tooltip content="Tooltip Contents" triggers={['click']} {...args}>
          <Button variant="outlined">Triggers: click</Button>
        </Tooltip>
        <Tooltip content="Tooltip Contents" triggers={['hover']} {...args}>
          <Button variant="outlined">Triggers: hover</Button>
        </Tooltip>
        <Tooltip content="Tooltip Contents" triggers={['focus']} {...args}>
          <Button variant="outlined">Triggers: focus</Button>
        </Tooltip>
      </Stack>
    );
  }
};

export const ControlledTooltip: Story = {
  render: () => <ControlledTooltipTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTooltipTemplate = () => {
  const [open, setOpen] = useState(false);

  const openTooltip = () => {
    setOpen(true);
  };
  const closeTooltip = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      content={
        <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
          Tooltip Contents
          <ButtonBase
            onClick={closeTooltip}
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon size={13} color="white" />
          </ButtonBase>
        </Stack>
      }
      open={open}
      onOpen={openTooltip}
      onClose={closeTooltip}
      triggers={['click']}
    >
      <Button variant="outlined">Open Tooltip</Button>
    </Tooltip>
  );
};`.trim()
      }
    }
  }
};

export const ShowingHidingDelay: Story = {
  render: (args) => {
    return (
      <Tooltip
        content="Tooltip Contents"
        enterDelay={300}
        leaveDelay={500}
        {...args}
      >
        <Button variant="outlined">Open Tooltip</Button>
      </Tooltip>
    );
  }
};

export const CustomizeTooltip: Story = {
  render: (args) => {
    return (
      <Tooltip
        content="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
        BoxProps={{
          elevation: 5,
          style: {
            maxWidth: '300px',
            backgroundColor: 'white',
            color: 'black'
          }
        }}
        {...args}
      >
        <Button variant="outlined">Open Tooltip</Button>
      </Tooltip>
    );
  }
};

export const CustomizeTransition: Story = {
  render: (args) => {
    return (
      <Tooltip content="Tooltip Contents" TransitionComponent={Scale} {...args}>
        <Button variant="outlined">Open Tooltip</Button>
      </Tooltip>
    );
  },
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

const TransitionCustomization = () => {
  return (
    <Tooltip content="Tooltip Contents" TransitionComponent={Scale}>
      <Button variant="outlined">Open Tooltip</Button>
    </Tooltip>
  );
};`.trim()
      }
    }
  }
};
