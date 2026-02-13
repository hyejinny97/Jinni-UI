import './CustomAutocomplete.scss';
import { useState, FormEvent, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, AutocompleteOption, OptionValueType } from '.';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Chip } from '@/components/data-display/Chip';
import { Button } from '@/components/general/Button';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CancelIcon } from '@/components/icons/CancelIcon';
import { Radio } from '@/components/data-entry/Radio';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Label } from '@/components/data-entry/Label';
import { ListItem } from '@/components/data-display/List';
import { Checkbox } from '@/components/data-entry/Checkbox';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  argTypes: {
    children: {
      description: 'AutocompleteOption 컴포넌트들',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    defaultValue: {
      description: '초기 autocomplete value',
      table: {
        type: { summary: `string | number | Array<string | number>` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    inputValue: {
      description: 'input value',
      table: {
        type: { summary: `string` }
      }
    },
    MenuProps: {
      description: 'Menu 컴포넌트의 props',
      table: {
        type: { summary: `MenuProps` }
      }
    },
    mode: {
      description: 'autocomplete 모드',
      table: {
        type: { summary: `'strict' | 'free'` },
        defaultValue: { summary: `'strict'` }
      }
    },
    multiple: {
      description: 'true이면, multiple selections이 가능함',
      table: {
        type: { summary: `boolean` }
      }
    },
    name: {
      description: 'autocomplete name',
      table: {
        type: { summary: `string` }
      }
    },
    onChange: {
      description: 'autocomplete value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, value: string | number | null | Array<string | number>) => void;`
        }
      }
    },
    onClose: {
      description: 'close를 유발하는 이벤트가 발생 시 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent) => void;`
        }
      }
    },
    onInputChange: {
      description: 'input value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, value: string) => void;`
        }
      }
    },
    onOpen: {
      description: 'open을 유발하는 이벤트가 발생 시 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent) => void;`
        }
      }
    },
    open: {
      description: 'true이면, menu가 open 됨',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    placeholder: {
      description: 'input 의 placeholder',
      table: {
        type: { summary: `string` }
      }
    },
    renderValue: {
      description:
        'autocomplete value와 label을 입력값으로 받아, input 내부에 content를 반환하는 함수',
      table: {
        type: {
          summary: `(autocompleteValueLabel: Array<{ value: OptionValueType; label: OptionLabelType; }>, onDelete?: (e: Event | React.SyntheticEvent, valueToDelete: OptionValueType) => void) => React.ReactNode;`
        },
        defaultValue: { summary: `multiple ? defaultRenderValue : undefined` }
      }
    },
    value: {
      description: 'autocomplete value',
      table: {
        type: { summary: `string | number | null | Array<string | number>` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

interface OptionType {
  value: number | string;
  label: string;
}

interface CountryType {
  code: string;
  label: string;
  phone: string;
}

interface FilmType {
  label: string;
  year: number;
}

const OPTIONS: OptionType[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' }
];

const COUNTRIES: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971'
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268'
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61'
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387'
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1'
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61'
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243'
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236'
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242'
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49'
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809'
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500'
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691'
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33'
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500'
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672'
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246'
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98'
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81'
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869'
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850'
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856'
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373'
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590'
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389'
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670'
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508'
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970'
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47'
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239'
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721'
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963'
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649'
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262'
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868'
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan',
    phone: '886'
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255'
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1'
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379'
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784'
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284'
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340'
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' }
];

const FILMS: readonly FilmType[] = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 }
];

const ControlledAutocompleteValueTemplate = () => {
  const [value, setValue] = useState<OptionValueType | null>(1);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType | null
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <Text noMargin>{`value: ${value}`}</Text>
      <Autocomplete
        value={value}
        onChange={handleChange}
        style={{ marginTop: '10px' }}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </>
  );
};

