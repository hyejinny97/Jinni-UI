import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot
} from '@/components/data-display/Timeline';
import { ShoppingCartIcon } from '@/components/icons/ShoppingCartIcon';
import { LocalShippingIcon } from '@/components/icons/LocalShippingIcon';
import { BoxIcon } from '@/components/icons/BoxIcon';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { Stack } from '@/components/layout/Stack';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Switch } from '@/components/data-entry/Switch';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  argTypes: {
    alignment: {
      description: 'time axis를 기준으로 TimelineContent의 위치',
      table: {
        type: {
          summary: `'before' | 'after' | 'alternate' | 'alternate-reverse'`
        },
        defaultValue: { summary: `'after'` }
      }
    },
    children: {
      description: 'TimelineItem 컴포넌트들',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    orientation: {
      description: 'timeline 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'vertical'` }
      }
    },
    reverse: {
      description: 'true이면, 좌우(위아래)가 반전됨',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: `false` }
      }
    },
    showLastConnector: {
      description: 'true이면, 마지막 connector가 나타남',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: `false` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const ORDER_PROCESS = [
  {
    content: '1. Ordered',
    oppositeContent: 'May 13, 2024',
    icon: <ShoppingCartIcon />,
    status: 'completed'
  },
  {
    content: '2. Shipped',
    oppositeContent: 'June 20, 2024',
    icon: <LocalShippingIcon />,
    status: 'completed'
  },
  {
    content: '3. Out for delivery',
    oppositeContent: 'July 2, 2024',
    icon: <BoxIcon />,
    status: 'inProgress'
  },
  {
    content: '4. Estimated delivery date',
    oppositeContent: 'Aug 14, 2024',
    icon: <DateRangeIcon />,
    status: 'pending'
  }
];

const AlignmentTemplate = () => {
  const ORDER_PROCESS = [
    { content: '1. Ordered' },
    { content: '2. Shipped' },
    { content: '3. Out for delivery' },
    { content: '4. Estimated delivery date' }
  ];
  const ALIGNMENTS = [
    'before',
    'after',
    'alternate',
    'alternate-reverse'
  ] as const;
  const [align, setAlign] = useState<(typeof ALIGNMENTS)[number]>('before');
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);

  const changeAlign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(event.target.value as (typeof ALIGNMENTS)[number]);
  };
  const changeOrientation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontal(event.target.checked);
  };
  const changeReverse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReverse(event.target.checked);
  };

  return (
    <Stack spacing={30}>
      <Stack
        spacing={5}
        style={{
          padding: '6px 16px',
          backgroundColor: 'gray-50',
          borderRadius: '4px'
        }}
      >
        <RadioGroup name="alignment" value={align} onChange={changeAlign}>
          <Stack direction="row" spacing={5}>
            {ALIGNMENTS.map((alignment) => (
              <Label key={alignment} content={alignment}>
                <Radio value={alignment} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Stack direction="row" spacing={5}>
          <Label content="horizontal">
            <Switch
              value="horizontal"
              checked={horizontal}
              onChange={changeOrientation}
            />
          </Label>
          <Label content="reverse">
            <Switch
              value="reverse"
              checked={reverse}
              onChange={changeReverse}
            />
          </Label>
        </Stack>
      </Stack>
      <Timeline
        alignment={align}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        reverse={reverse}
        {...(horizontal && { style: { height: '100px' } })}
      >
        {ORDER_PROCESS.map(({ content }) => {
          return (
            <TimelineItem key={content}>
              <TimelineContent
                {...(horizontal && { style: { marginRight: '15px' } })}
              >
                {content}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Stack>
  );
};

const OppositeContentTemplate = () => {
  const ORDER_PROCESS = [
    {
      content: '1. Ordered',
      oppositeContent: 'May 13, 2024'
    },
    {
      content: '2. Shipped',
      oppositeContent: 'June 20, 2024'
    },
    {
      content: '3. Out for delivery',
      oppositeContent: 'July 2, 2024'
    },
    {
      content: '4. Estimated delivery date',
      oppositeContent: 'Aug 14, 2024'
    }
  ];
  const ALIGNMENTS = [
    'before',
    'after',
    'alternate',
    'alternate-reverse'
  ] as const;
  const [align, setAlign] = useState<(typeof ALIGNMENTS)[number]>('before');
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);

  const changeAlign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(event.target.value as (typeof ALIGNMENTS)[number]);
  };
  const changeOrientation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontal(event.target.checked);
  };
  const changeReverse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReverse(event.target.checked);
  };

  return (
    <Stack spacing={30}>
      <Stack
        spacing={5}
        style={{
          padding: '6px 16px',
          backgroundColor: 'gray-50',
          borderRadius: '4px'
        }}
      >
        <RadioGroup name="alignment" value={align} onChange={changeAlign}>
          <Stack direction="row" spacing={5}>
            {ALIGNMENTS.map((alignment) => (
              <Label key={alignment} content={alignment}>
                <Radio value={alignment} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Stack direction="row" spacing={5}>
          <Label content="horizontal">
            <Switch
              value="horizontal"
              checked={horizontal}
              onChange={changeOrientation}
            />
          </Label>
          <Label content="reverse">
            <Switch
              value="reverse"
              checked={reverse}
              onChange={changeReverse}
            />
          </Label>
        </Stack>
      </Stack>
      <Timeline
        alignment={align}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        reverse={reverse}
        {...(horizontal && { style: { height: '100px' } })}
      >
        {ORDER_PROCESS.map(({ content, oppositeContent }) => {
          return (
            <TimelineItem key={content}>
              <TimelineContent
                {...(horizontal && { style: { marginRight: '15px' } })}
              >
                {content}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineOppositeContent
                style={{
                  color: 'gray-400',
                  fontSize: '12px',
                  ...(horizontal && { marginRight: '15px' })
                }}
              >
                {oppositeContent}
              </TimelineOppositeContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Stack>
  );
};

const CustomizeTimelineTemplate = () => {
  const ORDER_PROCESS = [
    {
      content: '1. Ordered',
      oppositeContent: 'May 13, 2024',
      icon: <ShoppingCartIcon color="white" />,
      status: 'completed'
    },
    {
      content: '2. Shipped',
      oppositeContent: 'June 20, 2024',
      icon: <LocalShippingIcon color="white" />,
      status: 'completed'
    },
    {
      content: '3. Out for delivery',
      oppositeContent: 'July 2, 2024',
      icon: <BoxIcon color="primary" />,
      status: 'inProgress'
    },
    {
      content: '4. Estimated delivery date',
      oppositeContent: 'Aug 14, 2024',
      icon: <DateRangeIcon color="white" />,
      status: 'pending'
    }
  ];

  return (
    <Timeline style={{ width: '500px' }}>
      {ORDER_PROCESS.map(({ content, oppositeContent, icon, status }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot
                color={
                  status === 'completed' || status === 'inProgress'
                    ? 'primary'
                    : 'gray-400'
                }
                variant={status === 'inProgress' ? 'outlined' : 'filled'}
              >
                {icon}
              </TimelineDot>
              <TimelineConnector
                color={status === 'completed' ? 'primary' : 'gray-400'}
                variant={status === 'inProgress' ? 'dotted' : 'solid'}
              />
            </TimelineSeparator>
            <TimelineOppositeContent
              style={{ color: 'gray-400', fontSize: '12px' }}
            >
              {oppositeContent}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export const BasicTimeline: Story = {
  render: (args) => (
    <Timeline style={{ width: '500px' }} {...args}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const Orientation: Story = {
  render: (args) => (
    <Timeline orientation="horizontal" style={{ height: '100px' }} {...args}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ marginRight: '15px' }}>
              {content}
            </TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const Reverse: Story = {
  render: (args) => (
    <Timeline reverse style={{ width: '500px' }} {...args}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const Alignment: Story = {
  render: () => <AlignmentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AlignmentTemplate = () => {
  const ORDER_PROCESS = [
    { content: '1. Ordered' },
    { content: '2. Shipped' },
    { content: '3. Out for delivery' },
    { content: '4. Estimated delivery date' }
  ];
  const ALIGNMENTS = [
    'before',
    'after',
    'alternate',
    'alternate-reverse'
  ] as const;
  const [align, setAlign] = useState<(typeof ALIGNMENTS)[number]>('before');
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);

  const changeAlign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(event.target.value as (typeof ALIGNMENTS)[number]);
  };
  const changeOrientation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontal(event.target.checked);
  };
  const changeReverse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReverse(event.target.checked);
  };

  return (
    <Stack spacing={30}>
      <Stack
        spacing={5}
        style={{
          padding: '6px 16px',
          backgroundColor: 'gray-50',
          borderRadius: '4px'
        }}
      >
        <RadioGroup name="alignment" value={align} onChange={changeAlign}>
          <Stack direction="row" spacing={5}>
            {ALIGNMENTS.map((alignment) => (
              <Label key={alignment} content={alignment}>
                <Radio value={alignment} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Stack direction="row" spacing={5}>
          <Label content="horizontal">
            <Switch
              value="horizontal"
              checked={horizontal}
              onChange={changeOrientation}
            />
          </Label>
          <Label content="reverse">
            <Switch
              value="reverse"
              checked={reverse}
              onChange={changeReverse}
            />
          </Label>
        </Stack>
      </Stack>
      <Timeline
        alignment={align}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        reverse={reverse}
        {...(horizontal && { style: { height: '100px' } })}
      >
        {ORDER_PROCESS.map(({ content }) => {
          return (
            <TimelineItem key={content}>
              <TimelineContent
                {...(horizontal && { style: { marginRight: '15px' } })}
              >
                {content}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const OppositeContent: Story = {
  render: () => <OppositeContentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OppositeContentTemplate = () => {
  const ORDER_PROCESS = [
    {
      content: '1. Ordered',
      oppositeContent: 'May 13, 2024'
    },
    {
      content: '2. Shipped',
      oppositeContent: 'June 20, 2024'
    },
    {
      content: '3. Out for delivery',
      oppositeContent: 'July 2, 2024'
    },
    {
      content: '4. Estimated delivery date',
      oppositeContent: 'Aug 14, 2024'
    }
  ];
  const ALIGNMENTS = [
    'before',
    'after',
    'alternate',
    'alternate-reverse'
  ] as const;
  const [align, setAlign] = useState<(typeof ALIGNMENTS)[number]>('before');
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);

  const changeAlign = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(event.target.value as (typeof ALIGNMENTS)[number]);
  };
  const changeOrientation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontal(event.target.checked);
  };
  const changeReverse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReverse(event.target.checked);
  };

  return (
    <Stack spacing={30}>
      <Stack
        spacing={5}
        style={{
          padding: '6px 16px',
          backgroundColor: 'gray-50',
          borderRadius: '4px'
        }}
      >
        <RadioGroup name="alignment" value={align} onChange={changeAlign}>
          <Stack direction="row" spacing={5}>
            {ALIGNMENTS.map((alignment) => (
              <Label key={alignment} content={alignment}>
                <Radio value={alignment} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Stack direction="row" spacing={5}>
          <Label content="horizontal">
            <Switch
              value="horizontal"
              checked={horizontal}
              onChange={changeOrientation}
            />
          </Label>
          <Label content="reverse">
            <Switch
              value="reverse"
              checked={reverse}
              onChange={changeReverse}
            />
          </Label>
        </Stack>
      </Stack>
      <Timeline
        alignment={align}
        orientation={horizontal ? 'horizontal' : 'vertical'}
        reverse={reverse}
        {...(horizontal && { style: { height: '100px' } })}
      >
        {ORDER_PROCESS.map(({ content, oppositeContent }) => {
          return (
            <TimelineItem key={content}>
              <TimelineContent
                {...(horizontal && { style: { marginRight: '15px' } })}
              >
                {content}
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineOppositeContent
                style={{
                  color: 'gray-400',
                  fontSize: '12px',
                  ...(horizontal && { marginRight: '15px' })
                }}
              >
                {oppositeContent}
              </TimelineOppositeContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const LeftTimelinePosition: Story = {
  render: (args) => (
    <Timeline
      style={{
        width: '500px',
        padding: '16px 0',
        backgroundColor: 'gray-50',
        borderRadius: '4px'
      }}
      {...args}
    >
      {ORDER_PROCESS.map(({ content, oppositeContent }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineOppositeContent
              style={{
                flex: '0.25',
                color: 'gray-400',
                fontSize: '12px'
              }}
            >
              {oppositeContent}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const RightTimelinePosition: Story = {
  render: (args) => (
    <Timeline
      style={{
        width: '500px',
        padding: '16px 0',
        backgroundColor: 'gray-50',
        borderRadius: '4px'
      }}
      {...args}
    >
      {ORDER_PROCESS.map(({ content, oppositeContent }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ flex: '0.4' }}>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineOppositeContent
              style={{
                color: 'gray-400',
                fontSize: '12px'
              }}
            >
              {oppositeContent}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const DotCustomization: Story = {
  render: (args) => (
    <Timeline style={{ width: '500px' }} {...args}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="yellow-400" />
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const ConnectorCustomization: Story = {
  render: (args) => (
    <Timeline style={{ width: '500px' }} {...args}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector variant="dashed" color="primary" />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const ShowLastConnector: Story = {
  render: (args) => (
    <Timeline showLastConnector style={{ width: '500px' }} {...args}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  )
};

export const CustomizeTimeline: Story = {
  render: () => <CustomizeTimelineTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeTimelineTemplate = () => {
  const ORDER_PROCESS = [
    {
      content: '1. Ordered',
      oppositeContent: 'May 13, 2024',
      icon: <ShoppingCartIcon color="white" />,
      status: 'completed'
    },
    {
      content: '2. Shipped',
      oppositeContent: 'June 20, 2024',
      icon: <LocalShippingIcon color="white" />,
      status: 'completed'
    },
    {
      content: '3. Out for delivery',
      oppositeContent: 'July 2, 2024',
      icon: <BoxIcon color="primary" />,
      status: 'inProgress'
    },
    {
      content: '4. Estimated delivery date',
      oppositeContent: 'Aug 14, 2024',
      icon: <DateRangeIcon color="white" />,
      status: 'pending'
    }
  ];

  return (
    <Timeline style={{ width: '500px' }}>
      {ORDER_PROCESS.map(({ content, oppositeContent, icon, status }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent>{content}</TimelineContent>
            <TimelineSeparator>
              <TimelineDot
                color={
                  status === 'completed' || status === 'inProgress'
                    ? 'primary'
                    : 'gray-400'
                }
                variant={status === 'inProgress' ? 'outlined' : 'filled'}
              >
                {icon}
              </TimelineDot>
              <TimelineConnector
                color={status === 'completed' ? 'primary' : 'gray-400'}
                variant={status === 'inProgress' ? 'dotted' : 'solid'}
              />
            </TimelineSeparator>
            <TimelineOppositeContent
              style={{ color: 'gray-400', fontSize: '12px' }}
            >
              {oppositeContent}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};`.trim()
      }
    }
  }
};
