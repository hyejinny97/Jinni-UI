import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YearCalendar from './YearCalendar';
import Year from '../Year';
import Stack from '@/components/Stack';
import Box from '@/components/Box';
import Grid from '@/components/Grid';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import { DisabledDatesFnType } from '@/types/date-component';

const meta: Meta<typeof YearCalendar> = {
  title: 'components/DatePicker/DateCalendar/DateYearCalendar/YearCalendar',
  component: YearCalendar,
  argTypes: {
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: '({ date }: { date: Date; }) => boolean;' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    displayedDate: {
      description: '화면에 보여지는 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    onYearChange: {
      description: 'year button을 클릭했을 때 호출되는 함수',
      table: {
        type: { summary: '(newDate: Date) ⇒ void;' }
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
    selectedDate: {
      description: '선택된 날짜',
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
type Story = StoryObj<typeof YearCalendar>;

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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <YearCalendar key={locale} displayedDate={new Date()} locale={locale} />
    </Stack>
  );
};

type CaseType = {
  label: string;
  disabledDates: DisabledDatesFnType;
};

const CASES: CaseType[] = [
  {
    label: 'Available from 2000 to 2050.',
    disabledDates: ({ date }) => {
      const year = date.getFullYear();
      return year < 2000 || 2050 < year;
    }
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
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
      <YearCalendar
        displayedDate={new Date()}
        disabledDates={CASES[caseIdx].disabledDates}
      />
    </Stack>
  );
};

export const BasicYearCalendar: Story = {
  render: () => <YearCalendar displayedDate={new Date()} />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar displayedDate={new Date()} />`.trim()
      }
    }
  }
};

export const SelectedDate: Story = {
  render: () => (
    <YearCalendar
      displayedDate={new Date(2000, 0, 1)}
      selectedDate={new Date(2003, 0, 1)}
      onYearChange={(newDate) => alert(newDate.toString())}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar
  displayedDate={new Date(2000, 0, 1)}
  selectedDate={new Date(2003, 0, 1)}
  onYearChange={(newDate) => alert(newDate.toString())}
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <YearCalendar key={locale} displayedDate={new Date()} locale={locale} />
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
        code: `type CaseType = {
  label: string;
  disabledDates: DisabledDatesFnType;
};

const CASES: CaseType[] = [
  {
    label: 'Available from 2000 to 2050.',
    disabledDates: ({ date }) => {
      const year = date.getFullYear();
      return year < 2000 || 2050 < year;
    }
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
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
      <YearCalendar
        displayedDate={new Date()}
        disabledDates={CASES[caseIdx].disabledDates}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: () => <YearCalendar displayedDate={new Date()} readOnly />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar displayedDate={new Date()} readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: () => <YearCalendar displayedDate={new Date()} disabled />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar displayedDate={new Date()} disabled />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: () => <YearCalendar displayedDate={new Date()} yearsOrder="dsc" />,
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar displayedDate={new Date()} yearsOrder='dsc' />`.trim()
      }
    }
  }
};

export const CustomYear: Story = {
  render: () => (
    <YearCalendar
      displayedDate={new Date()}
      selectedDate={new Date(2025, 0, 1)}
      renderYear={(yearProps) => (
        <Year
          color="green"
          rippleStartLocation="center"
          style={{ width: '100%', borderRadius: '4px' }}
          {...yearProps}
        />
      )}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearCalendar
  displayedDate={new Date()}
  selectedDate={new Date(2025, 0, 1)}
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
