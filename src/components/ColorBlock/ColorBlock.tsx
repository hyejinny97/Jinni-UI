import cn from 'classnames';
import Mosaic, { MosaicProps } from '@/components/Mosaic';
import { useToCssColor } from './ColorBlock.hooks';
import { ColorValueType } from '../ColorPicker';

type ColorBlockProps = Omit<MosaicProps, 'color' | 'children'> & {
  color: ColorValueType;
};

const ColorBlock = (props: ColorBlockProps) => {
  const { color, className, ...rest } = props;
  const { cssColor } = useToCssColor({ color });

  return (
    <Mosaic className={cn('JinniColorBlock', className)} {...rest}>
      <div style={{ backgroundColor: cssColor }} />
    </Mosaic>
  );
};

export default ColorBlock;
