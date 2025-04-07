import type { Meta, StoryObj } from '@storybook/react';
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
import { Divider } from '@/components/layout/Divider';
import { Stack } from '@/components/layout/Stack';
import { StyleType } from '@/types/style';

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

const VerticalTimelineTemplate = ({ ...props }) => {
  return (
    <Timeline {...props}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700 }}>
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
  );
};

const HorizontalTimelineTemplate = ({ ...props }) => {
  return (
    <Timeline orientation="horizontal" style={{ height: '100px' }} {...props}>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700, marginRight: '15px' }}>
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
  );
};

const DotCustomizationTemplate = () => {
  return (
    <Timeline>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700 }}>
              {content}
            </TimelineContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="yellow-400" />
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const ConnectorCustomizationTemplate = () => {
  return (
    <Timeline>
      {ORDER_PROCESS.map(({ content }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700 }}>
              {content}
            </TimelineContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector variant="dashed" color="primary" />
            </TimelineSeparator>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const OppositeContentTemplate = ({ ...props }) => {
  return (
    <Timeline {...props}>
      {ORDER_PROCESS.map(({ content, oppositeContent }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700 }}>
              {content}
            </TimelineContent>
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
  );
};

const TimelinePositionTemplate = ({
  contentStyle,
  oppositeContentStyle
}: {
  contentStyle?: StyleType;
  oppositeContentStyle?: StyleType;
}) => {
  return (
    <Timeline style={{ width: '500px', elevation: 3, padding: '10px 0' }}>
      {ORDER_PROCESS.map(({ content, oppositeContent }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700, ...contentStyle }}>
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
                ...oppositeContentStyle
              }}
            >
              {oppositeContent}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const CustomizationTemplate = ({ ...props }) => {
  return (
    <Timeline {...props}>
      {ORDER_PROCESS.map(({ content, oppositeContent, icon, status }) => {
        return (
          <TimelineItem key={content}>
            <TimelineContent style={{ fontWeight: 700 }}>
              {content}
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
  render: (args) => <VerticalTimelineTemplate {...args} />
};

export const Orientation: Story = {
  render: (args) => <HorizontalTimelineTemplate {...args} />
};

export const VerticalReverse: Story = {
  render: (args) => <VerticalTimelineTemplate reverse {...args} />
};

export const HorizontalReverse: Story = {
  render: (args) => <HorizontalTimelineTemplate reverse {...args} />
};

export const VerticalAlignment: Story = {
  render: (args) => (
    <Stack spacing={10} divider={<Divider />}>
      {['before', 'after', 'alternate', 'alternate-reverse'].map(
        (alignment, idx) => (
          <>
            <h4>{`${idx + 1}. alignment = '${alignment}'`}</h4>
            <VerticalTimelineTemplate
              alignment={alignment}
              style={{ minWidth: '500px' }}
              {...args}
            />
          </>
        )
      )}
    </Stack>
  )
};

export const HorizontalAlignment: Story = {
  render: (args) => (
    <Stack spacing={15} divider={<Divider />}>
      {['before', 'after', 'alternate', 'alternate-reverse'].map(
        (alignment, idx) => (
          <>
            <h4>{`${idx + 1}. alignment = '${alignment}'`}</h4>
            <HorizontalTimelineTemplate alignment={alignment} {...args} />
          </>
        )
      )}
    </Stack>
  )
};

export const DotCustomization: Story = {
  render: (args) => <DotCustomizationTemplate {...args} />
};

export const ConnectorCustomization: Story = {
  render: (args) => <ConnectorCustomizationTemplate {...args} />
};

export const ShowLastConnector: Story = {
  render: (args) => (
    <>
      <VerticalTimelineTemplate showLastConnector {...args} />
      <HorizontalTimelineTemplate showLastConnector {...args} />
    </>
  )
};

export const OppositeContent: Story = {
  render: (args) => (
    <>
      <Stack spacing={10} divider={<Divider />}>
        {['before', 'after', 'alternate', 'alternate-reverse'].map(
          (alignment, idx) => (
            <>
              <h4>{`${idx + 1}. alignment = '${alignment}'`}</h4>
              <OppositeContentTemplate
                alignment={alignment}
                style={{ minWidth: '500px' }}
                {...args}
              />
            </>
          )
        )}
      </Stack>
    </>
  )
};

export const LeftTimelinePosition: Story = {
  render: (args) => (
    <TimelinePositionTemplate
      oppositeContentStyle={{ flex: '0.25' }}
      {...args}
    />
  )
};

export const RightTimelinePosition: Story = {
  render: (args) => (
    <TimelinePositionTemplate contentStyle={{ flex: '0.4' }} {...args} />
  )
};

export const Customization: Story = {
  render: (args) => <CustomizationTemplate {...args} />
};
