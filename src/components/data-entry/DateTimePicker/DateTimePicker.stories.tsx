import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker, DateTimePickerProps } from '.';
import { ManualDigitalClock } from '@/components/data-entry/ManualDigitalClock';
import {
  DateCalendar,
  DateCalendarProps
} from '@/components/data-entry/DateCalendar';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Year } from '@/components/data-entry/YearCalendar/Year';
import { Month } from '@/components/data-entry/MonthCalendar/Month';
import { Day } from '@/components/data-entry/DayCalendar/Day';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Switch } from '@/components/data-entry/Switch';
import { Chip } from '@/components/data-display/Chip';
import { Button } from '@/components/general/Button';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  argTypes: {
    DateTimeFieldProps: {
      description: 'DateTimeField의 Props',
      table: {
        type: { summary: 'DateTimeFieldProps' }
      }
    },
    defaultValue: {
      description: '초기 selected date time',
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
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: 'Array<Date>' }
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
    maxDate: {
      description: '선택 가능한 최대 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    maxTime: {
      description: '선택 가능한 최대 시간',
      table: {
        type: { summary: 'Date' }
      }
    },
    minDate: {
      description: '선택 가능한 최소 날짜',
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
      description: 'date time 속성',
      table: {
        type: {
          summary: `TimeOptions & DateOptions`
        }
      }
    },
    PopoverProps: {
      description: 'Popover 컴포넌트의 props',
      table: {
        type: {
          summary: `PopoverProps`
        }
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
    renderDateCalendar: {
      description:
        'dateCalendarProps를 인자로 받아 DateCalendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dateCalendarProps: DateCalendarProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dateCalendarProps: DateCalendarProps) => <DateCalendar {...dateCalendarProps} />;`
        }
      }
    },
    renderDigitalClock: {
      description:
        'DigitalClockProps를 입력값으로 받아 mode에 따라 ManualDigitalClock 이나 PresetDigitalClock 컴포넌트를 렌더하는 함수',
      table: {
        type: {
          summary: `(digitalClockProps: ({ mode: 'preset' } & PresetDigitalClockProps) | ({ mode: 'manual' } & ManualDigitalClockProps)) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(digitalClockProps: ({ mode: 'preset' } & PresetDigitalClockProps) | ({ mode: 'manual' } & ManualDigitalClockProps)) => digitalClockProps.mode === 'preset' ? <PresetDigitalClock {...digitalClockProps} /> : <ManualDigitalClock {...digitalClockProps} />;`
        }
      }
    },
    timeMode: {
      description: 'time 선택 방법',
      table: {
        type: { summary: `'preset' | 'manual'` },
        defaultValue: { summary: `'manual'` }
      }
    },
    timeStep: {
      description: '두 time options 간 step',
      table: {
        type: {
          summary: `mode='preset' ? number : {hour: number, minute: number, second: number}`
        },
        defaultValue: {
          summary: `mode='preset' ? 30 * 60 : {hour: 1, minute: 1, second: 1}`
        }
      }
    },
    value: {
      description: 'selected date time',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      style={{
        margin: '3px 0',
        fontSize: '12px',
        fontWeight: '700',
        color: 'gray-600',
        textAlign: 'center'
      }}
    >
      {children}
    </Text>
  );
};

const ControlledDateTimePickerTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        DateTime:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1} /`}</span>
        <span>{day !== undefined && `${day} `}</span>
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
      </Text>
      <DateTimePicker value={value} onChange={handleChange} />
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
      <DateTimePicker
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateTimePickerProps['options']> = [
    {
      dateStyle: 'medium',
      timeStyle: 'medium'
    },
    {
      dateStyle: 'short',
      timeStyle: 'short'
    },
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<DateTimePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimePickerProps['options']);
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
      <DateTimePicker
        key={JSON.stringify(option)}
        locale="en-US"
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};

const TimeModeTemplate = () => {
  const [presetMode, setPresetMode] = useState<boolean>(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPresetMode(event.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Label content="Preset Mode">
        <Switch checked={presetMode} onChange={handleCheck} />
      </Label>
      <DateTimePicker timeMode={presetMode ? 'preset' : 'manual'} />
    </Stack>
  );
};

export const BasicDateTimePicker: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimePicker {...args} />
      <DateTimePicker defaultValue={new Date()} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimePicker />
  <DateTimePicker defaultValue={new Date()} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateTimePicker: Story = {
  render: () => <ControlledDateTimePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateTimePickerTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        DateTime:
        <span>{year !== undefined && \`\${year} /\`}</span>
        <span>{month !== undefined && \`\${month + 1} /\`}</span>
        <span>{day !== undefined && \`\${day} \`}</span>
        <span>{hour !== undefined && \`\${hour}시\`}</span>
        <span>{minute !== undefined && \`\${minute}분\`}</span>
      </Text>
      <DateTimePicker
        value={value}
        onChange={handleChange}
      />
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
      <DateTimePicker
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
  const OPTIONS: Array<DateTimePickerProps['options']> = [
    {
      dateStyle: 'medium',
      timeStyle: 'medium'
    },
    {
      dateStyle: 'short',
      timeStyle: 'short'
    },
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<DateTimePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimePickerProps['options']);
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
      <DateTimePicker
        key={JSON.stringify(option)}
        locale="en-US"
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
    <Stack direction="row" spacing={20}>
      <DateTimePicker minTime={new Date('2025-06-30T14:30')} {...args} />
      <DateTimePicker
        minTime={new Date('2025-06-30T14:30')}
        defaultValue={new Date('2025-06-30T12:00')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker minTime={new Date('2025-06-30T14:30')} />
  <DateTimePicker
    minTime={new Date('2025-06-30T14:30')}
    defaultValue={new Date('2025-06-30T12:00')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker maxTime={new Date('2025-06-30T17:25')} {...args} />
      <DateTimePicker
        maxTime={new Date('2025-06-30T17:25')}
        defaultValue={new Date('2025-06-30T18:00')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker maxTime={new Date('2025-06-30T17:25')} />
  <DateTimePicker
    maxTime={new Date('2025-06-30T17:25')}
    defaultValue={new Date('2025-06-30T18:00')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledTimes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        {...args}
      />
      <DateTimePicker
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        defaultValue={new Date('2025-06-30T14:10')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
  />
  <DateTimePicker
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
    defaultValue={new Date('2025-06-30T14:10')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker minDate={new Date('2025-06-30')} {...args} />
      <DateTimePicker
        minDate={new Date('2025-06-30')}
        defaultValue={new Date('2025-03-15')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker minDate={new Date('2025-06-30')} />
  <DateTimePicker
    minDate={new Date('2025-06-30')}
    defaultValue={new Date('2025-03-15')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker maxDate={new Date('2025-07-20')} {...args} />
      <DateTimePicker
        maxDate={new Date('2025-07-20')}
        defaultValue={new Date('2025-08-01')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker maxDate={new Date('2025-07-20')} />
  <DateTimePicker
    maxDate={new Date('2025-07-20')}
    defaultValue={new Date('2025-08-01')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateTimePicker
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        defaultValue={new Date('2025-07-10')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateTimePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={new Date('2025-07-10')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeMode: Story = {
  render: () => <TimeModeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TimeModeTemplate = () => {
  const [presetMode, setPresetMode] = useState<boolean>(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPresetMode(event.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Label content="Preset Mode">
        <Switch checked={presetMode} onChange={handleCheck} />
      </Label>
      <DateTimePicker timeMode={presetMode ? 'preset' : 'manual'} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TimeStepInPresetMode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker timeMode="preset" timeStep={1 * 60 * 60} {...args} />
      <DateTimePicker
        timeMode="preset"
        timeStep={1 * 60 * 60}
        defaultValue={new Date('2025-06-30T15:20')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker timeMode="preset" timeStep={1 * 60 * 60} />
  <DateTimePicker
    timeMode="preset"
    timeStep={1 * 60 * 60}
    defaultValue={new Date('2025-06-30T15:20')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInManualMode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker
        timeMode="manual"
        options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <DateTimePicker
        timeMode="manual"
        options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        defaultValue={new Date('2025-06-30T16:15')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimePicker
    timeMode="manual"
    options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <DateTimePicker
    timeMode="manual"
    options={{ hour: 'numeric', minute: 'numeric', second: 'numeric' }}
    timeStep={{ hour: 2, minute: 10, second: 10 }}
    defaultValue={new Date('2025-06-30T16:15')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <DateTimePicker
      defaultValue={new Date('2025-06-30T14:10')}
      readOnly
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateTimePicker
      defaultValue={new Date('2025-06-30T14:10')}
      disabled
      {...args}
    />
  )
};

export const DateTimePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const dateTime = formData.get('dateTime');
        alert(`DateTime: ${dateTime}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DateTimePicker name="dateTime" timeMode="manual" {...args} />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  ),
  parameters: {
    docs: {
      source: {
        code: `<form
  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateTime = formData.get('dateTime');
    alert(\`DateTime: \${dateTime}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <DateTimePicker name="dateTime" timeMode="manual" />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomDateTimeField: Story = {
  render: () => (
    <Box style={{ width: '500px' }}>
      <DateTimePicker
        DateTimeFieldProps={{
          placeholder: 'Select Departure Date',
          dateFormat: 'YYYY/MM/DD',
          timeFormat: 'A hh시 mm분',
          variant: 'filled',
          size: 'sm',
          color: 'secondary',
          focusedColor: 'secondary',
          fullWidth: true,
          startAdornment: <FlightTakeOffIcon size={20} color="gray-500" />,
          disableHoverEffect: true
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '500px' }}>
  <DateTimePicker
    DateTimeFieldProps={{
      placeholder: 'Select Departure Date',
      dateFormat: 'YYYY/MM/DD',
      timeFormat: 'A hh시 mm분',
      variant: 'filled',
      size: 'sm',
      color: 'secondary',
      focusedColor: 'secondary',
      fullWidth: true,
      startAdornment: <FlightTakeOffIcon size={20} color="gray-500" />,
      disableHoverEffect: true
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const CustomDigitalClock: Story = {
  render: () => (
    <DateTimePicker
      timeMode="manual"
      disabledTimes={[
        new Date(2025, 7, 4, 15, 30),
        new Date(2025, 7, 4, 16, 30)
      ]}
      renderDigitalClock={(digitalClockProps) => {
        return (
          <Stack style={{ height: '353px', backgroundColor: 'gray-50' }}>
            <Grid columns={3}>
              <Title>AM/PM</Title>
              <Title>Hours</Title>
              <Title>Minutes</Title>
            </Grid>
            {digitalClockProps.mode === 'manual' && (
              <ManualDigitalClock
                skipDisabledTime
                style={{ height: '330px', boxSizing: 'border-box' }}
                {...digitalClockProps}
              />
            )}
          </Stack>
        );
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateTimePicker
  timeMode="manual"
  disabledTimes={[
    new Date(2025, 7, 4, 15, 30),
    new Date(2025, 7, 4, 16, 30)
  ]}
  renderDigitalClock={(digitalClockProps) => {
    return (
      <Stack style={{ height: '353px', backgroundColor: 'gray-50' }}>
        <Grid columns={3}>
          <Title>AM/PM</Title>
          <Title>Hours</Title>
          <Title>Minutes</Title>
        </Grid>
        {digitalClockProps.mode === 'manual' && (
          <ManualDigitalClock
            skipDisabledTime
            style={{ height: '330px', boxSizing: 'border-box' }}
            {...digitalClockProps}
          />
        )}
      </Stack>
    );
  }}
/>`.trim()
      }
    }
  }
};

