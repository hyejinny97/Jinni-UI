import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateTimeRangePicker, {
  DateTimeRangePickerProps
} from './DateTimeRangePicker';
import DateTimePicker from '@/components/DateTimePicker';
import ManualDigitalClock from '@/components/ManualDigitalClock';
import DateRangeCalendar from '@/components/DateRangeCalendar';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledDateTimesWithUnitFnType
} from '@/types/date-time-component';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DAY, MINUTE } from '@/constants/time';
import Switch from '@/components/Switch';
import Button from '@/components/Button';
import { TimeMode } from '@/types/time-component';

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
    disabledDateTimes: {
      description: '비활성화 하는 특정 날짜/시간 모음',
      table: {
        type: {
          summary: `mode='preset' ?
Array<Date> | ({ dateTime, unit, rangeField }: { dateTime: Date; unit: 'date' | 'time'; rangeField: 'start' | 'end'; }) ⇒ boolean;
: 
Array<Date> | ({ dateTime, unit, rangeField }: { dateTime: Date; unit: 'date' | 'hour' | 'minute' | 'second'; rangeField: 'start' | 'end'; }) ⇒ boolean;`
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
        color: 'on-surface-variant',
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
  withValue?: false;
  disabledDateTimes: {
    preset: Array<Date> | RangeDisabledDateTimesWithUnitFnType<'preset'>;
    manual: Array<Date> | RangeDisabledDateTimesWithUnitFnType<'manual'>;
  };
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDateTimes: {
    preset: (
      value: RangeType<Date | null>
    ) => RangeDisabledDateTimesWithUnitFnType<'preset'>;
    manual: (
      value: RangeType<Date | null>
    ) => RangeDisabledDateTimesWithUnitFnType<'manual'>;
  };
};

const CASES: Array<CaseType | CaseWithValueType> = [
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
    label: 'Selectable from 9:00 AM on 2026.6.1 to 3:00 PM on 2026.6.15.',
    disabledDateTimes: {
      preset: ({ dateTime, unit }) => {
        const start = new Date(2026, 5, 1, 9, 0);
        const end = new Date(2026, 5, 15, 15, 0);
        if (unit === 'date') {
          const day = dateToDay(dateTime);
          return day < dateToDay(start) || dateToDay(end) < day;
        }
        if (unit === 'time') {
          const time = dateTime.getTime();
          return time < start.getTime() || end.getTime() < time;
        }
        return false;
      },
      manual: ({ dateTime, unit }) => {
        const start = new Date(2026, 5, 1, 9, 0);
        const end = new Date(2026, 5, 15, 15, 0);
        if (unit === 'date') {
          const day = dateToDay(dateTime);
          return day < dateToDay(start) || dateToDay(end) < day;
        }
        if (unit === 'hour' || unit === 'minute') {
          const time = dateTime.getTime();
          return time < start.getTime() || end.getTime() < time;
        }
        return false;
      }
    }
  },
  {
    label: `'End' can only be selected up to 'start' + 7 days.`,
    withValue: true,
    disabledDateTimes: {
      preset:
        (value) =>
        ({ dateTime, unit, rangeField }) => {
          if (unit === 'date' && rangeField === 'end' && value.start) {
            const start = dateToDay(value.start);
            const end = start + 7;
            const time = dateToDay(dateTime);
            return time < start || end < time;
          }
          return false;
        },
      manual:
        (value) =>
        ({ dateTime, unit, rangeField }) => {
          if (unit === 'date' && rangeField === 'end' && value.start) {
            const start = dateToDay(value.start);
            const end = start + 7;
            const time = dateToDay(dateTime);
            return time < start || end < time;
          }
          return false;
        }
    }
  }
];

const DisabledDateTimesTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const [isManualMode, setIsManualMode] = useState(false);
  const mode: TimeMode = isManualMode ? 'manual' : 'preset';

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualMode(e.target.checked);
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
      <DateTimeRangePicker
        value={value}
        onChange={handleChange}
        timeMode={mode}
        disabledDateTimes={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDateTimes[mode](value)
            : CASES[caseIdx].disabledDateTimes[mode]
        }
      />
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
    <Stack spacing={20} style={{ color: 'on-surface' }}>
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
  withValue?: false;
  disabledDateTimes: {
    preset: Array<Date> | RangeDisabledDateTimesWithUnitFnType<'preset'>;
    manual: Array<Date> | RangeDisabledDateTimesWithUnitFnType<'manual'>;
  };
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDateTimes: {
    preset: (
      value: RangeType<Date | null>
    ) => RangeDisabledDateTimesWithUnitFnType<'preset'>;
    manual: (
      value: RangeType<Date | null>
    ) => RangeDisabledDateTimesWithUnitFnType<'manual'>;
  };
};

