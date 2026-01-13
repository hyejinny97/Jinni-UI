import './CarouselNextButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useCarousel } from '../Carousel.hooks';
import { NavigationPaginationPositionType } from '../Carousel.types';

type CarouselNextButtonProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'href'
> & {
  position?: NavigationPaginationPositionType;
};

const CarouselNextButton = <T extends AsType = 'button'>(
  props: CarouselNextButtonProps<T>
) => {
  const { goNextSlide, noNextSlide, orientation, enableScrollToActiveSlide } =
    useCarousel();
  const {
    position = orientation === 'horizontal' ? 'center-end' : 'bottom-center',
    children = orientation === 'horizontal' ? (
      <ArrowRightIcon size={30} color="gray-800" />
    ) : (
      <ArrowDownIcon size={30} color="gray-800" />
    ),
    className,
    onClick,
    ...rest
  } = props;

  const handleClick = (e: React.MouseEvent) => {
    enableScrollToActiveSlide();
    goNextSlide();
    onClick?.(e);
  };

  return (
    <ButtonBase
      className={cn('JinniCarouselNextButton', position, className)}
      onClick={handleClick}
      disabled={noNextSlide}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default CarouselNextButton;
