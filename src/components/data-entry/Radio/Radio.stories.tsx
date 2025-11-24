import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import { Stack } from '@/components/layout/Stack';
import { Label } from '@/components/data-entry/Label';
import { RadioUncheckedIcon2 } from '@/components/icons/RadioUncheckedIcon2';
import { RadioCheckedIcon2 } from '@/components/icons/RadioCheckedIcon2';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof Radio> = {
  component: Radio,
  argTypes: {
    checked: {
      description: 'true이면, check 됨'
    },
    checkedIcon: {
      description: 'checked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<RadioButtonCheckedIcon />' }
      }
    },
    color: {
      description: 'checked radio 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화 됨'
    },
    disableRipple: {
      description: 'true이면, ripple effect가 비활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    icon: {
      description: 'unchecked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<RadioButtonUncheckedIcon />' }
      }
    },
    name: {
      description: 'input name',
      table: {
        type: { summary: 'string' }
      }
    },
    onChange: {
      description: 'checked state가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void'
        }
      }
    },
    required: {
      description: 'input required',
      table: {
        type: { summary: 'boolean' }
      }
    },
    rippleColor: {
      description: 'ripple 색상',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: { summary: `'black'` }
      }
    },
    rippleStartLocation: {
      description: 'ripple 시작점',
      table: {
        type: { summary: `'center' | 'clicked'` },
        defaultValue: { summary: `'center'` }
      }
    },
    size: {
      description: 'radio 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'input value',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Radio>;

const ControlledRadioTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <Stack>
      <Text>Checked color: {checkedValue}</Text>
      <Stack direction="row" spacing={20}>
        <Label content="빨간색">
          <Radio
            name="color"
            value="red"
            checked={checkedValue === 'red'}
            onChange={handleChange}
          />
        </Label>
        <Label content="노란색">
          <Radio
            name="color"
            value="yellow"
            checked={checkedValue === 'yellow'}
            onChange={handleChange}
          />
        </Label>
      </Stack>
    </Stack>
  );
};

const CustomizeIconTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <Stack>
      <Text>Checked color: {checkedValue}</Text>
      <Stack direction="row" spacing={20}>
        <Label content="빨간색">
          <Radio
            name="color"
            value="red"
            checked={checkedValue === 'red'}
            onChange={handleChange}
            icon={<RadioUncheckedIcon2 />}
            checkedIcon={<RadioCheckedIcon2 />}
          />
        </Label>
        <Label content="노란색">
          <Radio
            name="color"
            value="yellow"
            checked={checkedValue === 'yellow'}
            onChange={handleChange}
            icon={<RadioUncheckedIcon2 />}
            checkedIcon={<RadioCheckedIcon2 />}
          />
        </Label>
      </Stack>
    </Stack>
  );
};

const RadioWithFormTemplate = () => {
  const [checkedColor, setCheckedColor] = useState('');
  const [checkedFruit, setCheckedFruit] = useState('');
  const [error, setError] = useState(false);

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedColor(e.target.value);
  };
  const changeFruit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFruit(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('color');
    const fruit = formData.get('fruit');
    if (color) {
      setError(false);
      alert(`좋아하는 색상: ${color}\n좋아하는 과일: ${fruit}`);
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={15}>
        <Box as="fieldset">
          <Text as="legend" className="typo-title-medium">
            좋아하는 색상은? *
          </Text>
          <Stack direction="row" spacing={10}>
            <Label content="빨간색">
              <Radio
                name="color"
                value="red"
                checked={checkedColor === 'red'}
                onChange={changeColor}
                required
              />
            </Label>
            <Label content="노란색">
              <Radio
                name="color"
                value="yellow"
                checked={checkedColor === 'yellow'}
                onChange={changeColor}
              />
            </Label>
            <Label content="초록색">
              <Radio
                name="color"
                value="green"
                checked={checkedColor === 'green'}
                onChange={changeColor}
              />
            </Label>
          </Stack>
          {error && (
            <Text
              className="typo-label-medium"
              noMargin
              style={{ color: 'error' }}
            >
              반드시 체크해야 합니다.
            </Text>
          )}
        </Box>
        <Box as="fieldset">
          <Text as="legend" className="typo-title-medium">
            좋아하는 과일은?
          </Text>
          <Stack direction="row" spacing={10}>
            <Label content="사과">
              <Radio
                name="fruit"
                value="apple"
                checked={checkedFruit === 'apple'}
                onChange={changeFruit}
              />
            </Label>
            <Label content="바나나">
              <Radio
                name="fruit"
                value="banana"
                checked={checkedFruit === 'banana'}
                onChange={changeFruit}
              />
            </Label>
            <Label content="수박">
              <Radio
                name="fruit"
                value="watermelon"
                checked={checkedFruit === 'watermelon'}
                onChange={changeFruit}
              />
            </Label>
          </Stack>
        </Box>
        <Button fullWidth>제출</Button>
      </Stack>
    </form>
  );
};

