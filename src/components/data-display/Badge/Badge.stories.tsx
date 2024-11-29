import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';
import { Avatar } from '@/components/data-display/Avatar';
import { MailIcon } from '@/components/icons/MailIcon';
import dogImage from '@/assets/images/dog-1.jpg';

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    badgeContent: {
      description: '배지에 들어갈 내용',
      table: { type: { summary: 'React.ReactNode' } }
    },
    children: {
      description: '배지가 붙여질 anchor',
      table: { type: { summary: 'React.ReactNode' } }
    },
    color: {
      description: '배지 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: 'primary' }
      },
      control: {
        type: 'color'
      }
    },
    invisible: {
      description: 'true면 배지가 안보임',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    max: {
      description: '배지 내 content 최댓값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' }
      }
    },
    origin: {
      description: '(anchor element의 네 개의 코너 중) 배지 위치',
      table: {
        type: {
          summary: `{
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}`
        },
        defaultValue: {
          summary: `{
vertical: 'top';
horizontal: 'right';
}`
        }
      }
    },
    showZero: {
      description: 'true면 content가 0일 때 배지가 보임',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      description: '배지 크기',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      description: '배지 모양',
      table: {
        type: { summary: 'dot | standard' },
        defaultValue: { summary: 'standard' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

const Inner = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ display: 'flex', columnGap: '30px' }}>{children}</div>;
};

const Outer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
      {children}
    </div>
  );
};

const Square = () => (
  <div
    style={{
      width: '32px',
      height: '32px',
      backgroundColor: '#9CA3AF',
      borderRadius: '8px'
    }}
  ></div>
);

export const BasicBadge: Story = {
  render: (args) => (
    <Outer>
      <Inner>
        <Badge badgeContent={5} {...args}>
          <Square />
        </Badge>
        <Badge badgeContent={5} {...args}>
          <MailIcon color="gray-400" />
        </Badge>
        <Badge badgeContent={5} {...args}>
          <Avatar src={dogImage} alt="강아지 사진" size={32} />
        </Badge>
        <Badge badgeContent={5} {...args}>
          text
        </Badge>
      </Inner>
      <Inner>
        <Badge badgeContent={5} {...args}>
          <Square />
        </Badge>
        <Badge
          badgeContent={<MailIcon color="primary" size={20} />}
          {...args}
          color="rgba(0,0,0,0)"
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={<Avatar src={dogImage} alt="강아지 사진" size={20} />}
          {...args}
          color="rgba(0,0,0,0)"
        >
          <Square />
        </Badge>
        <Badge badgeContent="text" {...args}>
          <Square />
        </Badge>
      </Inner>
    </Outer>
  )
};

export const MaximumValue: Story = {
  render: (args) => (
    <Inner>
      <Badge badgeContent={99} {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={100} {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={1000} max={999} {...args}>
        <Square />
      </Badge>
    </Inner>
  )
};

export const ShowOnZero: Story = {
  render: (args) => (
    <Inner>
      <Badge badgeContent={0} {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={0} showZero {...args}>
        <Square />
      </Badge>
    </Inner>
  )
};

export const DotBadge: Story = {
  render: (args) => (
    <Inner>
      <Badge badgeContent={5} variant="standard" {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} variant="dot" {...args}>
        <Square />
      </Badge>
    </Inner>
  )
};

export const BadgeVisibility: Story = {
  render: (args) => (
    <Inner>
      <Badge badgeContent={5} {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} invisible {...args}>
        <Square />
      </Badge>
    </Inner>
  )
};

export const Color: Story = {
  render: (args) => (
    <Inner>
      <Badge badgeContent={5} {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} color="secondary" {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} color="tertiary" {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} color="yellow-400" {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} color="red" {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} color="rgb(1,1,1)" {...args}>
        <Square />
      </Badge>
      <Badge badgeContent={5} color="#abc" {...args}>
        <Square />
      </Badge>
    </Inner>
  )
};

export const Size: Story = {
  render: (args) => (
    <Outer>
      <Inner>
        <Badge badgeContent={5} size="sm" {...args}>
          <Square />
        </Badge>
        <Badge badgeContent={5} size="md" {...args}>
          <Square />
        </Badge>
        <Badge badgeContent={5} size="lg" {...args}>
          <Square />
        </Badge>
      </Inner>
      <Inner>
        <Badge badgeContent={5} size="sm" variant="dot" {...args}>
          <Square />
        </Badge>
        <Badge badgeContent={5} size="md" variant="dot" {...args}>
          <Square />
        </Badge>
        <Badge badgeContent={5} size="lg" variant="dot" {...args}>
          <Square />
        </Badge>
      </Inner>
    </Outer>
  )
};

export const BadgeAlignment: Story = {
  render: (args) => (
    <Outer>
      <Inner>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'top', horizontal: 'right' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'top', horizontal: 'left' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'bottom', horizontal: 'right' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'bottom', horizontal: 'left' }}
          {...args}
        >
          <Square />
        </Badge>
      </Inner>
      <Inner>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'top', horizontal: 'right' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'top', horizontal: 'left' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          badgeContent={5}
          origin={{ vertical: 'bottom', horizontal: 'left' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
      </Inner>
    </Outer>
  )
};

export const Customization: Story = {
  render: (args) => (
    <Inner>
      <Badge
        badgeContent={5}
        style={{ backgroundColor: 'wheat', color: 'black' }}
        {...args}
      >
        <Square />
      </Badge>
      <Badge
        badgeContent={5}
        style={{ transform: 'translate(70%, -70%)' }}
        {...args}
      >
        <Square />
      </Badge>
      <Badge badgeContent={5} style={{ border: '1px solid white' }} {...args}>
        <Square />
      </Badge>
    </Inner>
  )
};
