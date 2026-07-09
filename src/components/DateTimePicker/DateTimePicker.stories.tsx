import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateTimePicker, { DateTimePickerProps } from './DateTimePicker';
import ManualDigitalClock from '@/components/ManualDigitalClock';
import DateCalendar, { DateCalendarProps } from '@/components/DateCalendar';
import CalendarHeader from '@/components/CalendarHeader';
import Year from '@/components/Year';
import Month from '@/components/Month';
import Day from '@/components/Day';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Switch from '@/components/Switch';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { DisabledDateTimesWithUnitFnType } from '@/types/date-time-component';
import { TimeMode } from '@/types/time-component';
import { DAY } from '@/constants/time';

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
    disabledDateTimes: {
      description: '비활성화 하는 특정 날짜/시간 모음',
      table: {
        type: {
          summary: `mode='preset' ?
Array<Date> | ({ dateTime, unit }: { dateTime: Date; unit: 'year' | 'month' | 'day' | 'time'; }) ⇒ boolean 
: 
Array<Date> | ({ dateTime, unit }: { dateTime: Date; unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'; }) ⇒ boolean `
        }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
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
        color: 'on-surface-variant',
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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

const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

const toMinute = (hour: number, minute: number = 0) => {
  return hour * 3600 + minute * 60;
};

const getTodayWithHour = (hour: number): Date => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date;
};

type CaseType = {
  label: string;
  disabledDateTimes: {
    preset: Array<Date> | DisabledDateTimesWithUnitFnType<'preset'>;
    manual: Array<Date> | DisabledDateTimesWithUnitFnType<'manual'>;
  };
};

const CASES: CaseType[] = [
  {
    label: 'Disable today at 9:00 AM.',
    disabledDateTimes: {
      preset: [getTodayWithHour(9)],
      manual: [getTodayWithHour(9)]
    }
  },
  {
    label: 'Disable today from 3:00 PM to 6:00 PM.',
    disabledDateTimes: {
      preset: ({ dateTime, unit }) => {
        if (unit === 'time') {
          const isToday = dateToDay(new Date()) === dateToDay(dateTime);
          if (isToday) {
            const startTime = toMinute(15);
            const endTime = toMinute(18);
            const time = toMinute(dateTime.getHours(), dateTime.getMinutes());
            return startTime <= time && time <= endTime;
          }
        }
        return false;
      },
      manual: ({ dateTime, unit }) => {
        if (unit === 'hour' || unit === 'minute') {
          const isToday = dateToDay(new Date()) === dateToDay(dateTime);
          const hour = dateTime.getHours();
          return isToday && 15 <= hour && hour < 18;
        }
        return false;
      }
    }
  },
  {
    label: 'Selectable from 9:00 AM to 6:00 PM on weekdays.',
    disabledDateTimes: {
      preset: ({ dateTime, unit }) => {
        if (unit === 'day') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          return isWeekend;
        }
        if (unit === 'time') {
          const isWeekday = dateTime.getDay() !== 0 && dateTime.getDay() !== 6;
          if (isWeekday) {
            const startTime = toMinute(9);
            const endTime = toMinute(18);
            const time = toMinute(dateTime.getHours(), dateTime.getMinutes());
            return !(startTime <= time && time <= endTime);
          }
          return true;
        }
        return false;
      },
      manual: ({ dateTime, unit }) => {
        if (unit === 'day') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          return isWeekend;
        }
        if (unit === 'hour') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          const hour = dateTime.getHours();
          return isWeekend || hour < 9 || 18 < hour;
        }
        if (unit === 'minute') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          const startTime = toMinute(9);
          const endTime = toMinute(18);
          const time = toMinute(dateTime.getHours(), dateTime.getMinutes());
          return isWeekend || !(startTime <= time && time <= endTime);
        }
        return false;
      }
    }
  }
];

const DisabledDateTimesTemplate = () => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const mode: TimeMode = isManualMode ? 'manual' : 'preset';

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualMode(e.target.checked);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack spacing={5} style={{ alignItems: 'end' }}>
        <Label content={`'manual' mode`}>
          <Switch checked={isManualMode} onChange={handleModeChange} />
        </Label>
        <Box
          as="fieldset"
          round="sm"
          style={{ backgroundColor: 'surface-container', border: 'none' }}
        >
          <Chip as="legend" variant="filled" color="surface-container-highest">
            Cases
          </Chip>
          <RadioGroup
            name="case"
            value={String(caseIdx)}
            onChange={handleCaseChange}
          >
            <Grid columns={1}>
              {CASES.map(({ label }, idx) => (
                <Label content={label}>
                  <Radio value={String(idx)} />
                </Label>
              ))}
            </Grid>
          </RadioGroup>
        </Box>
      </Stack>
      <DateTimePicker
        timeMode={mode}
        disabledDateTimes={CASES[caseIdx].disabledDateTimes[mode]}
      />
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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

