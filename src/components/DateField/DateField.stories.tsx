import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateField, { DateFieldProps } from './DateField';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import {
  DateValidationError,
  DisabledDatesFnType
} from '@/types/date-component';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateField> = {
  title: 'components/DatePicker/DateField',
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
        type: {
          summary: 'Array<Date> | ({ date }: { date: Date; }) => boolean;'
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
          summary: `(error: boolean, errorReason?: 'disabledDate') => void;`
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
      <Text
        noMargin
        style={{ display: 'inline-flex', gap: '5px', color: 'on-surface' }}
      >
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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

const dateToMonth = (date: Date) => {
  return date.getFullYear() * 12 + date.getMonth();
};

const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

type CaseType = {
  label: string;
  disabledDates: Array<Date> | DisabledDatesFnType;
};

const CASES: CaseType[] = [
  {
    label: 'Disable today',
    disabledDates: [new Date()]
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    }
  },
  {
    label: 'Available from june to august.',
    disabledDates: ({ date }) => {
      const month = date.getMonth();
      return month < 5 || 7 < month;
    }
  },
  {
    label: 'Disable all dates except current month.',
    disabledDates: ({ date }) => {
      return dateToMonth(new Date()) !== dateToMonth(date);
    }
  },
  {
    label: 'Disable weekends.',
    disabledDates: ({ date }) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    }
  },
  {
    label: 'Available between 2026.6.1 and 2026.8.15.',
    disabledDates: ({ date }) => {
      const startInDay = dateToDay(new Date(2026, 5, 1));
      const endInDay = dateToDay(new Date(2026, 7, 15));
      const day = dateToDay(date);
      return day < startInDay || endInDay < day;
    }
  }
];

const DisabledDatesTemplate = () => {
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateField disabledDates={CASES[caseIdx].disabledDates} />
    </Stack>
  );
};

const DetectValidationErrorStatusTemplate = () => {
  const DATES = [
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Date that cause validation error
        </Chip>
        <RadioGroup
          name="date"
          value={String(dateIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={1} columns={2} spacing={5}>
            {DATES.map((date, idx) => (
              <Label content={date.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack style={{ color: 'on-surface' }}>
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
      <Text
        noMargin
        style={{ display: 'inline-flex', gap: '5px', color: 'on-surface' }}
      >
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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

export const DisabledDates: Story = {
  render: () => <DisabledDatesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const dateToMonth = (date: Date) => {
  return date.getFullYear() * 12 + date.getMonth();
};

const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

type CaseType = {
  label: string;
  disabledDates: Array<Date> | DisabledDatesFnType;
};

const CASES: CaseType[] = [
  {
    label: 'Disable today',
    disabledDates: [new Date()]
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    }
  },
  {
    label: 'Available from june to august.',
    disabledDates: ({ date }) => {
      const month = date.getMonth();
      return month < 5 || 7 < month;
    }
  },
  {
    label: 'Disable all dates except current month.',
    disabledDates: ({ date }) => {
      return dateToMonth(new Date()) !== dateToMonth(date);
    }
  },
  {
    label: 'Disable weekends.',
    disabledDates: ({ date }) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    }
  },
  {
    label: 'Available between 2026.6.1 and 2026.8.15.',
    disabledDates: ({ date }) => {
      const startInDay = dateToDay(new Date(2026, 5, 1));
      const endInDay = dateToDay(new Date(2026, 7, 15));
      const day = dateToDay(date);
      return day < startInDay || endInDay < day;
    }
  }
];

const DisabledDatesTemplate = () => {
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateField disabledDates={CASES[caseIdx].disabledDates} />
    </Stack>
  );
};`.trim()
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Date that cause validation error
        </Chip>
        <RadioGroup
          name="date"
          value={String(dateIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={1} columns={2} spacing={5}>
            {DATES.map((date, idx) => (
              <Label content={date.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack style={{ color: 'on-surface' }}>
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
