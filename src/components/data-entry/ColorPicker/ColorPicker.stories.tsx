import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ColorField,
  ColorFieldProps,
  ColorBlock,
  ColorBox,
  ColorBoxProps,
  ColorPicker,
  useToHsbObject,
  hsbObjToHex,
  isRgbObject,
  isHsbObject
} from '.';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Divider } from '@/components/layout/Divider';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '@/components/data-display/Accordion';
import { ColorValueType, HSBObject } from './ColorPicker.types';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  argTypes: {
    defaultValue: {
      description: '초기 색상',
      table: {
        type: {
          summary: `#{string} | { r: number; g: number; b: number; a?: number; } | { h: number; s: number; b: number; a?: number; } | CSSColorKeywords | JinniColor | 'transparent'`
        },
        defaultValue: { summary: `'primary'` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    name: {
      description: 'input name',
      table: {
        type: { summary: 'string' }
      }
    },
    onChange: {
      description: '색상(value)이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: Event | React.SyntheticEvent, value: { h: number; s: number; b: number; a?: number; }) => void;'
        }
      }
    },
    PopoverProps: {
      description: 'Popover 컴포넌트의 props',
      table: {
        type: {
          summary: 'PopoverProps'
        }
      }
    },
    renderColorBox: {
      description:
        'colorBoxProps를 입력값으로 받아 ColorBox 컴포넌트를 렌더하는 함수',
      table: {
        type: {
          summary: '(colorBoxProps: ColorBoxProps) => React.ReactNode;'
        },
        defaultValue: {
          summary: `(colorBoxProps: ColorBoxProps) => <ColorBox {...colorBoxProps} />;`
        }
      }
    },
    renderColorField: {
      description:
        'colorFieldProps를 입력값으로 받아 ColorField 컴포넌트를 렌더하는 함수',
      table: {
        type: {
          summary: '(colorFieldProps: ColorFieldProps) => React.ReactNode;'
        },
        defaultValue: {
          summary: `(colorFieldProps: ColorFieldProps) => <ColorField {...colorFieldProps} />;`
        }
      }
    },
    value: {
      description: '색상',
      table: {
        type: {
          summary: `#{string} | { r: number; g: number; b: number; a?: number; } | { h: number; s: number; b: number; a?: number; } | CSSColorKeywords | JinniColor | 'transparent'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

const COLORS: ColorValueType[] = [
  'red',
  'transparent',
  'tertiary',
  'yellow-400',
  '#123999',
  '#1239995f',
  '#135',
  '#135a',
  { r: 233, g: 12, b: 198 },
  { r: 233, g: 12, b: 198, a: 0.4 },
  { h: 180, s: 60, b: 34 },
  { h: 180, s: 60, b: 34, a: 0.6 }
];

const ControlledColorPickerTemplate = () => {
  const [value, setValue] = useState<ColorValueType>(COLORS[0]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(JSON.parse(e.target.value) as ColorValueType);
  };
  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: HSBObject
  ) => {
    setValue(value);
  };
  const truncateValueToFirstDecimal = (obj: { [key: string]: number }) => {
    const truncatedObj = { ...obj };
    Object.keys(truncatedObj).forEach((key) => {
      truncatedObj[key] = Math.round(truncatedObj[key] * 10) / 10;
    });
    return truncatedObj;
  };

  const selectedColor =
    isRgbObject(value) || isHsbObject(value)
      ? truncateValueToFirstDecimal(value)
      : value;

  return (
    <Stack direction="row" spacing={20}>
      <Stack>
        <Text
          className="typo-title-medium"
          style={{ width: '300px', height: '50px' }}
        >
          Selected Color: {JSON.stringify(selectedColor)}
        </Text>
        <ColorPicker value={value} onChange={handleColorChange} />
      </Stack>
      <Grid columns={2}>
        <RadioGroup
          name="color"
          value={JSON.stringify(value)}
          onChange={handleRadioChange}
        >
          {COLORS.map((color) => {
            const colorStr = JSON.stringify(color);
            return (
              <Label key={colorStr} content={colorStr}>
                <Radio value={colorStr} size="sm" />
              </Label>
            );
          })}
        </RadioGroup>
      </Grid>
    </Stack>
  );
};

const ColorPickerWithFormTemplate = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('color');
    alert(`color: ${color}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={10} style={{ alignItems: 'end' }}>
        <Label
          content="Color"
          labelPlacement="top"
          required
          style={{ alignItems: 'start' }}
        >
          <ColorPicker name="color" />
        </Label>
        <Button type="submit" size="sm">
          제출
        </Button>
      </Stack>
    </form>
  );
};

const CustomColorFieldTemplate = () => {
  return (
    <ColorPicker
      renderColorField={(colorFieldProps: ColorFieldProps) => {
        const { value = 'primary' } = colorFieldProps;
        return (
          <ColorField variant="filled" size="lg" {...colorFieldProps}>
            <Stack
              direction="row"
              spacing={5}
              style={{ width: '120px', alignItems: 'center' }}
            >
              <ColorBlock
                color={value}
                style={{ width: '30px', height: '30px' }}
              />
              <Text
                className="typo-label-medium"
                noMargin
                style={{ flex: 1, textAlign: 'center' }}
              >
                {isHsbObject(value) ? hsbObjToHex(value) : value}
              </Text>
            </Stack>
          </ColorField>
        );
      }}
    />
  );
};

const ColorPreset = ({
  color,
  onClick
}: {
  color: ColorValueType;
  onClick: (e: MouseEvent, value: ColorValueType) => void;
}) => {
  const PRESET = [-60, -50, -40, -30, -20, -10, 0];
  const { toHsbObject } = useToHsbObject();
  const hsbObj = toHsbObject(color);

  return (
    <Stack direction="row" spacing={10}>
      {PRESET.map((diff) => {
        const newHsbObj = {
          ...hsbObj,
          b: Math.max(Math.min(hsbObj.b + diff, 100), 0)
        };
        const hex = hsbObjToHex(newHsbObj);
        return (
          <Box
            key={diff}
            style={{
              margin: 'auto',
              width: '25px',
              height: '25px',
              borderRadius: '4px',
              backgroundColor: hex,
              cursor: 'pointer'
            }}
            onClick={(e: MouseEvent) => onClick(e, hex)}
            tabIndex={0}
            aria-label={`preset color - ${hex}`}
          />
        );
      })}
    </Stack>
  );
};

const CustomColorBoxTemplate = () => {
  const COLORS = ['red', 'yellow', 'blue'] as const;
  const [value, setValue] = useState<ColorValueType>(COLORS[0]);

  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    newValue: HSBObject
  ) => {
    setValue(newValue);
  };
  const handleColorPresetClick = (_: MouseEvent, newValue: ColorValueType) => {
    setValue(newValue);
  };

  return (
    <ColorPicker
      value={value}
      onChange={handleColorChange}
      renderColorBox={(colorBoxProps: ColorBoxProps) => {
        return (
          <Stack direction="row" divider={<Divider orientation="vertical" />}>
            <Box>
              <Text
                className="typo-title-medium"
                noMargin
                style={{ marginTop: '10px', textAlign: 'center' }}
              >
                Color Box
              </Text>
              <ColorBox {...colorBoxProps} />
            </Box>
            <Accordion style={{ width: '250px' }}>
              {COLORS.map((color) => (
                <AccordionItem
                  key={color}
                  defaultExpanded={color === COLORS[0]}
                >
                  <AccordionSummary>{color.toUpperCase()}</AccordionSummary>
                  <AccordionDetails>
                    <ColorPreset
                      color={color}
                      onClick={handleColorPresetClick}
                    />
                  </AccordionDetails>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        );
      }}
    />
  );
};

export const BasicColorPicker: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <ColorPicker {...args} />
        <ColorPicker defaultValue="greenyellow" {...args} />
      </Stack>
    );
  }
};

export const ControlledColorPicker: Story = {
  render: () => <ControlledColorPickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledColorPickerTemplate = () => {
  const [value, setValue] = useState<ColorValueType>(COLORS[0]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(JSON.parse(e.target.value) as ColorValueType);
  };
  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: HSBObject
  ) => {
    setValue(value);
  };
  const truncateValueToFirstDecimal = (obj: { [key: string]: number }) => {
    const truncatedObj = { ...obj };
    Object.keys(truncatedObj).forEach((key) => {
      truncatedObj[key] = Math.round(truncatedObj[key] * 10) / 10;
    });
    return truncatedObj;
  };

  const selectedColor =
    isRgbObject(value) || isHsbObject(value)
      ? truncateValueToFirstDecimal(value)
      : value;

  return (
    <Stack direction="row" spacing={20}>
      <Stack>
        <Text
          className="typo-title-medium"
          style={{ width: '300px', height: '50px' }}
        >
          Selected Color: {JSON.stringify(selectedColor)}
        </Text>
        <ColorPicker value={value} onChange={handleColorChange} />
      </Stack>
      <Grid columns={2}>
        <RadioGroup
          name="color"
          value={JSON.stringify(value)}
          onChange={handleRadioChange}
        >
          {COLORS.map((color) => {
            const colorStr = JSON.stringify(color);
            return (
              <Label key={colorStr} content={colorStr}>
                <Radio value={colorStr} size="sm" />
              </Label>
            );
          })}
        </RadioGroup>
      </Grid>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <ColorPicker disabled {...args} />
};

export const ColorPickerWithForm: Story = {
  render: () => <ColorPickerWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ColorPickerWithFormTemplate = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('color');
    alert(\`color: \${color}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={10} style={{ alignItems: 'end' }}>
        <Label
          content="Color"
          labelPlacement="top"
          required
          style={{ alignItems: 'start' }}
        >
          <ColorPicker name="color" />
        </Label>
        <Button type="submit" size="sm">
          제출
        </Button>
      </Stack>
    </form>
  );
};`.trim()
      }
    }
  }
};

export const CustomColorField: Story = {
  render: () => <CustomColorFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomColorFieldTemplate = () => {
  return (
    <ColorPicker
      renderColorField={(colorFieldProps: ColorFieldProps) => {
        const { value = 'primary' } = colorFieldProps;
        return (
          <ColorField variant="filled" size="lg" {...colorFieldProps}>
            <Stack
              direction="row"
              spacing={5}
              style={{ width: '120px', alignItems: 'center' }}
            >
              <ColorBlock
                color={value}
                style={{ width: '30px', height: '30px' }}
              />
              <Text
                className="typo-label-medium"
                noMargin
                style={{ flex: 1, textAlign: 'center' }}
              >
                {isHsbObject(value) ? hsbObjToHex(value) : value}
              </Text>
            </Stack>
          </ColorField>
        );
      }}
    />
  );
};`.trim()
      }
    }
  }
};

export const CustomColorBox: Story = {
  render: () => <CustomColorBoxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomColorBoxTemplate = () => {
  const COLORS = ['red', 'yellow', 'blue'] as const;
  const [value, setValue] = useState<ColorValueType>(COLORS[0]);

  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    newValue: HSBObject
  ) => {
    setValue(newValue);
  };
  const handleColorPresetClick = (_: MouseEvent, newValue: ColorValueType) => {
    setValue(newValue);
  };

  return (
    <ColorPicker
      value={value}
      onChange={handleColorChange}
      renderColorBox={(colorBoxProps: ColorBoxProps) => {
        return (
          <Stack direction="row" divider={<Divider orientation="vertical" />}>
            <Box>
              <Text
                className="typo-title-medium"
                noMargin
                style={{ marginTop: '10px', textAlign: 'center' }}
              >
                Color Box
              </Text>
              <ColorBox {...colorBoxProps} />
            </Box>
            <Accordion style={{ width: '250px' }}>
              {COLORS.map((color) => (
                <AccordionItem
                  key={color}
                  defaultExpanded={color === COLORS[0]}
                >
                  <AccordionSummary>{color.toUpperCase()}</AccordionSummary>
                  <AccordionDetails>
                    <ColorPreset
                      color={color}
                      onClick={handleColorPresetClick}
                    />
                  </AccordionDetails>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        );
      }}
    />
  );
};`.trim()
      }
    }
  }
};

export const CustomPopover: Story = {
  render: (args) => (
    <ColorPicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'left', vertical: 'top' },
        BoxProps: { elevation: 15, round: 10 }
      }}
      {...args}
    />
  )
};
