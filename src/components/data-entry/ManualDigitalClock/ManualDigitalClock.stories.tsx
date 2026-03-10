import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ManualDigitalClock, {
  ManualDigitalClockProps
} from './ManualDigitalClock';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Switch } from '@/components/data-entry/Switch';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof ManualDigitalClock> = {
  title: 'components/data-entry/TimePicker/ManualDigitalClock',
  component: ManualDigitalClock,
  argTypes: {
    defaultValue: {
      description: '초기 selected time',
      table: {
        type: { summary: 'Date' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    disabledTimes: {
      description: '비활성화 하는 특정 시간 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    maxTime: {
      description: '선택 가능한 최대 시간',
      table: {
        type: { summary: 'Date' }
      }
    },
    minTime: {
      description: '선택 가능한 최소 시간',
      table: {
        type: { summary: 'Date' }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date | null) => void;`
        }
      }
    },
    options: {
      description: 'time 속성',
      table: {
        type: {
          summary: `{
timeStyle: 'short' | 'medium';
}
| {
hour?: 'numeric' | '2-digit';
minute?: 'numeric' | '2-digit';
second?: 'numeric' | '2-digit';
hour12?: boolean;
hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
}`
        },
        defaultValue: { summary: `{ timeStyle: 'short' }` }
      }
    },
    readOnly: {
      description: 'true이면, 수정 불가',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    skipDisabledTime: {
      description: 'true이면, 비활성화된 times는 나타나지 않음',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    timeStep: {
      description: '두 time options 간 step',
      table: {
        type: {
          summary: `{hour: number, minute: number, second: number}`
        },
        defaultValue: {
          summary: `{hour: 1, minute: 1, second: 1}`
        }
      }
    },
    value: {
      description: 'selected time',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ManualDigitalClock>;

const ControlledDigitalClockTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
      </Text>
      <ManualDigitalClock value={value} onChange={handleChange} />
    </Stack>
  );
};

const LocaleTemplate = () => {
  const LOCALES = [
    'ko-KR',
    'en-US',
    'fr-FR',
    'ja-JP',
    'zh-CN',
    'ar-EG'
  ] as const;
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>(LOCALES[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Locale
        </Chip>
        <RadioGroup name="locale" value={locale} onChange={handleLocaleChange}>
          <Grid rows={2} columns={3} spacing={5}>
            {LOCALES.map((locale) => (
              <Label content={locale}>
                <Radio value={locale} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <ManualDigitalClock
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<ManualDigitalClockProps['options']> = [
    {
      timeStyle: 'medium'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      minute: 'numeric',
      second: 'numeric'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<ManualDigitalClockProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as ManualDigitalClockProps['options']);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={OPTIONS.length} columns={1} spacing={5}>
            {OPTIONS.map((option) => {
              const optionStr = JSON.stringify(option);
              return (
                <Label content={optionStr}>
                  <Radio value={optionStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <ManualDigitalClock
        key={JSON.stringify(option)}
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};

const SkipDisabledTimeTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Label content="Skip Disabled Time">
        <Switch checked={checked} onChange={handleChange} />
      </Label>
      <ManualDigitalClock
        minTime={new Date('2025-06-30T14:30')}
        maxTime={new Date('2025-06-30T17:25')}
        disabledTimes={[
          new Date('2025-06-30T14:40'),
          new Date('2025-06-30T14:50')
        ]}
        skipDisabledTime={checked}
        options={{
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hourCycle: 'h23'
        }}
      />
    </Stack>
  );
};

export const BasicManualDigitalClock: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ManualDigitalClock {...args} />
      <ManualDigitalClock
        defaultValue={new Date('2025-06-30T14:10')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <ManualDigitalClock />
  <ManualDigitalClock defaultValue={new Date('2025-06-30T14:10')} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledManualDigitalClock: Story = {
  render: () => <ControlledDigitalClockTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDigitalClockTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && \`\${hour}시\`}</span>
        <span>{minute !== undefined && \`\${minute}분\`}</span>
      </Text>
      <ManualDigitalClock value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Locale: Story = {
  render: () => <LocaleTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LocaleTemplate = () => {
  const LOCALES = [
    'ko-KR',
    'en-US',
    'fr-FR',
    'ja-JP',
    'zh-CN',
    'ar-EG'
  ] as const;
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>(LOCALES[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Locale
        </Chip>
        <RadioGroup name="locale" value={locale} onChange={handleLocaleChange}>
          <Grid rows={2} columns={3} spacing={5}>
            {LOCALES.map((locale) => (
              <Label content={locale}>
                <Radio value={locale} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <ManualDigitalClock
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Options: Story = {
  render: () => <OptionsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionsTemplate = () => {
  const OPTIONS: Array<ManualDigitalClockProps['options']> = [
    {
      timeStyle: 'medium'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      minute: 'numeric',
      second: 'numeric'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<ManualDigitalClockProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as ManualDigitalClockProps['options']);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={OPTIONS.length} columns={1} spacing={5}>
            {OPTIONS.map((option) => {
              const optionStr = JSON.stringify(option);
              return (
                <Label content={optionStr}>
                  <Radio value={optionStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <ManualDigitalClock
        key={JSON.stringify(option)}
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinTime: Story = {
  render: (args) => (
    <ManualDigitalClock minTime={new Date('2025-06-30T14:30')} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<ManualDigitalClock minTime={new Date('2025-06-30T14:30')} />`.trim()
      }
    }
  }
};

export const MaxTime: Story = {
  render: (args) => (
    <ManualDigitalClock maxTime={new Date('2025-06-30T17:25')} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<ManualDigitalClock maxTime={new Date('2025-06-30T17:25')} />`.trim()
      }
    }
  }
};

export const DisabledTimes: Story = {
  render: (args) => (
    <ManualDigitalClock
      disabledTimes={[
        new Date('2025-06-30T14:10'),
        new Date('2025-06-30T12:30')
      ]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<ManualDigitalClock
  disabledTimes={[
    new Date('2025-06-30T14:10'),
    new Date('2025-06-30T12:30')
  ]}
/>`.trim()
      }
    }
  }
};

export const SkipDisabledTime: Story = {
  render: () => <SkipDisabledTimeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SkipDisabledTimeTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Label content="Skip Disabled Time">
        <Switch checked={checked} onChange={handleChange} />
      </Label>
      <ManualDigitalClock
        minTime={new Date('2025-06-30T14:30')}
        maxTime={new Date('2025-06-30T17:25')}
        disabledTimes={[
          new Date('2025-06-30T14:40'),
          new Date('2025-06-30T14:50')
        ]}
        skipDisabledTime={checked}
        options={{
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hourCycle: 'h23'
        }}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TimeStep: Story = {
  render: (args) => (
    <ManualDigitalClock
      timeStep={{ hour: 2, minute: 10, second: 10 }}
      {...args}
    />
  )
};

export const Readonly: Story = {
  render: (args) => (
    <ManualDigitalClock
      defaultValue={new Date('2025-06-30T14:10')}
      readOnly
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <ManualDigitalClock
      defaultValue={new Date('2025-06-30T14:10')}
      disabled
      {...args}
    />
  )
};
