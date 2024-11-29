import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from '.';
import { Avatar } from '@/components/data-display/Avatar';

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  argTypes: {
    children: {
      description: 'avatars stack',
      table: { type: { summary: 'Array<React.ReactElement<AvatarProps>>' } }
    },
    max: {
      description:
        'surplus avatar를 제외한 화면 상에 나타나는 최대 아바타 갯수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'children.length' }
      }
    },
    renderSurplus: {
      description: 'surplus avatar를 커스텀하는 함수',
      table: {
        type: {
          summary: '(surplus: number) => React.ReactElement<AvatarProps>'
        }
      }
    },
    shape: {
      description: '하위 모든 Avatar의 모양을 한번에 변경해줌',
      table: {
        type: { summary: 'circle | square | rounded' },
        defaultValue: { summary: 'circle' }
      }
    },
    size: {
      description: '하위 모든 Avatar의 크기를 한번에 변경해줌',
      table: {
        type: { summary: 'xs | sm | md | lg | xl' },
        defaultValue: { summary: 'md' }
      }
    },
    spacing: {
      description: '아바타 사이의 간격',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    total: {
      description: '총 아바타 갯수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'children.length' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const MaxAvatarNumber: Story = {
  render: (args) => {
    return (
      <AvatarGroup max={2} {...args}>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    );
  }
};

export const TotalAvatarNumber: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', columnGap: '20px' }}>
        <AvatarGroup total={5} {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup max={2} total={5} {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </div>
    );
  }
};

export const CustomSurplusAvatar: Story = {
  render: (args) => {
    return (
      <AvatarGroup
        renderSurplus={(surplus) => (
          <span style={{ fontSize: '20px' }}>+{surplus.toString()[0]}k</span>
        )}
        total={4251}
        {...args}
      >
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    );
  }
};

export const Spacing: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', columnGap: '20px' }}>
        <AvatarGroup spacing="sm" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup spacing="lg" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </div>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <section style={{ display: 'flex', columnGap: '20px' }}>
          <AvatarGroup size="xs" {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup size="sm" {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup size="lg" {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup size="xl" {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
        </section>
        <section style={{ display: 'flex', columnGap: '20px' }}>
          <AvatarGroup size="xs" max={2} {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup size="sm" max={2} {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup max={2} {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup size="lg" max={2} {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <AvatarGroup size="xl" max={2} {...args}>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
        </section>
      </div>
    );
  }
};

export const Shape: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', columnGap: '20px' }}>
        <AvatarGroup shape="circle" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup shape="square" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup shape="rounded" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </div>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <AvatarGroup style={{ backgroundColor: 'yellow-400' }} {...args}>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    );
  }
};
