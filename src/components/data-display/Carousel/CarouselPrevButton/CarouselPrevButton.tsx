import './CarouselPrevButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { useCarousel } from '../Carousel.hooks';
import { NavigationPaginationPositionType } from '../Carousel.types';

type CarouselPrevButtonProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'href'
> & {
  position?: NavigationPaginationPositionType;
};

const CarouselPrevButton = <T extends AsType = 'button'>(
  props: CarouselPrevButtonProps<T>
) => {
  const { goPrevSlide, noPrevSlide, orientation, enableScrollToActiveSlide } =
    useCarousel();
  const {
    position = orientation === 'horizontal' ? 'center-start' : 'top-center',
    children = orientation === 'horizontal' ? (
      <ArrowLeftIcon size={30} color="gray-800" />
    ) : (
      <ArrowUpIcon size={30} color="gray-800" />
    ),
    className,
    onClick,
    ...rest
  } = props;

  const handleClick = (e: React.MouseEvent) => {
    enableScrollToActiveSlide();
    goPrevSlide();
    onClick?.(e);
  };

  return (
    <ButtonBase
      className={cn('JinniCarouselPrevButton', position, className)}
      onClick={handleClick}
      disabled={noPrevSlide}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default CarouselPrevButton;