const ControlledInputValueTemplate = () => {
  const [value, setValue] = useState<OptionValueType | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType | null
  ) => {
    setValue(newValue);
  };
  const handleInputChange = (
    _: Event | React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  return (
    <>
      <Text noMargin>{`value: ${value}`}</Text>
      <Text noMargin>{`inputValue: ${inputValue}`}</Text>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        style={{ marginTop: '10px' }}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </>
  );
};

const ControlledMenuTemplate = () => {
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Text noMargin>{`open: ${open}`}</Text>
      <Autocomplete
        open={open}
        onOpen={openMenu}
        onClose={closeMenu}
        style={{ marginTop: '10px' }}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </>
  );
};

const CreatableTemplate = () => {
  const [options, setOptions] = useState(OPTIONS);
  const [inputValue, setInputValue] = useState<string>('');
  const matchedOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (
    _: Event | React.SyntheticEvent,
    newValue: string
  ) => {
    setInputValue(newValue);
  };
  const addOption = (value: string) => {
    setOptions((prev) => [...prev, { value, label: value }]);
  };

  let autocompleteOptions = options.map(({ value, label }) => (
    <AutocompleteOption key={value} value={value} label={label}>
      {label}
    </AutocompleteOption>
  ));
  if (matchedOptions.length === 0) {
    const createdOption = (
      <AutocompleteOption
        key="created-option"
        value={inputValue}
        label={inputValue}
        onClick={() => addOption(inputValue)}
      >
        Add '{inputValue}'
      </AutocompleteOption>
    );
    autocompleteOptions = [...autocompleteOptions, createdOption];
  }

  return (
    <Autocomplete
      mode="free"
      inputValue={inputValue}
      onInputChange={handleInputChange}
    >
      {autocompleteOptions}
    </Autocomplete>
  );
};

