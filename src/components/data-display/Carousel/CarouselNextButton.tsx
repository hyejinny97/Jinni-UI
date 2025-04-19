import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useCarouselContext } from './Carousel.hooks';

type CarouselNextButtonProps<T extends AsType = 'button'> = Omit<
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

const CarouselNextButton = <T extends AsType = 'button'>(
  props: CarouselNextButtonProps<T>
) => {
  const { position, children, className, style, ...rest } = props;
  const { orientation, isLastCarouselItem, goNextSlide } = useCarouselContext();
  const defaultIcon =
    orientation === 'horizontal' ? (
      <ArrowRightIcon size={30} />
    ) : (
      <ArrowDownIcon size={30} />
    );
  const defaultPosition =
    orientation === 'horizontal' ? 'right-center' : 'bottom-center';

  return (
    <ButtonBase
      className={cn(
        'JinniCarouselNextButton',
        position || defaultPosition,
        className
      )}
      onClick={goNextSlide}
      disabled={isLastCarouselItem}
      style={{ position: 'absolute', ...style }}
      {...rest}
    >
      {children || defaultIcon}
    </ButtonBase>
  );
};

export default CarouselNextButton;
