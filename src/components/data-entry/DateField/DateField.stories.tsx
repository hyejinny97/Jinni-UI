import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateField, DateFieldProps } from '.';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { DateValidationError } from '@/types/date-component';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof DateField> = {
  component: DateField,
  argTypes: {
    defaultValue: {
      description: '초기 date',
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
          summary: `(value: Date) => void;`
        }
      }
    },
    onErrorStatus: {
      description: 'validation error status가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(error: boolean, errorReason?: 'minDate' | 'maxDate' | 'disabledDate') => void;`
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
          summary: `string`
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
type Story = StoryObj<typeof DateField>;

const ControlledDateFieldTemplate = () => {
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
      <DateField
        value={value}
        onChange={handleChange}
        placeholder="Select Date"
      />
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
      <DateField
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateFieldProps['options']> = [
    {
      dateStyle: 'medium'
    },
    {
      year: 'numeric'
    },
    {
      month: 'long',
      day: 'numeric'
    },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateFieldProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateFieldProps['options']);
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
      <DateField
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
  const [value, setValue] = useState<Date | null>(new Date());

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
      <DateField
        key={format}
        value={value}
        onChange={handleDateChange}
        format={format}
      />
    </Stack>
  );
};

const DetectValidationErrorStatusTemplate = () => {
  const DATES = [
    { label: '2025/06/15', value: new Date('2025-06-15') },
    { label: '2025/07/30', value: new Date('2025-07-30') },
    { label: '2025/07/10', value: new Date('2025-07-10') },
    { label: '2025/07/15', value: new Date('2025-07-15') }
  ] as const;
  const [dateIdx, setDateIdx] = useState<number>(-1);
  const [validationError, setValidationError] = useState<DateValidationError>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30'));
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDateIdx = Number(value);
    setDateIdx(newDateIdx);
    setValue(DATES[newDateIdx].value);
  };
  const handleErrorStatus = (_: boolean, errorReason?: DateValidationError) => {
    setValidationError(errorReason);
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
          Date that cause validation error
        </Chip>
        <RadioGroup
          name="date"
          value={String(dateIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={1} columns={4} spacing={5}>
            {DATES.map((date, idx) => (
              <Label content={date.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack>
        <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
          Date:
          <span>{year !== undefined && `${year} /`}</span>
          <span>{month !== undefined && `${month + 1} /`}</span>
          <span>{day !== undefined && `${day}`}</span>
        </Text>
        <Text noMargin>Validation Error: '{validationError}'</Text>
      </Stack>
      <DateField
        value={value}
        onChange={handleDateChange}
        placeholder="Select Date"
        minDate={new Date('2025-06-30')}
        maxDate={new Date('2025-07-20')}
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        onErrorStatus={handleErrorStatus}
      />
    </Stack>
  );
};

export const BasicDateField: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      <DateField {...args} />
      <DateField placeholder="Select Date" {...args} />
      <DateField defaultValue={new Date()} {...args} />
      <DateField defaultValue={new Date('2025-06-30')} {...args} />
      <DateField defaultValue={new Date('December 17, 1995')} {...args} />
      <DateField defaultValue={new Date(2025, 7, 20)} {...args} />
    </Grid>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Grid columns={3} spacing={20}>
  <DateField />
  <DateField placeholder="Select Date" />
  <DateField defaultValue={new Date()} />
  <DateField defaultValue={new Date('2025-06-30')} />
  <DateField defaultValue={new Date('December 17, 1995')} />
  <DateField defaultValue={new Date(2025, 7, 20)} />
</Grid>`.trim()
      }
    }
  }
};

export const ControlledDateField: Story = {
  render: () => <ControlledDateFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateFieldTemplate = () => {
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
      <DateField
        value={value}
        onChange={handleChange}
        placeholder="Select Date"
      />
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
      <DateField
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
  const OPTIONS: Array<DateFieldProps['options']> = [
    {
      dateStyle: 'medium'
    },
    {
      year: 'numeric'
    },
    {
      month: 'long',
      day: 'numeric'
    },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateFieldProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateFieldProps['options']);
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
      <DateField
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};
`.trim()
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
  const [value, setValue] = useState<Date | null>(new Date());

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
      <DateField
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
    <Stack direction="row" spacing={20}>
      <DateField
        placeholder="YYYY/MM/DD"
        format="YYYY/MM/DD"
        minDate={new Date('2025-06-30')}
        {...args}
      />
      <DateField
        placeholder="YYYY/MM/DD"
        format="YYYY/MM/DD"
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
  <DateField
    placeholder="YYYY/MM/DD"
    format="YYYY/MM/DD"
    minDate={new Date('2025-06-30')}
  />
  <DateField
    placeholder="YYYY/MM/DD"
    format="YYYY/MM/DD"
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
      <DateField
        placeholder="YYYY/MM/DD"
        format="YYYY/MM/DD"
        maxDate={new Date('2025-07-20')}
        {...args}
      />
      <DateField
        placeholder="YYYY/MM/DD"
        format="YYYY/MM/DD"
        maxDate={new Date('2025-07-20')}
        defaultValue={new Date('2025-08-01')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <Stack direction="row" spacing={20}>
  <DateField
    placeholder="YYYY/MM/DD"
    format="YYYY/MM/DD"
    maxDate={new Date('2025-07-20')}
  />
  <DateField
    placeholder="YYYY/MM/DD"
    format="YYYY/MM/DD"
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
      <DateField
        placeholder="YYYY/MM/DD"
        format="YYYY/MM/DD"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateField
        placeholder="YYYY/MM/DD"
        format="YYYY/MM/DD"
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
  <DateField
    placeholder="YYYY/MM/DD"
    format="YYYY/MM/DD"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateField
    placeholder="YYYY/MM/DD"
    format="YYYY/MM/DD"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={new Date('2025-07-10')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DetectValidationErrorStatus: Story = {
  render: () => <DetectValidationErrorStatusTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DetectValidationErrorStatusTemplate = () => {
  const DATES = [
    { label: '2025/06/15', value: new Date('2025-06-15') },
    { label: '2025/07/30', value: new Date('2025-07-30') },
    { label: '2025/07/10', value: new Date('2025-07-10') },
    { label: '2025/07/15', value: new Date('2025-07-15') }
  ] as const;
  const [dateIdx, setDateIdx] = useState<number>(-1);
  const [validationError, setValidationError] = useState<DateValidationError>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30'));
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDateIdx = Number(value);
    setDateIdx(newDateIdx);
    setValue(DATES[newDateIdx].value);
  };
  const handleErrorStatus = (_: boolean, errorReason?: DateValidationError) => {
    setValidationError(errorReason);
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
          Date that cause validation error
        </Chip>
        <RadioGroup
          name="date"
          value={String(dateIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={1} columns={4} spacing={5}>
            {DATES.map((date, idx) => (
              <Label content={date.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack>
        <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
          Date:
          <span>{year !== undefined && \`\${year} /\`}</span>
          <span>{month !== undefined && \`\${month + 1} /\`}</span>
          <span>{day !== undefined && \`\${day}\`}</span>
        </Text>
        <Text noMargin>Validation Error: '{validationError}'</Text>
      </Stack>
      <DateField
        value={value}
        onChange={handleDateChange}
        placeholder="Select Date"
        minDate={new Date('2025-06-30')}
        maxDate={new Date('2025-07-20')}
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        onErrorStatus={handleErrorStatus}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <DateField defaultValue={new Date('2025-06-30')} readOnly {...args} />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Grid spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateField
            key={variant}
            variant={variant}
            placeholder={variant}
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
        <DateField key={size} size={size} placeholder={size} {...args} />
      ))}
    </Grid>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateField defaultValue={new Date('2025-06-30')} disabled {...args} />
  )
};

export const Color: Story = {
  render: (args) => (
    <DateField
      placeholder="Select Date"
      color="yellow-400"
      focusedColor="yellow-400"
      {...args}
    />
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <DateField placeholder="Select Date" fullWidth {...args} />
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => (
    <DateField
      placeholder="Select Date"
      startAdornment={<DateRangeIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateField placeholder="Select Date" disableHoverEffect {...args} />
      <DateField placeholder="Select Date" disableFocusEffect {...args} />
    </Stack>
  )
};
