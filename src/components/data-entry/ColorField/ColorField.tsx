import './ColorField.scss';
import cn from 'classnames';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { HEX, RGB, RGBA, HSL, HSLA } from '@/types/color';
import { isValidColor } from '@/utils/colorValidation';

type ColorFieldProps = InputBaseProps & {
  value?: HEX | RGB | RGBA | HSL | HSLA | string;
};

const ColorBlock = ({ color }: { color: string }) => {
  return (
    <div className="JinniColorBlockContainer">
      <div className="JinniColorBlock" style={{ backgroundColor: color }} />
    </div>
  );
};

const ColorField = (props: ColorFieldProps) => {
  const { value = '#000f', children, className, ...rest } = props;

  let validatedValue = value;
  if (!isValidColor(value)) {
    validatedValue = 'transparent';
    console.error(
      `'${value}'는 올바른 color type이 아닙니다.\n<가능한 color type>\n- #RRGGBB[AA]\n- #RGB[A]\n- rgb(R, G, B)\n- rgba(R, G, B, A)\n- hsl(H, S, L)\n- hsla(H, S, L, A)\n`
    );
  }

  return (
    <InputBase className={cn('JinniColorField', className)} {...rest}>
      {children || <ColorBlock color={validatedValue} />}
    </InputBase>
  );
};

export default ColorField;
