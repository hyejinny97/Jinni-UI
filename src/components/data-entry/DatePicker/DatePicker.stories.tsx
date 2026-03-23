import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DatePickerProps } from '.';
import {
  DateCalendar,
  DateCalendarProps
} from '@/components/data-entry/DateCalendar';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { Button } from '@/components/general/Button';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Year } from '@/components/data-entry/YearCalendar';
import { Month } from '@/components/data-entry/MonthCalendar';
import { Day } from '@/components/data-entry/DayCalendar';

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
      description: '초기 selected date',
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
          summary: `(value: Date) => void;`
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
    renderDateCalendar: {
      description:
        'dateCalendarProps를 인자로 받아 DateCalendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dateCalendarProps: DateCalendarProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dateCalendarProps: DateCalendarProps) => <DateCalendar {...calendarProps} />;`
        }
      }
    },
    value: {
      description: 'selected date',
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

const ControlledDatePickerTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1} /`}</span>
        <span>{day !== undefined && `${day}`}</span>
      </Text>
      <DatePicker value={value} onChange={handleChange} />
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
  const handleDateChange = (newValue: Date | null) => {
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
      <DatePicker
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DatePickerProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { month: 'long' },
    { year: 'numeric', month: 'short', day: 'numeric' }
  ] as const;
  const [option, setOption] = useState<DatePickerProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DatePickerProps['options']);
  };
  const handleDateChange = (newValue: Date | null) => {
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
      <DatePicker
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

export const BasicDatePicker: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DatePicker {...args} />
      <DatePicker defaultValue={new Date(2022, 10, 5)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DatePicker />
  <DatePicker defaultValue={new Date(2022, 10, 5)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDatePicker: Story = {
  render: () => <ControlledDatePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDatePickerTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && \`\${year} /\`}</span>
        <span>{month !== undefined && \`\${month + 1} /\`}</span>
        <span>{day !== undefined && \`\${day}\`}</span>
      </Text>
      <DatePicker value={value} onChange={handleChange} />
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
  const handleDateChange = (newValue: Date | null) => {
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
      <DatePicker
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
  const OPTIONS: Array<DatePickerProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { month: 'long' },
    { year: 'numeric', month: 'short', day: 'numeric' }
  ] as const;
  const [option, setOption] = useState<DatePickerProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DatePickerProps['options']);
  };
  const handleDateChange = (newValue: Date | null) => {
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
      <DatePicker
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
    <Stack direction="row" spacing={20}>
      <DatePicker minDate={new Date('2025-06-30')} {...args} />
      <DatePicker
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
  <DatePicker minDate={new Date('2025-06-30')} />
  <DatePicker
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
      <DatePicker maxDate={new Date('2025-07-20')} {...args} />
      <DatePicker
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
  <DatePicker maxDate={new Date('2025-07-20')} />
  <DatePicker
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
      <DatePicker
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DatePicker
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
  <DatePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DatePicker
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={new Date('2025-07-10')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <DatePicker defaultValue={new Date(2022, 10, 5)} readOnly {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker defaultValue={new Date(2022, 10, 5)} readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <DatePicker defaultValue={new Date(2022, 10, 5)} disabled {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker defaultValue={new Date(2022, 10, 5)} disabled />`.trim()
      }
    }
  }
};

export const DatePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const date = formData.get('date');
        alert(`date: ${date}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DatePicker name="date" {...args} />
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
    const date = formData.get('date');
    alert(\`date: \${date}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <DatePicker name="date" />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomDateField: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <DatePicker
        DateFieldProps={{
          placeholder: 'Select Date',
          format: 'YYYY / MM / DD',
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
        code: `<Box style={{ width: '300px' }}>
  <DatePicker
    DateFieldProps={{
      placeholder: 'Select Date',
      format: 'YYYY / MM / DD',
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

export const CustomDateCalendar: Story = {
  render: () => (
    <DatePicker
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
                <>
                  <CalendarHeader
                    style={{ backgroundColor: 'gray-50' }}
                    prevIcon="Prev"
                    nextIcon="Next"
                    {...calendarHeaderProps}
                  />
                  <Box
                    style={{
                      marginBottom: '5px',
                      padding: '5px 10px',
                      backgroundColor: 'gray-200',
                      textAlign: 'center'
                    }}
                  >
                    Today: {new Date().toLocaleDateString()}
                  </Box>
                </>
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
        code: `<DatePicker
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
            <>
              <CalendarHeader
                style={{ backgroundColor: 'gray-50' }}
                prevIcon="Prev"
                nextIcon="Next"
                {...calendarHeaderProps}
              />
              <Box
                style={{
                  marginBottom: '5px', 
                  padding: '5px 10px',
                  backgroundColor: 'gray-200',
                  textAlign: 'center'
                }}
              >
                Today: {new Date().toLocaleDateString()}
              </Box>
            </>
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
    <DatePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};
