import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { useCarouselContext } from './Carousel.hooks';

type CarouselPrevButtonProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'href' | 'children'
> & {
  children?: React.ReactNode;
  position?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'left-center'
    | 'right-center'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end';
};

const CarouselPrevButton = <T extends AsType = 'button'>(
  props: CarouselPrevButtonProps<T>
) => {
  const { position, children, className, style, ...rest } = props;
  const { isFirstCarouselItem, goPrevSlide, orientation } =
    useCarouselContext();
  const defaultIcon =
    orientation === 'horizontal' ? (
      <ArrowLeftIcon size={30} />
    ) : (
      <ArrowUpIcon size={30} />
    );
  const defaultPosition =
    orientation === 'horizontal' ? 'left-center' : 'top-center';

  return (
    <ButtonBase
      className={cn(
        'JinniCarouselPrevButton',
        position || defaultPosition,
        className
      )}
      onClick={goPrevSlide}
      disabled={isFirstCarouselItem}
      style={{ position: 'absolute', ...style }}
      {...rest}
    >
      {children || defaultIcon}
    </ButtonBase>
  );
};

export default CarouselPrevButton;