const CASES: Array<CaseType | CaseWithValueType> = [
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
    label: 'Selectable from 9:00 AM on 2026.6.1 to 3:00 PM on 2026.6.15.',
    disabledDateTimes: {
      preset: ({ dateTime, unit }) => {
        const start = new Date(2026, 5, 1, 9, 0);
        const end = new Date(2026, 5, 15, 15, 0);
        if (unit === 'date') {
          const day = dateToDay(dateTime);
          return day < dateToDay(start) || dateToDay(end) < day;
        }
        if (unit === 'time') {
          const time = dateTime.getTime();
          return time < start.getTime() || end.getTime() < time;
        }
        return false;
      },
      manual: ({ dateTime, unit }) => {
        const start = new Date(2026, 5, 1, 9, 0);
        const end = new Date(2026, 5, 15, 15, 0);
        if (unit === 'date') {
          const day = dateToDay(dateTime);
          return day < dateToDay(start) || dateToDay(end) < day;
        }
        if (unit === 'hour' || unit === 'minute') {
          const time = dateTime.getTime();
          return time < start.getTime() || end.getTime() < time;
        }
        return false;
      }
    }
  },
  {
    label: \`'End' can only be selected up to 'start' + 7 days.\`,
    withValue: true,
    disabledDateTimes: {
      preset:
        (value) =>
        ({ dateTime, unit, rangeField }) => {
          if (unit === 'date' && rangeField === 'end' && value.start) {
            const start = dateToDay(value.start);
            const end = start + 7;
            const time = dateToDay(dateTime);
            return time < start || end < time;
          }
          return false;
        },
      manual:
        (value) =>
        ({ dateTime, unit, rangeField }) => {
          if (unit === 'date' && rangeField === 'end' && value.start) {
            const start = dateToDay(value.start);
            const end = start + 7;
            const time = dateToDay(dateTime);
            return time < start || end < time;
          }
          return false;
        }
    }
  }
];

const DisabledDateTimesTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const [isManualMode, setIsManualMode] = useState(false);
  const mode: TimeMode = isManualMode ? 'manual' : 'preset';

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualMode(e.target.checked);
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
      <DateTimeRangePicker
        value={value}
        onChange={handleChange}
        timeMode={mode}
        disabledDateTimes={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDateTimes[mode](value)
            : CASES[caseIdx].disabledDateTimes[mode]
        }
      />
    </Stack>
  );
};
`.trim()
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
          color: 'gray-400',
          focusedColor: 'tertiary',
          fullWidth: true,
          startAdornment: {
            start: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
            end: <FlightLandIcon size={20} color="on-surface-variant" />
          },
          disableHoverEffect: true,
          centerIcon: <ArrowRightIcon size={20} color="gray-400" />
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
      color: 'gray-400',
      focusedColor: 'tertiary',
      fullWidth: true,
      startAdornment: {
        start: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
        end: <FlightLandIcon size={20} color="on-surface-variant" />
      },
      disableHoverEffect: true,
      centerIcon: <ArrowRightIcon size={20} color="gray-400" />
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
      renderDigitalClock={(digitalClockProps) => {
        return (
          <Stack
            style={{ height: '357px', backgroundColor: 'surface-container' }}
          >
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
  renderDigitalClock={(digitalClockProps) => {
    return (
      <Stack style={{ height: '357px', backgroundColor: 'surface-container' }}>
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
    <Stack spacing={20} style={{ color: 'on-surface' }}>
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
