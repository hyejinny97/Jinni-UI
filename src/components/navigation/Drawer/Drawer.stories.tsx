import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '.';
import { Button } from '@/components/general/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  argTypes: {
    anchor: {
      description: 'drawer 위치',
      table: {
        type: {
          summary: `'left' | 'right' | 'top' | 'bottom'`
        },
        defaultValue: { summary: `'left'` }
      }
    },
    children: {
      description:
        'Drawer 내 DrawerContent 컴포넌트에 담겨질 요소 (DrawerHeader, DrawerBody, DrawerFooter 등)'
    },
    DrawerContentProps: {
      description: 'Drawer 내 DrawerContent 컴포넌트의 props',
      table: {
        type: {
          summary: `BoxProps`
        },
        defaultValue: { summary: `{ elevation: 15 }` }
      }
    },
    onClose: {
      description:
        '"escapeKeyDown", "backdropClick" 이벤트 발생 시 호출되는 함수'
    },
    open: {
      description: 'true이면, drawer가 나타남'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerTemplate = ({
  buttonContent,
  ...rest
}: {
  buttonContent?: string;
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
      <Button onClick={handleOpen}>{buttonContent || 'Open Drawer'}</Button>
      <Drawer open={open} onClose={handleClose} {...rest}>
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <Button
            variant="text"
            isSquareSize
            onClick={handleClose}
            style={{ position: 'absolute', right: '5px', top: '5px' }}
          >
            <CloseIcon />
          </Button>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={handleClose}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const BasicDrawer: Story = {
  render: (args) => <DrawerTemplate {...args} />
};

export const Placement: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DrawerTemplate anchor="left" buttonContent="anchor: left" {...args} />
      <DrawerTemplate anchor="right" buttonContent="anchor: right" {...args} />
      <DrawerTemplate anchor="top" buttonContent="anchor: top" {...args} />
      <DrawerTemplate
        anchor="bottom"
        buttonContent="anchor: bottom"
        {...args}
      />
    </Stack>
  )
};

export const Customization: Story = {
  render: (args) => (
    <DrawerTemplate
      DrawerContentProps={{ elevation: 20, style: { width: '500px' } }}
      {...args}
    />
  )
};
