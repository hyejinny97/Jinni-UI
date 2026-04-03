import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeRangePicker, DateTimeRangePickerProps } from '.';
import { DateTimePicker } from '@/components/data-entry/DateTimePicker';
import { ManualDigitalClock } from '@/components/data-entry/ManualDigitalClock';
import { DateRangeCalendar } from '@/components/data-entry/DateRangeCalendar';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-time-component';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { MINUTE } from '@/constants/time';
import { Switch } from '@/components/data-entry/Switch';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof DateTimeRangePicker> = {
  component: DateTimeRangePicker,
  argTypes: {
    DateTimeRangeFieldProps: {
      description: 'DateTimeRangeField의 Props',
      table: {
        type: { summary: `DateTimeRangeFieldProps` }
      }
    },
    defaultValue: {
      description: '초기 selected date time',
      table: {
        type: { summary: `{ start?: Date; end?: Date }` }
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
          summary: `(value: { start?: Date | null; end?: Date | null }) => void;`
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
    renderDateRangeCalendar: {
      description:
        'dateRangeCalendarProps를 인자로 받아 DateRangeCalendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dateRangeCalendarProps: DateRangeCalendarProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dateRangeCalendarProps: DateRangeCalendarProps) => <DateRangeCalendar {...DateRangeCalendarProps} />;`
        }
      }
    },
    renderDateDigitalClock: {
      description:
        'DigitalClockProps를 입력값으로 받아 timeMode에 따라 ManualDigitalClock 이나 PresetDigitalClock 컴포넌트를 렌더하는 함수',
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
          summary: `mode='preset' ? 1800 : {hour: 1, minute: 1, second: 1}`
        }
      }
    },
    value: {
      description: 'selected date time',
      table: {
        type: {
          summary: `{ start?: Date 객체 | null; end?: Date 객체 | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimeRangePicker>;

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

const DateText = ({
  year,
  month,
  day
}: {
  year?: number;
  month?: number;
  day?: number;
}) => {
  return (
    <Text
      noMargin
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const Time = ({
  hour,
  minute,
  second
}: {
  hour?: number;
  minute?: number;
  second?: number;
}) => {
  return (
    <Text
      noMargin
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{hour !== undefined && `${hour}시`}</span>
      <span>{minute !== undefined && `${minute}분`}</span>
      <span>{second !== undefined && `${second}초`}</span>
    </Text>
  );
};

const ControlledDateTimeRangePickerTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });
  const getTime = (rangeField: RangeFieldType) => ({
    hour: value[rangeField]?.getHours(),
    minute: value[rangeField]?.getMinutes(),
    second: value[rangeField]?.getSeconds()
  });
  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('start')} />
          <Time {...getTime('start')} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('end')} />
          <Time {...getTime('end')} />
        </Stack>
      </Text>
      <DateTimeRangePicker value={value} onChange={handleChange} />
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <DateTimeRangePicker
        key={locale}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateTimeRangePickerProps['options']> = [
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
  const [option, setOption] = useState<DateTimeRangePickerProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimeRangePickerProps['options']);
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
      <DateTimeRangePicker
        key={JSON.stringify(option)}
        locale="en-US"
        options={option}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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
      <DateTimeRangePicker timeMode={presetMode ? 'preset' : 'manual'} />
    </Stack>
  );
};

const MultiDateTimePickerTemplate = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const dateToMinute = (date: Date): number => {
    return Math.trunc(date.getTime() / MINUTE);
  };
  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const getTime = (date: Date | null) => ({
    hour: date?.getHours(),
    minute: date?.getMinutes(),
    second: date?.getSeconds()
  });
  const handleStartDateTimeChange = (value: Date | null) => {
    setStartDateTime(value);
  };
  const handleEndDateTimeChange = (value: Date | null) => {
    setEndDateTime(value);
  };

  const isChronologicalError =
    startDateTime &&
    endDateTime &&
    dateToMinute(startDateTime) > dateToMinute(endDateTime);

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(startDateTime)} />
          <Time {...getTime(startDateTime)} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(endDateTime)} />
          <Time {...getTime(endDateTime)} />
        </Stack>
      </Text>
      <Stack direction="row" spacing={20}>
        <DateTimePicker
          value={startDateTime}
          onChange={handleStartDateTimeChange}
          {...(isChronologicalError && {
            DateTimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <DateTimePicker
          value={endDateTime}
          onChange={handleEndDateTimeChange}
          {...(isChronologicalError && {
            DateTimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateTimeRangePicker: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker {...args} />
      <DateTimeRangePicker
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker />
  <DateTimeRangePicker
    defaultValue={{
      start: new Date('2025-08-06T12:30'),
      end: new Date('2025-08-10T14:20')
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateTimeRangePicker: Story = {
  render: () => <ControlledDateTimeRangePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateTimeRangePickerTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });
  const getTime = (rangeField: RangeFieldType) => ({
    hour: value[rangeField]?.getHours(),
    minute: value[rangeField]?.getMinutes(),
    second: value[rangeField]?.getSeconds()
  });
  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('start')} />
          <Time {...getTime('start')} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('end')} />
          <Time {...getTime('end')} />
        </Stack>
      </Text>
      <DateTimeRangePicker value={value} onChange={handleChange} />
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <DateTimeRangePicker
        key={locale}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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
  const OPTIONS: Array<DateTimeRangePickerProps['options']> = [
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
  const [option, setOption] = useState<DateTimeRangePickerProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimeRangePickerProps['options']);
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
      <DateTimeRangePicker
        key={JSON.stringify(option)}
        locale="en-US"
        options={option}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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
    <Stack spacing={20}>
      <DateTimeRangePicker minTime={new Date('2025-06-30T14:30')} {...args} />
      <DateTimeRangePicker
        minTime={new Date('2025-06-30T14:30')}
        defaultValue={{ start: new Date('2025-06-30T12:00') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker minTime={new Date('2025-06-30T14:30')} />
  <DateTimeRangePicker
    minTime={new Date('2025-06-30T14:30')}
    defaultValue={{ start: new Date('2025-06-30T12:00') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxTime: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker maxTime={new Date('2025-06-30T17:25')} {...args} />
      <DateTimeRangePicker
        maxTime={new Date('2025-06-30T17:25')}
        defaultValue={{ end: new Date('2025-06-30T18:00') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker maxTime={new Date('2025-06-30T17:25')} />
  <DateTimeRangePicker
    maxTime={new Date('2025-06-30T17:25')}
    defaultValue={{ end: new Date('2025-06-30T18:00') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledTimes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        {...args}
      />
      <DateTimeRangePicker
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        defaultValue={{ start: new Date('2025-06-30T14:10') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
  />
  <DateTimeRangePicker
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
    defaultValue={{ start: new Date('2025-06-30T14:10') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker minDate={new Date('2025-06-30')} {...args} />
      <DateTimeRangePicker
        minDate={new Date('2025-06-30')}
        defaultValue={{ start: new Date('2025-03-15') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker minDate={new Date('2025-06-30')} />
  <DateTimeRangePicker
    minDate={new Date('2025-06-30')}
    defaultValue={{ start: new Date('2025-03-15') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker maxDate={new Date('2025-07-20')} {...args} />
      <DateTimeRangePicker
        maxDate={new Date('2025-07-20')}
        defaultValue={{ end: new Date('2025-08-01') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker maxDate={new Date('2025-07-20')} />
  <DateTimeRangePicker
    maxDate={new Date('2025-07-20')}
    defaultValue={{ end: new Date('2025-08-01') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateTimeRangePicker
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        defaultValue={{ start: new Date('2025-07-10') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateTimeRangePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={{ start: new Date('2025-07-10') }}
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
      <DateTimeRangePicker timeMode={presetMode ? 'preset' : 'manual'} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TimeStepInPresetMode: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker timeMode="preset" timeStep={1 * 60 * 60} {...args} />
      <DateTimeRangePicker
        timeMode="preset"
        timeStep={1 * 60 * 60}
        defaultValue={{ start: new Date('2025-06-30T15:20') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker timeMode="preset" timeStep={1 * 60 * 60} />
  <DateTimeRangePicker
    timeMode="preset"
    timeStep={1 * 60 * 60}
    defaultValue={{ start: new Date('2025-06-30T15:20') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInManualMode: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangePicker
        timeMode="manual"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <DateTimeRangePicker
        timeMode="manual"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        defaultValue={{ start: new Date('2025-06-30T16:15') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangePicker
    timeMode="manual"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <DateTimeRangePicker
    timeMode="manual"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
    defaultValue={{ start: new Date('2025-06-30T16:15') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <DateTimeRangePicker
      defaultValue={{
        start: new Date('2025-08-06T12:30'),
        end: new Date('2025-08-10T14:20')
      }}
      readOnly
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateTimeRangePicker
      defaultValue={{
        start: new Date('2025-08-06T12:30'),
        end: new Date('2025-08-10T14:20')
      }}
      disabled
      {...args}
    />
  )
};

export const DateTimeRangePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const departure = formData.get('departure');
        const arrival = formData.get('arrival');
        alert(`Departure: ${departure}\nArrival: ${arrival}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DateTimeRangePicker
        name={{ start: 'departure', end: 'arrival' }}
        timeMode="manual"
        {...args}
      />
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
    const departure = formData.get('departure');
    const arrival = formData.get('arrival');
    alert(\`Departure: \${departure}\nArrival: \${arrival}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <DateTimeRangePicker
    name={{ start: 'departure', end: 'arrival' }}
    timeMode="manual"
  />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomDateTimeRangeField: Story = {
  render: () => (
    <Box style={{ width: '650px' }}>
      <DateTimeRangePicker
        DateTimeRangeFieldProps={{
          placeholder: {
            start: 'Select Departure Date',
            end: 'Select Arrival Date'
          },
          dateFormat: 'YYYY/MM/DD',
          timeFormat: 'A hh시 mm분',
          variant: 'filled',
          size: 'sm',
          color: 'secondary',
          focusedColor: 'secondary',
          fullWidth: true,
          startAdornment: {
            start: <FlightTakeOffIcon size={20} color="gray-500" />,
            end: <FlightLandIcon size={20} color="gray-500" />
          },
          disableHoverEffect: true,
          centerIcon: <ArrowRightIcon size={20} color="gray-500" />
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '650px' }}>
  <DateTimeRangePicker
    DateTimeRangeFieldProps={{
      placeholder: {
        start: 'Select Departure Date',
        end: 'Select Arrival Date'
      },
      dateFormat: 'YYYY/MM/DD',
      timeFormat: 'A hh시 mm분',
      variant: 'filled',
      size: 'sm',
      color: 'secondary',
      focusedColor: 'secondary',
      fullWidth: true,
      startAdornment: {
        start: <FlightTakeOffIcon size={20} color="gray-500" />,
        end: <FlightLandIcon size={20} color="gray-500" />
      },
      disableHoverEffect: true,
      centerIcon: <ArrowRightIcon size={20} color="gray-500" />
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const CustomDigitalClock: Story = {
  render: () => (
    <DateTimeRangePicker
      timeMode="manual"
      disabledTimes={[
        new Date(2025, 7, 4, 15, 30),
        new Date(2025, 7, 4, 16, 30)
      ]}
      renderDigitalClock={(digitalClockProps) => {
        return (
          <Stack style={{ height: '357px', backgroundColor: 'gray-50' }}>
            <Grid columns={3}>
              <Title>AM/PM</Title>
              <Title>Hours</Title>
              <Title>Minutes</Title>
            </Grid>
            {digitalClockProps.mode === 'manual' && (
              <ManualDigitalClock
                skipDisabledTime
                style={{ height: '334px', boxSizing: 'border-box' }}
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
        code: `<DateTimeRangePicker
  timeMode="manual"
  disabledTimes={[
    new Date(2025, 7, 4, 15, 30),
    new Date(2025, 7, 4, 16, 30)
  ]}
  renderDigitalClock={(digitalClockProps) => {
    return (
      <Stack style={{ height: '357px', backgroundColor: 'gray-50' }}>
        <Grid columns={3}>
          <Title>AM/PM</Title>
          <Title>Hours</Title>
          <Title>Minutes</Title>
        </Grid>
        {digitalClockProps.mode === 'manual' && (
          <ManualDigitalClock
            skipDisabledTime
            style={{ height: '334px', boxSizing: 'border-box' }}
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

export const CustomDateRangeCalendar: Story = {
  render: () => (
    <DateTimeRangePicker
      renderDateRangeCalendar={(dateRangeCalendarProps) => {
        return (
          <DateRangeCalendar
            {...dateRangeCalendarProps}
            referenceDate={new Date(2022, 6, 30)}
            yearsOrder="asc"
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            displayWeekNumber
            dayCalendarsOrientation="vertical"
            dayCalendars={3}
            style={{ paddingBottom: '20px' }}
          />
        );
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateTimeRangePicker
  renderDateRangeCalendar={(dateRangeCalendarProps) => {
    return (
      <DateRangeCalendar
        {...dateRangeCalendarProps}
        referenceDate={new Date(2022, 6, 30)}
        yearsOrder="asc"
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        displayWeekNumber
        dayCalendarsOrientation="vertical"
        dayCalendars={3}
        style={{ paddingBottom: '20px' }}
      />
    );
  }}
/>`.trim()
      }
    }
  }
};

export const CustomPopover: Story = {
  render: (args) => (
    <DateTimeRangePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};

export const MultiDateTimePicker: Story = {
  render: () => <MultiDateTimePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiDateTimePickerTemplate = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const dateToMinute = (date: Date): number => {
    return Math.trunc(date.getTime() / MINUTE);
  };
  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const getTime = (date: Date | null) => ({
    hour: date?.getHours(),
    minute: date?.getMinutes(),
    second: date?.getSeconds()
  });
  const handleStartDateTimeChange = (value: Date | null) => {
    setStartDateTime(value);
  };
  const handleEndDateTimeChange = (value: Date | null) => {
    setEndDateTime(value);
  };

  const isChronologicalError =
    startDateTime &&
    endDateTime &&
    dateToMinute(startDateTime) > dateToMinute(endDateTime);

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(startDateTime)} />
          <Time {...getTime(startDateTime)} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(endDateTime)} />
          <Time {...getTime(endDateTime)} />
        </Stack>
      </Text>
      <Stack direction="row" spacing={20}>
        <DateTimePicker
          value={startDateTime}
          onChange={handleStartDateTimeChange}
          {...(isChronologicalError && {
            DateTimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <DateTimePicker
          value={endDateTime}
          onChange={handleEndDateTimeChange}
          {...(isChronologicalError && {
            DateTimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
