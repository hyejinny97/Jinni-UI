import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LinearSpeedDial, { LinearSpeedDialProps } from './LinearSpeedDial';
import LinearSpeedDialAction, {
  LinearSpeedDialActionProps
} from './LinearSpeedDialAction';
import { FileCopyIcon } from '@/components/icons/FileCopyIcon';
import { PrintIcon } from '@/components/icons/PrintIcon';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';
import { StyleType } from '@/types/style';

const meta: Meta<typeof LinearSpeedDial> = {
  component: LinearSpeedDial,
  argTypes: {
    anchorElRef: {
      description: 'anchor element의 reference',
      table: {
        type: { summary: 'React.RefObject<HTMLElement>' }
      }
    },
    children: {
      description: 'floating action buttons (LinearSpeedDialAction)'
    },
    direction: {
      description: 'FABs가 나타나는 위치',
      table: {
        type: { summary: `'down' | 'left' | 'right' | 'up'` },
        defaultValue: { summary: `'up'` }
      }
    },
    offset: {
      description: 'anchor와 speed dial 사이 거리',
      table: {
        type: { summary: `string` },
        defaultValue: { summary: `'16px'` }
      }
    },
    onClose: {
      description: 'close를 요청할 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: object, reason: "backgroundClick" | "blur" | "mouseLeave" | "escapeKeyDown") => void`
        }
      }
    },
    onOpen: {
      description: 'open을 요청할 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: object, reason: "anchorClick" | "focus" | "mouseEnter") => void`
        }
      }
    },
    open: {
      description: 'true이면, FABs가 나타남'
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinearSpeedDial>;

const ACTIONS = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' }
];

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    style={{
      position: 'relative',
      width: '300px',
      height: '300px',
      border: '1px solid',
      borderColor: 'gray-200'
    }}
  >
    {children}
  </Box>
);

const LinearSpeedDialWithButton = ({
  buttonStyle,
  speedDialProps,
  speedDialActionProps = { TooltipProps: { content: '' } }
}: {
  buttonStyle?: StyleType;
  speedDialProps?: Omit<
    LinearSpeedDialProps,
    'anchorElRef' | 'open' | 'children'
  >;
  speedDialActionProps?: LinearSpeedDialActionProps;
}) => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { TooltipProps, ...restSpeedDialActionProps } = speedDialActionProps;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        centerIcon={<AddIcon />}
        elevation={5}
        size="lg"
        shape="pill"
        isSquareSize
        style={{
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s',
          ...buttonStyle
        }}
      />
      <LinearSpeedDial
        anchorElRef={anchorElRef}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        {...speedDialProps}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            centerIcon={action.icon}
            TooltipProps={{ ...TooltipProps, content: action.name }}
            {...restSpeedDialActionProps}
          />
        ))}
      </LinearSpeedDial>
    </>
  );
};

const LinearSpeedDialTemplate = ({ ...props }) => {
  return (
    <Container>
      <LinearSpeedDialWithButton
        buttonStyle={{
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
        {...props}
      />
    </Container>
  );
};

const LinearSpeedDialDirectionTemplate = () => {
  return (
    <Container>
      <LinearSpeedDialWithButton
        speedDialProps={{ direction: 'right' }}
        buttonStyle={{ position: 'absolute', left: '10px', top: '10px' }}
      />
      <LinearSpeedDialWithButton
        speedDialProps={{ direction: 'down' }}
        buttonStyle={{ position: 'absolute', right: '10px', top: '10px' }}
      />
      <LinearSpeedDialWithButton
        speedDialProps={{ direction: 'left' }}
        buttonStyle={{ position: 'absolute', right: '10px', bottom: '10px' }}
      />
      <LinearSpeedDialWithButton
        speedDialProps={{ direction: 'up' }}
        buttonStyle={{ position: 'absolute', left: '10px', bottom: '10px' }}
      />
    </Container>
  );
};

export const BasicLinearSpeedDial: Story = {
  render: (args) => <LinearSpeedDialTemplate {...args} />
};

export const DistanceFromAnchor: Story = {
  render: (args) => (
    <LinearSpeedDialTemplate speedDialProps={{ offset: '24px' }} {...args} />
  )
};

export const Direction: Story = {
  render: (args) => <LinearSpeedDialDirectionTemplate {...args} />
};

export const CustomizeLinearSpeedDialAction: Story = {
  render: (args) => (
    <LinearSpeedDialTemplate
      speedDialActionProps={{
        TooltipProps: {
          arrow: true
        },
        size: 'lg',
        variant: 'outlined',
        elevation: 0,
        color: 'primary'
      }}
      {...args}
    />
  )
};
