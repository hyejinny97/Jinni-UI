import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DateField,
  DateOptions,
  DateValidationError
} from '@/components/data-entry/DateField';
import { DateRangeField, DateRangeValidationError, RangeType } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateRangeField> = {
  component: DateRangeField,
  argTypes: {
    centerIcon: {
      description: '두 DateField 중앙에 위치한 아이콘',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<ArrowRightAltIcon />' }
      }
    },
    defaultValue: {
      description: '초기 date',
      table: {
        type: { summary: `{ start?: Date, end?: Date }` }
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
    focusedDate: {
      description: '현재 포커스된 DateField',
      table: {
        type: { summary: `'start' | 'end'` }
      }
    },
    endAdornment: {
      description: '뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, dateRangeField?: React.ReactNode }`
        }
      }
    },
    format: {
      description: 'date format',
      table: {
        type: { summary: 'string' }
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
    placeholder: {
      description: 'placeholder',
      table: {
        type: {
          summary: `{ start?: string, end?: string }`
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
    startAdornment: {
      description: '앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, dateRangeField?: React.ReactNode }`
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
type Story = StoryObj<typeof DateRangeField>;

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<DateOptions> = [
  {
    dateStyle: 'medium'
  },
  {
    year: 'numeric'
  },
  {
    month: 'long'
  }
];
const FORMATS = ['YYYY년 M월 D일', 'YYYY-MM-DD'];
const DEFAULT_VALUE = {
  start: new Date(2025, 6, 8, 12, 30),
  end: new Date(2025, 6, 13, 17, 20)
};

const DateStr = ({ date }: { date: Date | null }) => {
  const year = date?.getFullYear();
  const month = date?.getMonth();
  const day = date?.getDate();

  return (
    <Text
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const ControlledDateRangeFieldTemplate = ({ ...props }) => {
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
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        <span>Date:</span>
        <DateStr date={value.start} />
        <span>-</span>
        <DateStr date={value.end} />
      </Stack>
      <DateRangeField value={value} onChange={handleChange} {...props} />
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

const MultiDateFieldTemplate = () => {
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
        <DateField
          value={startDate}
          onChange={handleStartDateChange}
          color={isStartDateValidationError ? 'error' : undefined}
          focusedColor={isStartDateValidationError ? 'error' : undefined}
          minDate={new Date(2025, 7, 10, 3, 30)}
          placeholder={`minDate='2025/8/10'`}
        />
        ~
        <DateField
          value={endDate}
          onChange={handleEndDateChange}
          color={isEndDateValidationError ? 'error' : undefined}
          focusedColor={isEndDateValidationError ? 'error' : undefined}
          minDate={new Date(2025, 7, 10, 3, 30)}
          placeholder={`minDate='2025/8/10'`}
        />
      </Stack>
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

export const BasicDateRangeField: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateRangeField />
      <DateRangeField
        placeholder={{ start: 'Select Start Date', end: 'Select End Date' }}
      />
      <DateRangeField defaultValue={DEFAULT_VALUE} />
    </Stack>
  )
};

export const ControlledDateRangeField: Story = {
  render: () => <ControlledDateRangeFieldTemplate />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={2} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DateRangeField locale={locale} defaultValue={DEFAULT_VALUE} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {OPTIONS.map((options) => (
        <Stack key={JSON.stringify(options)} direction="row" spacing={20}>
          <DateRangeField options={options} defaultValue={DEFAULT_VALUE} />
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
        </Stack>
      ))}
    </Grid>
  )
};

export const CustomizeDateFormat: Story = {
  render: () => (
    <Grid columns={2} spacing={20}>
      {FORMATS.map((format) => (
        <Stack key={format}>
          <Text>{`Format: '${format}'`}</Text>
          <DateRangeField format={format} defaultValue={DEFAULT_VALUE} />
        </Stack>
      ))}
    </Grid>
  )
};

export const RestrictDate: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          1) MinDate = 2025/06/30
        </Text>
        <ControlledDateRangeFieldTemplate minDate={new Date('2025-06-30')} />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          2) MaxDate = 2025/07/20
        </Text>
        <ControlledDateRangeFieldTemplate maxDate={new Date('2025-07-20')} />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          3) DisabledDates = 2025/07/10, 2025/07/15
        </Text>
        <ControlledDateRangeFieldTemplate
          disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        />
      </Stack>
    </Grid>
  )
};

export const Variants: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateRangeField
            key={variant}
            variant={variant}
            placeholder={{ start: variant, end: variant }}
          />
        )
      )}
    </Grid>
  )
};

export const Sizes: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateRangeField
          key={size}
          size={size}
          placeholder={{ start: size, end: size }}
        />
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => <DateRangeField defaultValue={DEFAULT_VALUE} readOnly />
};

export const Disabled: Story = {
  render: () => <DateRangeField defaultValue={DEFAULT_VALUE} disabled />
};

export const Color: Story = {
  render: () => <DateRangeField color="yellow-400" focusedColor="yellow-400" />
};

export const FullWidth: Story = {
  render: () => <DateRangeField fullWidth />
};

export const Adornments: Story = {
  render: () => (
    <DateRangeField
      placeholder={{ start: 'Flight Departure', end: 'Flight Arrival' }}
      startAdornment={{
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      }}
      endAdornment={{
        dateRangeField: <DateRangeIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => <DateRangeField disableHoverEffect disableFocusEffect />
};

export const CustomCenterIcon: Story = {
  render: () => (
    <DateRangeField
      centerIcon={<ArrowRightIcon size={20} color="gray-500" />}
    />
  )
};

export const MultiDateField: Story = {
  render: () => <MultiDateFieldTemplate />
};
