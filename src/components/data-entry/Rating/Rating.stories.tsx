import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '@/components/data-entry/Rating';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';
import { StarIcon } from '@/components/icons/StarIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { FavoriteBorderIcon } from '@/components/icons/FavoriteBorderIcon';
import { Button } from '@/components/general/Button';

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
      description: '초기 rating value',
      defaultValue: { summary: `0` }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      defaultValue: { summary: 'false' }
    },
    disableHoverColored: {
      description: 'true이면, hover 시 연하게 colored되는 효과가 비활성화 됨'
    },
    disableHoverScaled: {
      description: 'true이면, hover 시 scaled되는 효과가 비활성화 됨'
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
          summary: '(event: MouseEvent, value: number) => void'
        }
      }
    },
    readOnly: {
      description: 'true이면, 읽기만 가능',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    size: {
      description: 'rating 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
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

const ControlledRatingTemplate = () => {
  const [value, setValue] = useState(3);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin style={{ fontWeight: 700 }}>
        score: {value} star
      </Text>
      <Rating value={value} onChange={handleChange} />
    </Stack>
  );
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
  const handleHoverChange = (_: MouseEvent, newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin style={{ fontWeight: 700 }}>
        score: {value} star
      </Text>
      <Text noMargin style={{ fontWeight: 400 }}>
        hovered value: {hoverValue} star
      </Text>
      <Rating
        value={value}
        onChange={handleValueChange}
        onHoverChange={handleHoverChange}
      />
    </Stack>
  );
};

const RatingWithFormTemplate = () => {
  const LABELS: { [key: number]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
  };

  const getLabelText = (value: number) =>
    `${value} Star${value !== 1 ? 's' : ''}, ${LABELS[value]}`;

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const score = formData.get('score');
        alert(`score: ${score}`);
      }}
    >
      <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
        <Rating name="score" getLabelText={getLabelText} />
        <Button>제출</Button>
      </Stack>
    </form>
  );
};

export const BasicRating: Story = {
  render: (args) => (
    <Stack>
      <Rating {...args} />
      <Rating defaultValue={3} {...args} />
    </Stack>
  )
};

export const ControlledRating: Story = {
  render: () => <ControlledRatingTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledRatingTemplate = () => {
  const [value, setValue] = useState(3);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin style={{ fontWeight: 700 }}>
        score: {value} star
      </Text>
      <Rating value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const HoverFeedback: Story = {
  render: () => <HoverFeedbackTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const HoverFeedbackTemplate = () => {
  const [value, setValue] = useState(3);
  const [hoverValue, setHoverValue] = useState(0);

  const handleValueChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };
  const handleHoverChange = (_: MouseEvent, newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin style={{ fontWeight: 700 }}>
        score: {value} star
      </Text>
      <Text noMargin style={{ fontWeight: 400 }}>
        hovered value: {hoverValue} star
      </Text>
      <Rating
        value={value}
        onChange={handleValueChange}
        onHoverChange={handleHoverChange}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const RatingWithForm: Story = {
  render: () => <RatingWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const RatingWithFormTemplate = () => {
  const LABELS: { [key: number]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
  };

  const getLabelText = (value: number) =>
    \`\${value} Star\${value !== 1 ? 's' : ''}, \${LABELS[value]}\`;

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const score = formData.get('score');
        alert(\`score: \${score}\`);
      }}
    >
      <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
        <Rating name="score" getLabelText={getLabelText} />
        <Button>제출</Button>
      </Stack>
    </form>
  );
};`.trim()
      }
    }
  }
};

export const Step: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Rating defaultValue={2.5} step={0.5} {...args} />
      <Rating defaultValue={3} step={0.1} {...args} />
    </Stack>
  )
};

export const MaximumValue: Story = {
  render: (args) => <Rating defaultValue={3} max={3} {...args} />
};

export const Color: Story = {
  render: (args) => <Rating defaultValue={3} color="tertiary" {...args} />
};

export const CustomizeIcon: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Rating defaultValue={3} emptyIcon={<StarIcon />} {...args} />
      <Rating
        defaultValue={3}
        filledIcon={<FavoriteIcon />}
        emptyIcon={<FavoriteBorderIcon />}
        color="red"
        {...args}
      />
    </Stack>
  )
};

export const ReadOnly: Story = {
  render: (args) => <Rating defaultValue={3} readOnly {...args} />
};

export const Disabled: Story = {
  render: (args) => <Rating defaultValue={3} disabled {...args} />
};

export const Size: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Rating defaultValue={3} size="sm" {...args} />
      <Rating defaultValue={3} size="md" {...args} />
      <Rating defaultValue={3} size="lg" {...args} />
      <Rating defaultValue={3} size="50px" {...args} />
    </Stack>
  )
};

export const DisableHoverEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Rating disableHoverColored {...args} />
      <Rating disableHoverScaled {...args} />
    </Stack>
  )
};