export const ControlledRadio: Story = {
  render: () => <ControlledRadioTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledRadioTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <Stack>
      <Text>Checked color: {checkedValue}</Text>
      <Stack direction="row" spacing={20}>
        <Label content="빨간색">
          <Radio
            name="color"
            value="red"
            checked={checkedValue === 'red'}
            onChange={handleChange}
          />
        </Label>
        <Label content="노란색">
          <Radio
            name="color"
            value="yellow"
            checked={checkedValue === 'yellow'}
            onChange={handleChange}
          />
        </Label>
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeIcon: Story = {
  render: () => <CustomizeIconTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeIconTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <Stack>
      <Text>Checked color: {checkedValue}</Text>
      <Stack direction="row" spacing={20}>
        <Label content="빨간색">
          <Radio
            name="color"
            value="red"
            checked={checkedValue === 'red'}
            onChange={handleChange}
            icon={<RadioUncheckedIcon2 />}
            checkedIcon={<RadioCheckedIcon2 />}
          />
        </Label>
        <Label content="노란색">
          <Radio
            name="color"
            value="yellow"
            checked={checkedValue === 'yellow'}
            onChange={handleChange}
            icon={<RadioUncheckedIcon2 />}
            checkedIcon={<RadioCheckedIcon2 />}
          />
        </Label>
      </Stack>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const RadioWithForm: Story = {
  render: () => <RadioWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const RadioWithFormTemplate = () => {
  const [checkedColor, setCheckedColor] = useState('');
  const [checkedFruit, setCheckedFruit] = useState('');
  const [error, setError] = useState(false);

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedColor(e.target.value);
  };
  const changeFruit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFruit(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('color');
    const fruit = formData.get('fruit');
    if (color) {
      setError(false);
      alert(\`좋아하는 색상: \${color}\\n좋아하는 과일: \${fruit}\`);
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={15}>
        <Box as="fieldset">
          <Text as="legend" className="typo-title-medium">
            좋아하는 색상은? *
          </Text>
          <Stack direction="row" spacing={10}>
            <Label content="빨간색">
              <Radio
                name="color"
                value="red"
                checked={checkedColor === 'red'}
                onChange={changeColor}
                required
              />
            </Label>
            <Label content="노란색">
              <Radio
                name="color"
                value="yellow"
                checked={checkedColor === 'yellow'}
                onChange={changeColor}
              />
            </Label>
            <Label content="초록색">
              <Radio
                name="color"
                value="green"
                checked={checkedColor === 'green'}
                onChange={changeColor}
              />
            </Label>
          </Stack>
          {error && (
            <Text
              className="typo-label-medium"
              noMargin
              style={{ color: 'error' }}
            >
              반드시 체크해야 합니다.
            </Text>
          )}
        </Box>
        <Box as="fieldset">
          <Text as="legend" className="typo-title-medium">
            좋아하는 과일은?
          </Text>
          <Stack direction="row" spacing={10}>
            <Label content="사과">
              <Radio
                name="fruit"
                value="apple"
                checked={checkedFruit === 'apple'}
                onChange={changeFruit}
              />
            </Label>
            <Label content="바나나">
              <Radio
                name="fruit"
                value="banana"
                checked={checkedFruit === 'banana'}
                onChange={changeFruit}
              />
            </Label>
            <Label content="수박">
              <Radio
                name="fruit"
                value="watermelon"
                checked={checkedFruit === 'watermelon'}
                onChange={changeFruit}
              />
            </Label>
          </Stack>
        </Box>
        <Button fullWidth>제출</Button>
      </Stack>
    </form>
  );
};
`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio disabled {...args} />
      <Radio checked disabled {...args} />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio size="sm" checked {...args} />
      <Radio size="md" checked {...args} />
      <Radio size="lg" checked {...args} />
      <Radio size="50px" checked {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio color="error" checked {...args} />
      <Radio color="yellow-500" checked {...args} />
      <Radio color="green" checked {...args} />
      <Radio color="rgb(10, 20, 30)" checked {...args} />
    </Stack>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Radio rippleStartLocation="clicked" checked {...args} />
      <Radio disableRipple checked {...args} />
    </Stack>
  )
};
