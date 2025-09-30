import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@/components/data-display/Chip';
import { Avatar } from '@/components/data-display/Avatar';
import { Stack } from '@/components/layout/Stack';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CancelIcon } from '@/components/icons/CancelIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import { ColorType } from '@/types/color';
import dogImage from '@/assets/images/dog-1.jpg';

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    children: {
      description: 'chip content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'chip 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'gray-400'` }
      }
    },
    endAdornment: {
      description: 'content 뒤에 위치하는 부가 요소 (icon, avatar 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    shape: {
      description: 'chip 모양',
      table: {
        type: { summary: `'pill' | 'rounded'` },
        defaultValue: { summary: `'pill'` }
      }
    },
    size: {
      description: 'chip 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    startAdornment: {
      description: 'content 앞에 위치하는 부가 요소 (icon, avatar 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    variant: {
      description: 'chip 종류',
      table: {
        type: { summary: `'filled' | 'subtle-filled' | 'outlined' | 'text'` },
        defaultValue: { summary: `'outlined'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Chip>;

const DeletableChipTemplate = () => {
  const handleDelete = () => {
    alert('삭제 버튼 클릭됨');
  };

  return (
    <Chip
      endAdornment={
        <ButtonBase
          onClick={handleDelete}
          disableOverlay
          disableRipple
          style={{ width: '100%', height: '100%' }}
        >
          <CancelIcon
            color="gray-700"
            style={{ width: '100%', height: '100%' }}
          />
        </ButtonBase>
      }
    >
      Deletable chip
    </Chip>
  );
};

const ClickableDeletableChipTemplate = () => {
  const handleDelete = () => {
    alert('삭제 버튼 클릭됨');
  };

  return (
    <Chip
      as={ButtonBase}
      disableRipple
      endAdornment={
        <ButtonBase
          onClick={handleDelete}
          disableOverlay
          disableRipple
          style={{ width: '100%', height: '100%' }}
        >
          <CancelIcon
            color="gray-700"
            style={{ width: '100%', height: '100%' }}
          />
        </ButtonBase>
      }
    >
      Clickable and deletable chip
    </Chip>
  );
};

const IngredientChips = () => {
  const INGREDIENTS = ['Cheese', 'Vanilla', 'Chocolate', 'Egg'];
  const [loadingState, setLoadingState] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggle = (ingredient: string) => {
    setLoadingState((prev) => [...prev, ingredient]);
    const timeoutId = setTimeout(() => {
      if (selectedValues.includes(ingredient)) {
        setSelectedValues((prev) => prev.filter((val) => val !== ingredient));
      } else {
        setSelectedValues((prev) => [...prev, ingredient]);
      }
      setLoadingState((prev) => prev.filter((val) => val !== ingredient));
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Stack direction="row" spacing={10}>
      {INGREDIENTS.map((ingredient) => {
        const isSelected = selectedValues.includes(ingredient);
        const isLoading = loadingState.includes(ingredient);
        let startAdornment: React.ReactNode = <AddIcon color="gray-400" />;
        if (isLoading) {
          startAdornment = (
            <CircularProgress
              progressColor={isSelected ? 'white' : 'gray-400'}
            />
          );
        } else if (isSelected) {
          startAdornment = <CheckIcon color="white" />;
        }
        return (
          <Chip
            as={ButtonBase}
            onClick={() => toggle(ingredient)}
            startAdornment={startAdornment}
            variant={isSelected ? 'filled' : 'outlined'}
            color={(isSelected ? 'primary' : 'gray-400') as ColorType}
            overlayColor={isSelected ? 'white' : 'black'}
            rippleColor={isSelected ? 'white' : 'black'}
            disabled={isLoading}
          >
            {ingredient}
          </Chip>
        );
      })}
    </Stack>
  );
};

export const BasicChip: Story = {
  render: (args) => <Chip {...args}>Chip</Chip>
};

export const AvatarChip: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={30}>
        <Chip
          startAdornment={<Avatar src={dogImage} alt="강아지 사진" />}
          {...args}
        >
          Avatar chip
        </Chip>
        <Chip
          startAdornment={<Avatar style={{ fontSize: '10px' }}>N</Avatar>}
          {...args}
        >
          Avatar chip
        </Chip>
        <Chip
          startAdornment={
            <Avatar style={{ backgroundColor: 'yellow-600' }}>
              <PersonIcon color="white" />
            </Avatar>
          }
          {...args}
        >
          Avatar chip
        </Chip>
      </Stack>
    );
  }
};

export const IconChip: Story = {
  render: (args) => (
    <Chip startAdornment={<PersonIcon color="primary" />} {...args}>
      Icon chip
    </Chip>
  )
};

<Chip as={ButtonBase}>Clickable chip</Chip>;

export const ClickableChip: Story = {
  render: () => <Chip as={ButtonBase}>Clickable chip</Chip>
};

