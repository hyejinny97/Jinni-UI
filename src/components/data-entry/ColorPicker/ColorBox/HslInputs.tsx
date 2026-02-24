import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { HslaObject } from '@/utils/colorFormat';
import NumberInput from './NumberInput';
import Label from './Label';

type HslInputsProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  hslaObject: HslaObject;
  handleHslaChange: (
    event: Event | React.SyntheticEvent,
    newHslaObject: Partial<HslaObject>
  ) => void;
};
type ChannelType = 'h' | 's' | 'l' | 'a';

const HslInputs = <T extends AsType = 'div'>(props: HslInputsProps<T>) => {
  const {
    hslaObject,
    handleHslaChange,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  const handleChange =
    (channelType: ChannelType) =>
    (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
      handleHslaChange(e, {
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
        <Label value="H">
          <NumberInput
            value={hslaObject.h}
            onChange={handleChange('h')}
            min={0}
            max={360}
          />
        </Label>
        <Label value="S">
          <NumberInput
            value={hslaObject.s}
            onChange={handleChange('s')}
            min={0}
            max={100}
          />
        </Label>
        <Label value="L">
          <NumberInput
            value={hslaObject.l}
            onChange={handleChange('l')}
            min={0}
            max={100}
          />
        </Label>
      </div>
      <Label value="Alpha">
        <NumberInput
          className="JinniAlphaInput"
          value={Math.round(hslaObject.a * 100)}
          onChange={handleChange('a')}
          min={0}
          max={100}
        />
      </Label>
    </Component>
  );
};

export default HslInputs;