const BasicMultipleTemplate = () => {
  const MODES = ['strict', 'free'] as const;
  const [mode, setMode] = useState<(typeof MODES)[number]>(MODES[0]);

  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as (typeof MODES)[number]);
  };

  return (
    <Stack>
      <RadioGroup name="mode" value={mode} onChange={changeMode}>
        <Stack direction="row" spacing={10}>
          {MODES.map((mode) => (
            <Label key={mode} content={mode}>
              <Radio value={mode} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Autocomplete mode={mode} multiple>
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Stack>
  );
};

const FixedOptionsTemplate = () => {
  const fixedOptionValue = 1;
  const MODES = ['strict', 'free'] as const;
  const [value, setValue] = useState<OptionValueType[]>([fixedOptionValue]);
  const [mode, setMode] = useState<(typeof MODES)[number]>(MODES[0]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType[]
  ) => {
    if (newValue.includes(fixedOptionValue)) setValue(newValue);
    else setValue([fixedOptionValue, ...newValue]);
  };
  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as (typeof MODES)[number]);
  };

  return (
    <Stack>
      <RadioGroup name="mode" value={mode} onChange={changeMode}>
        <Stack direction="row" spacing={10}>
          {MODES.map((mode) => (
            <Label key={mode} content={mode}>
              <Radio value={mode} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Autocomplete
        mode={mode}
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(autocompleteValueLabel, onDelete) => (
          <>
            {autocompleteValueLabel.map(({ value, label }) => {
              if (value === fixedOptionValue) {
                return (
                  <Chip key={value} variant="subtle-filled" color="gray-400">
                    {label}
                  </Chip>
                );
              } else {
                return (
                  <Chip
                    key={value}
                    variant="subtle-filled"
                    color="gray-600"
                    endAdornment={
                      <ButtonBase
                        onClick={(e: MouseEvent) => onDelete?.(e, value)}
                        disableOverlay
                        disableRipple
                        style={{ width: '100%', height: '100%' }}
                        aria-label="delete chip"
                      >
                        <CancelIcon
                          color="gray-700"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </ButtonBase>
                    }
                  >
                    {label}
                  </Chip>
                );
              }
            })}
          </>
        )}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Stack>
  );
};

const LimitTagsTemplate = () => {
  const LIMIT = 3;

  return (
    <Autocomplete
      multiple
      renderValue={(autocompleteValueLabel, onDelete) => {
        const displayedValues = autocompleteValueLabel.slice(0, LIMIT);
        const restCount = autocompleteValueLabel.length - LIMIT;
        return (
          <>
            {displayedValues.map(({ value, label }) => (
              <Chip
                key={value}
                variant="subtle-filled"
                color="gray-600"
                endAdornment={
                  <ButtonBase
                    onClick={(e: MouseEvent) => onDelete?.(e, value)}
                    disableOverlay
                    disableRipple
                    style={{ width: '100%', height: '100%' }}
                    aria-label="delete chip"
                  >
                    <CancelIcon
                      color="gray-700"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </ButtonBase>
                }
              >
                {label}
              </Chip>
            ))}
            {restCount > 0 && <Text noMargin>{`+${restCount}`}</Text>}
          </>
        );
      }}
    >
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  );
};

const OptionWithCheckboxTemplate = () => {
  const [autocompleteValues, setAutocompleteValues] = useState<
    OptionValueType[]
  >([]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType[]
  ) => {
    setAutocompleteValues(newValue);
  };

  return (
    <Autocomplete multiple value={autocompleteValues} onChange={handleChange}>
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          <Checkbox checked={autocompleteValues.includes(value)} />
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  );
};

const AutocompleteWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const option = formData.get('option');
    alert(`option: ${option}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label
        content="Option"
        labelPlacement="top"
        required
        style={{ alignItems: 'start' }}
      >
        <Autocomplete multiple name="option">
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      </Label>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', margin: '10px 16px' }}
      >
        <Button type="submit">제출</Button>
      </Stack>
    </form>
  );
};

const LoadOnOpenTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<FilmType[]>([]);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchFilmsData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setFilms([...FILMS]);
        setIsLoading(false);
      }, 3000);
    };

    if (open && films.length === 0) fetchFilmsData();
  }, [open, films]);

  return (
    <Autocomplete
      open={open}
      onOpen={openMenu}
      onClose={closeMenu}
      MenuProps={{ className: 'remove-no-option-item' }}
    >
      {isLoading ? (
        <ListItem className="loading">loading...</ListItem>
      ) : (
        films.map(({ label }) => (
          <AutocompleteOption
            key={label}
            value={label}
            label={label}
            style={{ textAlign: 'start' }}
          >
            {label}
          </AutocompleteOption>
        ))
      )}
    </Autocomplete>
  );
};

const SearchAsTypeTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<FilmType[]>(FILMS.slice(5));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const deleteTimeout = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const handleInputChange = (
    _: Event | React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    setIsLoading(true);
    deleteTimeout();
    timeoutIdRef.current = setTimeout(() => {
      const searchResult: FilmType[] = FILMS.filter(({ label }) =>
        label.toLowerCase().includes(newInputValue.toLowerCase())
      );
      setOptions(searchResult);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      MenuProps={{ className: 'remove-no-option-item' }}
    >
      {isLoading ? (
        <Box
          className="loading"
          style={{
            display: 'flex',
            height: '50px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress progressColor="gray-400" size="sm" />
        </Box>
      ) : (
        options.map(({ label }) => {
          return (
            <AutocompleteOption
              key={label}
              value={label}
              label={label}
              style={{ textAlign: 'start' }}
            >
              {label}
            </AutocompleteOption>
          );
        })
      )}
    </Autocomplete>
  );
};

export const BasicAutocomplete: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Autocomplete {...args}>
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
        <Autocomplete defaultValue={1} {...args}>
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      </Stack>
    );
  }
};

export const ControlledAutocompleteValue: Story = {
  render: () => <ControlledAutocompleteValueTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledAutocompleteValueTemplate = () => {
  const [value, setValue] = useState<OptionValueType | null>(1);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType | null
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <Text noMargin>{\`value: \${value}\`}</Text>
      <Autocomplete
        value={value}
        onChange={handleChange}
        style={{ marginTop: '10px' }}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </>
  );
};`.trim()
      }
    }
  }
};

