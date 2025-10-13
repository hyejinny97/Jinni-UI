import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';
import { useState } from 'react';
import { Stack } from '@/components/layout/Stack';
import { ColorType } from '@/types/color';
import {
  RgbaObject,
  toRgbaObject,
  rgbaObjectToHslaObject
} from '@/utils/colorFormat';
import { Button } from '@/components/general/Button';
import {
  ColorField,
  ColorFieldProps
} from '@/components/data-entry/ColorField';
import { ColorBox, ColorBoxProps } from '@/components/data-entry/ColorBox';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Divider } from '@/components/layout/Divider';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '@/components/data-display/Accordion';
import useColor from '@/hooks/useColor';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  argTypes: {
    defaultValue: {
      description: '초기 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
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
            '(event: Event | React.SyntheticEvent, value: RgbaObject) => void;'
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
        type: { summary: 'ColorType' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

const ControlledColorPickerTemplate = () => {
  const [value, setValue] = useState<ColorType>();

  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: RgbaObject
  ) => {
    const { r, g, b, a } = value;
    setValue(`rgba(${r},${g},${b},${a})`);
  };

  return <ColorPicker value={value} onChange={handleColorChange} />;
};

const ColorPreset = ({
  color,
  onClick
}: {
  color: ColorType;
  onClick: (e: MouseEvent, value: ColorType) => void;
}) => {
  const PRESET = [-30, -20, -10, 0, 10, 20, 30];
  const normalizedColor = useColor(color);
  const rgbaObject = toRgbaObject(normalizedColor);
  const hslaObject = rgbaObjectToHslaObject(rgbaObject);
  const { h, s, l, a } = hslaObject;

  return (
    <Stack direction="row" spacing={10}>
      {PRESET.map((diff) => {
        const lightness = Math.max(Math.min(l + diff, 100), 0);
        const hslaString: ColorType = `hsla(${h},${s}%,${lightness}%,${a})`;
        return (
          <Box
            key={diff}
            style={{
              margin: 'auto',
              width: '25px',
              height: '25px',
              borderRadius: '4px',
              backgroundColor: hslaString,
              cursor: 'pointer'
            }}
            onClick={(e: MouseEvent) => onClick(e, hslaString)}
          />
        );
      })}
    </Stack>
  );
};

const CustomColorBoxTemplate = () => {
  const COLORS: ColorType[] = ['red', 'yellow', 'green'];
  const [color, setColor] = useState<ColorType>();

  const handleClick = (_: MouseEvent, value: ColorType) => {
    setColor(value);
  };
  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: RgbaObject
  ) => {
    const { r, g, b, a } = value;
    setColor(`rgba(${r},${g},${b},${a})`);
  };

  return (
    <ColorPicker
      value={color}
      onChange={handleColorChange}
      renderColorBox={(colorBoxProps: ColorBoxProps) => {
        return (
          <Stack direction="row">
            <div>
              <Text
                className="typo-title-medium"
                style={{ margin: 0, paddingTop: '10px', textAlign: 'center' }}
              >
                Color Box
              </Text>
              <ColorBox {...colorBoxProps} />
            </div>
            <Divider orientation="vertical" />
            <Accordion style={{ width: '250px' }}>
              {COLORS.map((color) => (
                <AccordionItem
                  key={color}
                  defaultExpanded={color === COLORS[0]}
                >
                  <AccordionSummary>{color.toUpperCase()}</AccordionSummary>
                  <AccordionDetails>
                    <ColorPreset color={color} onClick={handleClick} />
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

export const ColorPickerWithForm: Story = {
  render: (args) => {
    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const color = formData.get('color');
          alert(`color: ${color}`);
        }}
        style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
      >
        <ColorPicker name="color" {...args} />
        <Button type="submit" size="sm">
          제출
        </Button>
      </form>
    );
  }
};

export const ControlledColorPicker: Story = {
  render: (args) => <ControlledColorPickerTemplate {...args} />
};

export const Disabled: Story = {
  render: (args) => <ColorPicker disabled {...args} />
};

export const CustomColorField: Story = {
  render: (args) => (
    <ColorPicker
      renderColorField={(colorFieldProps: ColorFieldProps) => {
        return (
          <ColorField variant="filled" size="lg" {...colorFieldProps}>
            <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
              <Box
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: colorFieldProps.value
                }}
              />
              <Text className="typo-label-medium" style={{ margin: 0 }}>
                {colorFieldProps.value}
              </Text>
            </Stack>
          </ColorField>
        );
      }}
      {...args}
    />
  )
};

export const CustomColorBox: Story = {
  render: (args) => <CustomColorBoxTemplate {...args} />
};

export const CustomPopover: Story = {
  render: (args) => (
    <ColorPicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'left', vertical: 'top' },
        PopoverContentProps: { elevation: 15, round: 10 }
      }}
      {...args}
    />
  )
};
