import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateRangePicker from './DateRangePicker';
import {
  DateOptions,
  DateValidationError
} from '@/components/data-entry/DateField';
import { Calendar, CalendarProps } from '@/components/data-entry/Calendar';
import { DatePicker } from '@/components/data-entry/DatePicker';
import {
  DateRangeValidationError,
  RangeType
} from '@/components/data-entry/DateRangeField';
import {
  DateRangeCalendar,
  DateRangeCalendarProps
} from '@/components/data-entry/DateRangeCalendar';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DAY } from '@/constants/time';
import { Button } from '@/components/general/Button';

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
      description: '초기 date',
      table: {
        type: { summary: '{ start?: Date, end?: Date }' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
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
        type: { summary: 'string' }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start: Date | null, end: Date | null }, validationError?: { start: 'minDate' | 'maxDate' | 'disabledDate', end: 'minDate' | 'maxDate' | 'disabledDate', chronologicalOrder: boolean, includeDisabledDate: boolean }) => void;`
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
        },
        defaultValue: { summary: 'false' }
      }
    },
    renderDateRangeCalendar: {
      description:
        'dateRangeCalendarProps를 인자로 받아 DaterRangeCalendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dateRangeCalendarProps: DaterRangeCalendarProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dateRangeCalendarProps: DaterRangeCalendarProps) => <DaterRangeCalendar {...dateRangeCalendarProps} />;`
        }
      }
    },
    value: {
      description: 'date',
      table: {
        type: {
          summary: `{ start: Date | null, end: Date | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<DateOptions> = [
  {
    dateStyle: 'medium'
  },
  {
    year: 'numeric'
  },
  {
    year: 'numeric',
    month: 'long'
  }
];
const DEFAULT_VALUE = {
  start: new Date(2025, 6, 8, 12, 30),
  end: new Date(2025, 7, 13, 17, 20)
};

const DateStr = ({ date }: { date: Date | null }) => {
  const year = date?.getFullYear();
  const month = date?.getMonth();
  const day = date?.getDate();

  return (
    <Text
      style={{
        display: 'inline-flex',
        gap: '5px',
        maxWidth: 'max-content',
        margin: 0
      }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const ControlledDateRangePickerTemplate = ({ ...props }) => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [validationError, setValidationError] =
    useState<DateRangeValidationError>();

  const getErrorMessage = (error: DateValidationError): string => {
    switch (error) {
      case 'minDate':
        return '최소 날짜보다 작습니다.';
      case 'maxDate':
        return '최대 날짜보다 큽니다.';
      case 'disabledDate':
        return '해당 날짜은 비활성화되어 있습니다.';
    }
  };

  const handleChange = (
    newValue: RangeType<Date | null>,
    validationError?: DateRangeValidationError
  ) => {
    setValue(newValue);
    setValidationError(validationError);
  };

  let errorMessage: string = '';
  if (validationError?.['chronologicalOrder']) {
    errorMessage = '시작 날짜가 끝 날짜보다 큽니다.';
  } else if (validationError?.['includeDisabledDate']) {
    errorMessage = '비활성화된 날짜가 포함되어 있습니다.';
  } else if (validationError?.start) {
    errorMessage = 'start date: ' + getErrorMessage(validationError.start);
  } else if (validationError?.end) {
    errorMessage = 'end date: ' + getErrorMessage(validationError.end);
  }

  return (
    <Stack>
      <Stack
        direction="row"
        spacing={8}
        style={{ alignItems: 'center', margin: '10px' }}
      >
        <span>Date:</span>
        <DateStr date={value.start} />
        <span>-</span>
        <DateStr date={value.end} />
      </Stack>
      <DateRangePicker value={value} onChange={handleChange} {...props} />
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

const MultiDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startValidationError, setStartValidationError] =
    useState<DateValidationError>();
  const [endValidationError, setEndValidationError] =
    useState<DateValidationError>();

  const isLowerThan = ({
    baseDate,
    targetDate
  }: {
    baseDate: Date | null;
    targetDate: Date | null;
  }): boolean => {
    if (!baseDate || !targetDate) return false;
    return baseDate.getTime() / DAY > targetDate.getTime() / DAY;
  };

  const getErrorMessage = (error: DateValidationError): string => {
    switch (error) {
      case 'minDate':
        return '최소 날짜보다 작습니다.';
      case 'maxDate':
        return '최대 날짜보다 큽니다.';
      case 'disabledDate':
        return '해당 날짜은 비활성화되어 있습니다.';
    }
  };

  const handleStartDateChange = (
    value: Date | null,
    validationError?: DateValidationError
  ) => {
    setStartDate(value);
    setStartValidationError(validationError);
  };
  const handleEndDateChange = (
    value: Date | null,
    validationError?: DateValidationError
  ) => {
    setEndDate(value);
    setEndValidationError(validationError);
  };

  const isChronologicalError = isLowerThan({
    baseDate: startDate,
    targetDate: endDate
  });
  const isStartDateValidationError =
    !!startValidationError || isChronologicalError;
  const isEndDateValidationError = !!endValidationError || isChronologicalError;

  let errorMessage: string = '';
  if (isChronologicalError) {
    errorMessage = '시작 날짜가 끝 날짜보다 큽니다.';
  } else if (startValidationError) {
    errorMessage = 'start date: ' + getErrorMessage(startValidationError);
  } else if (endValidationError) {
    errorMessage = 'end date: ' + getErrorMessage(endValidationError);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        <span>Date:</span>
        <DateStr date={startDate} />
        <span>-</span>
        <DateStr date={endDate} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          minDate={new Date(2025, 7, 10, 3, 30)}
          DateFieldProps={{
            color: isStartDateValidationError ? 'error' : undefined,
            placeholder: `minDate='2025/8/10'`
          }}
          renderCalendar={(calendarProps: CalendarProps) => (
            <Calendar referenceDate={new Date(2025, 7)} {...calendarProps} />
          )}
        />
        ~
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          maxDate={new Date(2025, 7, 24, 3, 30)}
          DateFieldProps={{
            color: isEndDateValidationError ? 'error' : undefined,
            placeholder: `maxDate='2025/8/24'`
          }}
          renderCalendar={(calendarProps: CalendarProps) => (
            <Calendar referenceDate={new Date(2025, 7)} {...calendarProps} />
          )}
        />
      </Stack>
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

export const Basic: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <DateRangePicker />
      <DateRangePicker defaultValue={DEFAULT_VALUE} />
    </Stack>
  )
};

export const FormWithDateRangePicker: Story = {
  render: () => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const startDate = formData.get('startDate');
        const endDate = formData.get('endDate');
        alert(`startDate: ${startDate}\nendDate: ${endDate}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DateRangePicker name={{ start: 'startDate', end: 'endDate' }} />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  )
};

export const ControlledDateRangePicker: Story = {
  render: () => <ControlledDateRangePickerTemplate />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={2} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DateRangePicker locale={locale} defaultValue={DEFAULT_VALUE} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Stack spacing={20}>
      {OPTIONS.map((options) => (
        <Stack
          key={JSON.stringify(options)}
          spacing={20}
          style={{ alignItems: 'center' }}
        >
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
          <DateRangePicker options={options} defaultValue={DEFAULT_VALUE} />
        </Stack>
      ))}
    </Stack>
  )
};

