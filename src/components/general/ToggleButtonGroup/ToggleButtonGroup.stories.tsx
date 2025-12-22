import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleButtonGroup from './ToggleButtonGroup';
import { ToggleButton, ValueType } from '@/components/general/ToggleButton';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { FormatAlignLeftIcon } from '@/components/icons/FormatAlignLeftIcon';
import { FormatAlignCenterIcon } from '@/components/icons/FormatAlignCenterIcon';
import { FormatAlignRightIcon } from '@/components/icons/FormatAlignRightIcon';
import { FormatAlignJustifyIcon } from '@/components/icons/FormatAlignJustifyIcon';
import { FormatBoldIcon } from '@/components/icons/FormatBoldIcon';
import { FormatItalicIcon } from '@/components/icons/FormatItalicIcon';
import { FormatUnderlinedIcon } from '@/components/icons/FormatUnderlinedIcon';

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  argTypes: {
    children: {
      description: 'ToggleButton 컴포넌트들',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    defaultValue: {
      description: '초기 selected value',
      table: {
        type: {
          summary: `string | number | boolean | Array<string | number | boolean> | null`
        }
      }
    },
    onChange: {
      description: 'selected value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: React.MouseEvent, value: string | number | boolean | Array<string | number | boolean> | null) => void`
        }
      }
    },
    orientation: {
      description: 'toggle buttons 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    value: {
      description: 'selected value',
      table: {
        type: {
          summary: `string | number | boolean | Array<string | number | boolean> | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

const ALIGNMENT_ITEMS = [
  { value: 'left-alignment', icon: <FormatAlignLeftIcon color="gray-500" /> },
  {
    value: 'center-alignment',
    icon: <FormatAlignCenterIcon color="gray-500" />
  },
  { value: 'right-alignment', icon: <FormatAlignRightIcon color="gray-500" /> },
  {
    value: 'justify-alignment',
    icon: <FormatAlignJustifyIcon color="gray-500" />
  }
];

const FONT_ITEMS = [
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

const ExclusiveControlledTemplate = () => {
  const ITEMS = [
    { value: 'left', icon: <FormatAlignLeftIcon color="gray-500" /> },
    {
      value: 'center',
      icon: <FormatAlignCenterIcon color="gray-500" />
    },
    {
      value: 'right',
      icon: <FormatAlignRightIcon color="gray-500" />
    },
    {
      value: 'justify',
      icon: <FormatAlignJustifyIcon color="gray-500" />
    }
  ];
  const [selectedValue, setSelectedValue] = useState<ValueType | null>(null);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    setSelectedValue(newValue as ValueType | null);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Selected value: {String(selectedValue)}</Text>
      <ToggleButtonGroup
        value={selectedValue}
        onChange={handleChange}
        aria-label="text alignment"
      >
        {ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

const MultipleControlledTemplate = () => {
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
  const [selectedValue, setSelectedValue] = useState<Array<ValueType>>([]);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    setSelectedValue(newValue as Array<ValueType>);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Selected value: {selectedValue.join(', ')}</Text>
      <ToggleButtonGroup
        value={selectedValue}
        onChange={handleChange}
        aria-label="text style"
      >
        {ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

const ExclusiveSelectAtLeastOneTemplate = () => {
  const ITEMS = [
    { value: 'left', icon: <FormatAlignLeftIcon color="gray-500" /> },
    {
      value: 'center',
      icon: <FormatAlignCenterIcon color="gray-500" />
    },
    {
      value: 'right',
      icon: <FormatAlignRightIcon color="gray-500" />
    },
    {
      value: 'justify',
      icon: <FormatAlignJustifyIcon color="gray-500" />
    }
  ];
  const [selectedValue, setSelectedValue] = useState<ValueType>('left');

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if (newValue !== null) setSelectedValue(newValue as ValueType);
  };

  return (
    <ToggleButtonGroup
      value={selectedValue}
      onChange={handleChange}
      aria-label="text alignment"
    >
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const MultipleSelectAtLeastOneTemplate = () => {
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
  const [selectedValue, setSelectedValue] = useState<Array<ValueType>>([
    'bold',
    'italic'
  ]);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if ((newValue as Array<ValueType>).length > 0)
      setSelectedValue(newValue as Array<ValueType>);
  };

  return (
    <ToggleButtonGroup
      value={selectedValue}
      onChange={handleChange}
      aria-label="text style"
    >
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const BasicToggleButtonGroup: Story = {
  render: (args) => (
    <ToggleButtonGroup aria-label="text alignment" {...args}>
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const ExclusiveDefaultValue: Story = {
  render: (args) => (
    <ToggleButtonGroup
      defaultValue="left-alignment"
      aria-label="text alignment"
      {...args}
    >
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const MultipleDefaultValue: Story = {
  render: (args) => (
    <ToggleButtonGroup
      defaultValue={['bold', 'italic']}
      aria-label="text style"
      {...args}
    >
      {FONT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const ExclusiveControlled: Story = {
  render: () => <ExclusiveControlledTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ExclusiveControlledTemplate = () => {
  const ITEMS = [
    { value: 'left', icon: <FormatAlignLeftIcon color="gray-500" /> },
    {
      value: 'center',
      icon: <FormatAlignCenterIcon color="gray-500" />
    },
    {
      value: 'right',
      icon: <FormatAlignRightIcon color="gray-500" />
    },
    {
      value: 'justify',
      icon: <FormatAlignJustifyIcon color="gray-500" />
    }
  ];
  const [selectedValue, setSelectedValue] = useState<ValueType | null>(null);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    setSelectedValue(newValue as ValueType | null);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Selected value: {String(selectedValue)}</Text>
      <ToggleButtonGroup
        value={selectedValue}
        onChange={handleChange}
        aria-label="text alignment"
      >
        {ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const MultipleControlled: Story = {
  render: () => <MultipleControlledTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultipleControlledTemplate = () => {
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
  const [selectedValue, setSelectedValue] = useState<Array<ValueType>>([]);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    setSelectedValue(newValue as Array<ValueType>);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Selected value: {selectedValue.join(', ')}</Text>
      <ToggleButtonGroup
        value={selectedValue}
        onChange={handleChange}
        aria-label="text style"
      >
        {ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Orientation: Story = {
  render: (args) => (
    <ToggleButtonGroup
      orientation="vertical"
      aria-label="text alignment"
      {...args}
    >
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const Color: Story = {
  render: (args) => (
    <ToggleButtonGroup
      defaultValue="left-alignment"
      color="tertiary"
      aria-label="text alignment"
      {...args}
    >
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <ToggleButtonGroup size="sm" aria-label="text alignment" {...args}>
        {ALIGNMENT_ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup size="md" aria-label="text alignment" {...args}>
        {ALIGNMENT_ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup size="lg" aria-label="text alignment" {...args}>
        {ALIGNMENT_ITEMS.map(({ value, icon }) => (
          <ToggleButton key={value} value={value} aria-label={value}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  )
};

export const OverlayEffect: Story = {
  render: (args) => (
    <ToggleButtonGroup disableOverlay aria-label="text alignment" {...args}>
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <ToggleButtonGroup
      rippleStartLocation="center"
      aria-label="text alignment"
      {...args}
    >
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <ToggleButtonGroup disabled aria-label="text alignment" {...args}>
      {ALIGNMENT_ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
};

export const ExclusiveSelectAtLeastOne: Story = {
  render: () => <ExclusiveSelectAtLeastOneTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ExclusiveSelectAtLeastOneTemplate = () => {
  const ITEMS = [
    { value: 'left', icon: <FormatAlignLeftIcon color="gray-500" /> },
    {
      value: 'center',
      icon: <FormatAlignCenterIcon color="gray-500" />
    },
    {
      value: 'right',
      icon: <FormatAlignRightIcon color="gray-500" />
    },
    {
      value: 'justify',
      icon: <FormatAlignJustifyIcon color="gray-500" />
    }
  ];
  const [selectedValue, setSelectedValue] = useState<ValueType>('left');

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if (newValue !== null) setSelectedValue(newValue as ValueType);
  };

  return (
    <ToggleButtonGroup
      value={selectedValue}
      onChange={handleChange}
      aria-label="text alignment"
    >
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};`.trim()
      }
    }
  }
};

export const MultipleSelectAtLeastOne: Story = {
  render: () => <MultipleSelectAtLeastOneTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultipleSelectAtLeastOneTemplate = () => {
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
  const [selectedValue, setSelectedValue] = useState<Array<ValueType>>([
    'bold',
    'italic'
  ]);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if ((newValue as Array<ValueType>).length > 0)
      setSelectedValue(newValue as Array<ValueType>);
  };

  return (
    <ToggleButtonGroup
      value={selectedValue}
      onChange={handleChange}
      aria-label="text style"
    >
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};`.trim()
      }
    }
  }
};
