import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CircularSpeedDial, { CircularSpeedDialProps } from './CircularSpeedDial';
import CircularSpeedDialAction, {
  CircularSpeedDialActionProps
} from './CircularSpeedDialAction';
import { FileCopyIcon } from '@/components/icons/FileCopyIcon';
import { PrintIcon } from '@/components/icons/PrintIcon';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { TrashcanIcon } from '@/components/icons/TrashcanIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';
import { StyleType } from '@/types/style';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof CircularSpeedDial> = {
  component: CircularSpeedDial,
  argTypes: {
    anchorElRef: {
      description: 'anchor element의 reference',
      table: {
        type: { summary: 'React.RefObject<HTMLElement>' }
      }
    },
    children: {
      description: 'floating action buttons (CircularSpeedDialAction)'
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
    },
    variant: {
      description: 'circular speed dial 종류',
      table: {
        type: { summary: `'circular' | 'semi-circular' | 'quarter-circular'` },
        defaultValue: { summary: `'circular'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CircularSpeedDial>;

const ACTIONS = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <TrashcanIcon />, name: 'Delete' }
];
const ANCHOR_RADIUS = 38 / 2;

const Container = ({
  children,
  style
}: {
  children: React.ReactNode;
  style?: StyleType;
}) => (
  <Box
    style={{
      position: 'relative',
      width: '300px',
      height: '300px',
      border: '1px solid',
      borderColor: 'gray-200',
      ...style
    }}
  >
    {children}
  </Box>
);

const CircularSpeedDialWithButton = ({
  buttonStyle,
  speedDialProps,
  speedDialActionProps = { TooltipProps: { content: '' } }
}: {
  buttonStyle?: StyleType;
  speedDialProps?: Omit<
    CircularSpeedDialProps,
    'anchorElRef' | 'open' | 'children'
  >;
  speedDialActionProps?: CircularSpeedDialActionProps;
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

  let actionItems = ACTIONS;
  if (speedDialProps?.variant) {
    switch (speedDialProps.variant) {
      case 'semi-circular':
        actionItems = actionItems.slice(0, 4);
        break;
      case 'quarter-circular':
        actionItems = actionItems.slice(0, 3);
        break;
    }
  }

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
      <CircularSpeedDial
        anchorElRef={anchorElRef}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        {...speedDialProps}
      >
        {actionItems.map((action) => (
          <CircularSpeedDialAction
            key={action.name}
            centerIcon={action.icon}
            TooltipProps={{ ...TooltipProps, content: action.name }}
            {...restSpeedDialActionProps}
          />
        ))}
      </CircularSpeedDial>
    </>
  );
};

const CircularSpeedDialTemplate = ({ ...props }) => {
  return (
    <Container>
      <CircularSpeedDialWithButton
        buttonStyle={{
          position: 'absolute',
          top: `calc(50% - ${ANCHOR_RADIUS}px)`,
          left: `calc(50% - ${ANCHOR_RADIUS}px)`
        }}
        {...props}
      />
    </Container>
  );
};

const VariantsTemplate = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '500px'
      }}
    >
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-around',
          width: '100%'
        }}
      >
        <CircularSpeedDialWithButton speedDialProps={{ variant: 'circular' }} />
        <CircularSpeedDialWithButton
          speedDialProps={{ variant: 'semi-circular' }}
        />
        <CircularSpeedDialWithButton
          speedDialProps={{ variant: 'quarter-circular' }}
        />
      </Stack>
    </Container>
  );
};

const SemiCircularSpeedDialDirectionTemplate = () => {
  return (
    <Container>
      <CircularSpeedDialWithButton
        speedDialProps={{ variant: 'semi-circular', direction: 'right' }}
        buttonStyle={{
          position: 'absolute',
          left: `calc(50% + 70px - ${ANCHOR_RADIUS}px)`,
          top: `calc(50% - ${ANCHOR_RADIUS}px)`
        }}
      />
      <CircularSpeedDialWithButton
        speedDialProps={{ variant: 'semi-circular', direction: 'down' }}
        buttonStyle={{
          position: 'absolute',
          left: `calc(50% - ${ANCHOR_RADIUS}px)`,
          top: `calc(50% + 70px - ${ANCHOR_RADIUS}px)`
        }}
      />
      <CircularSpeedDialWithButton
        speedDialProps={{ variant: 'semi-circular', direction: 'left' }}
        buttonStyle={{
          position: 'absolute',
          left: `calc(50% - 70px - ${ANCHOR_RADIUS}px)`,
          top: `calc(50% - ${ANCHOR_RADIUS}px)`
        }}
      />
      <CircularSpeedDialWithButton
        speedDialProps={{ variant: 'semi-circular', direction: 'up' }}
        buttonStyle={{
          position: 'absolute',
          left: `calc(50% - ${ANCHOR_RADIUS}px)`,
          top: `calc(50% - 70px - ${ANCHOR_RADIUS}px)`
        }}
      />
    </Container>
  );
};

const QuarterCircularSpeedDialDirectionTemplate = () => {
  return (
    <Container>
      <CircularSpeedDialWithButton
        speedDialProps={{ variant: 'quarter-circular', direction: 'up-right' }}
        buttonStyle={{
          position: 'absolute',
          left: '10px',
          bottom: '10px'
        }}
      />
      <CircularSpeedDialWithButton
        speedDialProps={{
          variant: 'quarter-circular',
          direction: 'down-right'
        }}
        buttonStyle={{
          position: 'absolute',
          left: '10px',
          top: '10px'
        }}
      />
      <CircularSpeedDialWithButton
        speedDialProps={{
          variant: 'quarter-circular',
          direction: 'up-left'
        }}
        buttonStyle={{
          position: 'absolute',
          right: '10px',
          bottom: '10px'
        }}
      />
      <CircularSpeedDialWithButton
        speedDialProps={{ variant: 'quarter-circular', direction: 'down-left' }}
        buttonStyle={{
          position: 'absolute',
          right: '10px',
          top: '10px'
        }}
      />
    </Container>
  );
};

export const BasicCircularSpeedDial: Story = {
  render: (args) => <CircularSpeedDialTemplate {...args} />
};

export const Variants: Story = {
  render: (args) => <VariantsTemplate {...args} />
};

export const DistanceFromAnchor: Story = {
  render: (args) => (
    <CircularSpeedDialTemplate speedDialProps={{ offset: '24px' }} {...args} />
  )
};

export const SemiCircularDirection: Story = {
  render: (args) => <SemiCircularSpeedDialDirectionTemplate {...args} />
};

export const QuarterCircularDirection: Story = {
  render: (args) => <QuarterCircularSpeedDialDirectionTemplate {...args} />
};

export const CustomizeCircularSpeedDialAction: Story = {
  render: (args) => (
    <CircularSpeedDialTemplate
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
