'use client';

import './ColorField.scss';
import cn from 'classnames';
import InputBase, { InputBaseProps } from '@/components/InputBase';
import { ColorValueType } from '../ColorPicker';
import ColorBlock from '@/components/ColorBlock';

export type ColorFieldProps = InputBaseProps & {
  value?: ColorValueType;
};

const ColorField = ({ ref, ...props }: ColorFieldProps) => {
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
      focusedColor="on-surface-variant"
      {...rest}
    >
      {children}
    </InputBase>
  );
};

export default ColorField;
