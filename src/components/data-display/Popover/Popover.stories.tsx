import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof Popover> = {
  component: Popover,
  argTypes: {
    anchorElRef: {
      description:
        'anchor가 되는 HTML element의 reference로, popover의 위치를 결정해줌',
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
        type: { summary: 'anchorEl | anchorPosition' },
        defaultValue: { summary: 'anchorEl' }
      }
    },
    PopoverContentProps: {
      description: 'PopoverContent(=Box)에 적용되는 props',
      table: {
        type: { summary: 'BoxProps' },
        defaultValue: { summary: '{ elevation: 5, round: 4 }' }
      }
    },
    children: {
      description: 'popover의 콘텐츠'
    },
    onClose: {
      description: `'escapeKeydown', 'backdropClick' 이벤트 발생 시 호출되는 함수`
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
    }
  }
};

export default meta;
type Story = StoryObj<typeof Popover>;

const PopoverAnchorElTemplate = ({
  buttonContent,
  ...popoverProps
}: {
  buttonContent?: string;
}) => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button ref={anchorElRef} onClick={handleOpen}>
        {buttonContent || 'Open Popover'}
      </Button>
      <Popover
        anchorElRef={anchorElRef}
        open={open}
        onClose={handleClose}
        {...popoverProps}
      >
        Popover Content
      </Popover>
    </>
  );
};

const PopoverAnchorPositionTemplate = ({ ...popoverProps }) => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setOpen(true);
    setCoordinate(newCoordinate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p onContextMenu={handleContextMenu}>
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
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
        {...popoverProps}
      >
        Popover Content
      </Popover>
    </>
  );
};

export const BasicPopover: Story = {
  render: (args) => {
    return <PopoverAnchorElTemplate {...args} />;
  }
};

export const PopoverOrigin: Story = {
  render: (args) => {
    return (
      <Stack spacing={30}>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'left', vertical: 'top' }}
            buttonContent="H left / V top (Default)"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'left', vertical: 'center' }}
            buttonContent="H left / V center"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            buttonContent="H left / V bottom"
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'center', vertical: 'top' }}
            buttonContent="H center / V top"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'center', vertical: 'center' }}
            buttonContent="H center / V center"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            buttonContent="H center / V bottom"
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'right', vertical: 'top' }}
            buttonContent="H right / V top"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'right', vertical: 'center' }}
            buttonContent="H right / V center"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            buttonContent="H right / V bottom"
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 0, vertical: 20 }}
            buttonContent="H 0 / V 20"
            {...args}
          />
          <PopoverAnchorElTemplate
            popoverOrigin={{ horizontal: 50, vertical: 0 }}
            buttonContent="H 50 / V 0"
            {...args}
          />
        </Stack>
      </Stack>
    );
  }
};

export const AnchorOrigin: Story = {
  render: (args) => {
    return (
      <Stack spacing={30}>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            buttonContent="H left / V top"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
            buttonContent="H left / V center"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            buttonContent="H left / V bottom (Default)"
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            buttonContent="H center / V top"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
            buttonContent="H center / V center"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            buttonContent="H center / V bottom"
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            buttonContent="H right / V top"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
            buttonContent="H right / V center"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            buttonContent="H right / V bottom"
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 0, vertical: 20 }}
            buttonContent="H 0 / V 20"
            {...args}
          />
          <PopoverAnchorElTemplate
            anchorOrigin={{ horizontal: 50, vertical: 0 }}
            buttonContent="H 50 / V 0"
            {...args}
          />
        </Stack>
      </Stack>
    );
  }
};

export const AnchorPosition: Story = {
  render: (args) => {
    return <PopoverAnchorPositionTemplate {...args} />;
  }
};

export const Elevation: Story = {
  render: (args) => {
    return (
      <PopoverAnchorElTemplate
        PopoverContentProps={{
          elevation: 10,
          round: 'sm',
          style: { padding: '8px' }
        }}
        {...args}
      />
    );
  }
};

export const Customization: Story = {
  render: (args) => {
    return <PopoverAnchorElTemplate style={{ marginTop: '10px' }} {...args} />;
  }
};
