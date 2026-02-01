import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Fraction } from '@/components/data-display/Fraction';
import { MailIcon } from '@/components/icons/MailIcon';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  argTypes: {
    defaultValue: {
      description: '초기 textarea value',
      table: {
        type: { summary: `string` },
        defaultValue: { summary: `''` }
      }
    },
    maxRows: {
      description: '최대 rows 개수',
      type: 'number'
    },
    minRows: {
      description: '최소 rows 개수',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `1` }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: React.ChangeEvent<HTMLTextAreaElement>) => void`
        }
      }
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
    },
    value: {
      description: 'textarea value',
      table: {
        type: { summary: `string` }
      }
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
    <Stack spacing={10} style={{ alignItems: 'end' }}>
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

const TextAreaWithFormTemplate = () => {
  const [value, setValue] = useState('');
  const empty = !value;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fruit = formData.get('fruit');
    alert(`favorite fruit: ${fruit}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={10} style={{ alignItems: 'end' }}>
          <Stack spacing={5}>
            <Label
              content="좋아하는 과일을 모두 적어주세요."
              labelPlacement="top"
              required
              style={{ alignItems: 'start' }}
            >
              <TextArea
                name="fruit"
                placeholder="ex) 사과, 바나나, 수박 등"
                value={value}
                onChange={handleChange}
                cols={30}
                minRows={3}
                {...(empty && {
                  style: { borderColor: 'error', boxShadow: 'none' }
                })}
                aria-describedby="textarea-help"
              />
            </Label>
            {empty && (
              <Text
                id="textarea-help"
                className="typo-label-medium"
                noMargin
                style={{ color: 'error', marginLeft: '16px' }}
              >
                필수로 입력해야 합니다.
              </Text>
            )}
          </Stack>
          <Button type="submit">제출</Button>
        </Stack>
      </form>
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
  render: () => <ControlledTextAreaTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTextAreaTemplate = () => {
  const [value, setValue] = useState('');
  const MAX_COUNT = 100;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length > MAX_COUNT) return;
    setValue(newValue);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'end' }}>
      <TextArea
        value={value}
        onChange={handleChange}
        placeholder={\`\${MAX_COUNT}자까지 입력 가능합니다\`}
        maxLength={MAX_COUNT}
        cols={30}
      />
      <Fraction value={value.length} count={MAX_COUNT} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Rows: Story = {
  render: (args) => (
    <TextArea cols={30} placeholder="rows = 3" rows={3} {...args} />
  )
};

export const MinRows: Story = {
  render: (args) => (
    <TextArea cols={30} placeholder="minRows = 2" minRows={2} {...args} />
  )
};

export const MaxRows: Story = {
  render: (args) => (
    <TextArea cols={30} placeholder="maxRows = 3" maxRows={3} {...args} />
  )
};

export const MinAndMaxRows: Story = {
  render: (args) => (
    <TextArea
      cols={30}
      placeholder="minRows = 2, maxRows = 3"
      minRows={2}
      maxRows={3}
      {...args}
    />
  )
};

export const ResizeTextArea: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <TextArea
          placeholder="Resize both direction..."
          cols={30}
          resize
          resizeDirection="both"
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
      <Stack spacing={20}>
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
      <Stack spacing={20}>
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
      <Stack spacing={20}>
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
      <Stack spacing={20}>
        <TextArea
          color="error"
          focusedColor="error"
          placeholder="error"
          {...args}
        />
        <TextArea
          color="yellow-400"
          focusedColor="yellow-400"
          placeholder="yellow-400"
          {...args}
        />
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <TextArea placeholder="Full Width" fullWidth {...args} />
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => {
    return (
      <TextArea
        startAdornment={<MailIcon color="gray-600" />}
        endAdornment={<Button size="sm">Send</Button>}
        placeholder="Message"
        style={{ alignItems: 'start' }}
        {...args}
      />
    );
  }
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
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

export const TextAreaWithForm: Story = {
  render: () => <TextAreaWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TextAreaWithFormTemplate = () => {
  const [value, setValue] = useState('');
  const empty = !value;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fruit = formData.get('fruit');
    alert(\`favorite fruit: \${fruit}\`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={10} style={{ alignItems: 'end' }}>
          <Stack spacing={5}>
            <Label
              content="좋아하는 과일을 모두 적어주세요."
              labelPlacement="top"
              required
              style={{ alignItems: 'start' }}
            >
              <TextArea
                name="fruit"
                placeholder="ex) 사과, 바나나, 수박 등"
                value={value}
                onChange={handleChange}
                cols={30}
                minRows={3}
                {...(empty && {
                  style: { borderColor: 'error', boxShadow: 'none' }
                })}
                aria-describedby="textarea-help"
              />
            </Label>
            {empty && (
              <Text
                id="textarea-help"
                className="typo-label-medium"
                noMargin
                style={{ color: 'error', marginLeft: '16px' }}
              >
                필수로 입력해야 합니다.
              </Text>
            )}
          </Stack>
          <Button type="submit">제출</Button>
        </Stack>
      </form>
    </>
  );
};`.trim()
      }
    }
  }
};
