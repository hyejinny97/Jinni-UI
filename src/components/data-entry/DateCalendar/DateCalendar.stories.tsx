import './DateCalendarCustom.scss';
import cn from 'classnames';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateCalendar, { DateCalendarProps } from './DateCalendar';
import { Year } from '@/components/data-entry/YearCalendar';
import { Month } from '@/components/data-entry/MonthCalendar';
import { Day } from '@/components/data-entry/DayCalendar';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { ButtonBase } from '@/components/general/ButtonBase';

const meta: Meta<typeof DateCalendar> = {
  title: 'components/data-entry/DatePicker/DateCalendar',
  component: DateCalendar,
  argTypes: {
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
    displayWeekNumber: {
      description: 'true이면, week number가 나타남',
      table: {
        type: { summary: 'boolean' }
      }
    },
    fixedWeekNumber: {
      description: 'day calendar에서 보여지는 week 개수',
      table: {
        type: { summary: 'number' }
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
    renderDay: {
      description: 'dayProps를 인자로 받아 Day 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dayProps: DayProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dayProps: DayProps) => <Day {...dayProps} />`
        }
      }
    },
    renderMonth: {
      description: 'monthProps를 인자로 받아 Month 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(monthProps: MonthProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(monthProps: MonthProps) => <Month {...monthProps} />`
        }
      }
    },
    renderYear: {
      description: 'yearProps를 인자로 받아 Year 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(yearProps: YearProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(yearProps: YearProps) => <Year {...yearProps} />`
        }
      }
    },
    showDaysOutsideCurrentMonth: {
      description:
        'true이면, day calendar에서 해당 month의 days 이외의 앞뒤 일부 days를 나타냄',
      table: {
        type: {
          summary: `boolean`
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
    },
    yearsOrder: {
      description: 'years를 나타내는 순서',
      table: {
        type: {
          summary: `'asc' | 'dsc'`
        },
        defaultValue: {
          summary: `'asc'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateCalendar>;

const ControlledDateCalendarTemplate = () => {
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
      <DateCalendar value={value} onChange={handleChange} />
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
  const handleYearChange = (newValue: Date) => {
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
      <DateCalendar
        key={locale}
        value={value}
        onChange={handleYearChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
    { year: 'numeric' },
    { month: 'long' }
  ] as const;
  const [option, setOption] = useState<DateCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateCalendarProps['options']);
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
          <Grid rows={2} columns={2} spacing={5}>
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
      <DateCalendar
        key={JSON.stringify(option)}
        locale="en-US"
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

const CustomCalendarHeaderTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <DateCalendar
      value={value}
      onChange={handleChange}
      renderCalendarHeader={(calendarHeaderProps) => {
        const { className, children, ...rest } = calendarHeaderProps;
        return (
          <CalendarHeader
            className={cn('custom-calendar-header', className)}
            style={{ backgroundColor: 'gray-200' }}
            {...rest}
          >
            <Stack
              direction="row"
              spacing={15}
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>{children}</div>
              <ButtonBase
                elevation={1}
                style={{
                  padding: '3px 6px',
                  borderRadius: '4px',
                  color: 'gray-600',
                  fontWeight: '700'
                }}
                onClick={() => handleChange(new Date())}
              >
                Today
              </ButtonBase>
            </Stack>
          </CalendarHeader>
        );
      }}
    />
  );
};

export const BasicDateCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateCalendar {...args} />
      <DateCalendar defaultValue={new Date(2025, 8, 15)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateCalendar />
  <DateCalendar defaultValue={new Date(2025, 8, 15)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateCalendar: Story = {
  render: () => <ControlledDateCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateCalendarTemplate = () => {
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
      <DateCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <DateCalendar referenceDate={new Date(2050, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar referenceDate={new Date(2050, 0, 1)} />`.trim()
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
  const handleYearChange = (newValue: Date) => {
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
      <DateCalendar
        key={locale}
        value={value}
        onChange={handleYearChange}
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
  const OPTIONS: Array<DateCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
    { year: 'numeric' },
    { month: 'long' }
  ] as const;
  const [option, setOption] = useState<DateCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateCalendarProps['options']);
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
          <Grid rows={2} columns={2} spacing={5}>
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
      <DateCalendar
        key={JSON.stringify(option)}
        locale="en-US"
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
    <DateCalendar
      referenceDate={new Date(2025, 8, 1)}
      minDate={new Date(2025, 8, 10)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar
  referenceDate={new Date(2025, 8, 1)}
  minDate={new Date(2025, 8, 10)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <DateCalendar
      referenceDate={new Date(2025, 8, 1)}
      maxDate={new Date(2025, 8, 20)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar
  referenceDate={new Date(2025, 8, 1)}
  maxDate={new Date(2025, 8, 20)}
/>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <DateCalendar
      referenceDate={new Date(2025, 8, 1)}
      disabledDates={[new Date(2025, 8, 15), new Date(2025, 8, 28)]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar
  referenceDate={new Date(2025, 8, 1)}
  disabledDates={[new Date(2025, 8, 15), new Date(2025, 8, 28)]}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <DateCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <DateCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar disabled />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: (args) => <DateCalendar yearsOrder="dsc" {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar yearsOrder='dsc' />`.trim()
      }
    }
  }
};

export const CustomYear: Story = {
  render: (args) => (
    <DateCalendar
      renderYear={(yearProps) => (
        <Year
          key={yearProps.value.toISOString()}
          color="green"
          rippleStartLocation="center"
          style={{ width: '100%', borderRadius: '4px' }}
          {...yearProps}
        />
      )}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateCalendar
  renderYear={(yearProps) => (
    <Year
      key={yearProps.value.toISOString()}
      color="green"
      rippleStartLocation="center"
      style={{ width: '100%', borderRadius: '4px' }}
      {...yearProps}
    />
  )}
/>`.trim()
      }
    }
  }
};

export const CustomMonth: Story = {
  render: (args) => (
    <DateCalendar
      renderMonth={(monthProps) => (
        <Month
          key={monthProps.value.toISOString()}
          color="green"
          rippleStartLocation="center"
          style={{ width: '100%', borderRadius: '4px' }}
          {...monthProps}
        />
      )}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateMonthCalendar
  renderMonth={(monthProps) => (
    <Month
      key={monthProps.value.toISOString()}
      color="green"
      rippleStartLocation="center"
      style={{ width: '100%', borderRadius: '4px' }}
      {...monthProps}
    />
  )}
/>`.trim()
      }
    }
  }
};

export const ShowAdditionalDays: Story = {
  render: (args) => (
    <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} {...args} />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => <DateCalendar displayWeekNumber {...args} />
};

export const CustomDay: Story = {
  render: (args) => (
    <DateCalendar
      renderDay={(dayProps) => {
        const { value, children, marked, ...rest } = dayProps;
        const isDayWithSchedule = [3, 15, 24].some(
          (day) => value.getDate() === day
        );
        return (
          <Day
            color="green"
            rippleStartLocation="center"
            style={{
              position: 'relative',
              borderRadius: '4px',
              ...(marked && {
                borderStyle: 'dashed',
                borderColor: 'gray-300'
              })
            }}
            marked={marked}
            value={value}
            {...rest}
          >
            {children}
            <Box
              style={{
                display: isDayWithSchedule ? 'inline-block' : 'none',
                position: 'absolute',
                width: '8px',
                height: '8px',
                left: '100%',
                top: '0px',
                transform: 'translate(-80%, -20%)',
                backgroundColor: 'error',
                borderRadius: '50%'
              }}
            />
          </Day>
        );
      }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  renderDay={(dayProps) => {
    const { value, children, marked, ...rest } = dayProps;
    const isDayWithSchedule = [3, 15, 24].some(
      (day) => value.getDate() === day
    );
    return (
      <Day
        color="green"
        rippleStartLocation="center"
        style={{
          position: 'relative',
          borderRadius: '4px',
          ...(marked && {
            borderStyle: 'dashed',
            borderColor: 'gray-300'
          })
        }}
        marked={marked}
        value={value}
        {...rest}
      >
        {children}
        <Box
          style={{
            display: isDayWithSchedule ? 'inline-block' : 'none',
            position: 'absolute',
            width: '5px',
            height: '5px',
            left: '100%',
            top: '0px',
            transform: 'translate(-80%, -20%)',
            backgroundColor: 'error',
            borderRadius: '50%'
          }}
        />
      </Day>
    );
  }}
/>`.trim()
      }
    }
  }
};

export const CustomCalendarHeader: Story = {
  render: () => <CustomCalendarHeaderTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomCalendarHeaderTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <DateCalendar
      value={value}
      onChange={handleChange}
      renderCalendarHeader={(calendarHeaderProps) => {
        const { className, children, ...rest } = calendarHeaderProps;
        return (
          <CalendarHeader
            className={cn('custom-calendar-header', className)}
            style={{ backgroundColor: 'gray-200' }}
            {...rest}
          >
            <Stack
              direction="row"
              spacing={15}
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>{children}</div>
              <ButtonBase
                elevation={1}
                style={{
                  padding: '3px 6px',
                  borderRadius: '4px',
                  color: 'gray-600',
                  fontWeight: '700'
                }}
                onClick={() => handleChange(new Date())}
              >
                Today
              </ButtonBase>
            </Stack>
          </CalendarHeader>
        );
      }}
    />
  );
};`.trim()
      }
    }
  }
};
