import './CalendarHeader.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ButtonBase } from '@/components/general/ButtonBase';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

export type CalendarHeaderProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    hidePrevButton?: boolean;
    hideNextButton?: boolean;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    onPrevClick?: () => void;
    onNextClick?: () => void;
  };

const CalendarHeader = <T extends AsType = 'div'>(
  props: CalendarHeaderProps<T>
) => {
  const {
    hidePrevButton,
    hideNextButton,
    prevIcon = <ArrowLeftIcon color="gray-500" />,
    nextIcon = <ArrowRightIcon color="gray-500" />,
    onPrevClick,
    onNextClick,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCalendarHeader', className)}
      style={newStyle}
      {...rest}
    >
      <ButtonBase
        className={cn('JinniCalendarHeaderControl', 'prev-button', {
          hide: hidePrevButton
        })}
        onClick={onPrevClick}
      >
        {prevIcon}
      </ButtonBase>
      <div className="JinniCalendarHeaderContent">{children}</div>
      <ButtonBase
        className={cn('JinniCalendarHeaderControl', 'next-button', {
          hide: hideNextButton
        })}
        onClick={onNextClick}
      >
        {nextIcon}
      </ButtonBase>
    </Component>
  );
};

export default CalendarHeader;