export const DisabledDateTimes: Story = {
  render: () => <DisabledDateTimesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

const toMinute = (hour: number, minute: number = 0) => {
  return hour * 3600 + minute * 60;
};

const getTodayWithHour = (hour: number): Date => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date;
};

type CaseType = {
  label: string;
  disabledDateTimes: {
    preset: Array<Date> | DisabledDateTimesWithUnitFnType<'preset'>;
    manual: Array<Date> | DisabledDateTimesWithUnitFnType<'manual'>;
  };
};

const CASES: CaseType[] = [
  {
    label: 'Disable today at 9:00 AM.',
    disabledDateTimes: {
      preset: [getTodayWithHour(9)],
      manual: [getTodayWithHour(9)]
    }
  },
  {
    label: 'Disable today from 3:00 PM to 6:00 PM.',
    disabledDateTimes: {
      preset: ({ dateTime, unit }) => {
        if (unit === 'time') {
          const isToday = dateToDay(new Date()) === dateToDay(dateTime);
          if (isToday) {
            const startTime = toMinute(15);
            const endTime = toMinute(18);
            const time = toMinute(dateTime.getHours(), dateTime.getMinutes());
            return startTime <= time && time <= endTime;
          }
        }
        return false;
      },
      manual: ({ dateTime, unit }) => {
        if (unit === 'hour' || unit === 'minute') {
          const isToday = dateToDay(new Date()) === dateToDay(dateTime);
          const hour = dateTime.getHours();
          return isToday && 15 <= hour && hour < 18;
        }
        return false;
      }
    }
  },
  {
    label: 'Selectable from 9:00 AM to 6:00 PM on weekdays.',
    disabledDateTimes: {
      preset: ({ dateTime, unit }) => {
        if (unit === 'day') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          return isWeekend;
        }
        if (unit === 'time') {
          const isWeekday = dateTime.getDay() !== 0 && dateTime.getDay() !== 6;
          if (isWeekday) {
            const startTime = toMinute(9);
            const endTime = toMinute(18);
            const time = toMinute(dateTime.getHours(), dateTime.getMinutes());
            return !(startTime <= time && time <= endTime);
          }
          return true;
        }
        return false;
      },
      manual: ({ dateTime, unit }) => {
        if (unit === 'day') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          return isWeekend;
        }
        if (unit === 'hour') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          const hour = dateTime.getHours();
          return isWeekend || hour < 9 || 18 < hour;
        }
        if (unit === 'minute') {
          const isWeekend = dateTime.getDay() === 0 || dateTime.getDay() === 6;
          const startTime = toMinute(9);
          const endTime = toMinute(18);
          const time = toMinute(dateTime.getHours(), dateTime.getMinutes());
          return isWeekend || !(startTime <= time && time <= endTime);
        }
        return false;
      }
    }
  }
];

const DisabledDateTimesTemplate = () => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const mode: TimeMode = isManualMode ? 'manual' : 'preset';

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualMode(e.target.checked);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack spacing={5} style={{ alignItems: 'end' }}>
        <Label content={\`'manual' mode\`}>
          <Switch checked={isManualMode} onChange={handleModeChange} />
        </Label>
        <Box
          as="fieldset"
          round="sm"
          style={{ backgroundColor: 'surface-container', border: 'none' }}
        >
          <Chip as="legend" variant="filled" color="surface-container-highest">
            Cases
          </Chip>
          <RadioGroup
            name="case"
            value={String(caseIdx)}
            onChange={handleCaseChange}
          >
            <Grid columns={1}>
              {CASES.map(({ label }, idx) => (
                <Label content={label}>
                  <Radio value={String(idx)} />
                </Label>
              ))}
            </Grid>
          </RadioGroup>
        </Box>
      </Stack>
      <DateTimePicker
        timeMode={mode}
        disabledDateTimes={CASES[caseIdx].disabledDateTimes[mode]}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TimeModeStory: Story = {
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
          color: 'gray-400',
          focusedColor: 'tertiary',
          fullWidth: true,
          startAdornment: (
            <FlightTakeOffIcon size={20} color="on-surface-variant" />
          ),
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
      color: 'gray-400',
      focusedColor: 'tertiary',
      fullWidth: true,
      startAdornment: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
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
      renderDigitalClock={(digitalClockProps) => {
        return (
          <Stack
            style={{
              height: '353px',
              backgroundColor: 'surface-container'
            }}
          >
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
  renderDigitalClock={(digitalClockProps) => {
    return (
      <Stack style={{ height: '353px', backgroundColor: 'surface-container' }}>
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
                  style={{ backgroundColor: 'surface-container' }}
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
              style={{ backgroundColor: 'surface-container' }}
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
