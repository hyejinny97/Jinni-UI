import './ColorField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { ColorValueType } from '../ColorPicker';
import ColorBlock from '@/components/ColorBlock';

export type ColorFieldProps = InputBaseProps & {
  value?: ColorValueType;
};

const ColorField = forwardRef(
  (props: ColorFieldProps, ref: React.Ref<HTMLElement>) => {
    const {
      value = 'primary',
      children = <ColorBlock color={value} />,
      className,
      ...rest
    } = props;

    return (
      <InputBase
        ref={ref}
        className={cn('JinniColorField', className)}
        {...rest}
      >
        {children}
      </InputBase>
    );
  }
);

export default ColorField;
