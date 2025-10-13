import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from './ButtonGroup';
import { Button } from '@/components/general/Button';
import { Stack } from '@/components/layout/Stack';
import { Menu } from '@/components/navigation/Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  argTypes: {
    children: {
      description: 'Button 컴포넌트들'
    },
    color: {
      description: '버튼 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    disableOverlay: {
      description: 'true이면, overlay가 나타나지 않음',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    disableRipple: {
      description: 'true이면, ripple effect가 비활성화됨',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    elevation: {
      description: 'elevation(box-shadow) 정도',
      table: {
        type: { summary: `ElevationLevelType` }
      }
    },
    orientation: {
      description: '버튼 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    overlayColor: {
      description: 'overlay 색상',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: {
          summary: `('filled'인 경우)'white', (이 외)'black'`
        }
      }
    },
    rippleColor: {
      description: 'ripple 색상',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: {
          summary: `('filled'인 경우)'white', (이 외)'black'`
        }
      }
    },
    rippleStartLocation: {
      description: 'ripple 시작점',
      table: {
        type: { summary: `'center' | 'clicked'` },
        defaultValue: { summary: `'clicked'` }
      }
    },
    size: {
      description: '버튼 크기',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      description: '버튼 종류',
      table: {
        type: { summary: 'filled | subtle-filled | outlined | text' },
        defaultValue: { summary: 'filled' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const OPTIONS = [
  { key: 1, title: 'Create a merge commit', disabled: false },
  { key: 2, title: 'Squash and merge', disabled: false },
  { key: 3, title: 'Rebase and merge', disabled: true }
];

const ButtonGroupTemplate = ({ ...props }) => {
  return (
    <ButtonGroup {...props}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
};

const SplitButtonTemplate = () => {
  const [open, setOpen] = useState(false);
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(1);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };
  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorElRef}>
        <Button style={{ height: '34px' }}>{OPTIONS[selectedIdx].title}</Button>
        <Button onClick={handleMenuOpen}>
          <ArrowDownIcon color="white" size={20} />
        </Button>
      </ButtonGroup>
      <Menu
        anchorElRef={anchorElRef}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        menuOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        {OPTIONS.map((option, idx) => {
          return (
            <MenuItem
              key={option.key}
              selected={selectedIdx === idx}
              disabled={option.disabled}
              onClick={() => handleSelect(idx)}
            >
              {option.title}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export const BasicButtonGroup: Story = {
  render: (args) => <ButtonGroupTemplate {...args} />
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <ButtonGroupTemplate variant="filled" {...args} />
      <ButtonGroupTemplate variant="subtle-filled" {...args} />
      <ButtonGroupTemplate variant="outlined" {...args} />
      <ButtonGroupTemplate variant="text" {...args} />
    </Stack>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <ButtonGroupTemplate size="sm" {...args} />
      <ButtonGroupTemplate size="md" {...args} />
      <ButtonGroupTemplate size="lg" {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <ButtonGroupTemplate color="yellow-500" {...args} />
      <ButtonGroupTemplate color="secondary" {...args} />
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => <ButtonGroupTemplate disabled {...args} />
};

export const VerticalButtonGroup: Story = {
  render: (args) => <ButtonGroupTemplate orientation="vertical" {...args} />
};

export const OverlayColor: Story = {
  render: (args) => <ButtonGroupTemplate overlayColor="black" {...args} />
};

export const DisableOverlay: Story = {
  render: (args) => <ButtonGroupTemplate disableOverlay {...args} />
};

export const RippleColor: Story = {
  render: (args) => <ButtonGroupTemplate rippleColor="black" {...args} />
};

export const RippleStartLocation: Story = {
  render: (args) => (
    <ButtonGroupTemplate rippleStartLocation="center" {...args} />
  )
};

export const DisableRipple: Story = {
  render: (args) => <ButtonGroupTemplate disableRipple {...args} />
};

export const Elevation: Story = {
  render: (args) => <ButtonGroupTemplate elevation={5} {...args} />
};

export const SplitButton: Story = {
  render: (args) => <SplitButtonTemplate {...args} />
};