export const DeletableChip: Story = {
  render: (args) => <DeletableChipTemplate {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const DeletableChipTemplate = () => {
  const handleDelete = () => {
    alert('삭제 버튼 클릭됨');
  };

  return (
    <Chip
      endAdornment={
        <ButtonBase
          onClick={handleDelete}
          disableOverlay
          disableRipple
          style={{ width: '100%', height: '100%' }}
        >
          <CancelIcon
            color="gray-700"
            style={{ width: '100%', height: '100%' }}
          />
        </ButtonBase>
      }
    >
      Deletable chip
    </Chip>
  );
};`.trim()
      }
    }
  }
};

export const ClickableDeletableChip: Story = {
  render: (args) => <ClickableDeletableChipTemplate {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const ClickableDeletableChipTemplate = () => {
  const handleDelete = () => {
    alert('삭제 버튼 클릭됨');
  };

  return (
    <Chip
      as={ButtonBase}
      disableRipple
      endAdornment={
        <ButtonBase
          onClick={handleDelete}
          disableOverlay
          disableRipple
          style={{ width: '100%', height: '100%' }}
        >
          <CancelIcon
            color="gray-700"
            style={{ width: '100%', height: '100%' }}
          />
        </ButtonBase>
      }
    >
      Clickable and deletable chip
    </Chip>
  );
};`.trim()
      }
    }
  }
};

export const LinkChip: Story = {
  render: () => (
    <Chip as={ButtonBase} href="#">
      Link chip
    </Chip>
  )
};

export const ChipVariant: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={30}>
        <Chip variant="filled" {...args}>
          Filled chip
        </Chip>
        <Chip variant="subtle-filled" {...args}>
          Subtle-filled chip
        </Chip>
        <Chip variant="outlined" {...args}>
          Outlined chip
        </Chip>
        <Chip variant="text" {...args}>
          Text chip
        </Chip>
      </Stack>
    );
  }
};

export const ChipShape: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={30}>
        <Chip shape="pill" {...args}>
          Pilled chip
        </Chip>
        <Chip shape="rounded" {...args}>
          Rounded chip
        </Chip>
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={30}>
        {['secondary', 'yellow-400', 'green', '#159', 'rgb(100,100,100)'].map(
          (color) => (
            <Stack direction="row" spacing={30}>
              <Chip variant="filled" color={color} {...args}>
                chip
              </Chip>
              <Chip variant="subtle-filled" color={color} {...args}>
                chip
              </Chip>
              <Chip variant="outlined" color={color} {...args}>
                chip
              </Chip>
              <Chip variant="text" color={color} {...args}>
                chip
              </Chip>
            </Stack>
          )
        )}
      </Stack>
    );
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack spacing={30}>
        <Stack direction="row" spacing={30}>
          <Chip size="sm" {...args}>
            Small chip
          </Chip>
          <Chip size="md" {...args}>
            Medium chip
          </Chip>
          <Chip size="lg" {...args}>
            Large chip
          </Chip>
        </Stack>
        <Stack direction="row" spacing={30}>
          <Chip startAdornment={<PersonIcon />} size="sm" {...args}>
            Small chip
          </Chip>
          <Chip startAdornment={<PersonIcon />} size="md" {...args}>
            Medium chip
          </Chip>
          <Chip startAdornment={<PersonIcon />} size="lg" {...args}>
            Large chip
          </Chip>
        </Stack>
        <Stack direction="row" spacing={30}>
          <Chip
            startAdornment={<Avatar src={dogImage} alt="강아지 사진" />}
            size="sm"
            {...args}
          >
            Small chip
          </Chip>
          <Chip
            startAdornment={<Avatar src={dogImage} alt="강아지 사진" />}
            size="md"
            {...args}
          >
            Medium chip
          </Chip>
          <Chip
            startAdornment={<Avatar src={dogImage} alt="강아지 사진" />}
            size="lg"
            {...args}
          >
            Large chip
          </Chip>
        </Stack>
      </Stack>
    );
  }
};

export const Customization: Story = {
  render: (args) => <IngredientChips {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const IngredientChips = () => {
  const INGREDIENTS = ['Cheese', 'Vanilla', 'Chocolate', 'Egg'];
  const [loadingState, setLoadingState] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggle = (ingredient: string) => {
    setLoadingState((prev) => [...prev, ingredient]);
    const timeoutId = setTimeout(() => {
      if (selectedValues.includes(ingredient)) {
        setSelectedValues((prev) => prev.filter((val) => val !== ingredient));
      } else {
        setSelectedValues((prev) => [...prev, ingredient]);
      }
      setLoadingState((prev) => prev.filter((val) => val !== ingredient));
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Stack direction="row" spacing={10}>
      {INGREDIENTS.map((ingredient) => {
        const isSelected = selectedValues.includes(ingredient);
        const isLoading = loadingState.includes(ingredient);
        let startAdornment: React.ReactNode = <AddIcon color="gray-400" />;
        if (isLoading) {
          startAdornment = (
            <CircularProgress
              progressColor={isSelected ? 'white' : 'gray-400'}
            />
          );
        } else if (isSelected) {
          startAdornment = <CheckIcon color="white" />;
        }
        return (
          <Chip
            as={ButtonBase}
            onClick={() => toggle(ingredient)}
            variant={isSelected ? 'filled' : 'outlined'}
            color={(isSelected ? 'primary' : 'gray-400') as ColorType}
            startAdornment={startAdornment}
            overlayColor={isSelected ? 'white' : 'black'}
            rippleColor={isSelected ? 'white' : 'black'}
            disabled={isLoading}
          >
            {ingredient}
          </Chip>
        );
      })}
    </Stack>
  );
};`.trim()
      }
    }
  }
};
