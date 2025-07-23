import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, ValidationError } from '.';
import { Calendar, CalendarProps } from '@/components/data-entry/Calendar';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { DateOptions } from '@/components/data-entry/DateField';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  argTypes: {
    DateFieldProps: {
      description: 'DateField 컴포넌트의 Props',
      table: {
        type: { summary: 'DateFieldProps' }
      }
    },
    defaultValue: {
      description: '초기 date',
      table: {
        type: { summary: 'Date' }
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
          summary: `(value: Date, validationError?: 'minDate' | 'maxDate' | 'disabledDate') => void;`
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
    renderCalendar: {
      description:
        'calendarProps를 인자로 받아 Calendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(calendarProps: CalendarProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(calendarProps: CalendarProps) => <Calendar {...calendarProps} />;`
        }
      }
    },
    value: {
      description: 'date',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

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

const ControlledDatePickerTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleChange = (newValue: Date, validationError?: ValidationError) => {
    setValue(newValue);
    if (validationError) {
      switch (validationError) {
        case 'minDate':
          setErrorMessage('최소 날짜보다 작습니다.');
          break;
        case 'maxDate':
          setErrorMessage('최대 날짜보다 큽니다.');
          break;
        case 'disabledDate':
          setErrorMessage('해당 날짜는 비활성화되어 있습니다.');
          break;

        default:
          setErrorMessage('유효하지 않은 날짜입니다.');
      }
    } else {
      setErrorMessage(undefined);
    }
  };

  return (
    <Stack>
      {errorMessage ? (
        <Text style={{ color: 'error' }}>{errorMessage}</Text>
      ) : (
        <Text style={{ display: 'inline-flex', gap: '5px' }}>
          Date:
          <span>{year !== undefined && `${year} /`}</span>
          <span>{month !== undefined && `${month + 1} /`}</span>
          <span>{day !== undefined && `${day}`}</span>
        </Text>
      )}
      <DatePicker value={value} onChange={handleChange} {...props} />
    </Stack>
  );
};

export const Basic: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <DatePicker />
      <DatePicker defaultValue={new Date(2022, 10, 5)} />
    </Stack>
  )
};

export const FormWithDatePicker: Story = {
  render: () => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const date = formData.get('date');
        alert(`date: ${date}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DatePicker name="date" />
      <Button size="sm">제출</Button>
    </form>
  )
};

export const ControlledDatePicker: Story = {
  render: () => <ControlledDatePickerTemplate />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DatePicker locale={locale} defaultValue={new Date()} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      {OPTIONS.map((options) => (
        <Stack
          key={JSON.stringify(options)}
          spacing={20}
          style={{ alignItems: 'center' }}
        >
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
          <DatePicker options={options} defaultValue={new Date()} />
        </Stack>
      ))}
    </Stack>
  )
};

export const Readonly: Story = {
  render: () => <DatePicker defaultValue={new Date(2022, 10, 5)} readOnly />
};

export const Disabled: Story = {
  render: () => <DatePicker defaultValue={new Date(2022, 10, 5)} disabled />
};

export const RestrictDate: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <ControlledDatePickerTemplate minDate={new Date('2025-07-15')} />
      <ControlledDatePickerTemplate maxDate={new Date('2025-07-24')} />
      <ControlledDatePickerTemplate
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
      />
    </Stack>
  )
};

export const CustomPopover: Story = {
  render: () => (
    <DatePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        PopoverContentProps: { elevation: 10 }
      }}
    />
  )
};

export const Placeholder: Story = {
  render: () => <DatePicker DateFieldProps={{ placeholder: 'Select Date' }} />
};

export const DateFormat: Story = {
  render: () => <DatePicker DateFieldProps={{ format: 'YYYY년 M월 D일' }} />
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <DatePicker
        DateFieldProps={{ variant: 'filled', placeholder: 'filled' }}
      />
      <DatePicker
        DateFieldProps={{ variant: 'outlined', placeholder: 'outlined' }}
      />
      <DatePicker
        DateFieldProps={{ variant: 'underlined', placeholder: 'underlined' }}
      />
      <DatePicker
        DateFieldProps={{ variant: 'borderless', placeholder: 'borderless' }}
      />
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <DatePicker DateFieldProps={{ size: 'sm', placeholder: 'sm' }} />
      <DatePicker DateFieldProps={{ size: 'md', placeholder: 'md' }} />
      <DatePicker DateFieldProps={{ size: 'lg', placeholder: 'lg' }} />
    </Stack>
  )
};

export const Color: Story = {
  render: () => (
    <DatePicker
      DateFieldProps={{ color: 'yellow-400', focusedColor: 'yellow-400' }}
    />
  )
};

export const FullWidth: Story = {
  render: () => <DatePicker DateFieldProps={{ fullWidth: true }} />
};

export const Adornments: Story = {
  render: () => (
    <DatePicker
      DateFieldProps={{
        startAdornment: <FlightTakeOffIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => (
    <DatePicker
      DateFieldProps={{ disableHoverEffect: true, disableFocusEffect: true }}
    />
  )
};

export const CustomCalendar: Story = {
  render: () => (
    <DatePicker
      renderCalendar={(calendarProps: CalendarProps) => (
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
          <Calendar
            {...calendarProps}
            yearsOrder="dsc"
            referenceDate={new Date('2022-06-15')}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            displayWeekNumber
          />
        </>
      )}
    />
  )
};
