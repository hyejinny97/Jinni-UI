import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Button from '@/components/Button';
import ButtonBase from '@/components/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';

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
      id="jinni-controlled-tooltip"
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
      <Button variant="outlined" aria-describedby="jinni-controlled-tooltip">
        Open Tooltip
      </Button>
    </Tooltip>
  );
};

const ScaleFade = ({ ref, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      {...props}
    />
  );
};

const ScaleFadeWithDelay = ({ ref, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { delay: 0.5 } }}
      {...props}
    />
  );
};

export const BasicTooltip: Story = {
  render: () => {
    return (
      <Tooltip id="jinni-basic-tooltip" content="Tooltip Contents">
        <Button variant="outlined" aria-describedby="jinni-basic-tooltip">
          Open Tooltip
        </Button>
      </Tooltip>
    );
  }
};

export const TooltipPosition: Story = {
  render: () => {
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
            id={`${placement}-position-tooltip`}
            content="Tooltip Contents"
            placement={placement}
          >
            <Button
              variant="outlined"
              style={{ gridArea: placement }}
              aria-describedby={`${placement}-position-tooltip`}
            >
              {placement}
            </Button>
          </Tooltip>
        ))}
      </Grid>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Grid
  spacing={20}
  style={{
    maxWidth: '600px',
    justifyItems: 'center',
    gridTemplateAreas: \`'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'\`
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
      id={\`\${placement}-position-tooltip\`}
      content="Tooltip Contents"
      placement={placement}
      
    >
      <Button
        variant="outlined"
        style={{ gridArea: placement }}
        aria-describedby={\`\${placement}-position-tooltip\`}
      >
        {placement}
      </Button>
    </Tooltip>
  ))}
</Grid>`.trim()
      }
    }
  }
};

export const ArrowTooltip: Story = {
  render: () => {
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
            id={`${placement}-position-arrow-tooltip`}
            content="Tooltip Contents"
            placement={placement}
            arrow
          >
            <Button
              variant="outlined"
              style={{ gridArea: placement }}
              aria-describedby={`${placement}-position-arrow-tooltip`}
            >
              {placement}
            </Button>
          </Tooltip>
        ))}
      </Grid>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Grid
  spacing={20}
  style={{
    maxWidth: '600px',
    justifyItems: 'center',
    gridTemplateAreas: \`'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'\`
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
      id={\`\${placement}-position-arrow-tooltip\`}
      content="Tooltip Contents"
      placement={placement}
      arrow
      
    >
      <Button
        variant="outlined"
        style={{ gridArea: placement }}
        aria-describedby={\`\${placement}-position-arrow-tooltip\`}
      >
        {placement}
      </Button>
    </Tooltip>
  ))}
</Grid>`.trim()
      }
    }
  }
};

export const DistanceFromAnchor: Story = {
  render: () => {
    return (
      <Tooltip id="offset-tooltip" content="Tooltip Contents" offset={0}>
        <Button variant="outlined" aria-describedby="offset-tooltip">
          Open Tooltip
        </Button>
      </Tooltip>
    );
  }
};

export const Triggers: Story = {
  render: () => {
    return (
      <Stack direction="row" spacing={20}>
        <Tooltip
          id="click-trigger-tooltip"
          content="Tooltip Contents"
          triggers={['click']}
        >
          <Button variant="outlined" aria-describedby="click-trigger-tooltip">
            Triggers: click
          </Button>
        </Tooltip>
        <Tooltip
          id="hover-trigger-tooltip"
          content="Tooltip Contents"
          triggers={['hover']}
        >
          <Button variant="outlined" aria-describedby="hover-trigger-tooltip">
            Triggers: hover
          </Button>
        </Tooltip>
        <Tooltip
          id="focus-trigger-tooltip"
          content="Tooltip Contents"
          triggers={['focus']}
        >
          <Button variant="outlined" aria-describedby="focus-trigger-tooltip">
            Triggers: focus
          </Button>
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
      id="controlled-tooltip"
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
      <Button variant="outlined" aria-describedby="controlled-tooltip">
        Open Tooltip
      </Button>
    </Tooltip>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeTooltip: Story = {
  render: () => {
    return (
      <Tooltip
        id="jinni-customize-tooltip"
        content="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
        BoxProps={{
          elevation: 5,
          style: {
            maxWidth: '300px',
            backgroundColor: 'surface-container',
            color: 'on-surface'
          }
        }}
      >
        <Button variant="outlined" aria-describedby="jinni-customize-tooltip">
          Open Tooltip
        </Button>
      </Tooltip>
    );
  }
};

export const Transition: Story = {
  render: () => {
    return (
      <Tooltip
        id="jinni-transition"
        content="Tooltip Contents"
        WrapperComponent={AnimatePresence}
        TransitionComponent={ScaleFade}
      >
        <Button variant="outlined" aria-describedby="jinni-transition">
          Open Tooltip
        </Button>
      </Tooltip>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';

const ScaleFade = ({ ref, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      {...props}
    />
  );
};
        
<Tooltip
  id="jinni-transition"
  content="Tooltip Contents"
  WrapperComponent={AnimatePresence}
  TransitionComponent={ScaleFade}
>
  <Button variant="outlined" aria-describedby="jinni-transition">
    Open Tooltip
  </Button>
</Tooltip>        
`.trim()
      }
    }
  }
};

export const ShowingHidingDelay: Story = {
  render: () => {
    return (
      <Tooltip
        id="jinni-delay"
        content="Tooltip Contents"
        WrapperComponent={AnimatePresence}
        TransitionComponent={ScaleFadeWithDelay}
      >
        <Button variant="outlined" aria-describedby="jinni-delay">
          Open Tooltip
        </Button>
      </Tooltip>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
        
const ScaleFadeWithDelay = ({ ref, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { delay: 0.5 } }}
      {...props}
    />
  );
};
        
<Tooltip
  id="jinni-delay"
  content="Tooltip Contents"
  WrapperComponent={AnimatePresence}
  TransitionComponent={ScaleFadeWithDelay}
>
  <Button variant="outlined" aria-describedby="jinni-delay">
    Open Tooltip
  </Button>
</Tooltip>    
`.trim()
      }
    }
  }
};
