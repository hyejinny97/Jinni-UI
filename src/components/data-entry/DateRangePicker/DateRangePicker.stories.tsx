import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker, DateRangePickerProps } from '.';
import { DatePicker } from '@/components/data-entry/DatePicker';
import { DateRangeCalendar } from '@/components/data-entry/DateRangeCalendar';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-component';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { dateToDay } from '@/utils/date-component';

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  argTypes: {
    DateRangeFieldProps: {
      description: 'DateRangeField 컴포넌트의 Props',
      table: {
        type: { summary: 'DateRangeFieldProps' }
      }
    },
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
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
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
    minDate: {
      description: '선택 가능한 최소 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    name: {
      description: 'input name',
      table: {
        type: { summary: '{ start?: string; end?: string }' }
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
          summary:
            '(dateRangeCalendarProps: DateRangeCalendarProps) => React.ReactNode;'
        },
        defaultValue: {
          summary:
            '(dateRangeCalendarProps: DateRangeCalendarProps) => <DateRangeCalendar {...dateRangeCalendarProps} />;'
        }
      }
    },
    value: {
      description: 'selected date',
      table: {
        type: {
          summary: `{ start?: Date | null, end?: Date | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

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

const ControlledDateRangePickerTemplate = () => {
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
      <DateRangePicker value={value} onChange={handleChange} />
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
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
      <DateRangePicker
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateRangePickerProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { year: 'numeric', month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangePickerProps['options']);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
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
      <DateRangePicker
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

const MultiDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const handleStartDateChange = (value: Date | null) => {
    setStartDate(value);
  };
  const handleEndDateChange = (value: Date | null) => {
    setEndDate(value);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate(startDate)} />
        <span>-</span>
        <DateText {...getDate(endDate)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateRangePicker: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangePicker {...args} />
      <DateRangePicker
        defaultValue={{
          start: new Date(2025, 6, 14),
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
  <DateRangePicker />
  <DateRangePicker
    defaultValue={{
      start: new Date(2025, 6, 14),
      end: new Date(2025, 7, 20)
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateRangePicker: Story = {
  render: () => <ControlledDateRangePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateRangePickerTemplate = () => {
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
      <DateRangePicker value={value} onChange={handleChange} />
    </Stack>
  );
};
`.trim()
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
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
      <DateRangePicker
        key={locale}
        value={value}
        onChange={handleDateChange}
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
  const OPTIONS: Array<DateRangePickerProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { year: 'numeric', month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangePickerProps['options']);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
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
      <DateRangePicker
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangePicker minDate={new Date('2025-03-20')} {...args} />
      <DateRangePicker
        minDate={new Date('2025-03-20')}
        defaultValue={{ start: new Date('2025-03-15') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateRangePicker minDate={new Date('2025-03-20')} />
  <DateRangePicker
    minDate={new Date('2025-03-20')}
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
      <DateRangePicker maxDate={new Date('2025-07-20')} {...args} />
      <DateRangePicker
        maxDate={new Date('2025-07-20')}
        defaultValue={{ end: new Date('2025-07-25') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateRangePicker maxDate={new Date('2025-07-20')} />
  <DateRangePicker
    maxDate={new Date('2025-07-20')}
    defaultValue={{ end: new Date('2025-07-25') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangePicker
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateRangePicker
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
  <DateRangePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateRangePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={{ start: new Date('2025-07-10') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <DateRangePicker
      defaultValue={{
        start: new Date(2025, 6, 14),
        end: new Date(2025, 7, 20)
      }}
      readOnly
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateRangePicker
      defaultValue={{
        start: new Date(2025, 6, 14),
        end: new Date(2025, 7, 20)
      }}
      disabled
      {...args}
    />
  )
};

export const DateRangePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const departure = formData.get('departure date');
        const arrival = formData.get('arrival date');
        alert(`- Departure Date: ${departure}\n- Arrival Date: ${arrival}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DateRangePicker
        name={{ start: 'departure date', end: 'arrival date' }}
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
    const departure = formData.get('departure date');
    const arrival = formData.get('arrival date');
    alert(\`- Departure Date: \${departure}\n- Arrival Date: \${arrival}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <DateRangePicker
    name={{ start: 'departure date', end: 'arrival date' }}
    {...args}
  />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomDateRangeField: Story = {
  render: () => (
    <Box style={{ width: '500px' }}>
      <DateRangePicker
        DateRangeFieldProps={{
          placeholder: {
            start: 'Select Departure Date',
            end: 'Select Arrival Date'
          },
          format: 'YYYY/MM/DD',
          variant: 'filled',
          size: 'sm',
          color: 'tertiary',
          focusedColor: 'tertiary',
          fullWidth: true,
          startAdornment: {
            start: <FlightTakeOffIcon size={20} color="gray-600" />,
            end: <FlightLandIcon size={20} color="gray-600" />
          },
          centerIcon: <ArrowRightIcon size={20} color="gray-500" />
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '500px' }}>
  <DateRangePicker
    DateRangeFieldProps={{
      placeholder: {
        start: 'Select Departure Date',
        end: 'Select Arrival Date'
      },
      format: 'YYYY/MM/DD',
      variant: 'filled',
      size: 'sm',
      color: 'tertiary',
      focusedColor: 'tertiary',
      fullWidth: true,
      startAdornment: {
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      },
      centerIcon: <ArrowRightIcon size={20} color="gray-500" />
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const CustomDateRangeCalendar: Story = {
  render: () => (
    <DateRangePicker
      renderDateRangeCalendar={(dateRangeCalendarProps) => {
        return (
          <>
            <Box
              style={{
                padding: '6px 0',
                backgroundColor: 'gray-50',
                textAlign: 'center',
                fontWeight: '700'
              }}
            >{`Today: ${new Date().toDateString()}`}</Box>
            <DateRangeCalendar
              referenceDate={new Date(2022, 6, 30)}
              yearsOrder="asc"
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              displayWeekNumber
              dayCalendarsOrientation="vertical"
              dayCalendars={3}
              {...dateRangeCalendarProps}
            />
          </>
        );
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangePicker
  renderDateRangeCalendar={(dateRangeCalendarProps) => {
    return (
      <>
        <Box
          style={{
            padding: '6px 0',
            backgroundColor: 'gray-50',
            textAlign: 'center',
            fontWeight: '700'
          }}
        >{\`Today: \${new Date().toDateString()}\`}</Box>
        <DateRangeCalendar
          referenceDate={new Date(2022, 6, 30)}
          yearsOrder="asc"
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          displayWeekNumber
          dayCalendarsOrientation='vertical'
          dayCalendars={3}
          {...dateRangeCalendarProps}
        />
      </>
    );
  }}
/>`.trim()
      }
    }
  }
};

export const CustomPopover: Story = {
  render: (args) => (
    <DateRangePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};

export const MultiDatePicker: Story = {
  render: () => <MultiDatePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const handleStartDateChange = (value: Date | null) => {
    setStartDate(value);
  };
  const handleEndDateChange = (value: Date | null) => {
    setEndDate(value);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate(startDate)} />
        <span>-</span>
        <DateText {...getDate(endDate)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
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
