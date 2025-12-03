import cn from 'classnames';
import React, { forwardRef } from 'react';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { SizeType } from './Rating';

type RatingIconsProps = DefaultComponentProps<'span'> & {
  icon: React.ReactNode;
  count: number;
  size: SizeType;
  scaledIconIdx: number;
  className?: string;
};

const RatingIcons = forwardRef(
  (props: RatingIconsProps, ref: React.Ref<HTMLElement>) => {
    const { icon, count, size, scaledIconIdx, className, style, ...rest } =
      props;
    const isKeywordSize = ['sm', 'md', 'lg'].includes(size);
    const newStyle = useStyle({
      ...(!isKeywordSize && { '--size': size }),
      ...style
    });

    return (
      <span
        ref={ref}
        className={cn('JinniRatingIcons', className)}
        style={newStyle}
        {...rest}
      >
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              className={cn(
                'JinniRatingIcon',
                { scaled: scaledIconIdx === index },
                { [size]: isKeywordSize }
              )}
            >
              {icon}
            </span>
          ))}
      </span>
    );
  }
);

export default RatingIcons;
