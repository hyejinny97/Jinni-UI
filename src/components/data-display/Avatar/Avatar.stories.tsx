import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@/components/data-display/Avatar';
import dogImage1 from '@/assets/images/dog-1.jpg';
import dogImage2 from '@/assets/images/dog-2.jpg';
import { PersonIcon } from '@/components/icons/PersonIcon';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  argTypes: {
    alt: {
      description: 'image를 설명하기 위한 대체 텍스트',
      type: 'string'
    },
    children: {
      description: '주로 텍스트나 icon이 들어가며, src prop이 없는 경우 적용됨',
      table: { type: { summary: 'React.ReactNode' } }
    },
    imgProps: {
      description:
        '(src, alt 속성은 제외한) img 요소의 나머지 속성값 (ex) loading)',
      table: {
        type: {
          summary: 'crossOrigin | width | height | loading | sizes | ...'
        }
      }
    },
    shape: {
      description: '아바타의 모양',
      table: {
        type: { summary: 'circle | square | rounded' },
        defaultValue: { summary: 'circle' }
      }
    },
    size: {
      description: 'image의 사이즈',
      table: { type: { summary: 'xs | sm | md | lg | xl | number' } },
      defaultValue: { summary: 'md' },
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    src: {
      description: 'image 주소',
      type: 'string'
    },
    className: {
      description: '추가 클래스',
      type: 'string'
    },
    style: {
      description: '스타일',
      table: { type: { summary: 'StyleType' } }
    }
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Story />
        </div>
      );
    }
  ]
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ImageAvatars: Story = {
  render: (args) => {
    return (
      <>
        <Avatar src={dogImage1} alt="강아지 사진1" {...args} />
        <Avatar
          src={dogImage2}
          alt="강아지 사진2"
          imgProps={{
            width: 100,
            height: 100
          }}
          {...args}
        />
      </>
    );
  }
};

export const LetterAvatars: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>N</Avatar>
        <Avatar
          style={{ backgroundColor: 'yellow-400', color: 'yellow-50' }}
          {...args}
        >
          N
        </Avatar>
        <Avatar style={{ fontSize: '12px' }} {...args}>
          Name
        </Avatar>
      </>
    );
  }
};

export const IconAvatars: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>
          <PersonIcon color="white" />
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'yellow-400'
          }}
          {...args}
        >
          <PersonIcon color="yellow-50" />
        </Avatar>
      </>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar size="xs" {...args}>
            N
          </Avatar>
          <Avatar size="sm" {...args}>
            N
          </Avatar>
          <Avatar>N</Avatar>
          <Avatar size="lg" {...args}>
            N
          </Avatar>
          <Avatar size="xl" {...args}>
            N
          </Avatar>
          <Avatar
            size={200}
            style={{ fontSize: '100px', fontWeight: 900 }}
            {...args}
          >
            N
          </Avatar>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar size="xs" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size="sm" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size="lg" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size="xl" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size={200} {...args}>
            <PersonIcon color="white" size={100} />
          </Avatar>
        </div>
      </div>
    );
  }
};

export const Shape: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>N</Avatar>
        <Avatar shape="square" {...args}>
          N
        </Avatar>
        <Avatar shape="rounded" {...args}>
          N
        </Avatar>
      </>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>N</Avatar>
        <Avatar
          style={{
            backgroundColor: 'secondary',
            color: 'on-secondary'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'tertiary',
            color: 'on-tertiary'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'green'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: '#123'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'rgb(100,100,100)'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'rgba(100,100,100, 0.5)'
          }}
          {...args}
        >
          N
        </Avatar>
      </>
    );
  }
};

export const AvatarFallbacks: Story = {
  render: (args) => {
    return (
      <>
        <Avatar
          src="./broken-image.png"
          alt="alt"
          style={{ fontSize: '10px' }}
          {...args}
        >
          children
        </Avatar>
        <Avatar
          src="./broken-image.png"
          alt="alt"
          style={{ fontSize: '15px' }}
          {...args}
        />
        <Avatar src="./broken-image.png" {...args} />
      </>
    );
  }
};