export const CustomDateCalendar: Story = {
  render: () => (
    <DateTimePicker
      renderDateCalendar={(calendarProps: DateCalendarProps) => (
        <>
          <DateCalendar
            {...calendarProps}
            yearsOrder="dsc"
            referenceDate={new Date('2022-06-15')}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            displayWeekNumber
            renderCalendarHeader={(calendarHeaderProps) => {
              return (
                <CalendarHeader
                  style={{ backgroundColor: 'gray-50' }}
                  prevIcon="Prev"
                  nextIcon="Next"
                  {...calendarHeaderProps}
                />
              );
            }}
            renderYear={(yearProps) => (
              <Year
                color="green"
                rippleStartLocation="center"
                style={{ width: '100%', borderRadius: '4px' }}
                {...yearProps}
              />
            )}
            renderMonth={(monthProps) => (
              <Month
                color="green"
                rippleStartLocation="center"
                style={{ width: '100%', borderRadius: '4px' }}
                {...monthProps}
              />
            )}
            renderDay={(dayProps) => {
              const { marked, ...rest } = dayProps;
              return (
                <Day
                  color="green"
                  rippleStartLocation="center"
                  style={{
                    borderRadius: '4px',
                    ...(marked && {
                      borderStyle: 'dashed',
                      borderColor: 'gray-300'
                    })
                  }}
                  marked={marked}
                  {...rest}
                />
              );
            }}
          />
        </>
      )}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateTimePicker
  renderDateCalendar={(calendarProps: DateCalendarProps) => (
    <>
      <DateCalendar
        {...calendarProps}
        yearsOrder="dsc"
        referenceDate={new Date('2022-06-15')}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        displayWeekNumber
        renderCalendarHeader={(calendarHeaderProps) => {
          return (
            <CalendarHeader
              style={{ backgroundColor: 'gray-50' }}
              prevIcon="Prev"
              nextIcon="Next"
              {...calendarHeaderProps}
            />
          );
        }}
        renderYear={(yearProps) => (
          <Year
            color="green"
            rippleStartLocation="center"
            style={{ width: '100%', borderRadius: '4px' }}
            {...yearProps}
          />
        )}
        renderMonth={(monthProps) => (
          <Month
            color="green"
            rippleStartLocation="center"
            style={{ width: '100%', borderRadius: '4px' }}
            {...monthProps}
          />
        )}
        renderDay={(dayProps) => {
          const { marked, ...rest } = dayProps;
          return (
            <Day
              color="green"
              rippleStartLocation="center"
              style={{
                borderRadius: '4px',
                ...(marked && {
                  borderStyle: 'dashed',
                  borderColor: 'gray-300'
                })
              }}
              marked={marked}
              {...rest}
            />
          );
        }}
      />
    </>
  )}
/>`.trim()
      }
    }
  }
};

export const CustomPopover: Story = {
  render: (args) => (
    <DateTimePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};
