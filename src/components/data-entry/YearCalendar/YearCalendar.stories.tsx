import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YearCalendar from './YearCalendar';
import { Year } from './Year';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof YearCalendar> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateYearCalendar/YearCalendar',
  component: YearCalendar,
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
type Story = StoryObj<typeof YearCalendar>;

const ControlledYearCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin>Year: {year !== undefined && `${year}`}</Text>
      <YearCalendar value={value} onChange={handleChange} />
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
      <YearCalendar
        key={locale}
        value={value}
        onChange={handleYearChange}
        locale={locale}
      />
    </Stack>
  );
};

export const BasicYearCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <YearCalendar {...args} />
      <YearCalendar defaultValue={new Date(2000, 0, 1)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <YearCalendar />
  <YearCalendar defaultValue={new Date(2000, 0, 1)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledYearCalendar: Story = {
  render: () => <ControlledYearCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledYearCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={10}>
      <Text noMargin>Year: {year !== undefined && \`\${year}\`}</Text>
      <YearCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <YearCalendar referenceDate={new Date(2050, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar referenceDate={new Date(2050, 0, 1)} />`.trim()
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
      <YearCalendar
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

export const MinDate: Story = {
  render: (args) => <YearCalendar minDate={new Date(2025, 0, 1)} {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar minDate={new Date(2025, 0, 1)} />`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => <YearCalendar maxDate={new Date(2030, 0, 1)} {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar maxDate={new Date(2030, 0, 1)} />`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <YearCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <YearCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar disabled />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: (args) => <YearCalendar yearsOrder="dsc" {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar yearsOrder='dsc' />`.trim()
      }
    }
  }
};

export const CustomYear: Story = {
  render: (args) => (
    <YearCalendar
      renderYear={(yearProps) => (
        <Year
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
        code: `<YearCalendar
  renderYear={(yearProps) => (
    <Year
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
