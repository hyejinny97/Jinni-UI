import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { Stack } from '@/components/layout/Stack';
import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import { BookmarkBorderIcon } from '@/components/icons/BookmarkBorderIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { FavoriteBorderIcon } from '@/components/icons/FavoriteBorderIcon';
import { Label } from '@/components/data-entry/Label';
import { SquareIcon } from '@/components/icons/SquareIcon';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  argTypes: {
    checked: {
      description: 'true이면, check 됨'
    },
    checkedIcon: {
      description: 'checked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<CheckBoxIcon />' }
      }
    },
    color: {
      description: 'checkbox 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultChecked: {
      description: 'true이면, 기본적으로 check 됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
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
        defaultValue: { summary: '<CheckBoxOutlineBlankIcon />' }
      }
    },
    indeterminate: {
      description: 'true이면, indeterminate check 됨'
    },
    indeterminateIcon: {
      description: 'indeterminate icon',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<IndeterminateCheckIcon />' }
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
      description: 'checkbox 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
        defaultValue: { summary: `'md'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const ControlledCheckboxTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>State: {checked ? 'Checked' : 'Unchecked'}</Text>
      <Checkbox checked={checked} onChange={handleChange} />
    </Stack>
  );
};

const BasicIndeterminateTemplate = () => {
  const [checkedList, setCheckedList] = useState([false, false]);

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, e.target.checked]);
  };
  const handleChild1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, checkedList[1]]);
  };
  const handleChild2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([checkedList[0], e.target.checked]);
  };

  return (
    <>
      <Label content="Parent">
        <Checkbox
          checked={checkedList[0] && checkedList[1]}
          indeterminate={checkedList[0] !== checkedList[1]}
          onChange={handleParentChange}
        />
      </Label>
      <Stack style={{ marginLeft: 20 }}>
        <Label content="Child1">
          <Checkbox
            name="child"
            value="child1"
            checked={checkedList[0]}
            onChange={handleChild1Change}
          />
        </Label>
        <Label content="Child2">
          <Checkbox
            name="child"
            value="child2"
            checked={checkedList[1]}
            onChange={handleChild2Change}
          />
        </Label>
      </Stack>
    </>
  );
};

const IndeterminateIconTemplate = () => {
  const [checkedList, setCheckedList] = useState([false, false]);

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, e.target.checked]);
  };
  const handleChild1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, checkedList[1]]);
  };
  const handleChild2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([checkedList[0], e.target.checked]);
  };

  return (
    <>
      <Label content="Parent">
        <Checkbox
          checked={checkedList[0] && checkedList[1]}
          indeterminate={checkedList[0] !== checkedList[1]}
          indeterminateIcon={<SquareIcon />}
          onChange={handleParentChange}
        />
      </Label>
      <Stack style={{ marginLeft: 20 }}>
        <Label content="Child1">
          <Checkbox
            name="child"
            value="child1"
            checked={checkedList[0]}
            onChange={handleChild1Change}
          />
        </Label>
        <Label content="Child2">
          <Checkbox
            name="child"
            value="child2"
            checked={checkedList[1]}
            onChange={handleChild2Change}
          />
        </Label>
      </Stack>
    </>
  );
};

const CheckboxWithFormTemplate = () => {
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const colors = formData.getAll('color');
    const fruits = formData.getAll('fruit');
    if (colors.length > 0) {
      setError(false);
      alert(
        `좋아하는 색상: ${colors.join(', ')}\n좋아하는 과일: ${fruits.join(', ')}`
      );
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
              <Checkbox name="color" value="red" />
            </Label>
            <Label content="노란색">
              <Checkbox name="color" value="yellow" />
            </Label>
            <Label content="초록색">
              <Checkbox name="color" value="green" />
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
              <Checkbox name="fruit" value="apple" />
            </Label>
            <Label content="바나나">
              <Checkbox name="fruit" value="banana" />
            </Label>
            <Label content="수박">
              <Checkbox name="fruit" value="watermelon" />
            </Label>
          </Stack>
        </Box>
        <Button fullWidth>제출</Button>
      </Stack>
    </form>
  );
};

export const BasicCheckbox: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox {...args} />
      <Checkbox defaultChecked {...args} />
    </Stack>
  )
};

export const ControlledCheckbox: Story = {
  render: () => <ControlledCheckboxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledCheckboxTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>State: {checked ? 'Checked' : 'Unchecked'}</Text>
      <Checkbox checked={checked} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeIcon: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox
        icon={<FavoriteBorderIcon />}
        checkedIcon={<FavoriteIcon />}
        {...args}
      />
      <Checkbox
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
        {...args}
      />
    </Stack>
  )
};

export const BasicIndeterminate: Story = {
  render: () => <BasicIndeterminateTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicIndeterminateTemplate = () => {
  const [checkedList, setCheckedList] = useState([false, false]);

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, e.target.checked]);
  };
  const handleChild1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, checkedList[1]]);
  };
  const handleChild2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([checkedList[0], e.target.checked]);
  };

  return (
    <>
      <Label content="Parent">
        <Checkbox
          checked={checkedList[0] && checkedList[1]}
          indeterminate={checkedList[0] !== checkedList[1]}
          onChange={handleParentChange}
        />
      </Label>
      <Stack style={{ marginLeft: 20 }}>
        <Label content="Child1">
          <Checkbox
            name="child"
            value="child1"
            checked={checkedList[0]}
            onChange={handleChild1Change}
          />
        </Label>
        <Label content="Child2">
          <Checkbox
            name="child"
            value="child2"
            checked={checkedList[1]}
            onChange={handleChild2Change}
          />
        </Label>
      </Stack>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const IndeterminateIcon: Story = {
  render: () => <IndeterminateIconTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const IndeterminateIconTemplate = () => {
  const [checkedList, setCheckedList] = useState([false, false]);

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, e.target.checked]);
  };
  const handleChild1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([e.target.checked, checkedList[1]]);
  };
  const handleChild2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedList([checkedList[0], e.target.checked]);
  };

  return (
    <>
      <Label content="Parent">
        <Checkbox
          checked={checkedList[0] && checkedList[1]}
          indeterminate={checkedList[0] !== checkedList[1]}
          indeterminateIcon={<SquareIcon />}
          onChange={handleParentChange}
        />
      </Label>
      <Stack style={{ marginLeft: 20 }}>
        <Label content="Child1">
          <Checkbox
            name="child"
            value="child1"
            checked={checkedList[0]}
            onChange={handleChild1Change}
          />
        </Label>
        <Label content="Child2">
          <Checkbox
            name="child"
            value="child2"
            checked={checkedList[1]}
            onChange={handleChild2Change}
          />
        </Label>
      </Stack>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const CheckboxWithForm: Story = {
  render: () => <CheckboxWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CheckboxWithFormTemplate = () => {
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const colors = formData.getAll('color');
    const fruits = formData.getAll('fruit');
    if (colors.length > 0) {
      setError(false);
      alert(
        \`좋아하는 색상: \${colors.join(', ')}\\n좋아하는 과일: \${fruits.join(', ')}\`
      );
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
              <Checkbox name="color" value="red" />
            </Label>
            <Label content="노란색">
              <Checkbox name="color" value="yellow" />
            </Label>
            <Label content="초록색">
              <Checkbox name="color" value="green" />
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
              <Checkbox name="fruit" value="apple" />
            </Label>
            <Label content="바나나">
              <Checkbox name="fruit" value="banana" />
            </Label>
            <Label content="수박">
              <Checkbox name="fruit" value="watermelon" />
            </Label>
          </Stack>
        </Box>
        <Button fullWidth>제출</Button>
      </Stack>
    </form>
  );
};`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox disabled {...args} />
      <Checkbox defaultChecked disabled {...args} />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox size="sm" defaultChecked {...args} />
      <Checkbox size="md" defaultChecked {...args} />
      <Checkbox size="lg" defaultChecked {...args} />
      <Checkbox size="50px" defaultChecked {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox color="error" defaultChecked {...args} />
      <Checkbox color="yellow-500" defaultChecked {...args} />
      <Checkbox color="green" defaultChecked {...args} />
      <Checkbox color="rgb(10, 20, 30)" defaultChecked {...args} />
    </Stack>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox rippleStartLocation="clicked" {...args} />
      <Checkbox disableRipple {...args} />
    </Stack>
  )
};
