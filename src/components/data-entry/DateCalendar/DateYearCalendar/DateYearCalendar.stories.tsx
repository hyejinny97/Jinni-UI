import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateYearCalendar, { DateYearCalendarProps } from './DateYearCalendar';
import { Year } from '@/components/data-entry/YearCalendar';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof DateYearCalendar> = {
  title: 'components/data-entry/DatePicker/DateCalendar/DateYearCalendar',
  component: DateYearCalendar,
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
          summary: `'asc' | 'desc'`
        },
        defaultValue: {
          summary: `'asc'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateYearCalendar>;

const ControlledDateYearCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin>Year: {year !== undefined && `${year}`}</Text>
      <DateYearCalendar value={value} onChange={handleChange} />
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
      <DateYearCalendar
        key={locale}
        value={value}
        onChange={handleYearChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateYearCalendarProps['options']> = [
    {
      dateStyle: 'medium'
    },
    {
      year: 'numeric'
    },
    {
      year: '2-digit'
    }
  ] as const;
  const [option, setOption] = useState<DateYearCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateYearCalendarProps['options']);
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
      <DateYearCalendar
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

export const BasicDateYearCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateYearCalendar {...args} />
      <DateYearCalendar defaultValue={new Date(2000, 0, 1)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateYearCalendar />
  <DateYearCalendar defaultValue={new Date(2000, 0, 1)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateYearCalendar: Story = {
  render: () => <ControlledDateYearCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateYearCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin>Year: {year !== undefined && \`\${year}\`}</Text>
      <DateYearCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <DateYearCalendar referenceDate={new Date(2050, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar referenceDate={new Date(2050, 0, 1)} />`.trim()
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
      <DateYearCalendar
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
  const OPTIONS: Array<DateYearCalendarProps['options']> = [
    {
      dateStyle: 'medium'
    },
    {
      year: 'numeric'
    },
    {
      year: '2-digit'
    }
  ] as const;
  const [option, setOption] = useState<DateYearCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateYearCalendarProps['options']);
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
      <DateYearCalendar
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
    <DateYearCalendar minDate={new Date(2025, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar minDate={new Date(2025, 0, 1)} />`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <DateYearCalendar maxDate={new Date(2030, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar maxDate={new Date(2030, 0, 1)} />`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <DateYearCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <DateYearCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar disabled />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: (args) => <DateYearCalendar yearsOrder="dsc" {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar yearsOrder='dsc' />`.trim()
      }
    }
  }
};

export const CustomYear: Story = {
  render: (args) => (
    <DateYearCalendar
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
        code: `<DateYearCalendar
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

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <DateYearCalendar
      renderCalendarHeader={(calendarHeaderProps) => {
        const { children, ...rest } = calendarHeaderProps;
        return (
          <CalendarHeader style={{ backgroundColor: 'gray-200' }} {...rest}>
            <Text
              className="typo-title-medium"
              noMargin
            >{`< ${children} >`}</Text>
          </CalendarHeader>
        );
      }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateYearCalendar
  renderCalendarHeader={(calendarHeaderProps) => {
    const { children, ...rest } = calendarHeaderProps;
    return (
      <CalendarHeader style={{ backgroundColor: 'gray-200' }} {...rest}>
        <Text className="typo-title-medium" noMargin>{\`< \${children} >\`}</Text>
      </CalendarHeader>
    );
  }}
/>`.trim()
      }
    }
  }
};
