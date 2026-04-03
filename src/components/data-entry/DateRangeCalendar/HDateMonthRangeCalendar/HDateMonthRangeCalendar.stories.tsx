import './HDateMonthRangeCalendarCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HDateMonthRangeCalendar, {
  HDateMonthRangeCalendarProps
} from './HDateMonthRangeCalendar';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-component';

const meta: Meta<typeof HDateMonthRangeCalendar> = {
  title:
    'components/data-entry/DateRangePicker/DateRangeCalendar/HDateMonthRangeCalendar',
  component: HDateMonthRangeCalendar,
  argTypes: {
    defaultValue: {
      description: '초기 selected date',
      table: {
        type: { summary: `{ start?: Date, end?: Date }` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
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
    minDate: {
      description: '선택 가능한 최소 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    monthCalendars: {
      description: 'month calendars 갯수',
      table: {
        type: { summary: '1 | 2 | 3' },
        defaultValue: { summary: '2' }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start?: Date | null, end?: Date | null }, selectedDate?: Date) => void;`
        }
      }
    },
    options: {
      description: 'date 속성',
      table: {
        type: {
          summary: `{
  dateStyle: 'short' | 'medium'
}
| 
{
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short';
  day?: 'numeric' | '2-digit';
}`
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
    referenceDate: {
      description: 'value, defaultValue prop이 없을 때 참조하는 date',
      table: {
        type: {
          summary: `Date`
        }
      }
    },
    renderCalendarHeader: {
      description:
        'calendarHeaderProps를 인자로 받아 CalendarHeader 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(calendarHeaderProps: CalendarHeaderProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(calendarHeaderProps: CalendarHeaderProps) => <CalendarHeader {...calendarHeaderProps} />;`
        }
      }
    },
    value: {
      description: 'date',
      table: {
        type: {
          summary: `{ start?: Date | null, end?: Date | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof HDateMonthRangeCalendar>;

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

const ControlledHDateMonthRangeCalendarTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <HDateMonthRangeCalendar value={value} onChange={handleChange} />
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
      <HDateMonthRangeCalendar key={locale} locale={locale} />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<HDateMonthRangeCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { year: '2-digit' }
  ] as const;
  const [option, setOption] = useState<HDateMonthRangeCalendarProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as HDateMonthRangeCalendarProps['options']);
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
      <HDateMonthRangeCalendar key={JSON.stringify(option)} options={option} />
    </Stack>
  );
};

const CountOfCalendarsTemplate = () => {
  type calendarsType = NonNullable<
    HDateMonthRangeCalendarProps['monthCalendars']
  >;
  const CALENDARS: Array<calendarsType> = [1, 2, 3] as const;
  const [calendars, setCalendars] = useState<calendarsType>(2);

  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCalendars(Number(value) as calendarsType);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Calendars
        </Chip>
        <RadioGroup
          name="option"
          value={String(calendars)}
          onChange={handleCalendarsChange}
        >
          <Grid columns={CALENDARS.length} spacing={5}>
            {CALENDARS.map((calendar) => {
              const calendarStr = String(calendar);
              return (
                <Label content={calendarStr}>
                  <Radio value={calendarStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <HDateMonthRangeCalendar monthCalendars={calendars} />
    </Stack>
  );
};

export const BasicHDateMonthRangeCalendar: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <HDateMonthRangeCalendar {...args} />
      <HDateMonthRangeCalendar
        defaultValue={{
          start: new Date(2024, 6, 14),
          end: new Date(2025, 7, 20)
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <HDateMonthRangeCalendar />
  <HDateMonthRangeCalendar
    defaultValue={{
      start: new Date(2024, 6, 14),
      end: new Date(2025, 7, 20)
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledHDateMonthRangeCalendar: Story = {
  render: () => <ControlledHDateMonthRangeCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledHDateMonthRangeCalendarTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <HDateMonthRangeCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseInitialDate: Story = {
  render: (args) => (
    <HDateMonthRangeCalendar referenceDate={new Date(2000, 1, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar referenceDate={new Date(2000, 1, 1)} />`.trim()
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
      <HDateMonthRangeCalendar key={locale} locale={locale} />
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
  const OPTIONS: Array<HDateMonthRangeCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { year: '2-digit' }
  ] as const;
  const [option, setOption] = useState<HDateMonthRangeCalendarProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as HDateMonthRangeCalendarProps['options']);
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
      <HDateMonthRangeCalendar key={JSON.stringify(option)} options={option} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <HDateMonthRangeCalendar
      referenceDate={new Date(2025, 1, 1)}
      minDate={new Date(2025, 2, 1)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar
  referenceDate={new Date(2025, 1, 1)}
  minDate={new Date(2025, 2, 1)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <HDateMonthRangeCalendar
      referenceDate={new Date(2025, 1, 1)}
      maxDate={new Date(2025, 9, 1)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar
  referenceDate={new Date(2025, 1, 1)}
  maxDate={new Date(2025, 9, 1)}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <HDateMonthRangeCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <HDateMonthRangeCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar disabled />`.trim()
      }
    }
  }
};

export const CountOfCalendars: Story = {
  render: () => <CountOfCalendarsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CountOfCalendarsTemplate = () => {
  type calendarsType = NonNullable<
    HDateMonthRangeCalendarProps['monthCalendars']
  >;
  const CALENDARS: Array<calendarsType> = [1, 2, 3] as const;
  const [calendars, setCalendars] = useState<calendarsType>(2);

  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCalendars(Number(value) as calendarsType);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Calendars
        </Chip>
        <RadioGroup
          name="option"
          value={String(calendars)}
          onChange={handleCalendarsChange}
        >
          <Grid columns={CALENDARS.length} spacing={5}>
            {CALENDARS.map((calendar) => {
              const calendarStr = String(calendar);
              return (
                <Label content={calendarStr}>
                  <Radio value={calendarStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <HDateMonthRangeCalendar monthCalendars={calendars} />
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const CustomRangeMonth: Story = {
  render: (args) => (
    <HDateMonthRangeCalendar className="custom-range-month" {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar className="custom-range-month" />`.trim()
      }
    }
  }
};

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <HDateMonthRangeCalendar
      renderCalendarHeader={(calendarHeaderProps) => (
        <CalendarHeader
          prevIcon="Prev"
          nextIcon="Next"
          style={{ marginBottom: '5px', backgroundColor: 'gray-200' }}
          {...calendarHeaderProps}
        />
      )}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<HDateMonthRangeCalendar
  renderCalendarHeader={(calendarHeaderProps) => (
    <CalendarHeader
      prevIcon="Prev"
      nextIcon="Next"
      style={{ marginBottom: '5px', backgroundColor: 'gray-200' }}
      {...calendarHeaderProps}
    />
  )}
/>`.trim()
      }
    }
  }
};