export const ControlledInputValue: Story = {
  render: () => <ControlledInputValueTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledInputValueTemplate = () => {
  const [value, setValue] = useState<OptionValueType | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType | null
  ) => {
    setValue(newValue);
  };
  const handleInputChange = (
    _: Event | React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  return (
    <>
      <Text noMargin>{\`value: \${value}\`}</Text>
      <Text noMargin>{\`inputValue: \${inputValue}\`}</Text>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        style={{ marginTop: '10px' }}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </>
  );
};`.trim()
      }
    }
  }
};

export const ControlledMenu: Story = {
  render: () => <ControlledMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledMenuTemplate = () => {
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Text noMargin>{\`open: \${open}\`}</Text>
      <Autocomplete
        open={open}
        onOpen={openMenu}
        onClose={closeMenu}
        style={{ marginTop: '10px' }}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </>
  );
};`.trim()
      }
    }
  }
};

export const Placeholder: Story = {
  render: (args) => (
    <Autocomplete placeholder="Search..." {...args}>
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Autocomplete disabled {...args}>
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  )
};

export const RenderingValuesInChip: Story = {
  render: (args) => (
    <Autocomplete
      renderValue={(autocompleteValueLabel, onDelete) => (
        <>
          {autocompleteValueLabel.map(({ value, label }) => (
            <Chip
              key={value}
              variant="outlined"
              color="primary"
              endAdornment={
                <ButtonBase
                  onClick={(e: MouseEvent) => onDelete(e, value)}
                  disableOverlay
                  disableRipple
                  style={{ width: '100%', height: '100%' }}
                  aria-label="delete chip"
                >
                  <CancelIcon
                    color="gray-700"
                    style={{ width: '100%', height: '100%' }}
                  />
                </ButtonBase>
              }
            >
              {label}
            </Chip>
          ))}
        </>
      )}
      {...args}
    >
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Autocomplete
  renderValue={(autocompleteValueLabel, onDelete) => (
    <>
      {autocompleteValueLabel.map(({ value, label }) => (
        <Chip
          key={value}
          variant="outlined"
          color="primary"
          endAdornment={
            <ButtonBase
              onClick={(e: MouseEvent) => onDelete(e, value)}
              disableOverlay
              disableRipple
              style={{ width: '100%', height: '100%' }}
              aria-label="delete chip"
            >
              <CancelIcon
                color="gray-700"
                style={{ width: '100%', height: '100%' }}
              />
            </ButtonBase>
          }
        >
          {label}
        </Chip>
      ))}
    </>
  )}
>
  {OPTIONS.map(({ value, label }) => (
    <AutocompleteOption key={value} value={value} label={label}>
      {label}
    </AutocompleteOption>
  ))}
</Autocomplete>`.trim()
      }
    }
  }
};

export const CountrySelect: Story = {
  render: (args) => (
    <Autocomplete {...args}>
      {COUNTRIES.map(({ code, label, phone }) => {
        return (
          <AutocompleteOption
            key={code}
            value={label}
            label={label}
            style={{ alignItems: 'start', textAlign: 'start' }}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
              alt={`${label} gonfalon`}
              style={{ marginRight: '10px' }}
            />
            {label} ({code}) +{phone}
          </AutocompleteOption>
        );
      })}
    </Autocomplete>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Autocomplete>
  {COUNTRIES.map(({ code, label, phone }) => {
    return (
      <AutocompleteOption 
        key={code}
        value={label}
        label={label}
        style={{ alignItems: 'start', textAlign: 'start' }}
      >
        <img
          loading="lazy"
          width="20"
          srcSet={\`https://flagcdn.com/w40/\${code.toLowerCase()}.png 2x\`}
          src={\`https://flagcdn.com/w20/\${code.toLowerCase()}.png\`}
          alt={\`\${label} gonfalon\`}
          style={{ marginRight: '10px' }}
        />
        {label} ({code}) +{phone}
      </AutocompleteOption>
    );
  })}
</Autocomplete>`.trim()
      }
    }
  }
};

