import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Backdrop from './Backdrop';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof Backdrop> = {
  component: Backdrop,
  argTypes: {
    children: {
      description: 'backdrop 위에 위치할 콘텐츠'
    },
    invisible: {
      description: 'true인 경우, 배경이 딤 처리되지 않음 ',
      defaultValue: { summary: 'false' }
    },
    onClick: {
      description: 'backdrop을 클릭했을 때 호출되는 함수',
      table: {
        type: { summary: '(e: React.MouseEvent) => void' }
      }
    },
    open: {
      description: 'true이면, 배경이 딤 처리되면서 콘텐츠가 나타남'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

const BackdropTemplate = ({ ...args }) => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => setOpen(true);
  const handleBackdropClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Open Backdrop</Button>
      <Backdrop
        open={open}
        onClick={handleBackdropClick}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        {...args}
      >
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export const BasicBackdrop: Story = {
  render: (args) => BackdropTemplate(args)
};

export const Invisible: Story = {
  render: (args) => BackdropTemplate(args),
  args: {
    invisible: true
  }
};
