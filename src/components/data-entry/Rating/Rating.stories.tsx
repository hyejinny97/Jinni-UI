import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '@/components/data-entry/Rating';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';
import { StarIcon } from '@/components/icons/StarIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { FavoriteBorderIcon } from '@/components/icons/FavoriteBorderIcon';

const meta: Meta<typeof Rating> = {
  component: Rating,
  argTypes: {
    color: {
      description: 'filled icon 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'yellow-500'` }
      }
    },
    defaultValue: {
      description: 'rating의 기본 value'
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      defaultValue: { summary: 'false' }
    },
    emptyIcon: {
      description: '채워지지 않았을 때의 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: `<StarBorderIcon />` }
      }
    },
    filledIcon: {
      description: '채워졌을 때의 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: `<StarIcon />` }
      }
    },
    getLabelText: {
      description:
        '현재 rating value에 대한 사용자 친화적인 이름을 제공하는 함수',
      table: {
        type: { summary: '(value: number) => string' },
        defaultValue: {
          summary: "(value: number) => `${value} Star${value > 1 ? 's' : ''}`"
        }
      }
    },
    max: {
      description: 'rating value 최댓값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `5` }
      }
    },
    name: {
      description: 'rating name',
      table: {
        type: { summary: 'string' }
      }
    },
    onChange: {
      description: 'rating value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: React.ChangeEvent<HTMLInputElement>, value: number) => void'
        }
      }
    },
    onHoverChange: {
      description: 'hover value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.SyntheticEvent, value: number) => void'
        }
      }
    },
    readOnly: {
      description:
        'true이면, hover effect가 비활성화되고 value를 변경할 수 없음',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    size: {
      description: 'rating 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    step: {
      description: 'value step',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `1` }
      }
    },
    value: {
      description: 'rating value'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Rating>;

const LabelTextTemplate = () => {
  const labels: { [key: number]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
  };

  const getLabelText = (value: number) =>
    `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;

  return <Rating name="score" getLabelText={getLabelText} />;
};

const ControlledRatingTemplate = () => {
  const [value, setValue] = useState(3);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return <Rating value={value} onChange={handleChange} />;
};

const HoverFeedbackTemplate = () => {
  const [value, setValue] = useState(3);
  const [hoverValue, setHoverValue] = useState(0);

  const handleValueChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };
  const handleHoverChange = (_: React.MouseEvent, newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  return (
    <>
      <Text style={{ color: 'primary', fontWeight: 700 }}>
        score: {value} star
      </Text>
      <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
        <Rating
          value={value}
          onChange={handleValueChange}
          onHoverChange={handleHoverChange}
        />
        <span>{hoverValue}</span>
      </Stack>
    </>
  );
};

export const BasicRating: Story = {
  render: () => <Rating name="score" required />
};

export const LabelText: Story = {
  render: () => <LabelTextTemplate />
};

export const DefaultValue: Story = {
  render: () => <Rating defaultValue={3} />
};

export const ControlledRating: Story = {
  render: () => <ControlledRatingTemplate />
};

export const HoverFeedback: Story = {
  render: () => <HoverFeedbackTemplate />
};

export const Step: Story = {
  render: () => (
    <Stack spacing={20}>
      <Rating defaultValue={2.5} step={0.5} />
      <Rating defaultValue={3} step={0.1} />
    </Stack>
  )
};

export const MaximumValue: Story = {
  render: () => <Rating defaultValue={3} max={10} />
};

export const Color: Story = {
  render: () => <Rating defaultValue={3} color="primary" />
};

export const CustomizeIcon: Story = {
  render: () => (
    <Stack spacing={20}>
      <Rating defaultValue={3} emptyIcon={<StarIcon />} />
      <Rating
        defaultValue={3}
        filledIcon={<FavoriteIcon />}
        emptyIcon={<FavoriteBorderIcon />}
        color="red"
      />
    </Stack>
  )
};

export const ReadOnly: Story = {
  render: () => <Rating defaultValue={3} readOnly />
};

export const Disabled: Story = {
  render: () => <Rating defaultValue={3} disabled />
};

export const Size: Story = {
  render: () => (
    <Stack spacing={20}>
      <Rating defaultValue={3} size="sm" />
      <Rating defaultValue={3} size="md" />
      <Rating defaultValue={3} size="lg" />
    </Stack>
  )
};