export const SearchInput: Story = {
  render: (args) => (
    <Autocomplete mode="free" {...args}>
      {FILMS.map(({ label, year }) => (
        <AutocompleteOption
          key={label}
          value={label}
          label={label}
          style={{ textAlign: 'start' }}
        >
          {`${label} (${year})`}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Autocomplete mode="free">
  {FILMS.map(({ label, year }) => (
    <AutocompleteOption
      key={label}
      value={label}
      label={label}
      style={{ textAlign: 'start' }}
    >
      {\`\${label} (\${year})\`}
    </AutocompleteOption>
  ))}
</Autocomplete>`.trim()
      }
    }
  }
};

export const Creatable: Story = {
  render: () => <CreatableTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CreatableTemplate = () => {
  const [options, setOptions] = useState(OPTIONS);
  const [inputValue, setInputValue] = useState<string>('');
  const matchedOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (
    _: Event | React.SyntheticEvent,
    newValue: string
  ) => {
    setInputValue(newValue);
  };
  const addOption = (value: string) => {
    setOptions((prev) => [...prev, { value, label: value }]);
  };

  let autocompleteOptions = options.map(({ value, label }) => (
    <AutocompleteOption key={value} value={value} label={label}>
      {label}
    </AutocompleteOption>
  ));
  if (matchedOptions.length === 0) {
    const createdOption = (
      <AutocompleteOption
        key="created-option"
        value={inputValue}
        label={inputValue}
        onClick={() => addOption(inputValue)}
      >
        Add '{inputValue}'
      </AutocompleteOption>
    );
    autocompleteOptions = [...autocompleteOptions, createdOption];
  }

  return (
    <Autocomplete
      mode="free"
      inputValue={inputValue}
      onInputChange={handleInputChange}
    >
      {autocompleteOptions}
    </Autocomplete>
  );
};`.trim()
      }
    }
  }
};

export const BasicMultiple: Story = {
  render: () => <BasicMultipleTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicMultipleTemplate = () => {
  const MODES = ['strict', 'free'] as const;
  const [mode, setMode] = useState<(typeof MODES)[number]>(MODES[0]);

  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as (typeof MODES)[number]);
  };

  return (
    <Stack>
      <RadioGroup name="mode" value={mode} onChange={changeMode}>
        <Stack direction="row" spacing={10}>
          {MODES.map((mode) => (
            <Label key={mode} content={mode}>
              <Radio value={mode} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Autocomplete mode={mode} multiple>
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const FixedOptions: Story = {
  render: () => <FixedOptionsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FixedOptionsTemplate = () => {
  const fixedOptionValue = 1;
  const MODES = ['strict', 'free'] as const;
  const [value, setValue] = useState<OptionValueType[]>([fixedOptionValue]);
  const [mode, setMode] = useState<(typeof MODES)[number]>(MODES[0]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType[]
  ) => {
    if (newValue.includes(fixedOptionValue)) setValue(newValue);
    else setValue([fixedOptionValue, ...newValue]);
  };
  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as (typeof MODES)[number]);
  };

  return (
    <Stack>
      <RadioGroup name="mode" value={mode} onChange={changeMode}>
        <Stack direction="row" spacing={10}>
          {MODES.map((mode) => (
            <Label key={mode} content={mode}>
              <Radio value={mode} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Autocomplete
        mode={mode}
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(autocompleteValueLabel, onDelete) => (
          <>
            {autocompleteValueLabel.map(({ value, label }) => {
              if (value === fixedOptionValue) {
                return (
                  <Chip key={value} variant="subtle-filled" color="gray-400">
                    {label}
                  </Chip>
                );
              } else {
                return (
                  <Chip
                    key={value}
                    variant="subtle-filled"
                    color="gray-600"
                    endAdornment={
                      <ButtonBase
                        onClick={(e: MouseEvent) => onDelete?.(e, value)}
                        disableOverlay
                        disableRipple
                        style={{ width: '100%', height: '100%' }}
                        aria-label="delete chip"
                      >
                        <CancelIcon
                          color="gray-700"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </ButtonBase>
                    }
                  >
                    {label}
                  </Chip>
                );
              }
            })}
          </>
        )}
      >
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const LimitTags: Story = {
  render: () => <LimitTagsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LimitTagsTemplate = () => {
  const LIMIT = 3;

  return (
    <Autocomplete
      multiple
      renderValue={(autocompleteValueLabel, onDelete) => {
        const displayedValues = autocompleteValueLabel.slice(0, LIMIT);
        const restCount = autocompleteValueLabel.length - LIMIT;
        return (
          <>
            {displayedValues.map(({ value, label }) => (
              <Chip
                key={value}
                variant="subtle-filled"
                color="gray-600"
                endAdornment={
                  <ButtonBase
                    onClick={(e: MouseEvent) => onDelete?.(e, value)}
                    disableOverlay
                    disableRipple
                    style={{ width: '100%', height: '100%' }}
                    aria-label="delete chip"
                  >
                    <CancelIcon
                      color="gray-700"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </ButtonBase>
                }
              >
                {label}
              </Chip>
            ))}
            {restCount > 0 && <Text noMargin>{\`+\${restCount}\`}</Text>}
          </>
        );
      }}
    >
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  );
};`.trim()
      }
    }
  }
};

export const GroupOption: Story = {
  render: (args) => (
    <Autocomplete {...args}>
      <ListItem className="typo-title-medium">Category 1</ListItem>
      <AutocompleteOption value="Option 1" label="Option 1">
        Option 1
      </AutocompleteOption>
      <AutocompleteOption value="Option 2" label="Option 2">
        Option 2
      </AutocompleteOption>
      <AutocompleteOption value="Option 3" label="Option 3">
        Option 3
      </AutocompleteOption>
      <ListItem className="typo-title-medium">Category 2</ListItem>
      <AutocompleteOption value="Option 4" label="Option 4">
        Option 4
      </AutocompleteOption>
      <AutocompleteOption value="Option 5" label="Option 5">
        Option 5
      </AutocompleteOption>
      <AutocompleteOption value="Option 6" label="Option 6">
        Option 6
      </AutocompleteOption>
    </Autocomplete>
  )
};

export const OptionWithCheckbox: Story = {
  render: () => <OptionWithCheckboxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionWithCheckboxTemplate = () => {
  const [autocompleteValues, setAutocompleteValues] = useState<
    OptionValueType[]
  >([]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    newValue: OptionValueType[]
  ) => {
    setAutocompleteValues(newValue);
  };

  return (
    <Autocomplete multiple value={autocompleteValues} onChange={handleChange}>
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          <Checkbox checked={autocompleteValues.includes(value)} />
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  );
};`.trim()
      }
    }
  }
};

export const AutocompleteWithForm: Story = {
  render: () => <AutocompleteWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AutocompleteWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const option = formData.get('option');
    alert(\`option: \${option}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label
        content="Option"
        labelPlacement="top"
        required
        style={{ alignItems: 'start' }}
      >
        <Autocomplete multiple name="option">
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      </Label>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', margin: '10px 16px' }}
      >
        <Button type="submit">제출</Button>
      </Stack>
    </form>
  );
};`.trim()
      }
    }
  }
};

