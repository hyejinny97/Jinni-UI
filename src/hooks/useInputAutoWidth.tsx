import { useRef, useState, useLayoutEffect } from 'react';

type UseInputAutoWidth = {
  inputValue: string | number;
};

export const useInputAutoWidth = ({ inputValue }: UseInputAutoWidth) => {
  const inputElRef = useRef<HTMLInputElement>(null);
  const hiddenScaleElRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number | 'auto'>('auto');

  useLayoutEffect(() => {
    const inputEl = inputElRef.current;
    const hiddenScaleEl = hiddenScaleElRef.current;
    if (!inputEl || !hiddenScaleEl) return;

    const setHiddenScaleStyles = () => {
      const style = window.getComputedStyle(inputEl);

      hiddenScaleEl.style.font = style.font;
      hiddenScaleEl.style.letterSpacing = style.letterSpacing;
      hiddenScaleEl.style.boxSizing = style.boxSizing;

      if (style.boxSizing === 'border-box') {
        hiddenScaleEl.style.paddingTop = style.paddingTop;
        hiddenScaleEl.style.paddingRight = style.paddingRight;
        hiddenScaleEl.style.paddingBottom = style.paddingBottom;
        hiddenScaleEl.style.paddingLeft = style.paddingLeft;

        hiddenScaleEl.style.borderTopWidth = style.borderTopWidth;
        hiddenScaleEl.style.borderRightWidth = style.borderRightWidth;
        hiddenScaleEl.style.borderBottomWidth = style.borderBottomWidth;
        hiddenScaleEl.style.borderLeftWidth = style.borderLeftWidth;
        hiddenScaleEl.style.borderStyle = style.borderStyle;
      }
    };

    setHiddenScaleStyles();
    const mutationObserver = new MutationObserver(setHiddenScaleStyles);
    const resizeObserver = new ResizeObserver(setHiddenScaleStyles);
    mutationObserver.observe(inputEl, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    resizeObserver.observe(inputEl);
    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const hiddenScaleEl = hiddenScaleElRef.current;
    if (!hiddenScaleEl) return;
    const width = hiddenScaleEl.getBoundingClientRect().width;
    setInputWidth(width);
  }, [inputValue]);

  const hiddenScale = (
    <span
      ref={hiddenScaleElRef}
      style={{
        position: 'absolute',
        display: 'inline-block',
        visibility: 'hidden',
        height: 0
      }}
    >
      {inputValue || ' '}
    </span>
  );

  return { inputElRef, hiddenScale, inputWidth };
};
