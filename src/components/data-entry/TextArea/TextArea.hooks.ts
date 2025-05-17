import { useRef, useLayoutEffect, useCallback } from 'react';
import { TextAreaProps } from './TextArea';
import { validate } from './TextArea.utils';

export const useRows = ({
  rows,
  minRows,
  maxRows,
  onChange
}: Pick<TextAreaProps, 'rows' | 'minRows' | 'maxRows' | 'onChange'>) => {
  const textAreaElRef = useRef<HTMLElement>(null);
  const singleLineHeightRef = useRef<number>();
  const hasRowsValue = rows !== undefined && validate(rows);
  const hasMinRowsValue = minRows !== undefined && validate(minRows);
  const hasMaxRowsValue = maxRows !== undefined && validate(maxRows);

  const checkTextAreaEl = useCallback(() => {
    const textAreaEl = textAreaElRef.current;
    if (!textAreaEl) throw new Error('textAreaElRef.current 값이 없습니다.');
    return textAreaEl;
  }, []);

  const checkSingleLineHeight = useCallback(() => {
    const singleRowHeight = singleLineHeightRef.current;
    if (singleRowHeight === undefined)
      throw new Error('singleLineHeightRef.current 값이 없습니다.');
    return singleRowHeight;
  }, []);

  const removePadding = useCallback(
    (height: number) => {
      const textAreaEl = checkTextAreaEl();
      const topPadding = window
        .getComputedStyle(textAreaEl)
        .getPropertyValue('padding-top');
      const bottomPadding = window
        .getComputedStyle(textAreaEl)
        .getPropertyValue('padding-bottom');
      return height - parseInt(topPadding) - parseInt(bottomPadding);
    },
    [checkTextAreaEl]
  );

  const getRows = useCallback(() => {
    const textAreaEl = checkTextAreaEl();
    const rows = textAreaEl.getAttribute('rows');
    if (rows === null)
      throw new Error('textarea 요소의 rows 속성값이 null입니다.');
    return Number(rows);
  }, [checkTextAreaEl]);

  const setRows = useCallback(
    (rows: number) => {
      const textAreaEl = checkTextAreaEl();
      textAreaEl.setAttribute('rows', `${rows}`);
    },
    [checkTextAreaEl]
  );

  const setSingleLineHeight = useCallback(() => {
    const textAreaEl = checkTextAreaEl();
    singleLineHeightRef.current = removePadding(
      textAreaEl.getBoundingClientRect().height
    );
  }, [checkTextAreaEl, removePadding]);

  const getNumOfLines = useCallback(() => {
    const textAreaEl = checkTextAreaEl();
    const singleLineHeight = checkSingleLineHeight();
    const prevRows = getRows();
    setRows(1);
    const scrollHeight = removePadding(textAreaEl.scrollHeight);
    setRows(prevRows);
    return Math.ceil(scrollHeight / singleLineHeight);
  }, [checkTextAreaEl, checkSingleLineHeight, removePadding, getRows, setRows]);

  const adjustRows = useCallback(() => {
    if (hasRowsValue) {
      setRows(rows);
      return;
    }

    const numOfLines = getNumOfLines();
    if (hasMinRowsValue && numOfLines < minRows) {
      setRows(minRows);
    } else if (hasMaxRowsValue && numOfLines > maxRows) {
      setRows(maxRows);
    } else {
      setRows(numOfLines);
    }
  }, [
    getNumOfLines,
    rows,
    minRows,
    maxRows,
    hasRowsValue,
    hasMinRowsValue,
    hasMaxRowsValue,
    setRows
  ]);

  useLayoutEffect(() => {
    setRows(1);
    setSingleLineHeight();
    adjustRows();
  }, [setRows, setSingleLineHeight, adjustRows]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustRows();
    if (onChange) onChange(event);
  };

  return {
    textAreaElRef,
    handleChange
  };
};
