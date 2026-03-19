import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MonthCalendar from './MonthCalendar';
import { Month } from './Month';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof MonthCalendar> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateMonthCalendar/MonthCalendar',
  component: MonthCalendar,
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
type Story = StoryObj<typeof MonthCalendar>;

const ControlledMonthCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1}`}</span>
      </Text>
      <MonthCalendar value={value} onChange={handleChange} />
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
  const handleMonthChange = (newValue: Date) => {
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
      <MonthCalendar
        key={locale}
        value={value}
        onChange={handleMonthChange}
        locale={locale}
      />
    </Stack>
  );
};

export const BasicMonthCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <MonthCalendar {...args} />
      <MonthCalendar defaultValue={new Date(2000, 0, 1)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <MonthCalendar />
  <MonthCalendar defaultValue={new Date(2000, 0, 1)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledMonthCalendar: Story = {
  render: () => <ControlledMonthCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledMonthCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && \`\${year} /\`}</span>
        <span>{month !== undefined && \`\${month + 1}\`}</span>
      </Text>
      <MonthCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <MonthCalendar
      referenceDate={new Date(2050, 0, 1)}
      onChange={(value: Date) =>
        alert(
          `Date: ${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`
        )
      }
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  referenceDate={new Date(2050, 0, 1)}
  onChange={(value: Date) =>
    alert(\`Date: \${value.getFullYear()}/\${value.getMonth() + 1}/\${value.getDate()}\`)
  }
/>`.trim()
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
  const handleMonthChange = (newValue: Date) => {
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
      <MonthCalendar
        key={locale}
        value={value}
        onChange={handleMonthChange}
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
  render: (args) => (
    <MonthCalendar
      referenceDate={new Date(2025, 0, 1)}
      minDate={new Date(2025, 2, 1)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  referenceDate={new Date(2025, 0, 1)}
  minDate={new Date(2025, 2, 1)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <MonthCalendar
      referenceDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 9, 1)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  referenceDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 9, 1)}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <MonthCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <MonthCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar disabled />`.trim()
      }
    }
  }
};

export const CustomMonth: Story = {
  render: (args) => (
    <MonthCalendar
      renderMonth={(monthProps) => (
        <Month
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
        code: `<MonthCalendar
  renderMonth={(monthProps) => (
    <Month
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
