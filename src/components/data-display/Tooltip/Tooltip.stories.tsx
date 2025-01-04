import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  argTypes: {
    arrow: {
      description: 'tooltip 화살표 여부',
      defaultValue: { summary: 'false' }
    },
    children: {
      description: 'anchor 요소'
    },
    content: {
      description: 'tooltip 콘텐츠'
    },
    offset: {
      description: 'anchor와 tooltip 사이 거리',
      defaultValue: { summary: '14px' }
    },
    onClose: {
      description: `'backdropClick', 'mouseLeave', 'blur' 이벤트 발생 시 실행되는 함수`
    },
    onOpen: {
      description: `'anchorClick', 'mouseEnter', 'focus' 이벤트 발생 시 실행되는 함수`
    },
    open: {
      description: 'true이면, tooltip이 나타남'
    },
    placement: {
      description: 'tooltip의 위치',
      table: {
        type: {
          summary: `bottom-end | bottom-start | bottom | left-end | left-start | left | right-end | right-start | right| top-end| top-start | top`
        },
        defaultValue: { summary: `bottom` }
      }
    },
    triggers: {
      description: 'tooltip이 나타나는 것을 유발하는 이벤트',
      table: {
        type: {
          summary: `[hover | click | focus]`
        },
        defaultValue: { summary: `[hover, click, focus]` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const ControlledTooltipTemplate = ({ ...rest }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 300);
    return () => {
      clearTimeout(id);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (e: Event | React.SyntheticEvent) => {
    if (e.type === 'click') return;
    setOpen(false);
  };

  return (
    <Tooltip
      content={
        <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
          <span>Tooltip Contents</span>
          <CloseIcon
            size={20}
            color="white"
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(false)}
          />
        </Stack>
      }
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      triggers={['click']}
      {...rest}
    >
      <Button variant="outlined">Open Tooltip</Button>
    </Tooltip>
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
      <div
        style={{
          maxWidth: '600px',
          display: 'grid',
          gridGap: '10px',
          justifyItems: 'center',
          gridTemplateAreas: `'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'`
        }}
      >
        <div style={{ gridArea: 'top-start' }}>
          <Tooltip content="Tooltip Contents" placement="top-start" {...args}>
            <Button variant="outlined">top-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'top' }}>
          <Tooltip content="Tooltip Contents" placement="top" {...args}>
            <Button variant="outlined">top</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'top-end' }}>
          <Tooltip content="Tooltip Contents" placement="top-end" {...args}>
            <Button variant="outlined">top-end</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'bottom-start' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="bottom-start"
            {...args}
          >
            <Button variant="outlined">bottom-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'bottom' }}>
          <Tooltip content="Tooltip Contents" placement="bottom" {...args}>
            <Button variant="outlined">bottom</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'bottom-end' }}>
          <Tooltip content="Tooltip Contents" placement="bottom-end" {...args}>
            <Button variant="outlined">bottom-end</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'left-start' }}>
          <Tooltip content="Tooltip Contents" placement="left-start" {...args}>
            <Button variant="outlined">left-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'left' }}>
          <Tooltip content="Tooltip Contents" placement="left" {...args}>
            <Button variant="outlined">left</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'left-end' }}>
          <Tooltip content="Tooltip Contents" placement="left-end" {...args}>
            <Button variant="outlined">left-end</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'right-start' }}>
          <Tooltip content="Tooltip Contents" placement="right-start" {...args}>
            <Button variant="outlined">right-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'right' }}>
          <Tooltip content="Tooltip Contents" placement="right" {...args}>
            <Button variant="outlined">right</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'right-end' }}>
          <Tooltip content="Tooltip Contents" placement="right-end" {...args}>
            <Button variant="outlined">right-end</Button>
          </Tooltip>
        </div>
      </div>
    );
  }
};

export const ArrowTooltip: Story = {
  render: (args) => {
    return (
      <div
        style={{
          maxWidth: '600px',
          display: 'grid',
          gridGap: '10px',
          justifyItems: 'center',
          gridTemplateAreas: `'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'`
        }}
      >
        <div style={{ gridArea: 'top-start' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="top-start"
            arrow
            {...args}
          >
            <Button variant="outlined">top-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'top' }}>
          <Tooltip content="Tooltip Contents" placement="top" arrow {...args}>
            <Button variant="outlined">top</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'top-end' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="top-end"
            arrow
            {...args}
          >
            <Button variant="outlined">top-end</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'bottom-start' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="bottom-start"
            arrow
            {...args}
          >
            <Button variant="outlined">bottom-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'bottom' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="bottom"
            arrow
            {...args}
          >
            <Button variant="outlined">bottom</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'bottom-end' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="bottom-end"
            arrow
            {...args}
          >
            <Button variant="outlined">bottom-end</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'left-start' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="left-start"
            arrow
            {...args}
          >
            <Button variant="outlined">left-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'left' }}>
          <Tooltip content="Tooltip Contents" placement="left" arrow {...args}>
            <Button variant="outlined">left</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'left-end' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="left-end"
            arrow
            {...args}
          >
            <Button variant="outlined">left-end</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'right-start' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="right-start"
            arrow
            {...args}
          >
            <Button variant="outlined">right-start</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'right' }}>
          <Tooltip content="Tooltip Contents" placement="right" arrow {...args}>
            <Button variant="outlined">right</Button>
          </Tooltip>
        </div>
        <div style={{ gridArea: 'right-end' }}>
          <Tooltip
            content="Tooltip Contents"
            placement="right-end"
            arrow
            {...args}
          >
            <Button variant="outlined">right-end</Button>
          </Tooltip>
        </div>
      </div>
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
  render: (args) => <ControlledTooltipTemplate {...args} />
};

export const Customization: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Tooltip
          content="Tooltip Contents"
          style={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '5',
            fontSize: '15px',
            elevation: 5
          }}
          {...args}
        >
          <Button variant="outlined">Open Tooltip</Button>
        </Tooltip>
        <Tooltip
          content="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text"
          style={{ maxWidth: '300px' }}
          {...args}
        >
          <Button variant="outlined">Open Tooltip</Button>
        </Tooltip>
      </Stack>
    );
  }
};
