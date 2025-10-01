import './custom.scss';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@/components/layout/Divider';
import { Stack } from '@/components/layout/Stack';
import { Chip } from '@/components/data-display/Chip';
import { List, ListItem } from '@/components/data-display/List';

const meta: Meta<typeof Divider> = {
  component: Divider,
  argTypes: {
    children: {
      description: '구분선 내 콘텐츠',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: '구분선, content 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'outline-variant'` }
      }
    },
    contentAlign: {
      description: '구분선 내 콘텐츠 위치',
      table: {
        type: { summary: `'start' | 'center' | 'end'` },
        defaultValue: { summary: `'center'` }
      }
    },
    orientation: {
      description: '구분선 방향',
      table: {
        type: { summary: `'vertical' | 'horizontal'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    thickness: {
      description: '구분선 두께',
      type: 'number',
      defaultValue: { summary: '1' }
    },
    variant: {
      description: '구분선 스타일',
      table: {
        type: { summary: `'solid' | 'dotted' | 'dashed'` },
        defaultValue: { summary: `'solid'` }
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
        justifyContent: 'center',
        width: isHorizontal ? '500px' : '100px',
        height: isHorizontal ? '100px' : '300px'
      }}
    >
      {children}
    </Stack>
  );
};

export const BasicDivider: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider {...args} />
    </Container>
  )
};

export const Thickness: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider thickness={3} {...args} />
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

export const Content: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider {...args}>content</Divider>
      <Divider {...args}>
        <Chip variant="filled">content</Chip>
      </Divider>
    </Container>
  )
};

export const ContentAlignment: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider contentAlign="center" {...args}>
        content
      </Divider>
      <Divider contentAlign="start" {...args}>
        content
      </Divider>
      <Divider contentAlign="end" {...args}>
        content
      </Divider>
    </Container>
  )
};

export const CustomContent: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider className="custom-content" {...args}>
        content
      </Divider>
    </Container>
  )
};

export const Color: Story = {
  render: (args) => (
    <Container orientation={args.orientation || 'horizontal'}>
      <Divider color="secondary" {...args} />
      <Divider color="yellow-400" {...args} />
      <Divider color="rgb(100,100,100)" variant="dashed" {...args}>
        content
      </Divider>
    </Container>
  )
};

export const Customization: Story = {
  render: (args) => (
    <List
      style={{
        padding: 0,
        border: '1px solid var(--jinni-color-outline-variant)',
        borderRadius: '4px'
      }}
    >
      <ListItem>Item 1</ListItem>
      <Divider style={{ margin: '2px 16px' }} {...args} />
      <ListItem>Item 2</ListItem>
      <Divider style={{ margin: '2px 16px' }} {...args} />
      <ListItem>Item 3</ListItem>
    </List>
  )
};
