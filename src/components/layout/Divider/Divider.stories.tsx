import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@/components/layout/Divider';
import { Stack } from '@/components/layout/Stack';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof Divider> = {
  component: Divider,
  argTypes: {
    children: {
      description: '구분선 내 콘텐츠'
    },
    contentAlign: {
      description: '구분선 내 콘텐츠 위치',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'center' }
      }
    },
    orientation: {
      description: '구분선 방향',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'horizontal' }
      }
    },
    variant: {
      description: '구분선 스타일',
      table: {
        type: { summary: 'solid | dotted | dashed' },
        defaultValue: { summary: 'solid' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Divider>;

const Container = ({
  children,
  orientation
}: {
  children: React.ReactNode;
  orientation: 'horizontal' | 'vertical';
}) => {
  const isHorizontal = orientation === 'horizontal';
  return (
    <Stack
      spacing={30}
      direction={isHorizontal ? 'column' : 'row'}
      style={{
        width: isHorizontal ? '500px' : '100px',
        height: isHorizontal ? '100px' : '500px'
      }}
    >
      {children}
    </Stack>
  );
};

export const DefaultDivider: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider {...args} />
    </Container>
  )
};

export const Variant: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider variant="solid" {...args} />
      <Divider variant="dashed" {...args} />
      <Divider variant="dotted" {...args} />
    </Container>
  )
};

export const Orientation: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'vertical'}>
      <Divider orientation="vertical" variant="solid" {...args} />
      <Divider orientation="vertical" variant="dashed" {...args} />
      <Divider orientation="vertical" variant="dotted" {...args} />
    </Container>
  )
};

export const WithContents: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider contentAlign="center" {...args}>
        content
      </Divider>
      <Divider contentAlign="left" {...args}>
        content
      </Divider>
      <Divider contentAlign="right" {...args}>
        content
      </Divider>
      <Divider contentAlign="center" {...args}>
        <Chip label="content" />
      </Divider>
    </Container>
  )
};
export const Customization: Story = {
  render: (args) => {
    const isHorizontal = !args.orientation || args.orientation === 'horizontal';
    return (
      <Container orientation={args.orientation || 'horizontal'}>
        <Divider
          style={{
            [isHorizontal ? 'borderTopWidth' : 'borderLeftWidth']: '2px',
            borderColor: 'error',
            color: 'error'
          }}
          {...args}
        >
          content
        </Divider>
        <Divider style={{ fontWeight: '900', fontSize: '20px' }} {...args}>
          content
        </Divider>
        <Divider
          style={{ margin: isHorizontal ? '10px 50px' : '50px 10px' }}
          {...args}
        >
          content
        </Divider>
      </Container>
    );
  }
};
