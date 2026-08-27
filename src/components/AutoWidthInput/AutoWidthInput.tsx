'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { mergeRefs } from '@/utils/mergeRefs';

export type AutoWidthInputProps = DefaultComponentProps<'input'> & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AutoWidthInput = ({ ref, ...props }: AutoWidthInputProps) => {
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
        ref={mergeRefs(ref, inputRef)}
        value={value}
        style={newStyle}
        onFocus={(e) => e.currentTarget.select()}
        {...rest}
      />
      <span
        ref={hiddenElRef}
        className={className}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          font: 'inherit',
          whiteSpace: 'nowrap'
        }}
      >
        {value || ' '}
      </span>
    </>
  );
};

export default AutoWidthInput;
