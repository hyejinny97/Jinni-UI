import './ColorField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { ColorType } from '@/types/color';
import { Mosaic } from '@/components/_share/Mosaic';

export type ColorFieldProps = InputBaseProps & {
  value?: ColorType;
};

const ColorBlock = ({ color }: { color: ColorType }) => {
  const colorStyle = useStyle({ backgroundColor: color });
  return (
    <Mosaic>
      <div className="JinniColorPreview" style={colorStyle} />
    </Mosaic>
  );
};

const ColorField = forwardRef(
  (props: ColorFieldProps, ref: React.Ref<HTMLElement>) => {
    const { value = 'primary', children, className, ...rest } = props;

    return (
      <InputBase
        ref={ref}
        className={cn('JinniColorField', className)}
        {...rest}
      >
        {children || <ColorBlock color={value} />}
      </InputBase>
    );
  }
);

export default ColorField;
