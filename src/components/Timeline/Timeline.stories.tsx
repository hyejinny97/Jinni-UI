import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Timeline from '@/components/Timeline';
import TimelineItem from '@/components/TimelineItem';
import TimelineContent from '@/components/TimelineContent';
import TimelineOppositeContent from '@/components/TimelineOppositeContent';
import TimelineSeparator from '@/components/TimelineSeparator';
import TimelineConnector from '@/components/TimelineConnector';
import TimelineDot from '@/components/TimelineDot';
import { ShoppingCartIcon } from '@/components/icons/ShoppingCartIcon';
import { LocalShippingIcon } from '@/components/icons/LocalShippingIcon';
import { BoxIcon } from '@/components/icons/BoxIcon';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { Stack } from '@/components/layout/Stack';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Switch } from '@/components/data-entry/Switch';
import { Label } from '@/components/data-entry/Label';
import { Text } from '@/components/general/Text';
import { ButtonBase } from '@/components/general/ButtonBase';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';

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
          backgroundColor: 'surface-container',
          color: 'on-surface',
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
          backgroundColor: 'surface-container',
          color: 'on-surface',
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
      icon: <ShoppingCartIcon color="on-primary" />,
      status: 'completed'
    },
    {
      content: '2. Shipped',
      oppositeContent: 'June 20, 2024',
      icon: <LocalShippingIcon color="on-primary" />,
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
            <TimelineContent>
              <Text
                className="typo-title-medium"
                style={{ lineHeight: '36px' }}
                noMargin
              >
                {content}
              </Text>
            </TimelineContent>
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
            <TimelineOppositeContent>
              <Text
                className="typo-label-medium"
                style={{ lineHeight: '36px', color: 'gray-400' }}
                noMargin
              >
                {oppositeContent}
              </Text>
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const TimelineWithCollapsedContentTemplate = () => {
  const ORDER_PROCESS = [
    {
      id: 1,
      title: '1. Ordered',
      date: 'May 13, 2024',
      icon: <ShoppingCartIcon />,
      status: 'completed'
    },
    {
      id: 2,
      title: '2. Shipped',
      date: 'June 20, 2024',
      icon: <LocalShippingIcon />,
      status: 'completed'
    },
    {
      id: 3,
      title: '3. Out for delivery',
      date: 'July 2, 2024',
      icon: <BoxIcon />,
      status: 'inProgress'
    },
    {
      id: 4,
      title: '4. Estimated delivery date',
      date: 'Aug 14, 2024',
      icon: <DateRangeIcon />,
      status: 'pending'
    }
  ];

  const [collapsedItems, setCollapsedItems] = useState<Set<number>>(
    new Set(ORDER_PROCESS.map((val) => val.id))
  );

  const toggle = (id: number) => {
    const newCollapsedItems = new Set(collapsedItems);
    if (collapsedItems.has(id)) newCollapsedItems.delete(id);
    else newCollapsedItems.add(id);
    setCollapsedItems(newCollapsedItems);
  };

  return (
    <Timeline style={{ width: '600px' }}>
      {ORDER_PROCESS.map(({ id, title, date }) => {
        const showContent = !collapsedItems.has(id);
        return (
          <TimelineItem key={id}>
            <TimelineContent>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text className="typo-title-medium" noMargin>
                  {title}
                </Text>
                <ButtonBase
                  onClick={() => toggle(id)}
                  style={{
                    display: 'inline-flex',
                    padding: '3px',
                    borderRadius: '50%'
                  }}
                >
                  {showContent ? (
                    <ArrowUpIcon color="on-surface-variant" />
                  ) : (
                    <ArrowDownIcon color="on-surface-variant" />
                  )}
                </ButtonBase>
              </Stack>
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <Text
                      className="typo-body-medium"
                      noMargin
                      style={{ marginBottom: '16px' }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni itaque ipsam tenetur cupiditate accusantium esse
                      vitae provident autem asperiores quae!
                    </Text>
                  </motion.div>
                )}
              </AnimatePresence>
            </TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineOppositeContent
              style={{ color: 'gray-400', fontSize: '12px' }}
            >
              {date}
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
          backgroundColor: 'surface-container',
          color: 'on-surface',
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
          backgroundColor: 'surface-container',
          color: 'on-surface',
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
        backgroundColor: 'surface-container',
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
        backgroundColor: 'surface-container',
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
      icon: <ShoppingCartIcon color="on-primary" />,
      status: 'completed'
    },
    {
      content: '2. Shipped',
      oppositeContent: 'June 20, 2024',
      icon: <LocalShippingIcon color="on-primary" />,
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
            <TimelineContent>
              <Text
                className="typo-title-medium"
                style={{ lineHeight: '36px' }}
                noMargin
              >
                {content}
              </Text>
            </TimelineContent>
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
            <TimelineOppositeContent>
              <Text
                className="typo-label-medium"
                style={{ lineHeight: '36px', color: 'gray-400' }}
                noMargin
              >
                {oppositeContent}
              </Text>
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

export const TimelineWithCollapsedContent: Story = {
  render: () => <TimelineWithCollapsedContentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';

const TimelineWithCollapsedContentTemplate = () => {
  const ORDER_PROCESS = [
    {
      id: 1,
      title: '1. Ordered',
      date: 'May 13, 2024',
      icon: <ShoppingCartIcon />,
      status: 'completed'
    },
    {
      id: 2,
      title: '2. Shipped',
      date: 'June 20, 2024',
      icon: <LocalShippingIcon />,
      status: 'completed'
    },
    {
      id: 3,
      title: '3. Out for delivery',
      date: 'July 2, 2024',
      icon: <BoxIcon />,
      status: 'inProgress'
    },
    {
      id: 4,
      title: '4. Estimated delivery date',
      date: 'Aug 14, 2024',
      icon: <DateRangeIcon />,
      status: 'pending'
    }
  ];

  const [collapsedItems, setCollapsedItems] = useState<Set<number>>(
    new Set(ORDER_PROCESS.map((val) => val.id))
  );

  const toggle = (id: number) => {
    const newCollapsedItems = new Set(collapsedItems);
    if (collapsedItems.has(id)) newCollapsedItems.delete(id);
    else newCollapsedItems.add(id);
    setCollapsedItems(newCollapsedItems);
  };

  return (
    <Timeline style={{ width: '600px' }}>
      {ORDER_PROCESS.map(({ id, title, date }) => {
        const showContent = !collapsedItems.has(id);
        return (
          <TimelineItem key={id}>
            <TimelineContent>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text className="typo-title-medium" noMargin>
                  {title}
                </Text>
                <ButtonBase
                  onClick={() => toggle(id)}
                  style={{
                    display: 'inline-flex',
                    padding: '4px',
                    borderRadius: '50%'
                  }}
                >
                  {showContent ? (
                    <ArrowUpIcon color="on-surface-variant" />
                  ) : (
                    <ArrowDownIcon color="on-surface-variant" />
                  )}
                </ButtonBase>
              </Stack>
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <Text
                      className="typo-body-medium"
                      noMargin
                      style={{ marginBottom: '16px' }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni itaque ipsam tenetur cupiditate accusantium esse
                      vitae provident autem asperiores quae!
                    </Text>
                  </motion.div>
                )}
              </AnimatePresence>
            </TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineOppositeContent
              style={{ color: 'gray-400', fontSize: '12px' }}
            >
              {date}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};        
`.trim()
      }
    }
  }
};