export const Readonly: Story = {
  render: () => <DateRangePicker defaultValue={DEFAULT_VALUE} readOnly />
};

export const Disabled: Story = {
  render: () => <DateRangePicker defaultValue={DEFAULT_VALUE} disabled />
};

export const RestrictDate: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          1) MinDate = 2025/07/05
        </Text>
        <ControlledDateRangePickerTemplate minDate={new Date('2025-07-05')} />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          2) MaxDate = 2025/07/20
        </Text>
        <ControlledDateRangePickerTemplate maxDate={new Date('2025-07-20')} />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          3) DisabledDates = 2025/07/10, 2025/07/15
        </Text>
        <ControlledDateRangePickerTemplate
          disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        />
      </Stack>
    </Grid>
  )
};

export const CustomPopover: Story = {
  render: () => (
    <DateRangePicker
      PopoverProps={{
        disableScroll: true,
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
    />
  )
};

export const Placeholder: Story = {
  render: () => (
    <DateRangePicker
      DateRangeFieldProps={{
        placeholder: {
          start: 'Select Start Date',
          end: 'Select End Date'
        }
      }}
    />
  )
};

export const DateFormat: Story = {
  render: () => (
    <DateRangePicker
      defaultValue={DEFAULT_VALUE}
      DateRangeFieldProps={{ format: 'YYYY년 M월 D일' }}
    />
  )
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateRangePicker DateRangeFieldProps={{ variant: 'filled' }} />
      <DateRangePicker DateRangeFieldProps={{ variant: 'outlined' }} />
      <DateRangePicker DateRangeFieldProps={{ variant: 'underlined' }} />
      <DateRangePicker DateRangeFieldProps={{ variant: 'borderless' }} />
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateRangePicker
        defaultValue={DEFAULT_VALUE}
        DateRangeFieldProps={{ size: 'sm' }}
      />
      <DateRangePicker
        defaultValue={DEFAULT_VALUE}
        DateRangeFieldProps={{ size: 'md' }}
      />
      <DateRangePicker
        defaultValue={DEFAULT_VALUE}
        DateRangeFieldProps={{ size: 'lg' }}
      />
    </Stack>
  )
};

export const Color: Story = {
  render: () => (
    <DateRangePicker
      DateRangeFieldProps={{
        color: 'yellow-400',
        focusedColor: 'yellow-400'
      }}
    />
  )
};

export const FullWidth: Story = {
  render: () => <DateRangePicker DateRangeFieldProps={{ fullWidth: true }} />
};

export const Adornments: Story = {
  render: () => (
    <DateRangePicker
      DateRangeFieldProps={{
        placeholder: { start: 'Flight Departure', end: 'Flight Arrival' },
        startAdornment: {
          start: <FlightTakeOffIcon size={20} color="gray-600" />,
          end: <FlightLandIcon size={20} color="gray-600" />
        }
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => (
    <DateRangePicker
      DateRangeFieldProps={{
        disableHoverEffect: true,
        disableFocusEffect: true
      }}
    />
  )
};

export const CustomCenterIcon: Story = {
  render: () => (
    <DateRangePicker
      DateRangeFieldProps={{
        centerIcon: <ArrowRightIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const CustomDateRangeCalendar: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateRangePicker
        renderDateRangeCalendar={(
          dateRangeCalendarProps: DateRangeCalendarProps
        ) => (
          <>
            <Box
              style={{
                padding: '5px 10px',
                backgroundColor: 'gray-200',
                textAlign: 'center'
              }}
            >
              Today: {new Date().toLocaleDateString()}
            </Box>
            <DateRangeCalendar
              {...dateRangeCalendarProps}
              referenceDate={new Date('2022-06-15')}
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              displayWeekNumber
              horizontalDayCalendars={3}
            />
          </>
        )}
      />
      <DateRangePicker
        defaultValue={DEFAULT_VALUE}
        renderDateRangeCalendar={(
          dateRangeCalendarProps: DateRangeCalendarProps
        ) => (
          <DateRangeCalendar
            {...dateRangeCalendarProps}
            dayCalendarsOrientation="vertical"
            verticalDayCalendars={11}
          />
        )}
      />
      <DateRangePicker
        defaultValue={DEFAULT_VALUE}
        options={{ year: 'numeric' }}
        renderDateRangeCalendar={(
          dateRangeCalendarProps: DateRangeCalendarProps
        ) => <DateRangeCalendar {...dateRangeCalendarProps} yearsOrder="dsc" />}
      />
      <DateRangePicker
        defaultValue={DEFAULT_VALUE}
        options={{ year: 'numeric', month: 'long' }}
        renderDateRangeCalendar={(
          dateRangeCalendarProps: DateRangeCalendarProps
        ) => (
          <DateRangeCalendar
            {...dateRangeCalendarProps}
            monthCalendarsOrientation="vertical"
            verticalMonthCalendars={11}
          />
        )}
      />
    </Stack>
  )
};

export const MultiDatePicker: Story = {
  render: () => <MultiDatePickerTemplate />
};
