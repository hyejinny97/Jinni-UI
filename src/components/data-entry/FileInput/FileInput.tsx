import './FileInput.scss';
import React, { useRef } from 'react';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type ValueType<Multiple extends boolean = false> = Multiple extends true
  ? Array<File>
  : null | File;

export type FileInputProps<Multiple extends boolean = false> = Omit<
  DefaultComponentProps<'input'>,
  'value' | 'onChange'
> & {
  children: React.ReactNode;
  multiple?: Multiple;
  value: ValueType<Multiple>;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: ValueType<Multiple>
  ) => void;
  disabled?: boolean;
};

const FileInput = <Multiple extends boolean = false>(
  props: FileInputProps<Multiple>
) => {
  const {
    children,
    multiple = false,
    value,
    onChange,
    disabled = false,
    className,
    style,
    ...rest
  } = props;
  const inputElRef = useRef<HTMLInputElement>(null);
  const newStyle = useStyle(style);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (onChange && files) {
      const newValue = (
        multiple && Array.isArray(value)
          ? [...value, ...files]
          : files[0] || null
      ) as ValueType<Multiple>;
      onChange(event, newValue);
    }
  };
  const handleClick = () => {
    const inputEl = inputElRef.current;
    if (!inputEl) return;
    inputEl.click();
  };
  const handleDragOver = (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files.length === 0) return;

    const dataTransfer = new DataTransfer();
    Array.from(files).forEach((file) => dataTransfer.items.add(file));
    if (inputElRef.current) {
      inputElRef.current.files = dataTransfer.files;
      const changeEvent = new Event('change', { bubbles: true });
      inputElRef.current.dispatchEvent(changeEvent);
    }
  };

  return (
    <span
      className={cn('JinniFileInput', { disabled }, className)}
      style={newStyle}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        key={String(value)}
        ref={inputElRef}
        type="file"
        className="JinniFileInputRoot"
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        {...rest}
      />
      {children}
    </span>
  );
};

export default FileInput;
