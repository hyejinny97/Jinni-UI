import React, {
  useRef,
  useState,
  useLayoutEffect,
  forwardRef,
  MutableRefObject
} from 'react';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type AutoWidthInputProps = DefaultComponentProps<'input'> & {};

const AutoWidthInput = forwardRef(
  (props: AutoWidthInputProps, ref: React.Ref<HTMLElement>) => {
    const { value, className, style, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenElRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState<number>(0);
    const newStyle = useStyle({
      width: inputWidth,
      ...style
    });

    useLayoutEffect(() => {
      const hiddenEl = hiddenElRef.current;
      if (!hiddenEl) return;
      const width = hiddenEl.offsetWidth;
      setInputWidth(width);
    }, [value]);

    return (
      <>
        <input
          className={cn('JinniAutoWidthInput', className)}
          ref={(element) => {
            if (element) {
              (inputRef as MutableRefObject<HTMLInputElement>).current =
                element;
              if (typeof ref === 'function') {
                ref(element);
              }
            }
          }}
          value={value}
          style={newStyle}
          onFocus={(e) => e.currentTarget.select()}
          {...rest}
        />
        <span
          ref={hiddenElRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            height: 0,
            overflow: 'hidden',
            font: 'inherit'
          }}
        >
          {value || ' '}
        </span>
      </>
    );
  }
);

export default AutoWidthInput;
