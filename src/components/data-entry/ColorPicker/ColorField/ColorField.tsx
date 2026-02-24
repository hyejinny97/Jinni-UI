import './ColorField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { Mosaic, MosaicProps } from '@/components/_share/Mosaic';
import { ColorValueType } from '../ColorPicker.types';
import { useToCssColor } from './ColorField.hooks';

type ColorBlockProps = Omit<MosaicProps, 'color' | 'children'> & {
  color: ColorValueType;
};

export type ColorFieldProps = InputBaseProps & {
  value?: ColorValueType;
};

export const ColorBlock = (props: ColorBlockProps) => {
  const { color, className, ...rest } = props;
  const { cssColor } = useToCssColor({ color });

  return (
    <Mosaic className={cn('JinniColorBlock', className)} {...rest}>
      <div style={{ backgroundColor: cssColor }} />
    </Mosaic>
  );
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
