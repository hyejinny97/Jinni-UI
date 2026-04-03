import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangeField, DateRangeFieldProps } from '.';
import { DateField } from '@/components/data-entry/DateField';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-component';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateRangeField> = {
  title: 'components/data-entry/DateRangePicker/DateRangeField',
  component: DateRangeField,
  argTypes: {
    centerIcon: {
      description: '두 date field 중앙에 위치한 아이콘',
      table: {
        type: { summary: 'React.ReactNode' }
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
        type: { summary: 'boolean' }
      }
    },
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    endAdornment: {
      description: '뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary:
            '{ start?: React.ReactNode; end?: React.ReactNode, dateRangeField?: React.ReactNode }'
        }
      }
    },
    focusedField: {
      description: '현재 포커스된 date field',
      table: {
        type: { summary: `'start' | 'end'` }
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
    placeholder: {
      description: 'placeholder',
      table: {
        type: {
          summary: `{ start?: string; end?: string; }`
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
    startAdornment: {
      description: '앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary:
            '{ start?: React.ReactNode; end?: React.ReactNode, dateRangeField?: React.ReactNode }'
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
type Story = StoryObj<typeof DateRangeField>;

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

const ControlledDateRangeFieldTemplate = () => {
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
      <DateRangeField value={value} onChange={handleChange} />
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
      <DateRangeField
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateRangeFieldProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangeFieldProps['options']);
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
      <DateRangeField
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
          Format
        </Chip>
        <RadioGroup name="format" value={format} onChange={handleFormatChange}>
          <Grid rows={1} columns={2} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateRangeField
        key={format}
        value={value}
        onChange={handleDateChange}
        format={format}
      />
    </Stack>
  );
};

const MultiDateFieldTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dateToDay = (date: Date): number => {
    return Math.trunc(date.getTime() / DAY);
  };
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

  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

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
        <DateField
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <DateField
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateRangeField: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangeField {...args} />
      <DateRangeField
        placeholder={{
          start: 'Select Departure Date',
          end: 'Select Arrival Date'
        }}
        {...args}
      />
      <DateRangeField
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
  <DateRangeField />
  <DateRangeField
    placeholder={{
      start: 'Select Departure Date',
      end: 'Select Arrival Date'
    }}
  />
  <DateRangeField
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

export const ControlledDateRangeField: Story = {
  render: () => <ControlledDateRangeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateRangeFieldTemplate = () => {
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
      <DateRangeField value={value} onChange={handleChange} />
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
      <DateRangeField
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
  const OPTIONS: Array<DateRangeFieldProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangeFieldProps['options']);
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
      <DateRangeField
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

export const DateFormat: Story = {
  render: () => <DateFormatTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
          Format
        </Chip>
        <RadioGroup name="format" value={format} onChange={handleFormatChange}>
          <Grid rows={1} columns={2} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateRangeField
        key={format}
        value={value}
        onChange={handleDateChange}
        format={format}
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
      <DateRangeField
        placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
        format="YYYY/MM/DD"
        minDate={new Date('2025-06-30')}
        {...args}
      />
      <DateRangeField
        placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
        format="YYYY/MM/DD"
        minDate={new Date('2025-06-30')}
        defaultValue={{ start: new Date('2025-03-15') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateRangeField
    placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
    format="YYYY/MM/DD"
    minDate={new Date('2025-06-30')}
  />
  <DateRangeField
    placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
    format="YYYY/MM/DD"
    minDate={new Date('2025-06-30')}
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
      <DateRangeField
        placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
        format="YYYY/MM/DD"
        maxDate={new Date('2025-07-20')}
        {...args}
      />
      <DateRangeField
        placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
        format="YYYY/MM/DD"
        maxDate={new Date('2025-07-20')}
        defaultValue={{ end: new Date('2025-08-01') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <Stack spacing={20}>
  <DateRangeField
    placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
    format="YYYY/MM/DD"
    maxDate={new Date('2025-07-20')}
  />
  <DateRangeField
    placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
    format="YYYY/MM/DD"
    maxDate={new Date('2025-07-20')}
    defaultValue={{ end: new Date('2025-08-01') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangeField
        placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
        format="YYYY/MM/DD"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateRangeField
        placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
        format="YYYY/MM/DD"
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
  <DateRangeField
    placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
    format="YYYY/MM/DD"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateRangeField
    placeholder={{ start: 'YYYY/MM/DD', end: 'YYYY/MM/DD' }}
    format="YYYY/MM/DD"
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
    <DateRangeField
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
    <DateRangeField
      defaultValue={{
        start: new Date(2025, 6, 14),
        end: new Date(2025, 7, 20)
      }}
      disabled
      {...args}
    />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Grid spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateRangeField
            key={variant}
            variant={variant}
            placeholder={{ start: variant, end: variant }}
            {...args}
          />
        )
      )}
    </Grid>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Grid spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateRangeField
          key={size}
          size={size}
          placeholder={{ start: size, end: size }}
          {...args}
        />
      ))}
    </Grid>
  )
};

export const Color: Story = {
  render: (args) => (
    <DateRangeField color="yellow-400" focusedColor="yellow-400" {...args} />
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <DateRangeField fullWidth {...args} />
    </Box>
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangeField disableHoverEffect {...args} />
      <DateRangeField disableFocusEffect {...args} />
    </Stack>
  )
};

export const Adornments: Story = {
  render: () => (
    <DateRangeField
      placeholder={{
        start: 'Flight Departure',
        end: 'Flight Arrival'
      }}
      startAdornment={{
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      }}
      endAdornment={{
        dateRangeField: <DateRangeIcon size={20} color="gray-500" />
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeField
  placeholder={{
    start: 'Flight Departure',
    end: 'Flight Arrival'
  }}
  startAdornment={{
    start: <FlightTakeOffIcon size={20} color="gray-600" />,
    end: <FlightLandIcon size={20} color="gray-600" />
  }}
  endAdornment={{
    dateRangeField: <DateRangeIcon size={20} color="gray-500" />
  }}
/>`.trim()
      }
    }
  }
};

export const CustomCenterIcon: Story = {
  render: (args) => (
    <DateRangeField
      centerIcon={<ArrowRightIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const MultiDateField: Story = {
  render: () => <MultiDateFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiDateFieldTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dateToDay = (date: Date): number => {
    return Math.trunc(date.getTime() / DAY);
  };
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

  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

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
        <DateField
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <DateField
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
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
