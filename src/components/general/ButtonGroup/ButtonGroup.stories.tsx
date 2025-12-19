import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from './ButtonGroup';
import { Button } from '@/components/general/Button';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Menu } from '@/components/navigation/Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  argTypes: {
    children: {
      description: 'Button 컴포넌트들',
      table: {
        type: { summary: 'React.ReactNode' }
      }
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
      type: 'boolean'
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      type: 'boolean'
    },
    disableRipple: {
      description: 'true이면, ripple effect가 비활성화됨',
      type: 'boolean'
    },
    elevation: {
      description: 'elevation(box-shadow) 정도',
      table: {
        type: { summary: `ElevationLevelType` }
      }
    },
    fullWidth: {
      description: 'true이면, 버튼 그룹 너비는 parent의 너비와 동일하게 맞춰짐',
      table: {
        type: { summary: `boolean` }
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
        type: { summary: `'black' | 'white'` }
      }
    },
    rippleColor: {
      description: 'ripple 색상',
      table: {
        type: { summary: `'black' | 'white'` }
      }
    },
    rippleStartLocation: {
      description: 'ripple 시작점',
      table: {
        type: { summary: `'center' | 'clicked'` }
      }
    },
    size: {
      description: '버튼 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` }
      }
    },
    variant: {
      description: '버튼 종류',
      table: {
        type: { summary: `'filled' | 'subtle-filled' | 'outlined' | 'text'` },
        defaultValue: { summary: `'filled'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const OrientationTemplate = () => {
  const ORIENTATIONS = ['horizontal', 'vertical'] as const;
  const [selectedValue, setSelectedValue] =
    useState<(typeof ORIENTATIONS)[number]>('horizontal');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as (typeof ORIENTATIONS)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup
        name="orientation"
        value={selectedValue}
        onChange={handleChange}
      >
        <Stack direction="row">
          {ORIENTATIONS.map((orientation) => (
            <Label key={orientation} content={orientation}>
              <Radio value={orientation} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <ButtonGroup orientation={selectedValue}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const VariantTemplate = () => {
  const VARIANTS = ['filled', 'subtle-filled', 'outlined', 'text'] as const;
  const [selectedValue, setSelectedValue] =
    useState<(typeof VARIANTS)[number]>('filled');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as (typeof VARIANTS)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup name="variant" value={selectedValue} onChange={handleChange}>
        <Stack direction="row">
          {VARIANTS.map((variant) => (
            <Label key={variant} content={variant}>
              <Radio value={variant} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <ButtonGroup variant={selectedValue}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const SizeTemplate = () => {
  const SIZES = ['sm', 'md', 'lg'] as const;
  const [selectedValue, setSelectedValue] =
    useState<(typeof SIZES)[number]>('sm');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as (typeof SIZES)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup name="size" value={selectedValue} onChange={handleChange}>
        <Stack direction="row">
          {SIZES.map((size) => (
            <Label key={size} content={size}>
              <Radio value={size} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <ButtonGroup size={selectedValue}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const SplitButtonTemplate = () => {
  const OPTIONS = [
    { key: 1, title: 'Create a merge commit' },
    { key: 2, title: 'Squash and merge' },
    { key: 3, title: 'Rebase and merge' }
  ];
  const [open, setOpen] = useState(false);
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(1);

  const selectMenu = (idx: number) => {
    setSelectedIdx(idx);
  };
  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorElRef}>
        <Button style={{ height: '34px' }}>{OPTIONS[selectedIdx].title}</Button>
        <Button onClick={openMenu}>
          <ArrowDownIcon color="white" size={20} />
        </Button>
      </ButtonGroup>
      <Menu
        anchorElRef={anchorElRef}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        menuOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        {OPTIONS.map((option, idx) => {
          return (
            <MenuItem
              key={option.key}
              selected={selectedIdx === idx}
              onClick={() => selectMenu(idx)}
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
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
};

export const Orientation: Story = {
  render: () => <OrientationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OrientationTemplate = () => {
  const ORIENTATIONS = ['horizontal', 'vertical'] as const;
  const [selectedValue, setSelectedValue] =
    useState<(typeof ORIENTATIONS)[number]>('horizontal');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as (typeof ORIENTATIONS)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup
        name="orientation"
        value={selectedValue}
        onChange={handleChange}
      >
        <Stack direction="row">
          {ORIENTATIONS.map((orientation) => (
            <Label key={orientation} content={orientation}>
              <Radio value={orientation} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <ButtonGroup orientation={selectedValue}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <ButtonGroup fullWidth {...args}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Box>
  )
};

export const Variant: Story = {
  render: () => <VariantTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const VariantTemplate = () => {
  const VARIANTS = ['filled', 'subtle-filled', 'outlined', 'text'] as const;
  const [selectedValue, setSelectedValue] =
    useState<(typeof VARIANTS)[number]>('filled');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as (typeof VARIANTS)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup name="variant" value={selectedValue} onChange={handleChange}>
        <Stack direction="row">
          {VARIANTS.map((variant) => (
            <Label key={variant} content={variant}>
              <Radio value={variant} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <ButtonGroup variant={selectedValue}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: (args) => (
    <ButtonGroup color="yellow-400" {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
};

export const Size: Story = {
  render: () => <SizeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SizeTemplate = () => {
  const SIZES = ['sm', 'md', 'lg'] as const;
  const [selectedValue, setSelectedValue] =
    useState<(typeof SIZES)[number]>('sm');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as (typeof SIZES)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup name="size" value={selectedValue} onChange={handleChange}>
        <Stack direction="row">
          {SIZES.map((size) => (
            <Label key={size} content={size}>
              <Radio value={size} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <ButtonGroup size={selectedValue}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const OverlayColor: Story = {
  render: (args) => (
    <ButtonGroup overlayColor="black" {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
};

export const RippleStartLocation: Story = {
  render: (args) => (
    <ButtonGroup rippleStartLocation="center" {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
};

export const Elevation: Story = {
  render: (args) => (
    <ButtonGroup elevation={2} {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <ButtonGroup disabled {...args}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
};

export const SplitButton: Story = {
  render: () => <SplitButtonTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SplitButtonTemplate = () => {
  const OPTIONS = [
    { key: 1, title: 'Create a merge commit' },
    { key: 2, title: 'Squash and merge' },
    { key: 3, title: 'Rebase and merge' }
  ];
  const [open, setOpen] = useState(false);
  const anchorElRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(1);

  const selectMenu = (idx: number) => {
    setSelectedIdx(idx);
  };
  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorElRef}>
        <Button style={{ height: '34px' }}>{OPTIONS[selectedIdx].title}</Button>
        <Button onClick={openMenu}>
          <ArrowDownIcon color="white" size={20} />
        </Button>
      </ButtonGroup>
      <Menu
        anchorElRef={anchorElRef}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        menuOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        {OPTIONS.map((option, idx) => {
          return (
            <MenuItem
              key={option.key}
              selected={selectedIdx === idx}
              onClick={() => selectMenu(idx)}
            >
              {option.title}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};
