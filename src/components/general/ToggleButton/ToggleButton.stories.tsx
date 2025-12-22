import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton, { ValueType } from './ToggleButton';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { FormatAlignLeftIcon } from '@/components/icons/FormatAlignLeftIcon';
import { FormatAlignCenterIcon } from '@/components/icons/FormatAlignCenterIcon';
import { FormatAlignRightIcon } from '@/components/icons/FormatAlignRightIcon';
import { FormatAlignJustifyIcon } from '@/components/icons/FormatAlignJustifyIcon';
import { FormatBoldIcon } from '@/components/icons/FormatBoldIcon';
import { FormatItalicIcon } from '@/components/icons/FormatItalicIcon';
import { FormatUnderlinedIcon } from '@/components/icons/FormatUnderlinedIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CloseIcon } from '@/components/icons/CloseIcon';

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  argTypes: {
    color: {
      description: 'selected toggle button의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'gray-500'` }
      }
    },
    defaultSelected: {
      description: '초기 selected 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    onChange: {
      description: 'selected state가 변경될 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.MouseEvent, selected: boolean) => void'
        }
      }
    },
    selected: {
      description: 'selected 여부',
      table: {
        type: { summary: 'boolean' }
      }
    },
    size: {
      description: 'toggle button의 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'toggle button을 구분하는 유일한 값',
      table: {
        type: { summary: `number | string | boolean` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

const ControlledToggleButtonTemplate = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (_: React.MouseEvent, selected: boolean) => {
    setSelected(selected);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Selected: {selected ? 'true' : 'false'}</Text>
      <ToggleButton
        value="left-alignment"
        selected={selected}
        onChange={handleChange}
      >
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
    </Stack>
  );
};

const AdornmentTemplate = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (_: React.MouseEvent, selected: boolean) => {
    setSelected(selected);
  };

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={handleChange}
      startAdornment={selected ? <CheckIcon /> : <CloseIcon />}
      style={{
        width: 'max-content',
        height: 'max-content',
        padding: '4px 16px'
      }}
    >
      {selected ? 'Selected' : 'Unselected'}
    </ToggleButton>
  );
};

const RadioButtonsTemplate = () => {
  const ITEMS = [
    { value: 'left-alignment', icon: <FormatAlignLeftIcon color="gray-500" /> },
    {
      value: 'center-alignment',
      icon: <FormatAlignCenterIcon color="gray-500" />
    },
    {
      value: 'right-alignment',
      icon: <FormatAlignRightIcon color="gray-500" />
    },
    {
      value: 'justify-alignment',
      icon: <FormatAlignJustifyIcon color="gray-500" />
    }
  ];
  const [selectedValue, setSelectedValue] =
    useState<ValueType>('left-alignment');

  const handleChange =
    (value: ValueType) => (_: React.MouseEvent, selected: boolean) => {
      if (selected) setSelectedValue(value);
    };

  return (
    <Stack direction="row" spacing={20}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton
          key={value}
          value={value}
          selected={selectedValue === value}
          onChange={handleChange(value)}
        >
          {icon}
        </ToggleButton>
      ))}
    </Stack>
  );
};

const CheckboxButtonsTemplate = () => {
  const ITEMS = [
    { value: 'bold', icon: <FormatBoldIcon color="gray-500" /> },
    {
      value: 'italic',
      icon: <FormatItalicIcon color="gray-500" />
    },
    {
      value: 'underlined',
      icon: <FormatUnderlinedIcon color="gray-500" />
    }
  ];
  const [selectedValues, setSelectedValues] = useState<Array<ValueType>>([]);

  const handleChange =
    (value: ValueType) => (_: React.MouseEvent, selected: boolean) => {
      if (selected) {
        setSelectedValues((prevValue) => [...prevValue, value]);
      } else {
        setSelectedValues((prevValue) =>
          prevValue.filter((val) => val !== value)
        );
      }
    };

  return (
    <Stack direction="row" spacing={20}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton
          key={value}
          value={value}
          selected={selectedValues.includes(value)}
          onChange={handleChange(value)}
        >
          {icon}
        </ToggleButton>
      ))}
    </Stack>
  );
};

export const BasicToggleButton: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ToggleButton value="left-alignment" {...args}>
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
      <ToggleButton value="left-alignment" defaultSelected {...args}>
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
    </Stack>
  )
};

