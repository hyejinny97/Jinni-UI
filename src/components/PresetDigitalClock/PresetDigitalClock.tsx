import './PresetDigitalClock.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { TimeComponentProps } from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';
import { TIME_STEP_PRESET_DEFAULT } from './PresetDigitalClock.constants';
import {
  useSelectedTime,
  useTimeItems,
  useScroll
} from './PresetDigitalClock.hooks';
import Box from '@/components/Box';
import MenuList from '@/components/MenuList';
import MenuItem from '@/components/MenuItem';
import useJinni from '@/hooks/useJinni';

export type PresetDigitalClockProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  TimeComponentProps<'preset'> & {
    skipDisabledTime?: boolean;
  };

const PresetDigitalClock = <T extends AsType = 'div'>(
  props: PresetDigitalClockProps<T>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options = DEFAULT_TIME_OPTIONS,
    minTime,
    maxTime,
    disabledTimes,
    timeStep = TIME_STEP_PRESET_DEFAULT,
    readOnly,
    disabled,
    skipDisabledTime,
    className,
    style,
    ...rest
  } = props;
  const { theme } = useJinni();
  const contrastColorToBg = theme === 'light' ? 'white' : 'black';

  const { selectedTime, handleChange } = useSelectedTime({
    defaultValue,
    value,
    onChange,
    readOnly,
    disabled
  });
  const { timeItems } = useTimeItems({
    locale,
    options,
    timeStep,
    minTime,
    maxTime,
    disabledTimes,
    disabled,
    skipDisabledTime,
    selectedTime
  });
  const { menuListElRef, menuItemsElRef } = useScroll({ timeItems });

  return (
    <Box
      className={cn('JinniPresetDigitalClock', className)}
      style={{
        '--text-color-selected': contrastColorToBg,
        ...style
      }}
      {...rest}
    >
      <MenuList ref={menuListElRef} elevation={0}>
        {timeItems.map(({ label, value, selected, disabled, hide }) => (
          <MenuItem
            key={label}
            ref={(element) => {
              if (element && !menuItemsElRef.current.has(label)) {
                menuItemsElRef.current.set(label, element);
              }
            }}
            className={cn({ selected, hide })}
            onClick={() => handleChange(value)}
            disabled={disabled}
            {...(selected && {
              overlayColor: contrastColorToBg,
              rippleColor: contrastColorToBg
            })}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

export default PresetDigitalClock;
