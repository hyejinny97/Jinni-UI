import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from '.';
import { Avatar } from '@/components/data-display/Avatar';
import { Stack } from '@/components/layout/Stack';
import { Tooltip } from '@/components/data-display/Tooltip';
import { Link } from '@/components/navigation/Link';
import { Popover } from '@/components/data-display/Popover';
import dogImage from '@/assets/images/dog-1.jpg';
import { PersonIcon } from '@/components/icons/PersonIcon';
import './custom.scss';

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  argTypes: {
    children: {
      description: 'Avatar 컴포넌트들',
      table: { type: { summary: 'React.ReactNode' } }
    },
    max: {
      description:
        'surplus avatar를 제외한 화면 상에 나타나는 최대 아바타 갯수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' }
      }
    },
    renderSurplus: {
      description: 'surplus avatar를 렌더하는 함수',
      table: {
        type: {
          summary: '(surplus: number) => React.ReactNode'
        },
        defaultValue: {
          summary: `(surplus: number) => (
<Avatar key="surplus-avatar" className="surplus-avatar">
	{\`+\${surplus}\`}
</Avatar>`
        }
      }
    },
    shape: {
      description: '하위 모든 Avatar의 모양',
      table: {
        type: { summary: `'circle' | 'square' | 'rounded'` },
        defaultValue: { summary: `'circle'` }
      }
    },
    size: {
      description: '하위 모든 Avatar의 크기',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | number` },
        defaultValue: { summary: `'md'` }
      }
    },
    spacing: {
      description: '아바타 간 벌어짐 정도',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    total: {
      description: '전체 아바타 갯수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'children.length' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const SurplusAvatar = () => {
  const TOTAL = 4251;
  const surplusAvatarRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <AvatarGroup
      renderSurplus={(surplus: number) => (
        <>
          <Avatar
            ref={surplusAvatarRef}
            onClick={openPopover}
            style={{
              fontSize: '20px',
              backgroundColor: 'yellow-500',
              color: 'yellow-50',
              letterSpacing: '-2px',
              cursor: 'pointer'
            }}
          >
            +{surplus.toString()[0]}k
          </Avatar>
          <Popover
            anchorElRef={surplusAvatarRef}
            open={open}
            onClose={closePopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'center' }}
            BoxProps={{ style: { marginTop: '10px' } }}
          >
            {`${surplus} avatars left`}
          </Popover>
        </>
      )}
      total={TOTAL}
    >
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>
  );
};

export const BasicAvatarGroup: Story = {
  render: (args) => {
    return (
      <AvatarGroup aria-label="아바타 그룹" {...args}>
        <Avatar src={dogImage} alt="강아지 아바타" />
        <Avatar style={{ backgroundColor: 'yellow-400', color: 'yellow-50' }}>
          J
        </Avatar>
        <Avatar>
          <PersonIcon color="white" role="img" aria-label="사람 아바타" />
        </Avatar>
      </AvatarGroup>
    );
  }
};

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
      <Stack direction="column" spacing={20} style={{ alignItems: 'center' }}>
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
      </Stack>
    );
  }
};

export const CustomSurplusAvatar: Story = {
  render: (args) => <SurplusAvatar {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const SurplusAvatar = () => {
  const TOTAL = 4251;
  const surplusAvatarRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openPopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  return (
    <AvatarGroup
      renderSurplus={(surplus: number) => (
        <>
          <Avatar
            ref={surplusAvatarRef}
            onClick={openPopover}
            style={{
              fontSize: '20px',
              backgroundColor: 'yellow-500',
              color: 'yellow-50',
              letterSpacing: '-2px',
              cursor: 'pointer'
            }}
          >
            +{surplus.toString()[0]}k
          </Avatar>
          <Popover
            anchorElRef={surplusAvatarRef}
            open={open}
            onClose={closePopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            popoverOrigin={{ vertical: 'top', horizontal: 'center' }}
            PopoverContentProps={{ style: { marginTop: '10px' } }}
          >
            {\`\${surplus} avatars left\`}
          </Popover>
        </>
      )}
      total={TOTAL}
    >
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>
  );
};`.trim()
      }
    }
  }
};

export const Spacing: Story = {
  render: (args) => {
    return (
      <Stack direction="column" spacing={20} style={{ alignItems: 'center' }}>
        <AvatarGroup spacing="sm" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup spacing="md" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup spacing="lg" {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack direction="column" spacing={20} style={{ alignItems: 'center' }}>
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
        <AvatarGroup size="md" max={2} {...args}>
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
        <AvatarGroup size={60} max={2} {...args}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </Stack>
    );
  }
};

export const Shape: Story = {
  render: (args) => {
    return (
      <Stack direction="column" spacing={20} style={{ alignItems: 'center' }}>
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
      </Stack>
    );
  }
};

export const AvatarWrappedInTooltip: Story = {
  render: (args) => {
    return (
      <AvatarGroup {...args}>
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Tooltip key={idx} content={`Avatar ${idx + 1}`} offset={5}>
              <Avatar />
            </Tooltip>
          ))}
      </AvatarGroup>
    );
  }
};

export const AvatarWrappedInLink: Story = {
  render: (args) => {
    return (
      <AvatarGroup className="expand-when-hover" {...args}>
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Link key={idx} href={`#avatar${idx + 1}`}>
              <Avatar />
            </Link>
          ))}
      </AvatarGroup>
    );
  }
};
