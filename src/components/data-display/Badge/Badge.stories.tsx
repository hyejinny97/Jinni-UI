import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';
import { Avatar } from '@/components/data-display/Avatar';
import { MailIcon } from '@/components/icons/MailIcon';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { ButtonBase } from '@/components/general/ButtonBase';
import dogImage from '@/assets/images/dog-1.jpg';

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    anchorOrigin: {
      description: '배지가 부착될 anchor의 origin',
      table: {
        type: {
          summary: `{
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
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
    children: {
      description: '배지가 부착될 anchor',
      table: { type: { summary: 'React.ReactNode' } }
    },
    content: {
      description: '배지에 들어갈 내용',
      table: { type: { summary: 'React.ReactNode' } }
    },
    invisible: {
      description: 'true면, 배지가 보이지 않음',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    max: {
      description: 'content 숫자 최댓값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' }
      }
    },
    showZero: {
      description: 'true면, content가 0이어도 배지가 숨겨지지 않음',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      description: '배지 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    variant: {
      description: '배지의 형태',
      table: {
        type: { summary: `'standard' | 'dot'` },
        defaultValue: { summary: `'standard'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

const Square = () => (
  <Box
    style={{
      width: '32px',
      height: '32px',
      backgroundColor: 'surface-container-highest',
      borderRadius: '8px'
    }}
  />
);

export const BasicBadge: Story = {
  render: (args) => (
    <Stack spacing={30}>
      <Stack direction="row" spacing={30}>
        <Badge content={5} {...args}>
          <Square />
        </Badge>
        <Badge content={5} {...args}>
          <MailIcon color="surface-container-highest" />
        </Badge>
        <Badge content={5} {...args}>
          <Avatar src={dogImage} alt="강아지 사진" size={32} />
        </Badge>
        <Badge content={5} {...args}>
          text
        </Badge>
      </Stack>
      <Stack direction="row" spacing={30}>
        <Badge content={5} {...args}>
          <Square />
        </Badge>
        <Badge
          content={<MailIcon color="primary" size={20} />}
          style={{ backgroundColor: 'transparent' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={<Avatar src={dogImage} alt="강아지 사진" size={20} />}
          style={{ backgroundColor: 'transparent' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge content="text" {...args}>
          <Square />
        </Badge>
      </Stack>
    </Stack>
  )
};

export const MaximumValue: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      <Badge content={99} {...args}>
        <Square />
      </Badge>
      <Badge content={100} {...args}>
        <Square />
      </Badge>
      <Badge content={1000} max={999} {...args}>
        <Square />
      </Badge>
    </Stack>
  )
};

export const ShowOnZero: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      <Badge content={0} {...args}>
        <Square />
      </Badge>
      <Badge content={0} showZero {...args}>
        <Square />
      </Badge>
    </Stack>
  )
};

export const DotBadge: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      <Badge content={5} variant="standard" {...args}>
        <Square />
      </Badge>
      <Badge content={5} variant="dot" {...args}>
        <Square />
      </Badge>
    </Stack>
  )
};

export const BadgeVisibility: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      <Badge content={5} {...args}>
        <Square />
      </Badge>
      <Badge content={5} invisible {...args}>
        <Square />
      </Badge>
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack spacing={30}>
      <Stack direction="row" spacing={30}>
        <Badge content={5} size="sm" {...args}>
          <Square />
        </Badge>
        <Badge content={5} size="md" {...args}>
          <Square />
        </Badge>
        <Badge content={5} size="lg" {...args}>
          <Square />
        </Badge>
      </Stack>
      <Stack direction="row" spacing={30}>
        <Badge content={5} size="sm" variant="dot" {...args}>
          <Square />
        </Badge>
        <Badge content={5} size="md" variant="dot" {...args}>
          <Square />
        </Badge>
        <Badge content={5} size="lg" variant="dot" {...args}>
          <Square />
        </Badge>
      </Stack>
    </Stack>
  )
};

export const BadgeAlignment: Story = {
  render: (args) => (
    <Stack spacing={30}>
      <Stack direction="row" spacing={30}>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          {...args}
        >
          <Square />
        </Badge>
      </Stack>
      <Stack direction="row" spacing={30}>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
        <Badge
          content={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          variant="dot"
          {...args}
        >
          <Square />
        </Badge>
      </Stack>
    </Stack>
  )
};

export const Customization: Story = {
  render: (args) => (
    <ButtonBase
      style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%' }}
    >
      <Badge
        content={500}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '22px',
          height: '22px',
          transform: 'translate(70%, -60%)',
          backgroundColor: 'secondary',
          color: 'on-secondary',
          border: '1px solid white'
        }}
        {...args}
      >
        <MailIcon color="gray-600" />
      </Badge>
    </ButtonBase>
  )
};