export const ControlledToggleButton: Story = {
  render: () => <ControlledToggleButtonTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledToggleButtonTemplate = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (_: React.MouseEvent, selected: boolean) => {
    setSelected(selected);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Selected: {selected ? 'true' : 'false'}</Text>
      <ToggleButton
        value="left-alignment"
        selected={selected}
        onChange={handleChange}
      >
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: (args) => (
    <ToggleButton
      value="left-alignment"
      color="tertiary"
      defaultSelected
      {...args}
    >
      <FormatAlignLeftIcon color="gray-500" />
    </ToggleButton>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ alignItems: 'center' }}>
      <ToggleButton value="left-alignment" size="sm" {...args}>
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
      <ToggleButton value="left-alignment" size="md" {...args}>
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
      <ToggleButton value="left-alignment" size="lg" {...args}>
        <FormatAlignLeftIcon color="gray-500" />
      </ToggleButton>
    </Stack>
  )
};

export const Adornment: Story = {
  render: () => <AdornmentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AdornmentTemplate = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (_: React.MouseEvent, selected: boolean) => {
    setSelected(selected);
  };

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={handleChange}
      startAdornment={selected ? <CheckIcon /> : <CloseIcon />}
      style={{
        width: 'max-content',
        height: 'max-content',
        padding: '4px 16px'
      }}
    >
      {selected ? 'Selected' : 'Unselected'}
    </ToggleButton>
  );
};`.trim()
      }
    }
  }
};

export const Shape: Story = {
  render: (args) => (
    <ToggleButton value="left-alignment" shape="pill" {...args}>
      <FormatAlignLeftIcon color="gray-500" />
    </ToggleButton>
  )
};

export const OverlayEffect: Story = {
  render: (args) => (
    <ToggleButton value="left-alignment" disableOverlay {...args}>
      <FormatAlignLeftIcon color="gray-500" />
    </ToggleButton>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <ToggleButton value="left-alignment" rippleStartLocation="center" {...args}>
      <FormatAlignLeftIcon color="gray-500" />
    </ToggleButton>
  )
};

export const ElevationEffect: Story = {
  render: (args) => (
    <ToggleButton value="left-alignment" elevation={3} {...args}>
      <FormatAlignLeftIcon color="gray-500" />
    </ToggleButton>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <ToggleButton value="left-alignment" disabled {...args}>
      <FormatAlignLeftIcon color="gray-500" />
    </ToggleButton>
  )
};

export const RadioButtons: Story = {
  render: () => <RadioButtonsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const RadioButtonsTemplate = () => {
  const ITEMS = [
    { value: 'left-alignment', icon: <FormatAlignLeftIcon color="gray-500" /> },
    {
      value: 'center-alignment',
      icon: <FormatAlignCenterIcon color="gray-500" />
    },
    {
      value: 'right-alignment',
      icon: <FormatAlignRightIcon color="gray-500" />
    },
    {
      value: 'justify-alignment',
      icon: <FormatAlignJustifyIcon color="gray-500" />
    }
  ];
  const [selectedValue, setSelectedValue] =
    useState<ValueType>('left-alignment');

  const handleChange =
    (value: ValueType) => (_: React.MouseEvent, selected: boolean) => {
      if (selected) setSelectedValue(value);
    };

  return (
    <Stack direction="row" spacing={20}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton
          key={value}
          value={value}
          selected={selectedValue === value}
          onChange={handleChange(value)}
        >
          {icon}
        </ToggleButton>
      ))}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CheckboxButtons: Story = {
  render: () => <CheckboxButtonsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CheckboxButtonsTemplate = () => {
  const ITEMS = [
    { value: 'bold', icon: <FormatBoldIcon color="gray-500" /> },
    {
      value: 'italic',
      icon: <FormatItalicIcon color="gray-500" />
    },
    {
      value: 'underlined',
      icon: <FormatUnderlinedIcon color="gray-500" />
    }
  ];
  const [selectedValues, setSelectedValues] = useState<Array<ValueType>>([]);

  const handleChange =
    (value: ValueType) => (_: React.MouseEvent, selected: boolean) => {
      if (selected) {
        setSelectedValues((prevValue) => [...prevValue, value]);
      } else {
        setSelectedValues((prevValue) =>
          prevValue.filter((val) => val !== value)
        );
      }
    };

  return (
    <Stack direction="row" spacing={20}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton
          key={value}
          value={value}
          selected={selectedValues.includes(value)}
          onChange={handleChange(value)}
        >
          {icon}
        </ToggleButton>
      ))}
    </Stack>
  );
};`.trim()
      }
    }
  }
};
