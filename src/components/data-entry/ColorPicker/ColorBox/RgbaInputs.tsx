import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { RgbaObject } from '@/utils/colorFormat';
import NumberInput from './NumberInput';
import Label from './Label';

type RgbaInputsProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  rgbaObject: RgbaObject;
  handleRgbaChange: (
    event: Event | React.SyntheticEvent,
    newRgbaObject: Partial<RgbaObject>
  ) => void;
};
type ChannelType = 'r' | 'g' | 'b' | 'a';

const RgbaInputs = <T extends AsType = 'div'>(props: RgbaInputsProps<T>) => {
  const {
    rgbaObject,
    handleRgbaChange,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  const handleChange =
    (channelType: ChannelType) =>
    (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
      handleRgbaChange(e, {
        [channelType]: channelType === 'a' ? value / 100 : value
      });
    };

  return (
    <Component
      className={cn('JinniInputsContainer', className)}
      style={newStyle}
      {...rest}
    >
      <div className="JinniThreeInputs">
        <Label value="R">
          <NumberInput
            value={rgbaObject.r}
            onChange={handleChange('r')}
            min={0}
            max={255}
          />
        </Label>
        <Label value="G">
          <NumberInput
            value={rgbaObject.g}
            onChange={handleChange('g')}
            min={0}
            max={255}
          />
        </Label>
        <Label value="B">
          <NumberInput
            value={rgbaObject.b}
            onChange={handleChange('b')}
            min={0}
            max={255}
          />
        </Label>
      </div>
      <Label value="Alpha">
        <NumberInput
          className="JinniAlphaInput"
          value={Math.round(rgbaObject.a * 100)}
          onChange={handleChange('a')}
          min={0}
          max={100}
        />
      </Label>
    </Component>
  );
};

export default RgbaInputs;
