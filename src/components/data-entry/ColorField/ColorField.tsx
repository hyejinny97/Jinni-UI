import './ColorField.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { ColorType } from '@/types/color';

type ColorFieldProps = InputBaseProps & {
  value?: ColorType;
};

const ColorBlock = ({ color }: { color: ColorType }) => {
  const colorStyle = useStyle({ backgroundColor: color });
  return (
    <div className="JinniColorBlockContainer">
      <div className="JinniColorBlock" style={colorStyle} />
    </div>
  );
};

const ColorField = (props: ColorFieldProps) => {
  const { value = 'primary', children, className, ...rest } = props;

  return (
    <InputBase className={cn('JinniColorField', className)} {...rest}>
      {children || <ColorBlock color={value} />}
    </InputBase>
  );
};

export default ColorField;
