import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { Stack } from '@/components/layout/Stack';
import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import { BookmarkBorderIcon } from '@/components/icons/BookmarkBorderIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { FavoriteBorderIcon } from '@/components/icons/FavoriteBorderIcon';
import { CheckboxLabel } from '@/components/data-entry/CheckboxLabel';
import { SquareIcon } from '@/components/icons/SquareIcon';

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
      description: 'true이면, 기본적으로 check 됨'
    },
    disabled: {
      description: 'true이면, 비활성화 됨'
    },
    disableRipple: {
      description: 'true이면, ripple effect가 사라짐'
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
    name: {
      description: 'checkbox name',
      type: 'string'
    },
    onChange: {
      description: 'checked/unchecked state가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void'
        }
      }
    },
    required: {
      description: 'true이면, required 처리 됨',
      type: 'boolean'
    },
    size: {
      description: 'checkbox 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'checkbox value',
      table: {
        type: { summary: `any` },
        defaultValue: { summary: `'on'` }
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

  return <Checkbox checked={checked} onChange={handleChange} />;
};

const IndeterminateTemplate = ({ ...props }) => {
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
      <CheckboxLabel label="Parent">
        <Checkbox
          checked={checkedList[0] && checkedList[1]}
          indeterminate={checkedList[0] !== checkedList[1]}
          onChange={handleParentChange}
          {...props}
        />
      </CheckboxLabel>
      <Stack style={{ marginLeft: 20 }}>
        <CheckboxLabel label="Child1">
          <Checkbox
            name="child"
            value="child1"
            checked={checkedList[0]}
            onChange={handleChild1Change}
            {...props}
          />
        </CheckboxLabel>
        <CheckboxLabel label="Child2">
          <Checkbox
            name="child"
            value="child2"
            checked={checkedList[1]}
            onChange={handleChild2Change}
            {...props}
          />
        </CheckboxLabel>
      </Stack>
    </>
  );
};

export const BasicCheckbox: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Checkbox name="color" value="red" {...args} />
      <Checkbox name="color" value="red" disableRipple {...args} />
    </Stack>
  )
};

export const CheckedByDefault: Story = {
  render: (args) => <Checkbox defaultChecked {...args} />
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

export const Icon: Story = {
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

export const ControlledCheckbox: Story = {
  render: (args) => <ControlledCheckboxTemplate {...args} />
};

export const DefaultIndeterminate: Story = {
  render: (args) => <IndeterminateTemplate {...args} />
};

export const IndeterminateIcon: Story = {
  render: (args) => (
    <IndeterminateTemplate indeterminateIcon={<SquareIcon />} {...args} />
  )
};