export const LoadOnOpen: Story = {
  render: () => <LoadOnOpenTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LoadOnOpenTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<FilmType[]>([]);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchFilmsData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setFilms([...FILMS]);
        setIsLoading(false);
      }, 3000);
    };

    if (open && films.length === 0) fetchFilmsData();
  }, [open, films]);

  return (
    <Autocomplete
      open={open}
      onOpen={openMenu}
      onClose={closeMenu}
      MenuProps={{ className: 'remove-no-option-item' }}
    >
      {isLoading ? (
        <ListItem className="loading">loading...</ListItem>
      ) : (
        films.map(({ label }) => (
          <AutocompleteOption
            key={label}
            value={label}
            label={label}
            style={{ textAlign: 'start' }}
          >
            {label}
          </AutocompleteOption>
        ))
      )}
    </Autocomplete>
  );
};`.trim()
      }
    }
  }
};

export const SearchAsYourType: Story = {
  render: () => <SearchAsTypeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SearchAsTypeTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<FilmType[]>(FILMS.slice(5));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const deleteTimeout = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const handleInputChange = (
    _: Event | React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    setIsLoading(true);
    deleteTimeout();
    timeoutIdRef.current = setTimeout(() => {
      const searchResult: FilmType[] = FILMS.filter(({ label }) =>
        label.toLowerCase().includes(newInputValue.toLowerCase())
      );
      setOptions(searchResult);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      MenuProps={{ className: 'remove-no-option-item' }}
    >
      {isLoading ? (
        <Box
          className="loading"
          style={{
            display: 'flex',
            height: '50px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress progressColor="gray-400" size="sm" />
        </Box>
      ) : (
        options.map(({ label }) => {
          return (
            <AutocompleteOption
              key={label}
              value={label}
              label={label}
              style={{ textAlign: 'start' }}
            >
              {label}
            </AutocompleteOption>
          );
        })
      )}
    </Autocomplete>
  );
};`.trim()
      }
    }
  }
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['outlined', 'filled', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <Autocomplete
            key={variant}
            variant={variant}
            placeholder={variant}
            {...args}
          >
            {OPTIONS.map(({ value, label }) => (
              <AutocompleteOption key={value} value={value} label={label}>
                {label}
              </AutocompleteOption>
            ))}
          </Autocomplete>
        )
      )}
    </Stack>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Autocomplete key={size} size={size} placeholder={size} {...args}>
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      ))}
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['error', 'yellow'] as const).map((color) => (
        <Autocomplete
          key={color}
          color={color}
          focusedColor={color}
          placeholder={color}
          {...args}
        >
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      ))}
    </Stack>
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <Autocomplete fullWidth {...args}>
        {OPTIONS.map(({ value, label }) => (
          <AutocompleteOption key={value} value={value} label={label}>
            {label}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => (
    <Autocomplete startAdornment="🛒" {...args}>
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  )
};

export const DisableEffects: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Autocomplete
          variant="filled"
          placeholder="Disable hover effect"
          disableHoverEffect
          {...args}
        >
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
        <Autocomplete
          variant="filled"
          placeholder="Disable focus effect"
          disableFocusEffect
          {...args}
        >
          {OPTIONS.map(({ value, label }) => (
            <AutocompleteOption key={value} value={value} label={label}>
              {label}
            </AutocompleteOption>
          ))}
        </Autocomplete>
      </Stack>
    );
  }
};

export const Dense: Story = {
  render: (args) => (
    <Autocomplete MenuProps={{ MenuListProps: { dense: true } }} {...args}>
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  )
};

export const MenuPosition: Story = {
  render: (args) => (
    <Autocomplete
      MenuProps={{
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        menuOrigin: { horizontal: 'left', vertical: 'top' }
      }}
      {...args}
    >
      {OPTIONS.map(({ value, label }) => (
        <AutocompleteOption key={value} value={value} label={label}>
          {label}
        </AutocompleteOption>
      ))}
    </Autocomplete>
  )
};
