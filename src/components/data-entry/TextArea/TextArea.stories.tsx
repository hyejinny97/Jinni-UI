import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Fraction } from '@/components/data-display/Fraction';
import { MailIcon } from '@/components/icons/MailIcon';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  argTypes: {
    defaultValue: {
      description: '초기 textarea value',
      table: {
        type: { summary: `string` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: 'false' }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: { summary: `(event: ChangeEvent) => void` }
      }
    },
    value: {
      description: 'textarea value',
      table: {
        type: { summary: `string` }
      }
    },
    maxRows: {
      description: '최대 rows 개수',
      type: 'number'
    },
    minRows: {
      description: '최소 rows 개수',
      type: 'number'
    },
    resize: {
      description: 'textarea 사이즈 조절 가능 여부',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    resizeDirection: {
      description: 'textarea 사이즈 조절 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical' | 'both'` },
        defaultValue: { summary: `'both'` }
      }
    },
    rows: {
      description: 'rows 개수',
      type: 'number'
    }
  }
};

const LONG_TEXT =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis adipisci dolore necessitatibus ad veniam voluptatibus facilis cupiditate iste tempora sapiente?';

const ControlledTextAreaTemplate = () => {
  const [value, setValue] = useState('');
  const MAX_COUNT = 100;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length > MAX_COUNT) return;
    setValue(newValue);
  };

  return (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      <TextArea
        value={value}
        onChange={handleChange}
        placeholder={`${MAX_COUNT}자까지 입력 가능합니다`}
        maxLength={MAX_COUNT}
        cols={30}
      />
      <Fraction value={value.length} count={MAX_COUNT} />
    </Stack>
  );
};

const WithLabelAndHelperTextTemplate = () => {
  const [value, setValue] = useState('');
  const empty = !value;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="user-name"
        style={{ display: 'flex', flexDirection: 'column', rowGap: '3px' }}
      >
        Content *
        <TextArea
          id="user-name"
          value={value}
          onChange={handleChange}
          minRows={3}
          style={
            empty ? { borderColor: 'error', boxShadow: 'none' } : undefined
          }
        />
      </label>
      {empty && (
        <Text
          className="typo-label-medium"
          style={{ color: 'error', margin: '3px 0' }}
        >
          필수로 입력해야 합니다.
        </Text>
      )}
    </>
  );
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const BasicTextArea: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea placeholder="Text..." cols={30} {...args} />
        <TextArea defaultValue={LONG_TEXT} cols={30} {...args} />
      </Stack>
    );
  }
};

export const ControlledTextArea: Story = {
  render: (args) => <ControlledTextAreaTemplate {...args} />
};

export const Rows: Story = {
  render: (args) => {
    return (
      <Grid rows={2} columns={2} spacing={20}>
        <TextArea cols={30} placeholder="rows = 3" rows={3} {...args} />
        <TextArea cols={30} placeholder="minRows = 2" minRows={2} {...args} />
        <TextArea cols={30} placeholder="maxRows = 3" maxRows={3} {...args} />
        <TextArea
          cols={30}
          placeholder="minRows = 2, maxRows = 3"
          minRows={2}
          maxRows={3}
          {...args}
        />
      </Grid>
    );
  }
};

export const ResizeTextArea: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea
          placeholder="Resize both direction..."
          cols={30}
          resize
          {...args}
        />
        <TextArea
          placeholder="Resize vertically..."
          cols={30}
          resize
          resizeDirection="vertical"
          {...args}
        />
        <TextArea
          placeholder="Resize horizontally..."
          cols={30}
          resize
          resizeDirection="horizontal"
          {...args}
        />
      </Stack>
    );
  }
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea variant="outlined" placeholder="Outlined" {...args} />
        <TextArea variant="filled" placeholder="Filled" {...args} />
        <TextArea variant="underlined" placeholder="Underlined" {...args} />
        <TextArea variant="borderless" placeholder="Borderless" {...args} />
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea size="sm" placeholder="sm" {...args} />
        <TextArea size="md" placeholder="md" {...args} />
        <TextArea size="lg" placeholder="lg" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea
          variant="outlined"
          placeholder="Outlined"
          disabled
          {...args}
        />
        <TextArea variant="filled" placeholder="Filled" disabled {...args} />
        <TextArea
          variant="underlined"
          placeholder="Underlined"
          disabled
          {...args}
        />
        <TextArea
          variant="borderless"
          placeholder="Borderless"
          disabled
          {...args}
        />
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea
          color="error"
          focusedColor="error"
          placeholder="error"
          autoFocus
          {...args}
        />
        <TextArea
          color="yellow-400"
          focusedColor="yellow-400"
          placeholder="yellow-400"
          autoFocus
          {...args}
        />
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => <TextArea placeholder="Full Width" fullWidth {...args} />
};

export const Adornments: Story = {
  render: (args) => {
    return (
      <TextArea
        startAdornment={<MailIcon color="gray-600" />}
        endAdornment={<Button size="sm">Send</Button>}
        placeholder="Message"
        {...args}
      />
    );
  }
};

export const WithLabelAndHelperText: Story = {
  render: (args) => {
    return <WithLabelAndHelperTextTemplate {...args} />;
  }
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <TextArea
          variant="filled"
          placeholder="Disable hover effect"
          disableHoverEffect
          {...args}
        />
        <TextArea
          variant="filled"
          placeholder="Disable focus effect"
          disableFocusEffect
          {...args}
        />
      </Stack>
    );
  }
};
