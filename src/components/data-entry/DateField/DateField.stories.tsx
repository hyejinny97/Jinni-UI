import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateField, ValidationError, DateOptions } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';

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
          summary: `(value: Date, validationError?: 'minDate' | 'maxDate' | 'disabledDate') => void;`
        }
      }
    },
    onErrorStatus: {
      description: 'error 상태가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(validationError?: 'minDate' | 'maxDate' | 'disabledDate') ⇒ void;`
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
        },
        defaultValue: { summary: 'false' }
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

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<DateOptions> = [
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
];
const FORMATS = ['YYYY년 M월 D일', 'YYYY-MM-DD'];

const ControlledDateFieldTemplate = ({ ...props }) => {
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
      <DateField value={value} onChange={handleChange} {...props} />
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
  )
};

export const ControlledDateField: Story = {
  render: (args) => (
    <ControlledDateFieldTemplate placeholder="Controlled DateField" {...args} />
  )
};

export const Locale: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DateField locale={locale} defaultValue={new Date()} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {OPTIONS.map((options) => (
        <Stack key={JSON.stringify(options)} direction="row" spacing={20}>
          <DateField options={options} defaultValue={new Date()} />
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
        </Stack>
      ))}
    </Grid>
  )
};

export const CustomizeDateFormat: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      {FORMATS.map((format) => (
        <Stack key={format}>
          <Text>{`Format: '${format}'`}</Text>
          <DateField format={format} defaultValue={new Date()} {...args} />
        </Stack>
      ))}
    </Grid>
  )
};

export const RestrictDate: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      <ControlledDateFieldTemplate
        placeholder="MinDate=2025/06/30"
        minDate={new Date('2025-06-30')}
        {...args}
      />
      <ControlledDateFieldTemplate
        placeholder="MaxDate=2025/07/20"
        maxDate={new Date('2025-07-20')}
        {...args}
      />
      <ControlledDateFieldTemplate
        placeholder="DisabledDates=2025/07/10,2025/07/15"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
    </Grid>
  )
};

export const Variants: Story = {
  render: (args) => (
    <Grid columns={4} spacing={20}>
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
    <Grid columns={3} spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateField key={size} size={size} placeholder={size} {...args} />
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => <DateField defaultValue={new Date('2025-06-30')} readOnly />
};

export const Disabled: Story = {
  render: () => <DateField defaultValue={new Date('2025-06-30')} disabled />
};

export const Color: Story = {
  render: (args) => (
    <DateField
      placeholder='color="yellow-400"'
      color="yellow-400"
      focusedColor="yellow-400"
      {...args}
    />
  )
};

export const FullWidth: Story = {
  render: (args) => <DateField placeholder="fullWidth" fullWidth {...args} />
};

export const Adornments: Story = {
  render: (args) => (
    <DateField
      placeholder="startAdornment"
      startAdornment={<DateRangeIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <DateField disableHoverEffect disableFocusEffect {...args} />
  )
};
